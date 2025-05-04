"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { Heart, Share, ShoppingCart, Minus, Plus, Star, Truck, Shield, Award } from "lucide-react"
import { getShopItemById, getRelatedShopItems } from "@/data/shop-items"

export default function ShopItemDetailPage({ params }: { params: { id: string } }) {
  // 获取商品详细信息
  const itemId = parseInt(params.id)
  const shopItem = getShopItemById(itemId)
  
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("默认")
  const [selectedColor, setSelectedColor] = useState("默认")

  // 如果找不到对应的商品，显示默认内容
  if (!shopItem) {
    return (
      <div className="flex min-h-screen flex-col bg-[#FFFBF5]">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#8C4A3C] mb-4">未找到该商品</h1>
            <p className="mb-6">抱歉，我们找不到ID为 {itemId} 的商品</p>
            <Link href="/shop">
              <Button className="bg-[#8C4A3C] hover:bg-[#6D3A2F]">返回非遗商城</Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  // 获取相关商品
  const relatedItems = getRelatedShopItems(shopItem.relatedItems)

  // 增加数量
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  // 减少数量
  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1))
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FFFBF5]">
      <Navigation />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* 面包屑导航 */}
          <div className="text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-[#8C4A3C]">首页</Link>
            <span className="mx-2">/</span>
            <Link href="/shop" className="hover:text-[#8C4A3C]">非遗商城</Link>
            <span className="mx-2">/</span>
            <Link href={`/shop?category=${shopItem.category}`} className="hover:text-[#8C4A3C]">{shopItem.category}</Link>
            <span className="mx-2">/</span>
            <span className="text-[#8C4A3C]">{shopItem.title}</span>
          </div>

          {/* 商品详情 */}
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            {/* 商品图片 */}
            <div className="w-full md:w-1/2">
              <div className="relative aspect-square mb-4 bg-white rounded-lg overflow-hidden border border-[#D9C7B8]">
                <Image
                  src={shopItem.image}
                  alt={shopItem.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="relative aspect-square bg-white rounded-lg overflow-hidden border border-[#D9C7B8]">
                    <Image
                      src={shopItem.image}
                      alt={`${shopItem.title} 图片 ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 25vw, 12vw"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* 商品信息 */}
            <div className="w-full md:w-1/2">
              <h1 className="text-2xl md:text-3xl font-bold text-[#8C4A3C] mb-2">{shopItem.title}</h1>
              <p className="text-gray-600 mb-4">{shopItem.description}</p>
              
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">4.9 (128 评价)</span>
              </div>
              
              <div className="text-2xl font-bold text-[#8C4A3C] mb-6">
                {shopItem.price}
                <span className="ml-2 text-sm text-gray-500 line-through">¥{parseInt(shopItem.price.substring(1)) * 1.2}</span>
              </div>
              
              {/* 规格选择 */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">规格</h3>
                <div className="flex flex-wrap gap-2">
                  {["默认", "小号", "中号", "大号"].map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      className={selectedSize === size ? "bg-[#8C4A3C]" : "border-[#D9C7B8]"}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* 颜色选择 */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">颜色</h3>
                <div className="flex flex-wrap gap-2">
                  {["默认", "红色", "蓝色", "绿色"].map((color) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? "default" : "outline"}
                      className={selectedColor === color ? "bg-[#8C4A3C]" : "border-[#D9C7B8]"}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* 数量选择 */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">数量</h3>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 border-[#D9C7B8]"
                    onClick={decreaseQuantity}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="mx-4 w-8 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 border-[#D9C7B8]"
                    onClick={increaseQuantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* 购买按钮 */}
              <div className="flex gap-4 mb-6">
                <Button className="flex-1 bg-[#8C4A3C] hover:bg-[#6D3A2F]">
                  立即购买
                </Button>
                <Button variant="outline" className="flex-1 border-[#8C4A3C] text-[#8C4A3C]">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  加入购物车
                </Button>
              </div>
              
              {/* 收藏和分享 */}
              <div className="flex gap-4 mb-6">
                <Button variant="ghost" className="text-gray-600">
                  <Heart className="h-4 w-4 mr-2" />
                  收藏
                </Button>
                <Button variant="ghost" className="text-gray-600">
                  <Share className="h-4 w-4 mr-2" />
                  分享
                </Button>
              </div>
              
              {/* 服务保障 */}
              <div className="bg-[#F9F5F1] p-4 rounded-lg">
                <h3 className="font-medium mb-2">服务保障</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center text-sm">
                    <Truck className="h-4 w-4 mr-1 text-[#8C4A3C]" />
                    <span>全国包邮</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Shield className="h-4 w-4 mr-1 text-[#8C4A3C]" />
                    <span>正品保障</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Award className="h-4 w-4 mr-1 text-[#8C4A3C]" />
                    <span>非遗认证</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 商品详情标签页 */}
          <div className="mb-12">
            <Tabs defaultValue="detail">
              <TabsList className="bg-[#F0E6D9] w-full grid grid-cols-3">
                <TabsTrigger
                  value="detail"
                  className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
                >
                  商品详情
                </TabsTrigger>
                <TabsTrigger
                  value="specs"
                  className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
                >
                  规格参数
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
                >
                  用户评价
                </TabsTrigger>
              </TabsList>

              <TabsContent value="detail" className="bg-white rounded-lg border border-[#D9C7B8] p-6 mt-4">
                <h3 className="text-xl font-bold mb-4 text-[#8C4A3C]">商品详情</h3>
                <div className="space-y-4">
                  <p>
                    {shopItem.title}是由非遗传承人{shopItem.artisan}精心制作的{shopItem.category}作品，
                    采用传统工艺与现代设计相结合的方式，展现了中国传统文化的独特魅力。
                  </p>
                  <p>
                    {shopItem.description}这件作品不仅具有实用价值，更是一件艺术品，
                    能够为您的生活增添一份传统文化的韵味。
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <div className="relative aspect-video">
                      <Image
                        src={shopItem.image}
                        alt={`${shopItem.title} 细节图1`}
                        fill
                        className="rounded-lg object-cover"
                      />
                    </div>
                    <div className="relative aspect-video">
                      <Image
                        src={shopItem.image}
                        alt={`${shopItem.title} 细节图2`}
                        fill
                        className="rounded-lg object-cover"
                      />
                    </div>
                  </div>
                  <p>
                    每一件{shopItem.title}都是独一无二的，因为它们都是手工制作的，
                    凝聚了非遗传承人多年的技艺和心血。购买这件商品，您不仅能够拥有一件精美的艺术品，
                    还能够为非物质文化遗产的传承和发展贡献一份力量。
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="specs" className="bg-white rounded-lg border border-[#D9C7B8] p-6 mt-4">
                <h3 className="text-xl font-bold mb-4 text-[#8C4A3C]">规格参数</h3>
                <div className="space-y-2">
                  <div className="flex border-b border-[#F0E6D9] py-2">
                    <span className="w-1/3 text-gray-600">商品名称</span>
                    <span className="w-2/3">{shopItem.title}</span>
                  </div>
                  <div className="flex border-b border-[#F0E6D9] py-2">
                    <span className="w-1/3 text-gray-600">商品分类</span>
                    <span className="w-2/3">{shopItem.category}</span>
                  </div>
                  <div className="flex border-b border-[#F0E6D9] py-2">
                    <span className="w-1/3 text-gray-600">制作工艺</span>
                    <span className="w-2/3">传统手工制作</span>
                  </div>
                  <div className="flex border-b border-[#F0E6D9] py-2">
                    <span className="w-1/3 text-gray-600">材质</span>
                    <span className="w-2/3">{shopItem.material || "优质天然材料"}</span>
                  </div>
                  <div className="flex border-b border-[#F0E6D9] py-2">
                    <span className="w-1/3 text-gray-600">尺寸</span>
                    <span className="w-2/3">{shopItem.size || "详见商品描述"}</span>
                  </div>
                  <div className="flex border-b border-[#F0E6D9] py-2">
                    <span className="w-1/3 text-gray-600">产地</span>
                    <span className="w-2/3">{shopItem.origin || "中国"}</span>
                  </div>
                  <div className="flex border-b border-[#F0E6D9] py-2">
                    <span className="w-1/3 text-gray-600">制作工艺人</span>
                    <span className="w-2/3">{shopItem.artisan || "非遗传承人"}</span>
                  </div>
                  <div className="flex border-b border-[#F0E6D9] py-2">
                    <span className="w-1/3 text-gray-600">保养方法</span>
                    <span className="w-2/3">避免阳光直射，保持干燥，定期清洁</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="bg-white rounded-lg border border-[#D9C7B8] p-6 mt-4">
                <h3 className="text-xl font-bold mb-4 text-[#8C4A3C]">用户评价</h3>
                <div className="space-y-4">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="border-b border-[#F0E6D9] pb-4 mb-4 last:border-0">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-[#F0E6D9] rounded-full mr-2"></div>
                          <span className="font-medium">用户{index + 1}</span>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {[
                          "收到货后非常惊喜，做工精细，图案精美，是一件很有艺术价值的作品。",
                          "质量很好，包装也很精美，送人很有面子，对方非常喜欢。",
                          "非常漂亮的手工艺品，能感受到传统文化的魅力，值得收藏。"
                        ][index]}
                      </p>
                      <div className="text-xs text-gray-500">2023-06-{15 + index}</div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* 相关商品 */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-[#8C4A3C]">相关商品</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedItems.map((item) => (
                <Link key={item.id} href={`/shop/${item.id}`}>
                  <Card className="overflow-hidden border-[#D9C7B8] hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-sm mb-1 line-clamp-1">{item.title}</h3>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-1">{item.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-[#8C4A3C] font-medium">{item.price}</span>
                        <span className="text-xs text-gray-600">{item.sales}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#8C4A3C] text-white py-8">
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
                <li>电话: 400-123-4567</li>
                <li>地址: 北京市朝阳区文化产业园</li>
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
