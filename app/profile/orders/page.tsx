import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { ProfileSidebar } from "@/components/profile-sidebar"
import { Input } from "@/components/ui/input"
import { Package, Search, Clock, ChevronLeft, ChevronRight } from "lucide-react"

export default function OrdersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FFFBF5]">
      <Navigation />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <ProfileSidebar activePage="orders" />

            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white rounded-lg border border-[#D9C7B8] p-6 mb-8">
                <h1 className="text-2xl font-bold mb-6 text-[#8C4A3C]">订单管理</h1>

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="搜索订单号、商品名称..."
                      className="pl-10 border-[#D9C7B8] focus-visible:ring-[#8C4A3C]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="border-[#D9C7B8]">
                      最近30天
                    </Button>
                    <Button variant="outline" className="border-[#D9C7B8]">
                      筛选
                    </Button>
                  </div>
                </div>

                {/* Order Tabs */}
                <Tabs defaultValue="all">
                  <TabsList className="bg-[#F0E6D9] mb-6">
                    <TabsTrigger
                      value="all"
                      className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
                    >
                      全部订单
                    </TabsTrigger>
                    <TabsTrigger
                      value="pending"
                      className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
                    >
                      待付款
                    </TabsTrigger>
                    <TabsTrigger
                      value="processing"
                      className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
                    >
                      待发货
                    </TabsTrigger>
                    <TabsTrigger
                      value="shipped"
                      className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
                    >
                      待收货
                    </TabsTrigger>
                    <TabsTrigger
                      value="completed"
                      className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
                    >
                      已完成
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-6">
                    {/* Order Cards */}
                    {[...Array(5)].map((_, index) => (
                      <Card key={index} className="overflow-hidden border-[#D9C7B8]">
                        <CardContent className="p-0">
                          {/* Order Header */}
                          <div className="flex items-center justify-between p-4 border-b border-[#D9C7B8]">
                            <div className="flex items-center">
                              <Package className="h-4 w-4 mr-2 text-[#8C4A3C]" />
                              <span className="text-sm font-medium">订单号: 2023050{index + 1}9876</span>
                            </div>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                index === 0
                                  ? "bg-yellow-100 text-yellow-800"
                                  : index === 1
                                    ? "bg-blue-100 text-blue-800"
                                    : index === 2
                                      ? "bg-purple-100 text-purple-800"
                                      : index === 3
                                        ? "bg-orange-100 text-orange-800"
                                        : "bg-green-100 text-green-800"
                              }`}
                            >
                              {["待付款", "待发货", "待收货", "待评价", "已完成"][index]}
                            </span>
                          </div>

                          {/* Order Items */}
                          <div className="p-4">
                            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                              <div className="relative w-20 h-20 flex-shrink-0">
                                <Image
                                  src={`/placeholder.svg?height=80&width=80&text=商品${index + 1}`}
                                  alt={`商品${index + 1}`}
                                  fill
                                  className="rounded-md object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium mb-1">
                                  {
                                    [
                                      "青花瓷图案T恤",
                                      "传统纹样笔记本",
                                      "苏绣风格手机壳",
                                      "景德镇陶瓷杯",
                                      "传统纹样丝巾",
                                    ][index]
                                  }
                                </h3>
                                <div className="text-xs text-gray-500 mb-2">
                                  规格：{["M码", "A5尺寸", "iPhone 13", "350ml", "90x90cm"][index]}
                                </div>
                                <div className="flex justify-between items-center">
                                  <div>
                                    <span className="font-medium text-[#8C4A3C]">¥{99 + index * 50}</span>
                                    <span className="text-xs text-gray-500 ml-2">x 1</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Order Total */}
                            <div className="flex justify-between items-center border-t border-[#D9C7B8] pt-4">
                              <div className="flex items-center text-xs text-gray-500">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>下单时间：2023-05-{10 + index}</span>
                              </div>
                              <div className="text-sm">
                                共1件商品 合计：
                                <span className="font-medium text-[#8C4A3C]">¥{99 + index * 50}</span>
                                <span className="text-xs text-gray-500 ml-1">(含运费¥10)</span>
                              </div>
                            </div>

                            {/* Order Actions */}
                            <div className="flex justify-end gap-2 mt-4">
                              {index === 0 && (
                                <>
                                  <Button variant="outline" size="sm" className="border-[#D9C7B8]">
                                    取消订单
                                  </Button>
                                  <Button size="sm" className="bg-[#8C4A3C] hover:bg-[#6D3A2F]">
                                    立即付款
                                  </Button>
                                </>
                              )}
                              {index === 1 && (
                                <Button variant="outline" size="sm" className="border-[#8C4A3C] text-[#8C4A3C]">
                                  提醒发货
                                </Button>
                              )}
                              {index === 2 && (
                                <>
                                  <Button variant="outline" size="sm" className="border-[#D9C7B8]">
                                    查看物流
                                  </Button>
                                  <Button size="sm" className="bg-[#8C4A3C] hover:bg-[#6D3A2F]">
                                    确认收货
                                  </Button>
                                </>
                              )}
                              {index === 3 && (
                                <>
                                  <Button variant="outline" size="sm" className="border-[#D9C7B8]">
                                    申请售后
                                  </Button>
                                  <Button size="sm" className="bg-[#8C4A3C] hover:bg-[#6D3A2F]">
                                    评价商品
                                  </Button>
                                </>
                              )}
                              {index === 4 && (
                                <>
                                  <Button variant="outline" size="sm" className="border-[#D9C7B8]">
                                    删除订单
                                  </Button>
                                  <Button size="sm" className="bg-[#8C4A3C] hover:bg-[#6D3A2F]">
                                    再次购买
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {/* Pagination */}
                    <div className="flex justify-center mt-8">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="icon" className="border-[#D9C7B8]">
                          <ChevronLeft className="h-4 w-4" />
                          <span className="sr-only">上一页</span>
                        </Button>
                        <Button variant="outline" className="border-[#D9C7B8] bg-[#8C4A3C] text-white">
                          1
                        </Button>
                        <Button variant="outline" className="border-[#D9C7B8]">
                          2
                        </Button>
                        <Button variant="outline" className="border-[#D9C7B8]">
                          3
                        </Button>
                        <Button variant="outline" size="icon" className="border-[#D9C7B8]">
                          <ChevronRight className="h-4 w-4" />
                          <span className="sr-only">下一页</span>
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="pending">
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="w-24 h-24 bg-[#F0E6D9] rounded-full flex items-center justify-center mb-4">
                        <Package className="h-10 w-10 text-[#8C4A3C]" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">暂无待付款订单</h3>
                      <p className="text-sm text-gray-500 mb-6">您可以浏览非遗设计城，选购心仪的商品</p>
                      <Button className="bg-[#8C4A3C] hover:bg-[#6D3A2F]">前往设计城</Button>
                    </div>
                  </TabsContent>

                  {/* Other tabs would have similar content */}
                  <TabsContent value="processing">
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="w-24 h-24 bg-[#F0E6D9] rounded-full flex items-center justify-center mb-4">
                        <Package className="h-10 w-10 text-[#8C4A3C]" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">暂无待发货订单</h3>
                      <p className="text-sm text-gray-500 mb-6">您可以浏览非遗设计城，选购心仪的商品</p>
                      <Button className="bg-[#8C4A3C] hover:bg-[#6D3A2F]">前往设计城</Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="shipped">
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="w-24 h-24 bg-[#F0E6D9] rounded-full flex items-center justify-center mb-4">
                        <Package className="h-10 w-10 text-[#8C4A3C]" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">暂无待收货订单</h3>
                      <p className="text-sm text-gray-500 mb-6">您可以浏览非遗设计城，选购心仪的商品</p>
                      <Button className="bg-[#8C4A3C] hover:bg-[#6D3A2F]">前往设计城</Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="completed">
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="w-24 h-24 bg-[#F0E6D9] rounded-full flex items-center justify-center mb-4">
                        <Package className="h-10 w-10 text-[#8C4A3C]" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">暂无已完成订单</h3>
                      <p className="text-sm text-gray-500 mb-6">您可以浏览非遗设计城，选购心仪的商品</p>
                      <Button className="bg-[#8C4A3C] hover:bg-[#6D3A2F]">前往设计城</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
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
<<<<<<< HEAD
                <li>电话: 18670905213</li>
                <li>地址: xxxxxxxx</li>
=======
                <li>电话: 400-123-4567</li>
                <li>地址: 北京市朝阳区文化产业园</li>
>>>>>>> 5e23736023ab9fd1ee829eb1f369c6c5a6c84615
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
