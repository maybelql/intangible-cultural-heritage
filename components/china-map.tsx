"use client"

import { useState } from "react"
import Link from "next/link"

interface ChinaMapProps {
  selectedProvince?: string | null;
  onSelectProvince?: (province: string) => void;
}

export function ChinaMap({ selectedProvince: externalSelectedProvince, onSelectProvince }: ChinaMapProps) {
  const [internalSelectedProvince, setInternalSelectedProvince] = useState<string | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null)

  // 使用外部状态或内部状态
  const selectedProvince = externalSelectedProvince !== undefined ? externalSelectedProvince : internalSelectedProvince;
  const setSelectedProvince = onSelectProvince 
    ? (province: string) => onSelectProvince(province) 
    : setInternalSelectedProvince;

  // Mock data for heritage items
  const heritageItems = {
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
    福建: [
      { id: 8, name: "福州脱胎漆器", category: "传统技艺" },
      { id: 9, name: "闽剧", category: "传统戏剧" },
      { id: 10, name: "南音", category: "传统音乐" },
    ],
    广东: [
      { id: 11, name: "粤绣", category: "传统技艺" },
      { id: 12, name: "粤剧", category: "传统戏剧" },
      { id: 13, name: "广东音乐", category: "传统音乐" },
    ],
  }

  const handleProvinceClick = (province: string) => {
    setSelectedProvince(province)
    
    // 仅当使用内部状态时才显示详情弹窗
    if (!onSelectProvince) {
      setShowDetails(true)
    }
  }

  return (
    <>
      <div className="relative w-full h-[400px] bg-[#F0E6D9] rounded-lg overflow-hidden">
        <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm p-3 rounded-lg text-sm shadow-lg">
          <p>点击地图上的印章图标，探索各地非遗</p>
        </div>
      </div>

      {/* 详情弹窗 - 仅在使用内部状态且需要显示弹窗时显示 */}
      {!onSelectProvince && showDetails && selectedProvince && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[90%] max-w-md max-h-[80vh] overflow-hidden shadow-xl">
            <div className="p-4 border-b bg-[#F9F5F1]">
              <h2 className="text-center text-xl font-bold text-[#8C4A3C]">
                {selectedProvince} 非遗名录
              </h2>
            </div>
            <div className="overflow-y-auto max-h-[calc(80vh-100px)] p-4">
              {selectedProvince &&
                heritageItems[selectedProvince as keyof typeof heritageItems]?.map((item) => (
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

