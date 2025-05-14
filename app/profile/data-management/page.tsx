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
  Upload,
  Download,
  Edit,
  Trash2,
  Eye,
  Filter,
  Calendar,
  MapPin,
  BarChart2,
} from "lucide-react"

export default function DataManagementPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FFFBF5]">
      <Navigation />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <ProfileSidebar activePage="data-management" />

            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white rounded-lg border border-[#D9C7B8] p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-[#8C4A3C]">数据管理</h1>
                  <Button className="bg-[#8C4A3C] hover:bg-[#6D3A2F]">
                    <Plus className="h-4 w-4 mr-2" />
                    新建项目
                  </Button>
                </div>

                {/* Data Management Tabs */}
                <Tabs defaultValue="projects">
                  <TabsList className="bg-[#F0E6D9] mb-6">
                    <TabsTrigger
                      value="projects"
                      className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
                    >
                      非遗项目
                    </TabsTrigger>
                    <TabsTrigger
                      value="inheritors"
                      className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
                    >
                      传承人
                    </TabsTrigger>
                    <TabsTrigger
                      value="analytics"
                      className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
                    >
                      数据分析
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="projects">
                    {/* Projects Header */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="搜索项目名称、编号..."
                          className="pl-10 border-[#D9C7B8] focus-visible:ring-[#8C4A3C]"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" className="border-[#D9C7B8]">
                          <Filter className="h-4 w-4 mr-2" />
                          筛选
                        </Button>
                        <Button variant="outline" className="border-[#D9C7B8]">
                          <Upload className="h-4 w-4 mr-2" />
                          导入
                        </Button>
                        <Button variant="outline" className="border-[#D9C7B8]">
                          <Download className="h-4 w-4 mr-2" />
                          导出
                        </Button>
                      </div>
                    </div>

                    {/* Projects List */}
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-[#D9C7B8]">
                            <th className="text-left py-3 px-4 font-medium text-sm">项目信息</th>
                            <th className="text-center py-3 px-4 font-medium text-sm">类别</th>
                            <th className="text-center py-3 px-4 font-medium text-sm">地区</th>
                            <th className="text-center py-3 px-4 font-medium text-sm">传承人</th>
                            <th className="text-center py-3 px-4 font-medium text-sm">状态</th>
                            <th className="text-center py-3 px-4 font-medium text-sm">更新时间</th>
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
                                      alt={`项目${index + 1}`}
                                      fill
                                      className="rounded-md object-cover"
                                    />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-sm">
                                      {["景德镇青花瓷", "苏州刺绣", "川剧变脸", "云南扎染", "北京景泰蓝"][index]}
                                    </h4>
                                    <p className="text-xs text-gray-500">项目编号: ICH00{index + 1}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4 text-center text-sm">
                                {["传统技艺", "传统技艺", "传统戏剧", "传统技艺", "传统技艺"][index]}
                              </td>
                              <td className="py-4 px-4 text-center text-sm">
                                {["江西", "江苏", "四川", "云南", "北京"][index]}
                              </td>
                              <td className="py-4 px-4 text-center text-sm">
                                {["张明", "李芳", "王刚", "赵小红", "钱大勇"][index]}
                              </td>
                              <td className="py-4 px-4 text-center">
                                <span
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    index === 0
                                      ? "bg-green-100 text-green-800"
                                      : index === 1
                                        ? "bg-green-100 text-green-800"
                                        : index === 2
                                          ? "bg-yellow-100 text-yellow-800"
                                          : index === 3
                                            ? "bg-blue-100 text-blue-800"
                                            : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {["已审核", "已审核", "待审核", "审核中", "未提交"][index]}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-center text-sm">2023-05-{10 + index}</td>
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
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">删除</span>
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

                  <TabsContent value="inheritors">
                    {/* Inheritors Header */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="搜索传承人姓名、所属项目..."
                          className="pl-10 border-[#D9C7B8] focus-visible:ring-[#8C4A3C]"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" className="border-[#D9C7B8]">
                          <Filter className="h-4 w-4 mr-2" />
                          筛选
                        </Button>
                        <Button variant="outline" className="border-[#D9C7B8]">
                          <Upload className="h-4 w-4 mr-2" />
                          导入
                        </Button>
                        <Button variant="outline" className="border-[#D9C7B8]">
                          <Download className="h-4 w-4 mr-2" />
                          导出
                        </Button>
                      </div>
                    </div>

                    {/* Inheritors List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[...Array(6)].map((_, index) => (
                        <Card key={index} className="overflow-hidden border-[#D9C7B8]">
                          <div className="flex flex-col md:flex-row">
                            <div className="relative w-full md:w-1/3 aspect-square md:aspect-auto">
                              <Image
                                src={`/placeholder.svg?height=200&width=200&text=传承人${index + 1}`}
                                alt={`传承人${index + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <CardContent className="p-4 flex-1">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg">
                                  {["张明", "李芳", "王刚", "赵小红", "钱大勇", "孙艺"][index]}
                                </h3>
                                <div className="flex gap-2">
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs px-2 py-1 bg-[#8C4A3C]/10 text-[#8C4A3C] rounded-full">
                                  {["景德镇陶瓷", "苏州刺绣", "东阳木雕", "景德镇陶瓷", "苏州刺绣", "东阳木雕"][index]}
                                </span>
                                <span className="text-xs px-2 py-1 bg-[#8C4A3C]/10 text-[#8C4A3C] rounded-full">
                                  {
                                    [
                                      "国家级传承人",
                                      "国家级传承人",
                                      "省级传承人",
                                      "市级传承人",
                                      "市级传承人",
                                      "县级传承人",
                                    ][index]
                                  }
                                </span>
                              </div>
                              <div className="space-y-1 text-sm mb-3">
                                <div className="flex items-center">
                                  <Calendar className="h-3 w-3 mr-2 text-gray-500" />
                                  <span>出生年份：{1955 + index * 5}年</span>
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="h-3 w-3 mr-2 text-gray-500" />
                                  <span>
                                    所在地区：
                                    {
                                      ["江西景德镇", "江苏苏州", "浙江东阳", "江西景德镇", "江苏苏州", "浙江东阳"][
                                        index
                                      ]
                                    }
                                  </span>
                                </div>
                              </div>
                              <Button size="sm" className="h-7 bg-[#8C4A3C] hover:bg-[#6D3A2F]">
                                查看详情
                              </Button>
                            </CardContent>
                          </div>
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

                  <TabsContent value="analytics">
                    {/* Analytics content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card className="border-[#D9C7B8]">
                        <CardContent className="p-4">
                          <h3 className="font-medium mb-4">用户点击热力图</h3>
                          <div className="h-64 bg-[#F9F5F1] rounded-lg flex items-center justify-center">
                            <div className="flex flex-col items-center">
                              <BarChart2 className="h-10 w-10 text-[#8C4A3C] mb-2" />
                              <p className="text-gray-500">用户点击热力图将在这里显示</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-[#D9C7B8]">
                        <CardContent className="p-4">
                          <h3 className="font-medium mb-4">设计转化率漏斗图</h3>
                          <div className="h-64 bg-[#F9F5F1] rounded-lg flex items-center justify-center">
                            <div className="flex flex-col items-center">
                              <BarChart2 className="h-10 w-10 text-[#8C4A3C] mb-2" />
                              <p className="text-gray-500">设计转化率漏斗图将在这里显示</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-[#D9C7B8]">
                        <CardContent className="p-4">
                          <h3 className="font-medium mb-4">用户评论词云</h3>
                          <div className="h-64 bg-[#F9F5F1] rounded-lg flex items-center justify-center">
                            <div className="flex flex-col items-center">
                              <BarChart2 className="h-10 w-10 text-[#8C4A3C] mb-2" />
                              <p className="text-gray-500">用户评论词云将在这里显示</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-[#D9C7B8]">
                        <CardContent className="p-4">
                          <h3 className="font-medium mb-4">非遗项目地区分布</h3>
                          <div className="h-64 bg-[#F9F5F1] rounded-lg flex items-center justify-center">
                            <div className="flex flex-col items-center">
                              <BarChart2 className="h-10 w-10 text-[#8C4A3C] mb-2" />
                              <p className="text-gray-500">非遗项目地区分布图将在这里显示</p>
                            </div>
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
