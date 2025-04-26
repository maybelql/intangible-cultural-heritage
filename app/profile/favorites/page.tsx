import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { ProfileSidebar } from "@/components/profile-sidebar"
import { Input } from "@/components/ui/input"
import { Search, Trash2, ChevronLeft, ChevronRight, ShoppingBag, Clock, MapPin } from "lucide-react"

export default function FavoritesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FFFBF5]">
      <Navigation />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <ProfileSidebar activePage="favorites" />

            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white rounded-lg border border-[#D9C7B8] p-6 mb-8">
                <h1 className="text-2xl font-bold mb-6 text-[#8C4A3C]">我的收藏</h1>

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="搜索收藏内容..."
                      className="pl-10 border-[#D9C7B8] focus-visible:ring-[#8C4A3C]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="border-[#D9C7B8]">
                      最近收藏
                    </Button>
                    <Button variant="outline" className="border-[#D9C7B8]">
                      筛选
                    </Button>
                  </div>
                </div>

                {/* Favorites Tabs */}
                <Tabs defaultValue="stories">
                  <TabsList className="bg-[#F0E6D9] mb-6">
                    <TabsTrigger
                      value="stories"
                      className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
                    >
                      非遗故事
                    </TabsTrigger>
                    <TabsTrigger
                      value="products"
                      className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
                    >
                      设计商品
                    </TabsTrigger>
                    <TabsTrigger
                      value="inheritors"
                      className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
                    >
                      传承人
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="stories">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[...Array(6)].map((_, index) => (
                        <Card key={index} className="overflow-hidden border-[#D9C7B8] group">
                          <div className="relative">
                            <div className="relative h-48">
                              <Image
                                src={`/placeholder.svg?height=200&width=300&text=非遗故事${index + 1}`}
                                alt={`非遗故事${index + 1}`}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                <div className="flex items-center text-white text-xs">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  <span>{["江苏", "浙江", "四川", "云南", "北京", "广东"][index % 6]}</span>
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">取消收藏</span>
                            </Button>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-bold text-lg mb-2 line-clamp-1">
                              {
                                [
                                  "景德镇青花瓷的千年传承",
                                  "苏州刺绣：针尖上的艺术",
                                  "川剧变脸的神秘面具",
                                  "云南扎染的色彩奥秘",
                                  "北京景泰蓝的精湛工艺",
                                  "广绣的细腻之美",
                                ][index % 6]
                              }
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                              探索
                              {["景德镇青花瓷", "苏州刺绣", "川剧变脸", "云南扎染", "北京景泰蓝", "广绣"][index % 6]}
                              背后的匠人精神与文化底蕴，感受非物质文化遗产的独特魅力...
                            </p>
                            <div className="flex justify-between items-center">
                              <span className="text-xs px-2 py-1 bg-[#8C4A3C]/10 text-[#8C4A3C] rounded-full">
                                {["传统技艺", "传统技艺", "传统戏剧", "传统技艺", "传统技艺", "传统技艺"][index % 6]}
                              </span>
                              <div className="flex items-center text-xs text-gray-500">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>收藏于 2023-05-{10 + index}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

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

                  <TabsContent value="products">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {[...Array(8)].map((_, index) => (
                        <Card key={index} className="overflow-hidden border-[#D9C7B8] group">
                          <div className="relative">
                            <div className="relative aspect-square">
                              <Image
                                src={`/placeholder.svg?height=200&width=200&text=商品${index + 1}`}
                                alt={`商品${index + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">取消收藏</span>
                            </Button>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-medium text-sm mb-2 line-clamp-2">
                              {
                                [
                                  "青花瓷图案T恤",
                                  "苏绣风格手机壳",
                                  "传统纹样笔记本",
                                  "景德镇陶瓷杯",
                                  "传统纹样丝巾",
                                  "木雕装饰摆件",
                                  "景泰蓝首饰盒",
                                  "传统纹样帆布包",
                                ][index % 8]
                              }
                            </h3>
                            <div className="flex justify-between items-center mb-3">
                              <span className="font-medium text-[#8C4A3C]">¥{99 + index * 30}</span>
                              <span className="text-xs text-gray-500">已售 {120 + index * 50}</span>
                            </div>
                            <Button className="w-full h-8 text-xs bg-[#8C4A3C] hover:bg-[#6D3A2F]">
                              <ShoppingBag className="h-3 w-3 mr-1" />
                              加入购物车
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

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
                        <Button variant="outline" size="icon" className="border-[#D9C7B8]">
                          <ChevronRight className="h-4 w-4" />
                          <span className="sr-only">下一页</span>
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="inheritors">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[...Array(4)].map((_, index) => (
                        <Card key={index} className="overflow-hidden border-[#D9C7B8] group">
                          <div className="flex flex-col md:flex-row">
                            <div className="relative w-full md:w-1/3 aspect-square md:aspect-auto">
                              <Image
                                src={`/placeholder.svg?height=200&width=200&text=传承人${index + 1}`}
                                alt={`传承人${index + 1}`}
                                fill
                                className="object-cover"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">取消收藏</span>
                              </Button>
                            </div>
                            <CardContent className="p-4 flex-1">
                              <h3 className="font-bold text-lg mb-2">{["张明", "李芳", "王刚", "赵小红"][index]}</h3>
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs px-2 py-1 bg-[#8C4A3C]/10 text-[#8C4A3C] rounded-full">
                                  {["景德镇陶瓷", "苏州刺绣", "东阳木雕", "景德镇陶瓷"][index]}
                                </span>
                                <span className="text-xs px-2 py-1 bg-[#8C4A3C]/10 text-[#8C4A3C] rounded-full">
                                  {["国家级传承人", "国家级传承人", "省级传承人", "市级传承人"][index]}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                {
                                  [
                                    "张明，男，1955年生，江西景德镇人。国家级非物质文化遗产景德镇陶瓷烧制技艺代表性传承人，从事陶瓷制作40余年...",
                                    "李芳，女，1960年生，江苏苏州人。苏州刺绣国家级传承人，15岁开始学习刺绣，擅长双面绣、乱针绣等多种针法...",
                                    "王刚，男，1965年生，浙江东阳人。浙江省非物质文化遗产东阳木雕代表性传承人，擅长浮雕、圆雕等多种技法...",
                                    "赵小红，女，1980年生，江西景德镇人。景德镇市非物质文化遗产传承人，张明的弟子，擅长青花瓷的创新设计...",
                                  ][index]
                                }
                              </p>
                              <div className="flex justify-between items-center">
                                <div className="flex items-center text-xs text-gray-500">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>收藏于 2023-04-{15 + index}</span>
                                </div>
                                <Button size="sm" className="h-7 bg-[#8C4A3C] hover:bg-[#6D3A2F]">
                                  查看详情
                                </Button>
                              </div>
                            </CardContent>
                          </div>
                        </Card>
                      ))}
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
