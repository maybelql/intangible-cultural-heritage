"use client"

import type React from "react"
import { forwardRef, useImperativeHandle, useMemo, useCallback, memo } from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Bold,
  Italic,
  Underline,
  Type,
  ImageIcon,
  Move,
  Trash2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Search,
  Layers,
  MousePointer,
  Wallet,
  Shirt,
  Download,
} from "lucide-react"
import { CozeAPI, generatePreview } from '@/lib/coze-api';
import { optimizeImage, debounce, throttle } from '@/lib/memory-utils';

interface CanvasElement {
  id: string
  type: "text" | "image" | "shape"
  x: number
  y: number
  width: number
  height: number
  content?: string
  color?: string
  shape?: "Wallet" | "Shirt"
  rotation: number
  opacity: number
  imagePath?: string
}

interface FilterOption {
  id: string
  name: string
  category: string
}

const apiClient = new CozeAPI({
  token: 'pat_6mnAGbuISXSYMVv8yyJnPygPddBjd3lsjZChTWbm12XFHf0Y4Nnp6EyMYYqpakRZ',
  baseURL: 'https://api.coze.cn',
  allowPersonalAccessTokenInBrowser: true,
});

export const DesignCanvas = memo(forwardRef<
  {
    exportCanvasToBase64: () => string | null;
    updatePreview: (productType?: "wallet" | "shirt", color?: string) => Promise<string | null>;
  }, 
  {
    defaultProductType?: "wallet" | "shirt";
    defaultColor?: string;
  }
>((props, ref) => {
  const { defaultProductType = "wallet", defaultColor = "#FFFFFF" } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(100)
  const [selectedElement, setSelectedElement] = useState<CanvasElement | null>(null)
  const [elements, setElements] = useState<CanvasElement[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [currentTool, setCurrentTool] = useState<"select" | "text" | "image" | "shape">("select")
  const [currentShape, setCurrentShape] = useState<"Wallet" | "Shirt" >("Wallet")
  const [currentCategory, setCurrentCategory] = useState("patterns")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([
    { id: "1", name: "传统纹样", category: "patterns" },
    { id: "2", name: "青花瓷", category: "patterns" },
    { id: "3", name: "龙纹", category: "patterns" },
    { id: "4", name: "牡丹", category: "patterns" },
    { id: "5", name: "现代元素", category: "modern" },
    { id: "6", name: "几何图形", category: "modern" },
    { id: "7", name: "抽象图案", category: "modern" },
  ])
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null)
  const [libraryItems, setLibraryItems] = useState<{ id: string; name: string; category: string; type: string; path: string }[]>([
    { 
      id: "p1", 
      name: "青花瓷纹样", 
      category: "patterns", 
      type: "image",
      path: "/design/青花瓷纹样.png"
    },
    { 
      id: "p2", 
      name: "龙纹图案", 
      category: "patterns", 
      type: "image",
      path: "/design/龙纹图案.jpg"
    },
    { 
      id: "p3", 
      name: "牡丹花纹", 
      category: "patterns", 
      type: "image",
      path: "/design/牡丹花纹.jpg"
    },
    { 
      id: "m1", 
      name: "现代几何", 
      category: "modern", 
      type: "image",
      path: "/assets/library/modern/geometric.png"
    },
    { 
      id: "m2", 
      name: "抽象线条", 
      category: "modern", 
      type: "image",
      path: "/assets/library/modern/abstract.png"
    },
    { 
      id: "m3", 
      name: "简约图形", 
      category: "modern", 
      type: "image",
      path: "/assets/library/modern/minimal.png"
    }
  ])
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false)

  // 将过滤逻辑放入useMemo，避免每次渲染时重新计算
  const filteredLibraryItems = useMemo(() => 
    libraryItems.filter(
      (item) =>
        item.category === currentCategory &&
        (searchTerm === "" || item.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!selectedFilter || filterOptions.find((f) => f.id === selectedFilter)?.name.includes(item.name))
    ),
  [libraryItems, currentCategory, searchTerm, selectedFilter, filterOptions]);

  // 将事件处理函数转换为useCallback
  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 10, 200));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - 10, 50));
  }, []);

  // 添加离屏渲染画布
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // 添加调整大小相关状态
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string | null>(null);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });

  // 修改drawCanvas函数定义
  const drawCanvas = debounce(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines
    ctx.strokeStyle = "#f0f0f0";
    ctx.lineWidth = 1;

    const gridSize = 20;
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // 创建分层元素数组
    const backgroundElements: CanvasElement[] = [];
    const normalElements: CanvasElement[] = [];
    
    // 根据元素类型分配到不同数组
    elements.forEach((element) => {
      // 钱包元素放入背景层
      if (element.type === "shape" && element.shape === "Wallet") {
        backgroundElements.push(element);
      } else {
        // 其他元素放入普通层
        normalElements.push(element);
      }
    });

    // 绘制单个元素的函数
    const drawElement = (element: CanvasElement, isSelected: boolean) => {
      ctx.save();
      
      // 应用元素透明度
      ctx.globalAlpha = element.opacity / 100;

      // 应用旋转
      ctx.translate(element.x + element.width / 2, element.y + element.height / 2);
      ctx.rotate((element.rotation * Math.PI) / 180);
      ctx.translate(-(element.x + element.width / 2), -(element.y + element.height / 2));

      // 根据元素类型绘制
      if (element.type === "text" && element.content) {
        ctx.font = "16px Arial";
        ctx.fillStyle = element.color || "#000000";
        ctx.fillText(element.content, element.x, element.y + 16);
      } else if (element.type === "image") {
        // 使用imagePath属性或从content生成路径
        const imagePath = element.imagePath || `/design/${element.content}.png`;
        
        // 创建图片对象
        const img = new Image();
        img.src = imagePath;
        
        // 图片加载完成后绘制
        if (img.complete) {
          // 图片已经加载完成
          ctx.drawImage(img, element.x, element.y, element.width, element.height);
        } else {
          // 图片尚未加载完成
          img.onload = () => {
            ctx.drawImage(img, element.x, element.y, element.width, element.height);
            // 重绘画布以显示图片
            requestAnimationFrame(drawCanvas);
          };
          img.onerror = () => {
            // 图片加载失败时使用默认颜色填充
            ctx.fillStyle = "#cccccc";
            ctx.fillRect(element.x, element.y, element.width, element.height);
            ctx.fillStyle = "#999999";
            ctx.font = "12px Arial";
            ctx.fillText("图片加载失败", element.x + 10, element.y + element.height/2);
          };
        }
      } else if (element.type === "shape") {
        if (element.imagePath) {
          const img = new Image();
          img.src = element.imagePath;
          
          if (img.complete) {
            // 图片已经加载完成
            ctx.drawImage(img, element.x, element.y, element.width, element.height);
          } else {
            // 图片尚未加载完成
            img.onload = () => {
              ctx.drawImage(img, element.x, element.y, element.width, element.height);
              // 重绘画布以显示图片
              requestAnimationFrame(drawCanvas);
            };
            img.onerror = () => {
              // 图片加载失败时使用默认颜色填充
              ctx.fillStyle = element.color || "#8C4A3C";
              ctx.fillRect(element.x, element.y, element.width, element.height);
            };
          }
        } else {
          // 没有图片路径时使用默认颜色填充
          ctx.fillStyle = element.color || "#8C4A3C";
          ctx.fillRect(element.x, element.y, element.width, element.height);
        }
      }

      // 绘制选中状态
      if (isSelected) {
        ctx.strokeStyle = "#3b82f6";
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(element.x - 2, element.y - 2, element.width + 4, element.height + 4);

        // 绘制调整大小的控制点
        ctx.fillStyle = "#3b82f6";
        const handleSize = 8;

        // 四个角的控制点
        ctx.fillRect(element.x - handleSize / 2, element.y - handleSize / 2, handleSize, handleSize);
        ctx.fillRect(element.x + element.width - handleSize / 2, element.y - handleSize / 2, handleSize, handleSize);
        ctx.fillRect(element.x - handleSize / 2, element.y + element.height - handleSize / 2, handleSize, handleSize);
        ctx.fillRect(
          element.x + element.width - handleSize / 2,
          element.y + element.height - handleSize / 2,
          handleSize,
          handleSize
        );

        // 旋转控制点
        ctx.beginPath();
        ctx.moveTo(element.x + element.width / 2, element.y - 20);
        ctx.lineTo(element.x + element.width / 2, element.y);
        ctx.stroke();
        ctx.fillRect(
          element.x + element.width / 2 - handleSize / 2,
          element.y - 20 - handleSize / 2,
          handleSize,
          handleSize
        );
      }

      ctx.restore();
    };

    // 按顺序绘制元素：先绘制背景层（钱包元素），再绘制普通层
    // 1. 绘制背景层元素
    backgroundElements.forEach(element => {
      drawElement(element, Boolean(selectedElement && element.id === selectedElement.id));
    });

    // 2. 绘制普通层元素
    normalElements.forEach(element => {
      drawElement(element, Boolean(selectedElement && element.id === selectedElement.id));
    });
  }, 16); // 约60fps的渲染速率

  // Handle mouse events
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvasRef.current.width / rect.width);
    const y = (e.clientY - rect.top) * (canvasRef.current.height / rect.height);

    // 如果已选中元素，检查是否点击了调整大小的控制点
    if (selectedElement) {
      const handleSize = 8;
      const halfHandleSize = handleSize / 2;
      
      // 检查四个角的控制点
      // 左上角
      if (
        Math.abs(x - selectedElement.x) <= halfHandleSize + 2 &&
        Math.abs(y - selectedElement.y) <= halfHandleSize + 2
      ) {
        setIsResizing(true);
        setResizeDirection("top-left");
        setResizeStart({ 
          x, 
          y, 
          width: selectedElement.width, 
          height: selectedElement.height 
        });
        return;
      }
      
      // 右上角
      if (
        Math.abs(x - (selectedElement.x + selectedElement.width)) <= halfHandleSize + 2 &&
        Math.abs(y - selectedElement.y) <= halfHandleSize + 2
      ) {
        setIsResizing(true);
        setResizeDirection("top-right");
        setResizeStart({ 
          x, 
          y, 
          width: selectedElement.width, 
          height: selectedElement.height 
        });
        return;
      }
      
      // 左下角
      if (
        Math.abs(x - selectedElement.x) <= halfHandleSize + 2 &&
        Math.abs(y - (selectedElement.y + selectedElement.height)) <= halfHandleSize + 2
      ) {
        setIsResizing(true);
        setResizeDirection("bottom-left");
        setResizeStart({ 
          x, 
          y, 
          width: selectedElement.width, 
          height: selectedElement.height 
        });
        return;
      }
      
      // 右下角
      if (
        Math.abs(x - (selectedElement.x + selectedElement.width)) <= halfHandleSize + 2 &&
        Math.abs(y - (selectedElement.y + selectedElement.height)) <= halfHandleSize + 2
      ) {
        setIsResizing(true);
        setResizeDirection("bottom-right");
        setResizeStart({ 
          x, 
          y, 
          width: selectedElement.width, 
          height: selectedElement.height 
        });
        return;
      }
    }

    // Check if clicking on an existing element
    const clickedElement = elements.findLast((el) => {
      return x >= el.x && x <= el.x + el.width && y >= el.y && y <= el.y + el.height;
    });

    if (clickedElement) {
      setSelectedElement(clickedElement);
      setIsDragging(true);
      setDragStart({ x, y });
    } else {
      // If using a creation tool, add a new element
      if (currentTool !== "select") {
        const newElement: CanvasElement = {
          id: `el-${Date.now()}`,
          type: currentTool,
          x,
          y,
          width: 100,
          height: 100,
          rotation: 0,
          opacity: 100,
        }

        if (currentTool === "text") {
          newElement.content = "双击编辑文本"
          newElement.color = "#000000"
        } else if (currentTool === "shape") {
          newElement.shape = currentShape
          newElement.color = "#8C4A3C"

          // 设置对应的产品图片路径
          if (currentShape === "Wallet") {
            newElement.imagePath = "/design/shape/Wallet.png"
          } else if (currentShape === "Shirt") {
            newElement.imagePath = "/design/shirt.png"
          }
        } else if (currentTool === "image") {
          // 为图片元素设置默认内容
          newElement.content = "default-image"
          // 如果有选定的库项目，可以使用其路径
          if (selectedFilter) {
            const filtered = filterOptions.find(f => f.id === selectedFilter);
            if (filtered) {
              newElement.content = filtered.name;
            }
          }
        }

        setElements([...elements, newElement])
        setSelectedElement(newElement)
        setIsDragging(true)
        setDragStart({ x, y })
      } else {
        setSelectedElement(null)
      }
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {

    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvasRef.current.width / rect.width);
    const y = (e.clientY - rect.top) * (canvasRef.current.height / rect.height);

    // 处理调整大小
    if (isResizing && selectedElement && resizeDirection) {
      let newWidth = selectedElement.width;
      let newHeight = selectedElement.height;
      let newX = selectedElement.x;
      let newY = selectedElement.y;
      
      // 根据调整方向计算新的尺寸和位置
      switch (resizeDirection) {
        case "top-left":
          newWidth = resizeStart.width - (x - resizeStart.x);
          newHeight = resizeStart.height - (y - resizeStart.y);
          newX = resizeStart.x + resizeStart.width - newWidth;
          newY = resizeStart.y + resizeStart.height - newHeight;
          break;
        case "top-right":
          newWidth = resizeStart.width + (x - resizeStart.x);
          newHeight = resizeStart.height - (y - resizeStart.y);
          newY = resizeStart.y + resizeStart.height - newHeight;
          break;
        case "bottom-left":
          newWidth = resizeStart.width - (x - resizeStart.x);
          newHeight = resizeStart.height + (y - resizeStart.y);
          newX = resizeStart.x + resizeStart.width - newWidth;
          break;
        case "bottom-right":
          newWidth = resizeStart.width + (x - resizeStart.x);
          newHeight = resizeStart.height + (y - resizeStart.y);
          break;
      }
      
      // 确保最小尺寸
      newWidth = Math.max(20, newWidth);
      newHeight = Math.max(20, newHeight);
      
      // 更新元素
      const updatedElements = elements.map(el => {
        if (el.id === selectedElement.id) {
          return {
            ...el,
            x: newX,
            y: newY,
            width: newWidth,
            height: newHeight
          };
        }
        return el;
      });
      
      setElements(updatedElements);
      
      // 更新选中元素以便UI实时反映
      setSelectedElement({
        ...selectedElement,
        x: newX,
        y: newY,
        width: newWidth,
        height: newHeight
      });
      
      // 重绘画布
      drawCanvas();
      
      return;
    }

    // 处理拖动
    if (isDragging && selectedElement) {
      const dx = x - dragStart.x;
      const dy = y - dragStart.y;

      const updatedElements = elements.map((el) => {
        if (el.id === selectedElement.id) {
          return {
            ...el,
            x: el.x + dx,
            y: el.y + dy,

          };
        }
        return el;
      });
      
      setElements(updatedElements);
      
      // 更新选中元素以便UI实时反映
      setSelectedElement({
        ...selectedElement,
        x: selectedElement.x + dx,
        y: selectedElement.y + dy,
      });

      setDragStart({ x, y });
      
      // 重绘画布
      drawCanvas();
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeDirection(null);
  }

  // Handle element deletion
  const handleDeleteElement = useCallback(() => {
    if (!selectedElement) return;

    // 立即从元素数组中移除选中元素
    const updatedElements = elements.filter((el) => el.id !== selectedElement.id);
    setElements(updatedElements);
    
    // 清除选中状态
    setSelectedElement(null);
    
    // 立即重绘画布，确保视觉上的即时反馈
    drawCanvas();
  }, [selectedElement, elements, drawCanvas]);

  // Handle element rotation
  const handleRotateElement = useCallback((degrees: number) => {
    if (!selectedElement) return;

    const updatedElements = elements.map((el) => {
      if (el.id === selectedElement.id) {
        return {
          ...el,
          rotation: (el.rotation + degrees) % 360,
        };
      }
      return el;
    });
    
    setElements(updatedElements);
    
    // 更新选中元素
    setSelectedElement({
      ...selectedElement,
      rotation: (selectedElement.rotation + degrees) % 360,
    });
    
    // 重绘画布
    drawCanvas();
  }, [selectedElement, elements, drawCanvas]);

  // Handle element opacity change
  const handleOpacityChange = (value: number[]) => {
    if (!selectedElement) return;

    const updatedElements = elements.map((el) => {
      if (el.id === selectedElement.id) {
        return {
          ...el,
          opacity: value[0],
        }
      }
      return el;
    });
    
    setElements(updatedElements);
    
    // 更新选中元素
    setSelectedElement({
      ...selectedElement,
      opacity: value[0],
    });
    
    // 重绘画布
    drawCanvas();
  }

  // Handle adding library item to canvas
  const handleAddLibraryItem = (item: { id: string; name: string; category: string; type: string; path: string }) => {
    const newElement: CanvasElement = {
      id: `el-${Date.now()}`,
      type: "image",
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      rotation: 0,
      opacity: 100,
      imagePath: item.path, 
      content: item.name
    };

    setElements([...elements, newElement]);
    setSelectedElement(newElement);
  };

  // 导出画布数据为Base64
  const exportCanvasToBase64 = () => {
    if (!canvasRef.current) return null;
    return canvasRef.current.toDataURL('image/png');
  };

  // 更新预览
  const updatePreview = async (productType = defaultProductType, color = defaultColor) => {
    const base64Data = exportCanvasToBase64();
    if (!base64Data) return null;
    
    setPreviewImage(null); // 清空旧预览图
    setIsGeneratingPreview(true); // 设置生成中状态
    
    try {
      // 使用外部优化函数，而不是内联实现
      const optimizedImage = await optimizeImage(base64Data, 1200, 0.8);
      
      // 调用API生成预览图
      const imageUrl = await generatePreview(
        optimizedImage,
        productType,
        color
      );
      
      // 设置预览图，清理旧图像引用
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
      setPreviewImage(imageUrl);
      
      return imageUrl;
    } catch (error) {
      console.error('生成预览失败:', error);
      alert('生成预览图片失败，请重试');
      return null;
    } finally {
      setIsGeneratingPreview(false); // 无论成功失败，都关闭生成中状态
    }
  };

  // 添加图片预加载函数
  const preloadImages = () => {
    // 预加载形状图片
    const shapeImages = ["/design/shape/Wallet.png", "/design/shirt.png"];
    
    // 使用图像优化策略
    const preloadOptions = {
      priority: true,
      fetchPriority: 'high',
      type: 'image/webp' // 优先使用WebP格式
    };
    
    // 使用Link预加载
    shapeImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
      
      // 同时创建图像对象确保加载到内存
      const img = new Image();
      img.src = src;
    });
    
    // 延迟加载非关键图像
    setTimeout(() => {
      // 预加载库项目图片
      libraryItems.forEach(item => {
        if (item.path) {
          const img = new Image();
          img.loading = 'lazy'; // 使用浏览器原生延迟加载
          img.src = item.path;
        }
      });
    }, 2000); // 页面加载后2秒再加载非关键图像
  };

  // 添加更多的依赖监听，确保元素属性变化时画布会重绘
  useEffect(() => {
    // 每当元素数组变化时重绘
    drawCanvas();
  }, [elements]);
  
  // 在useEffect中添加拖拽状态监听
  useEffect(() => {
    // 移动结束后进行一次完整绘制
    if (!isDragging && selectedElement) {
      drawCanvas();
    }
  }, [isDragging, selectedElement]);

  // 初始化并预加载图片
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    // Set canvas dimensions
    canvasRef.current.width = 800
    canvasRef.current.height = 600

    // 预加载图片
    preloadImages();

    // Initial draw
    drawCanvas();
    
    // 添加窗口大小变化时的重绘
    const handleResize = () => {
      drawCanvas();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  // 更新光标样式，以便在调整大小时显示正确的光标
  const getCursorStyle = () => {
    if (!selectedElement) return "default";
    
    if (isResizing) {
      switch (resizeDirection) {
        case "top-left":
        case "bottom-right":
          return "nwse-resize";
        case "top-right":
        case "bottom-left":
          return "nesw-resize";
        default:
          return "default";
      }
    }
    
    return isDragging ? "grabbing" : "grab";
  };

  // 确保组件卸载时清理资源
  useEffect(() => {
    return () => {
      // 清除预览图像
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  // 暴露方法给父组件
  useImperativeHandle(ref, () => ({
    exportCanvasToBase64,
    updatePreview
  }));

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col lg:flex-row gap-4 h-full">
        {/* Left sidebar - Tools and filters */}
        <div className="w-full lg:w-64 flex-shrink-0 bg-white rounded-lg border border-[#D9C7B8] p-4">
          <h3 className="font-medium text-sm mb-4">设计工具</h3>

          <div className="grid grid-cols-4 gap-2 mb-6">
            <Button
              variant={currentTool === "select" ? "default" : "outline"}
              size="icon"
              className={`h-10 w-full ${currentTool === "select" ? "bg-[#8C4A3C]" : "border-[#D9C7B8]"}`}
              onClick={() => setCurrentTool("select")}
            >
              <MousePointer className="h-4 w-4" />
            </Button>
            <Button
              variant={currentTool === "text" ? "default" : "outline"}
              size="icon"
              className={`h-10 w-full ${currentTool === "text" ? "bg-[#8C4A3C]" : "border-[#D9C7B8]"}`}
              onClick={() => setCurrentTool("text")}
            >
              <Type className="h-4 w-4" />
            </Button>
            <Button
              variant={currentTool === "image" ? "default" : "outline"}
              size="icon"
              className={`h-10 w-full ${currentTool === "image" ? "bg-[#8C4A3C]" : "border-[#D9C7B8]"}`}
              onClick={() => setCurrentTool("image")}
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={currentTool === "shape" ? "default" : "outline"}
              size="icon"
              className={`h-10 w-full ${currentTool === "shape" ? "bg-[#8C4A3C]" : "border-[#D9C7B8]"}`}
              onClick={() => setCurrentTool("shape")}
            >
              <Layers className="h-4 w-4" />
            </Button>
          </div>

          {currentTool === "shape" && (
            <div className="mb-6">
              <h3 className="font-medium text-sm mb-2">类别</h3>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={currentShape === "Wallet" ? "default" : "outline"}
                  size="icon"
                  className={`h-10 w-full ${currentShape === "Wallet" ? "bg-[#8C4A3C]" : "border-[#D9C7B8]"}`}
                  onClick={() => setCurrentShape("Wallet")}
                >
                  <Wallet className="h-4 w-4" />
                </Button>
                <Button
                  variant={currentShape === "Shirt" ? "default" : "outline"}
                  size="icon"
                  className={`h-10 w-full ${currentShape === "Shirt" ? "bg-[#8C4A3C]" : "border-[#D9C7B8]"}`}
                  onClick={() => setCurrentShape("Shirt")}
                >
                  <Shirt className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          <div className="mb-6">
            <h3 className="font-medium text-sm mb-2">元素库</h3>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜索元素..."
                className="pl-10 border-[#D9C7B8] focus-visible:ring-[#8C4A3C]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Tabs value={currentCategory} onValueChange={setCurrentCategory}>
              <TabsList className="bg-[#F0E6D9] w-full grid grid-cols-2">
                <TabsTrigger
                  value="patterns"
                  className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
                >
                  传统纹样
                </TabsTrigger>
                <TabsTrigger value="modern" className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white">
                  现代元素
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="mt-4">
              <h4 className="text-xs text-gray-500 mb-2">筛选</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {filterOptions
                  .filter((option) => option.category === currentCategory)
                  .map((option) => (
                    <Button
                      key={option.id}
                      variant="outline"
                      size="sm"
                      className={`text-xs h-7 ${
                        selectedFilter === option.id ? "bg-[#8C4A3C] text-white border-[#8C4A3C]" : "border-[#D9C7B8]"
                      }`}
                      onClick={() => setSelectedFilter(selectedFilter === option.id ? null : option.id)}
                    >
                      {option.name}
                    </Button>
                  ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto">
              {filteredLibraryItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#F9F5F1] rounded-lg p-2 aspect-square cursor-pointer hover:bg-[#F0E6D9] transition-colors"
                  onClick={() => handleAddLibraryItem(item)}
                >
                  <div className="relative w-full h-full flex items-center justify-center text-xs text-center">
                    {item.name}
                  </div>
                </div>
              ))}

              {filteredLibraryItems.length === 0 && (
                <div className="col-span-2 py-4 text-center text-sm text-gray-500">没有找到匹配的元素</div>
              )}
            </div>
          </div>
        </div>

        {/* Main canvas area */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="flex justify-between items-center mb-2 p-2 bg-white rounded-lg border border-[#D9C7B8]">
            <div className="flex items-center space-x-2">
              {selectedElement?.type === "text" && (
                <>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Underline className="h-4 w-4" />
                  </Button>
                  <div className="h-6 w-px bg-gray-300 mx-1"></div>
                </>
              )}

              {selectedElement && (
                <>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleRotateElement(-15)}>
                    <RotateCw className="h-4 w-4 -scale-x-100" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleRotateElement(15)}>
                    <RotateCw className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-red-500 hover:bg-red-50" 
                    onClick={handleDeleteElement}
                    title="删除元素"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-xs w-10 text-center">{zoom}%</span>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Canvas */}
          <div
            ref={containerRef}
            className="flex-1 relative bg-white rounded-lg border border-[#D9C7B8] overflow-hidden"
          >
            <canvas
              ref={canvasRef}
              className="w-full h-full"
              style={{
                transform: `scale(${zoom / 100})`,
                transformOrigin: "center center",
                cursor: getCursorStyle(),
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />

            {elements.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-gray-400 text-sm">从左侧拖拽元素到画布上进行设计</span>
              </div>
            )}
          </div>

          {/* Element Controls (only shown when an element is selected) */}
          {selectedElement && (
            <div className="mt-2 p-2 bg-white rounded-lg border border-[#D9C7B8]">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Move className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleRotateElement(90)}>
                    <RotateCw className="h-4 w-4" />
                  </Button>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-red-500 hover:bg-red-50" 
                  onClick={handleDeleteElement}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-2">
                <div className="text-xs text-gray-500 mb-1">透明度</div>
                <Slider value={[selectedElement.opacity]} max={100} step={1} onValueChange={handleOpacityChange} />
              </div>
            </div>
          )}

          {/* Preview Section */}
          <div className="mt-4 p-4 bg-white rounded-lg border border-[#D9C7B8]">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-sm">预览效果</h3>
              <Button 
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => updatePreview()}
                disabled={isGeneratingPreview}
              >
                {isGeneratingPreview ? "生成中..." : "更新预览"}
              </Button>
            </div>
            <div className="aspect-square bg-[#F9F5F1] rounded-lg p-4 flex items-center justify-center">
              {isGeneratingPreview ? (
                <div className="text-center">
                  <div className="w-8 h-8 border-4 border-[#8C4A3C] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <span className="text-gray-500">生成预览中...</span>
                </div>
              ) : previewImage ? (
                <img 
                  src={previewImage} 
                  alt="画布预览" 
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <span className="text-gray-400 text-sm">点击更新预览按钮查看效果</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}));
