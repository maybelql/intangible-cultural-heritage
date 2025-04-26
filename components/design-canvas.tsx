"use client"

import type React from "react"

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
  Square,
  Circle,
  Triangle,
} from "lucide-react"

interface CanvasElement {
  id: string
  type: "text" | "image" | "shape"
  x: number
  y: number
  width: number
  height: number
  content?: string
  color?: string
  shape?: "square" | "circle" | "triangle"
  rotation: number
  opacity: number
}

interface FilterOption {
  id: string
  name: string
  category: string
}

export function DesignCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(100)
  const [selectedElement, setSelectedElement] = useState<CanvasElement | null>(null)
  const [elements, setElements] = useState<CanvasElement[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [currentTool, setCurrentTool] = useState<"select" | "text" | "image" | "shape">("select")
  const [currentShape, setCurrentShape] = useState<"square" | "circle" | "triangle">("square")
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
    { id: "8", name: "AI推荐", category: "ai" },
    { id: "9", name: "个性化设计", category: "ai" },
  ])
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null)
  const [libraryItems, setLibraryItems] = useState<{ id: string; name: string; category: string; type: string }[]>([
    { id: "p1", name: "青花瓷纹样1", category: "patterns", type: "image" },
    { id: "p2", name: "龙纹图案", category: "patterns", type: "image" },
    { id: "p3", name: "牡丹花纹", category: "patterns", type: "image" },
    { id: "p4", name: "传统边框", category: "patterns", type: "image" },
    { id: "m1", name: "现代几何", category: "modern", type: "image" },
    { id: "m2", name: "抽象线条", category: "modern", type: "image" },
    { id: "m3", name: "简约图形", category: "modern", type: "image" },
    { id: "a1", name: "AI生成图案1", category: "ai", type: "image" },
    { id: "a2", name: "AI生成图案2", category: "ai", type: "image" },
  ])

  // Filter library items based on category and search term
  const filteredLibraryItems = libraryItems.filter(
    (item) =>
      item.category === currentCategory &&
      (searchTerm === "" || item.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!selectedFilter || filterOptions.find((f) => f.id === selectedFilter)?.name.includes(item.name)),
  )

  // Handle zoom
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 10, 200))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 10, 50))
  }

  // Canvas drawing function
  const drawCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw grid background
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid lines
    ctx.strokeStyle = "#f0f0f0"
    ctx.lineWidth = 1

    const gridSize = 20
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }

    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Draw elements
    elements.forEach((element) => {
      ctx.save()

      // Apply element opacity
      ctx.globalAlpha = element.opacity / 100

      // Apply rotation
      ctx.translate(element.x + element.width / 2, element.y + element.height / 2)
      ctx.rotate((element.rotation * Math.PI) / 180)
      ctx.translate(-(element.x + element.width / 2), -(element.y + element.height / 2))

      // Draw based on element type
      if (element.type === "text" && element.content) {
        ctx.font = "16px Arial"
        ctx.fillStyle = element.color || "#000000"
        ctx.fillText(element.content, element.x, element.y + 16)
      } else if (element.type === "image") {
        // Placeholder for image
        ctx.fillStyle = "#F0E6D9"
        ctx.fillRect(element.x, element.y, element.width, element.height)
        ctx.strokeStyle = "#8C4A3C"
        ctx.strokeRect(element.x, element.y, element.width, element.height)

        // Draw image icon in center
        ctx.fillStyle = "#8C4A3C"
        ctx.font = "12px Arial"
        ctx.fillText("图片", element.x + element.width / 2 - 12, element.y + element.height / 2 + 4)
      } else if (element.type === "shape") {
        ctx.fillStyle = element.color || "#8C4A3C"

        if (element.shape === "square") {
          ctx.fillRect(element.x, element.y, element.width, element.height)
        } else if (element.shape === "circle") {
          ctx.beginPath()
          ctx.ellipse(
            element.x + element.width / 2,
            element.y + element.height / 2,
            element.width / 2,
            element.height / 2,
            0,
            0,
            Math.PI * 2,
          )
          ctx.fill()
        } else if (element.shape === "triangle") {
          ctx.beginPath()
          ctx.moveTo(element.x + element.width / 2, element.y)
          ctx.lineTo(element.x, element.y + element.height)
          ctx.lineTo(element.x + element.width, element.y + element.height)
          ctx.closePath()
          ctx.fill()
        }
      }

      // Draw selection outline
      if (selectedElement && element.id === selectedElement.id) {
        ctx.strokeStyle = "#3b82f6"
        ctx.lineWidth = 2
        ctx.setLineDash([5, 5])
        ctx.strokeRect(element.x - 2, element.y - 2, element.width + 4, element.height + 4)

        // Draw resize handles
        ctx.fillStyle = "#3b82f6"
        const handleSize = 8

        // Corner handles
        ctx.fillRect(element.x - handleSize / 2, element.y - handleSize / 2, handleSize, handleSize)
        ctx.fillRect(element.x + element.width - handleSize / 2, element.y - handleSize / 2, handleSize, handleSize)
        ctx.fillRect(element.x - handleSize / 2, element.y + element.height - handleSize / 2, handleSize, handleSize)
        ctx.fillRect(
          element.x + element.width - handleSize / 2,
          element.y + element.height - handleSize / 2,
          handleSize,
          handleSize,
        )

        // Rotation handle
        ctx.beginPath()
        ctx.moveTo(element.x + element.width / 2, element.y - 20)
        ctx.lineTo(element.x + element.width / 2, element.y)
        ctx.stroke()
        ctx.fillRect(
          element.x + element.width / 2 - handleSize / 2,
          element.y - 20 - handleSize / 2,
          handleSize,
          handleSize,
        )
      }

      ctx.restore()
    })
  }

  // Handle mouse events
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) * (canvasRef.current.width / rect.width)
    const y = (e.clientY - rect.top) * (canvasRef.current.height / rect.height)

    // Check if clicking on an existing element
    const clickedElement = elements.findLast((el) => {
      return x >= el.x && x <= el.x + el.width && y >= el.y && y <= el.y + el.height
    })

    if (clickedElement) {
      setSelectedElement(clickedElement)
      setIsDragging(true)
      setDragStart({ x, y })
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
    if (!isDragging || !selectedElement || !canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) * (canvasRef.current.width / rect.width)
    const y = (e.clientY - rect.top) * (canvasRef.current.height / rect.height)

    const dx = x - dragStart.x
    const dy = y - dragStart.y

    setElements(
      elements.map((el) => {
        if (el.id === selectedElement.id) {
          return {
            ...el,
            x: el.x + dx,
            y: el.y + dy,
          }
        }
        return el
      }),
    )

    setDragStart({ x, y })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Handle element deletion
  const handleDeleteElement = () => {
    if (!selectedElement) return

    setElements(elements.filter((el) => el.id !== selectedElement.id))
    setSelectedElement(null)
  }

  // Handle element rotation
  const handleRotateElement = (degrees: number) => {
    if (!selectedElement) return

    setElements(
      elements.map((el) => {
        if (el.id === selectedElement.id) {
          return {
            ...el,
            rotation: (el.rotation + degrees) % 360,
          }
        }
        return el
      }),
    )
  }

  // Handle element opacity change
  const handleOpacityChange = (value: number[]) => {
    if (!selectedElement) return

    setElements(
      elements.map((el) => {
        if (el.id === selectedElement.id) {
          return {
            ...el,
            opacity: value[0],
          }
        }
        return el
      }),
    )
  }

  // Handle adding library item to canvas
  const handleAddLibraryItem = (item: { id: string; name: string; category: string; type: string }) => {
    const newElement: CanvasElement = {
      id: `el-${Date.now()}`,
      type: "image",
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      rotation: 0,
      opacity: 100,
      content: item.name,
    }

    setElements([...elements, newElement])
    setSelectedElement(newElement)
  }

  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    // Set canvas dimensions
    canvasRef.current.width = 800
    canvasRef.current.height = 600

    // Initial draw
    drawCanvas()
  }, [])

  // Redraw canvas when elements or selected element changes
  useEffect(() => {
    drawCanvas()
  }, [elements, selectedElement, zoom])

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
              <h3 className="font-medium text-sm mb-2">形状</h3>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={currentShape === "square" ? "default" : "outline"}
                  size="icon"
                  className={`h-10 w-full ${currentShape === "square" ? "bg-[#8C4A3C]" : "border-[#D9C7B8]"}`}
                  onClick={() => setCurrentShape("square")}
                >
                  <Square className="h-4 w-4" />
                </Button>
                <Button
                  variant={currentShape === "circle" ? "default" : "outline"}
                  size="icon"
                  className={`h-10 w-full ${currentShape === "circle" ? "bg-[#8C4A3C]" : "border-[#D9C7B8]"}`}
                  onClick={() => setCurrentShape("circle")}
                >
                  <Circle className="h-4 w-4" />
                </Button>
                <Button
                  variant={currentShape === "triangle" ? "default" : "outline"}
                  size="icon"
                  className={`h-10 w-full ${currentShape === "triangle" ? "bg-[#8C4A3C]" : "border-[#D9C7B8]"}`}
                  onClick={() => setCurrentShape("triangle")}
                >
                  <Triangle className="h-4 w-4" />
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
              <TabsList className="bg-[#F0E6D9] w-full grid grid-cols-3">
                <TabsTrigger
                  value="patterns"
                  className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
                >
                  传统纹样
                </TabsTrigger>
                <TabsTrigger value="modern" className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white">
                  现代元素
                </TabsTrigger>
                <TabsTrigger value="ai" className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white">
                  AI推荐
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
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={handleDeleteElement}>
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
                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={handleDeleteElement}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-2">
                <div className="text-xs text-gray-500 mb-1">透明度</div>
                <Slider value={[selectedElement.opacity]} max={100} step={1} onValueChange={handleOpacityChange} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
