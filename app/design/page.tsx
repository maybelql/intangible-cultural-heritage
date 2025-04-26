"use client"

import Link from "next/link"
import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { DesignCanvas } from "@/components/design-canvas"
import { Search, Palette, Download, ShoppingBag, Wallet, Shirt } from "lucide-react"
import { generatePreview } from '@/lib/coze-api'

export default function DesignPage() {
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<"wallet" | "shirt">("wallet")
  const [selectedColor, setSelectedColor] = useState("#FFFFFF")
  const canvasRef = useRef<{
    exportCanvasToBase64: () => string | null;
    updatePreview: (productType?: "wallet" | "shirt", color?: string) => Promise<string | null>;
  }>(null)

  // 生成预览图片
  const handleGeneratePreview = async () => {
    if (!canvasRef.current) {
      console.error('无法获取画布引用')
      return
    }
    
    setIsGenerating(true)
    try {
      // 直接使用画布组件中的updatePreview方法
      const imageUrl = await canvasRef.current.updatePreview(
        selectedProduct,
        selectedColor
      )
      
      if (imageUrl) {
        setPreviewImage(imageUrl)
      }
    } catch (error) {
      console.error('生成预览失败:', error)
      alert('生成预览图片失败，请重试')
    } finally {
      setIsGenerating(false)
    }
  }

  // 标签页切换处理
  const handleTabChange = (value: string) => {
    if (value === "preview") {
      handleGeneratePreview()
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FFFBF5]">
      <Navigation />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-[#8C4A3C] mb-8">非遗设计城</h1>

          <Tabs defaultValue="canvas" onValueChange={handleTabChange}>
            <TabsList className="bg-[#F0E6D9] mb-4">
              <TabsTrigger
                value="canvas"
                className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
              >
                画布
              </TabsTrigger>
            </TabsList>

            <TabsContent value="canvas">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-lg border border-[#D9C7B8] p-4 sticky top-20">
                    <h2 className="font-bold text-lg mb-4 flex items-center">
                      <Palette className="h-4 w-4 mr-2" />
                      技艺分类
                    </h2>

                    <div className="space-y-4">
                      {/* Search */}
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="搜索技艺、图案..."
                          className="w-full pl-10 pr-4 py-2 border border-[#D9C7B8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8C4A3C]"
                        />
                      </div>

                      {/* Categories */}
                      <div className="space-y-2">
                        {[
                          { name: "刺绣", subcategories: ["苏绣", "湘绣", "粤绣", "蜀绣"] },
                          { name: "陶瓷", subcategories: ["景德镇陶瓷", "建水紫陶", "宜兴紫砂"] },
                          { name: "木雕", subcategories: ["东阳木雕", "黄杨木雕", "福建木雕"] },
                          { name: "漆器", subcategories: ["福州脱胎漆器", "阳江漆器"] },
                          { name: "织锦", subcategories: ["南京云锦", "蜀锦", "宋锦"] },
                        ].map((category, index) => (
                          <div key={index} className="border-b border-[#D9C7B8] pb-2 last:border-0">
                            <div className="font-medium mb-1">{category.name}</div>
                            <div className="grid grid-cols-2 gap-1">
                              {category.subcategories.map((sub, subIndex) => (
                                <Link
                                  key={subIndex}
                                  href={`/design?category=${sub}`}
                                  className="text-sm text-gray-600 hover:text-[#8C4A3C] transition-colors"
                                >
                                  {sub}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Popular Tags */}
                      <div>
                        <h3 className="font-medium text-sm mb-2">热门标签</h3>
                        <div className="flex flex-wrap gap-2">
                          {["青花瓷", "牡丹", "龙纹", "传统纹样", "现代风格", "动物"].map((tag, index) => (
                            <Link
                              key={index}
                              href={`/design?tag=${tag}`}
                              className="text-xs px-3 py-1 bg-[#F0E6D9] hover:bg-[#E6CCB2] text-[#8C4A3C] rounded-full transition-colors"
                            >
                              {tag}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-2">
                  <DesignCanvas ref={canvasRef} />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="bg-[#8C4A3C] text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">关于寻遗</h3>
              <p className="text-sm opacity-80">
                寻遗是一个致力于中国非物质文化遗产保护与传承的数字平台，连接传统与现代，促进非遗文化的可持续发展。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">快速链接</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <Link href="/stories">非遗故事</Link>
                </li>
                <li>
                  <Link href="/inheritance">非遗传承</Link>
                </li>
                <li>
                  <Link href="/design">设计城</Link>
                </li>
                <li>
                  <Link href="/profile">个人中心</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">联系我们</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li>邮箱: contact@xunyi.com</li>
                <li>电话: 18670905213</li>
                <li>地址: xxxxxxxx</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">关注我们</h3>
              <div className="flex space-x-4">
                {/* Social media icons would go here */}
                <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                <div className="w-8 h-8 bg-white/20 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm opacity-70">
            <p>© {new Date().getFullYear()} 寻遗 - 非物质文化遗产数字平台. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
