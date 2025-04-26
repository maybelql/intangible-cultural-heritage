import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { ProfileSidebar } from "@/components/profile-sidebar"
import { Input } from "@/components/ui/input"
import {
  Search,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Share,
  ShoppingBag,
  MoreHorizontal,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DesignsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FFFBF5]">
      <Navigation />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <ProfileSidebar activePage="designs" />

            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white rounded-lg border border-[#D9C7B8] p-6 mb-8">
                <h1 className="text-2xl font-bold mb-6 text-[#8C4A3C]">我的设计</h1>

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="搜索设计名称..."
                      className="pl-10 border-[#D9C7B8] focus-visible:ring-[#8C4A3C]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="border-[#D9C7B8]">
                      最近创建
                    </Button>
                    <Button variant="outline" className="border-[#D9C7B8]">
                      筛选
                    </Button>
                    <Button className="bg-[#8C4A3C] hover:bg-[#6D3A2F]">新建设计</Button>
                  </div>
                </div>

                {/* Designs Tabs */}
                <Tabs defaultValue="all">
                  <TabsList className="bg-[#F0E6D9] mb-6">
                    <TabsTrigger
                      value="all"
                      className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
                    >
                      全部设计
                    </TabsTrigger>
                    <TabsTrigger
                      value="published"
                      className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
                    >
                      已发布
                    </TabsTrigger>
                    <TabsTrigger
                      value="drafts"
                      className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
                    >
                      草稿箱
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="all">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {[...Array(8)].map((_, index) => (
                        <Card key={index} className="overflow-hidden border-[#D9C7B8] group">
                          <div className="relative aspect-square">
                            <Image
                              src={`/placeholder.svg?height=200&width=200&text=设计${index + 1}`}
                              alt={`设计${index + 1}`}
                              fill
                              className="object-cover"
                            />
                            <div
                              className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full ${
                                index % 2 === 0 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {index % 2 === 0 ? "已发布" : "草稿"}
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="font-medium text-sm line-clamp-1">
                                {
                                  [
                                    "青花瓷图案设计",
                                    "苏绣风格图案",
                                    "传统纹样组合",
                                    "景德镇陶瓷纹样",
                                    "传统纹样创新",
                                    "木雕图案设计",
                                    "景泰蓝风格设计",
                                    "传统纹样现代化",
                                  ][index % 8]
                                }
                              </h3>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">更多操作</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Pencil className="h-4 w-4 mr-2" />
                                    编辑设计
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Download className="h-4 w-4 mr-2" />
                                    下载设计
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Share className="h-4 w-4 mr-2" />
                                    分享设计
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    删除设计
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            <div className="flex items-center text-xs text-gray-500 mb-3">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>创建于 2023-04-{10 + index}</span>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="flex-1 h-7 text-xs border-[#D9C7B8]">
                                <Pencil className="h-3 w-3 mr-1" />
                                编辑
                              </Button>
                              <Button size="sm" className="flex-1 h-7 text-xs bg-[#8C4A3C] hover:bg-[#6D3A2F]">
                                <ShoppingBag className="h-3 w-3 mr-1" />
                                定制
                              </Button>
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
                        <Button variant="outline" size="icon" className="border-[#D9C7B8]">
                          <ChevronRight className="h-4 w-4" />
                          <span className="sr-only">下一页</span>
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="published">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {[...Array(4)].map((_, index) => (
                        <Card key={index} className="overflow-hidden border-[#D9C7B8] group">
                          <div className="relative aspect-square">
                            <Image
                              src={`/placeholder.svg?height=200&width=200&text=设计${index * 2}`}
                              alt={`设计${index * 2}`}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute top-2 right-2 text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                              已发布
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="font-medium text-sm line-clamp-1">
                                {["青花瓷图案设计", "传统纹样组合", "传统纹样创新", "景泰蓝风格设计"][index]}
                              </h3>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">更多操作</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Pencil className="h-4 w-4 mr-2" />
                                    编辑设计
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Download className="h-4 w-4 mr-2" />
                                    下载设计
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Share className="h-4 w-4 mr-2" />
                                    分享设计
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    删除设计
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            <div className="flex items-center text-xs text-gray-500 mb-3">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>创建于 2023-04-{10 + index * 2}</span>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="flex-1 h-7 text-xs border-[#D9C7B8]">
                                <Pencil className="h-3 w-3 mr-1" />
                                编辑
                              </Button>
                              <Button size="sm" className="flex-1 h-7 text-xs bg-[#8C4A3C] hover:bg-[#6D3A2F]">
                                <ShoppingBag className="h-3 w-3 mr-1" />
                                定制
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="drafts">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {[...Array(4)].map((_, index) => (
                        <Card key={index} className="overflow-hidden border-[#D9C7B8] group">
                          <div className="relative aspect-square">
                            <Image
                              src={`/placeholder.svg?height=200&width=200&text=设计${index * 2 + 1}`}
                              alt={`设计${index * 2 + 1}`}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute top-2 right-2 text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                              草稿
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="font-medium text-sm line-clamp-1">
                                {["苏绣风格图案", "景德镇陶瓷纹样", "木雕图案设计", "传统纹样现代化"][index]}
                              </h3>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">更多操作</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Pencil className="h-4 w-4 mr-2" />
                                    编辑设计
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Download className="h-4 w-4 mr-2" />
                                    下载设计
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Share className="h-4 w-4 mr-2" />
                                    分享设计
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    删除设计
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            <div className="flex items-center text-xs text-gray-500 mb-3">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>创建于 2023-04-{11 + index * 2}</span>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="flex-1 h-7 text-xs border-[#D9C7B8]">
                                <Pencil className="h-3 w-3 mr-1" />
                                编辑
                              </Button>
                              <Button size="sm" className="flex-1 h-7 text-xs bg-[#8C4A3C] hover:bg-[#6D3A2F]">
                                <ShoppingBag className="h-3 w-3 mr-1" />
                                发布
                              </Button>
                            </div>
                          </CardContent>
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
