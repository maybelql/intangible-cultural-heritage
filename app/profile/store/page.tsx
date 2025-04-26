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
  Plus,
  ChevronLeft,
  ChevronRight,
  BarChart2,
  ShoppingBag,
  Package,
  Users,
  Settings,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Edit,
  Eye,
} from "lucide-react"

export default function StorePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FFFBF5]">
      <Navigation />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <ProfileSidebar activePage="store" />

            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white rounded-lg border border-[#D9C7B8] p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-[#8C4A3C]">店铺管理</h1>
                  <Button className="bg-[#8C4A3C] hover:bg-[#6D3A2F]">
                    <Settings className="h-4 w-4 mr-2" />
                    店铺设置
                  </Button>
                </div>

                {/* Store Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <Card className="border-[#D9C7B8]">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">今日销售额</p>
                          <h3 className="text-2xl font-bold">¥1,286</h3>
                          <div className="flex items-center text-xs mt-1 text-green-600">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            <span>+12.5% 较昨日</span>
                          </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#F0E6D9] flex items-center justify-center">
                          <BarChart2 className="h-5 w-5 text-[#8C4A3C]" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-[#D9C7B8]">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">今日订单数</p>
                          <h3 className="text-2xl font-bold">16</h3>
                          <div className="flex items-center text-xs mt-1 text-green-600">
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                            <span>+8.3% 较昨日</span>
                          </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#F0E6D9] flex items-center justify-center">
                          <ShoppingBag className="h-5 w-5 text-[#8C4A3C]" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-[#D9C7B8]">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">商品总数</p>
                          <h3 className="text-2xl font-bold">24</h3>
                          <div className="flex items-center text-xs mt-1 text-orange-600">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            <span>3个库存不足</span>
                          </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#F0E6D9] flex items-center justify-center">
                          <Package className="h-5 w-5 text-[#8C4A3C]" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-[#D9C7B8]">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">店铺访客</p>
                          <h3 className="text-2xl font-bold">128</h3>
                          <div className="flex items-center text-xs mt-1 text-red-600">
                            <ArrowDownRight className="h-3 w-3 mr-1" />
                            <span>-5.2% 较昨日</span>
                          </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#F0E6D9] flex items-center justify-center">
                          <Users className="h-5 w-5 text-[#8C4A3C]" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Store Tabs */}
                <Tabs defaultValue="products">
                  <TabsList className="bg-[#F0E6D9] mb-6">
                    <TabsTrigger
                      value="products"
                      className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
                    >
                      商品管理
                    </TabsTrigger>
                    <TabsTrigger
                      value="orders"
                      className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
                    >
                      订单管理
                    </TabsTrigger>
                    <TabsTrigger
                      value="analytics"
                      className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
                    >
                      数据分析
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="products">
                    {/* Products Header */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="搜索商品名称、编号..."
                          className="pl-10 border-[#D9C7B8] focus-visible:ring-[#8C4A3C]"
                        />
                      </div>
                      <Button className="bg-[#8C4A3C] hover:bg-[#6D3A2F]">
                        <Plus className="h-4 w-4 mr-2" />
                        添加商品
                      </Button>
                    </div>

                    {/* Products List */}
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-[#D9C7B8]">
                            <th className="text-left py-3 px-4 font-medium text-sm">商品信息</th>
                            <th className="text-center py-3 px-4 font-medium text-sm">价格</th>
                            <th className="text-center py-3 px-4 font-medium text-sm">库存</th>
                            <th className="text-center py-3 px-4 font-medium text-sm">销量</th>
                            <th className="text-center py-3 px-4 font-medium text-sm">状态</th>
                            <th className="text-right py-3 px-4 font-medium text-sm">操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[...Array(5)].map((_, index) => (
                            <tr key={index} className="border-b border-[#D9C7B8]">
                              <td className="py-4 px-4">
                                <div className="flex items-center">
                                  <div className="relative w-12 h-12 mr-3 flex-shrink-0">
                                    <Image
                                      src={`/placeholder.svg?height=48&width=48&text=${index + 1}`}
                                      alt={`商品${index + 1}`}
                                      fill
                                      className="rounded-md object-cover"
                                    />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-sm">
                                      {
                                        [
                                          "青花瓷图案T恤",
                                          "苏绣风格手机壳",
                                          "传统纹样笔记本",
                                          "景德镇陶瓷杯",
                                          "传统纹样丝巾",
                                        ][index]
                                      }
                                    </h4>
                                    <p className="text-xs text-gray-500">商品编号: P00{index + 1}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4 text-center">¥{99 + index * 30}</td>
                              <td className="py-4 px-4 text-center">
                                <span className={index === 2 ? "text-red-500" : ""}>
                                  {index === 2 ? 5 : 50 + index * 10}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-center">{120 + index * 50}</td>
                              <td className="py-4 px-4 text-center">
                                <span
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    index === 4 ? "bg-gray-100 text-gray-800" : "bg-green-100 text-green-800"
                                  }`}
                                >
                                  {index === 4 ? "已下架" : "销售中"}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only">编辑</span>
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Eye className="h-4 w-4" />
                                    <span className="sr-only">查看</span>
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-6">
                      <p className="text-sm text-gray-500">显示 1-5 条，共 24 条</p>
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

                  <TabsContent value="orders">
                    {/* Orders content would go here */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="搜索订单号、客户名称..."
                          className="pl-10 border-[#D9C7B8] focus-visible:ring-[#8C4A3C]"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" className="border-[#D9C7B8]">
                          今日订单
                        </Button>
                        <Button variant="outline" className="border-[#D9C7B8]">
                          筛选
                        </Button>
                      </div>
                    </div>

                    {/* Orders List */}
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-[#D9C7B8]">
                            <th className="text-left py-3 px-4 font-medium text-sm">订单号</th>
                            <th className="text-left py-3 px-4 font-medium text-sm">客户</th>
                            <th className="text-center py-3 px-4 font-medium text-sm">商品数量</th>
                            <th className="text-center py-3 px-4 font-medium text-sm">订单金额</th>
                            <th className="text-center py-3 px-4 font-medium text-sm">订单状态</th>
                            <th className="text-center py-3 px-4 font-medium text-sm">下单时间</th>
                            <th className="text-right py-3 px-4 font-medium text-sm">操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[...Array(5)].map((_, index) => (
                            <tr key={index} className="border-b border-[#D9C7B8]">
                              <td className="py-4 px-4 text-sm">2023050{index + 1}9876</td>
                              <td className="py-4 px-4 text-sm">用户{index + 1}</td>
                              <td className="py-4 px-4 text-center">{index + 1}</td>
                              <td className="py-4 px-4 text-center">¥{99 + index * 50}</td>
                              <td className="py-4 px-4 text-center">
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
                              </td>
                              <td className="py-4 px-4 text-center text-sm">2023-05-{10 + index}</td>
                              <td className="py-4 px-4 text-right">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-7 text-xs border-[#8C4A3C] text-[#8C4A3C]"
                                >
                                  查看详情
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-6">
                      <p className="text-sm text-gray-500">显示 1-5 条，共 16 条</p>
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

                  <TabsContent value="analytics">
                    {/* Analytics content would go here */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card className="border-[#D9C7B8]">
                        <CardContent className="p-4">
                          <h3 className="font-medium mb-4">销售趋势（近7天）</h3>
                          <div className="h-64 bg-[#F9F5F1] rounded-lg flex items-center justify-center">
                            <p className="text-gray-500">销售趋势图表将在这里显示</p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-[#D9C7B8]">
                        <CardContent className="p-4">
                          <h3 className="font-medium mb-4">热销商品排行</h3>
                          <div className="space-y-4">
                            {[...Array(5)].map((_, index) => (
                              <div key={index} className="flex items-center">
                                <div className="w-6 h-6 rounded-full bg-[#8C4A3C] text-white flex items-center justify-center text-xs mr-3">
                                  {index + 1}
                                </div>
                                <div className="relative w-10 h-10 mr-3">
                                  <Image
                                    src={`/placeholder.svg?height=40&width=40&text=${index + 1}`}
                                    alt={`商品${index + 1}`}
                                    fill
                                    className="rounded-md object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-sm font-medium">
                                    {
                                      [
                                        "青花瓷图案T恤",
                                        "苏绣风格手机壳",
                                        "传统纹样笔记本",
                                        "景德镇陶瓷杯",
                                        "传统纹样丝巾",
                                      ][index]
                                    }
                                  </h4>
                                  <p className="text-xs text-gray-500">销量: {320 - index * 50}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">¥{99 + index * 30}</p>
                                  <p className="text-xs text-green-600">+{20 - index * 2}%</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-[#D9C7B8]">
                        <CardContent className="p-4">
                          <h3 className="font-medium mb-4">访客来源</h3>
                          <div className="h-64 bg-[#F9F5F1] rounded-lg flex items-center justify-center">
                            <p className="text-gray-500">访客来源图表将在这里显示</p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-[#D9C7B8]">
                        <CardContent className="p-4">
                          <h3 className="font-medium mb-4">库存预警</h3>
                          <div className="space-y-3">
                            {[...Array(3)].map((_, index) => (
                              <div key={index} className="flex items-center p-3 bg-[#F9F5F1] rounded-lg">
                                <div className="relative w-10 h-10 mr-3">
                                  <Image
                                    src={`/placeholder.svg?height=40&width=40&text=${index + 1}`}
                                    alt={`商品${index + 1}`}
                                    fill
                                    className="rounded-md object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-sm font-medium">
                                    {["传统纹样笔记本", "景德镇陶瓷杯", "青花瓷图案T恤 (M码)"][index]}
                                  </h4>
                                  <div className="flex items-center">
                                    <span className="text-xs text-red-600 mr-2">库存不足</span>
                                    <span className="text-xs text-gray-500">剩余: {5 - index}</span>
                                  </div>
                                </div>
                                <Button size="sm" className="h-7 text-xs bg-[#8C4A3C] hover:bg-[#6D3A2F]">
                                  补货
                                </Button>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
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
