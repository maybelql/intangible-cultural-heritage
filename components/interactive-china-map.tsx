"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"

interface HeritageItem {
  id: number
  name: string
  category: string
}

interface HeritageItems {
  [province: string]: HeritageItem[]
}

interface InteractiveChinaMapProps {
  onProvinceClick?: (province: string) => void;
}

export function InteractiveChinaMap({ onProvinceClick }: InteractiveChinaMapProps) {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  // Mock data for heritage items (same as in the original ChinaMap component)
  const heritageItems: HeritageItems = {
    江苏: [
      { id: 1, name: "南京云锦", category: "传统技艺" },
      { id: 2, name: "苏州刺绣", category: "传统技艺" },
      { id: 3, name: "昆曲", category: "传统戏剧" },
    ],
    浙江: [
      { id: 4, name: "西湖龙井茶艺", category: "传统技艺" },
      { id: 5, name: "杭州丝织技艺", category: "传统技艺" },
    ],
    四川: [
      { id: 6, name: "川剧变脸", category: "传统戏剧" },
      { id: 7, name: "蜀绣", category: "传统技艺" },
    ],
    北京: [
      { id: 8, name: "景泰蓝", category: "传统技艺" },
      { id: 9, name: "京剧", category: "传统戏剧" },
    ],
    上海: [
      { id: 10, name: "海派剪纸", category: "传统美术" },
    ],
    广东: [
      { id: 11, name: "粤绣", category: "传统技艺" },
      { id: 12, name: "粤剧", category: "传统戏剧" },
    ],
    福建: [
      { id: 13, name: "福州脱胎漆器", category: "传统技艺" },
      { id: 14, name: "闽剧", category: "传统戏剧" },
    ],
    // 可以添加更多省份的数据
  }

  // 使用 useCallback 包装 handleProvinceClick 函数，确保它只在依赖项变化时才重新创建
  const handleProvinceClick = useCallback((province: string) => {
    // 设置选中的省份
    setSelectedProvince(province)
    setShowDetails(true)

    // 如果该省份有非遗项目数据，并且父组件提供了点击处理函数，则调用它
    if (heritageItems[province] && onProvinceClick) {
      onProvinceClick(province)
    }
    // 如果该省份没有非遗项目数据，则只显示内部弹窗，不调用父组件的处理函数
  }, [heritageItems, onProvinceClick]);

  useEffect(() => {
    // 这里我们将加载您的HTML地图文件内容
    if (mapContainerRef.current) {
      // 创建iframe加载地图
      const iframe = document.createElement('iframe')
      iframe.src = '/china-map.html'
      iframe.style.width = '100%'
      iframe.style.height = '115%' // 增加高度以完整显示地图
      iframe.style.border = 'none'

      // 清空容器并添加iframe
      mapContainerRef.current.innerHTML = ''
      mapContainerRef.current.appendChild(iframe)

      // 添加iframe与父页面的通信
      const handleMessage = (event: MessageEvent) => {
        // 当地图发送包含省份名称的消息时
        if (event.data && event.data.province) {
          handleProvinceClick(event.data.province)
        }
      }

      // 添加消息事件监听器
      window.addEventListener('message', handleMessage)

      // 清理函数，组件卸载时移除事件监听器
      return () => {
        window.removeEventListener('message', handleMessage)
      }
    }
  }, [handleProvinceClick])



  return (
    <>
      <div className="relative w-full h-[700px] bg-[#F0E6D9] rounded-lg overflow-hidden">
        {/* 这个div将用于加载您的HTML地图 */}
        <div ref={mapContainerRef} className="w-full h-full"></div>

        <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm p-3 rounded-lg text-sm shadow-lg">
          <p>点击地图上的省份，探索各地非遗</p>
        </div>
      </div>

      {/* 详情弹窗 - 保持与原始组件相同 */}
      {showDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[90%] max-w-md max-h-[80vh] overflow-hidden shadow-xl">
            <div className="p-4 border-b bg-[#F9F5F1]">
              <h2 className="text-center text-xl font-bold text-[#8C4A3C]">
                {selectedProvince} 非遗名录
              </h2>
            </div>
            <div className="overflow-y-auto max-h-[calc(80vh-100px)] p-4">
              {selectedProvince &&
                heritageItems[selectedProvince]?.map((item) => (
                  <Link
                    href={`/stories/${item.id}`}
                    key={item.id}
                    className="block p-3 rounded-lg bg-[#F9F5F1] hover:bg-[#F0E6D9] transition-colors mb-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-xs px-2 py-1 bg-[#8C4A3C]/10 text-[#8C4A3C] rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </Link>
                ))}

              {/* 如果没有该省份的数据，显示提示信息 */}
              {selectedProvince && !heritageItems[selectedProvince] && (
                <div className="text-center py-4 text-gray-500">
                  暂无{selectedProvince}的非遗数据
                </div>
              )}
            </div>
            <div className="p-4 border-t bg-[#F9F5F1] flex justify-end">
              <button
                onClick={() => setShowDetails(false)}
                className="px-4 py-2 bg-[#8C4A3C] text-white rounded-lg hover:bg-[#6D3A2F] transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
