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
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  FileUp,
  Calendar,
} from "lucide-react"

export default function ApplicationPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FFFBF5]">
      <Navigation />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <ProfileSidebar activePage="application" />

            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white rounded-lg border border-[#D9C7B8] p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-[#8C4A3C]">申报管理</h1>
                  <Button className="bg-[#8C4A3C] hover:bg-[#6D3A2F]">
                    <Plus className="h-4 w-4 mr-2" />
                    新建申报
                  </Button>
                </div>

                {/* Application Tabs */}
                <Tabs defaultValue="all">
                  <TabsList className="bg-[#F0E6D9] mb-6">
                    <TabsTrigger
                      value="all"
                      className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
                    >
                      全部申报
                    </TabsTrigger>
                    <TabsTrigger
                      value="draft"
                      className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
                    >
                      草稿箱
                    </TabsTrigger>
                    <TabsTrigger
                      value="pending"
                      className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
                    >
                      审核中
                    </TabsTrigger>
                    <TabsTrigger
                      value="approved"
                      className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
                    >
                      已通过
                    </TabsTrigger>
                    <TabsTrigger
                      value="rejected"
                      className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
                    >
                      未通过
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="all">
                    {/* Search and Filter */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="搜索申报名称、编号..."
                          className="pl-10 border-[#D9C7B8] focus-visible:ring-[#8C4A3C]"
                        />
                      </div>
                      <Button variant="outline" className="border-[#D9C7B8]">
                        筛选
                      </Button>
                    </div>

                    {/* Applications List */}
                    <div className="space-y-4">
                      {[...Array(5)].map((_, index) => (
                        <Card key={index} className="overflow-hidden border-[#D9C7B8]">
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="relative w-full md:w-32 h-32 flex-shrink-0">
                                <Image
                                  src={`/placeholder.svg?height=128&width=128&text=申报${index + 1}`}
                                  alt={`申报${index + 1}`}
                                  fill
                                  className="rounded-md object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                                  <h3 className="font-bold text-lg">
                                    {
                                      [
                                        "景德镇青花瓷非遗项目申报",
                                        "苏州刺绣传承人认定申请",
                                        "川剧变脸技艺保护项目",
                                        "云南扎染工艺申报",
                                        "北京景泰蓝保护计划",
                                      ][index]
                                    }
                                  </h3>
                                  <span
                                    className={`text-xs px-2 py-1 rounded-full inline-flex items-center mt-1 sm:mt-0 ${
                                      index === 0
                                        ? "bg-gray-100 text-gray-800"
                                        : index === 1
                                          ? "bg-blue-100 text-blue-800"
                                          : index === 2
                                            ? "bg-yellow-100 text-yellow-800"
                                            : index === 3
                                              ? "bg-green-100 text-green-800"
                                              : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {index === 0 && <FileText className="h-3 w-3 mr-1" />}
                                    {index === 1 && <AlertCircle className="h-3 w-3 mr-1" />}
                                    {index === 2 && <Clock className="h-3 w-3 mr-1" />}
                                    {index === 3 && <CheckCircle className="h-3 w-3 mr-1" />}
                                    {index === 4 && <XCircle className="h-3 w-3 mr-1" />}
                                    {["草稿", "待提交", "审核中", "已通过", "未通过"][index]}
                                  </span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mb-3 text-sm">
                                  <div className="flex items-center">
                                    <FileText className="h-4 w-4 mr-2 text-gray-500" />
                                    <span>申报编号: APP-202305{index + 1}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                                    <span>申报日期: 2023-05-{10 + index}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                                    <span>更新时间: 2023-05-{15 + index}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <FileUp className="h-4 w-4 mr-2 text-gray-500" />
                                    <span>已上传材料: {5 + index} 份</span>
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  <Button variant="outline" size="sm" className="h-8 border-[#D9C7B8]">
                                    <Eye className="h-4 w-4 mr-2" />
                                    查看详情
                                  </Button>
                                  {index === 0 && (
                                    <Button size="sm" className="h-8 bg-[#8C4A3C] hover:bg-[#6D3A2F]">
                                      继续编辑
                                    </Button>
                                  )}
                                  {index === 1 && (
                                    <Button size="sm" className="h-8 bg-[#8C4A3C] hover:bg-[#6D3A2F]">
                                      提交申报
                                    </Button>
                                  )}
                                  {index === 2 && (
                                    <Button variant="outline" size="sm" className="h-8 border-[#D9C7B8]">
                                      查看进度
                                    </Button>
                                  )}
                                  {index === 4 && (
                                    <Button size="sm" className="h-8 bg-[#8C4A3C] hover:bg-[#6D3A2F]">
                                      重新申报
                                    </Button>
                                  )}
                                </div>
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
                        <Button variant="outline" size="icon" className="border-[#D9C7B8]">
                          <ChevronRight className="h-4 w-4" />
                          <span className="sr-only">下一页</span>
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Other tabs would have similar content */}
                  <TabsContent value="draft">
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="w-24 h-24 bg-[#F0E6D9] rounded-full flex items-center justify-center mb-4">
                        <FileText className="h-10 w-10 text-[#8C4A3C]" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">暂无草稿申报</h3>
                      <p className="text-sm text-gray-500 mb-6">您可以创建新的非遗项目或传承人申报</p>
                      <Button className="bg-[#8C4A3C] hover:bg-[#6D3A2F]">
                        <Plus className="h-4 w-4 mr-2" />
                        新建申报
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="pending">
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="w-24 h-24 bg-[#F0E6D9] rounded-full flex items-center justify-center mb-4">
                        <Clock className="h-10 w-10 text-[#8C4A3C]" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">暂无审核中申报</h3>
                      <p className="text-sm text-gray-500 mb-6">您可以创建新的非遗项目或传承人申报</p>
                      <Button className="bg-[#8C4A3C] hover:bg-[#6D3A2F]">
                        <Plus className="h-4 w-4 mr-2" />
                        新建申报
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="approved">
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="w-24 h-24 bg-[#F0E6D9] rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="h-10 w-10 text-[#8C4A3C]" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">暂无已通过申报</h3>
                      <p className="text-sm text-gray-500 mb-6">您可以创建新的非遗项目或传承人申报</p>
                      <Button className="bg-[#8C4A3C] hover:bg-[#6D3A2F]">
                        <Plus className="h-4 w-4 mr-2" />
                        新建申报
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="rejected">
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="w-24 h-24 bg-[#F0E6D9] rounded-full flex items-center justify-center mb-4">
                        <XCircle className="h-10 w-10 text-[#8C4A3C]" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">暂无未通过申报</h3>
                      <p className="text-sm text-gray-500 mb-6">您可以创建新的非遗项目或传承人申报</p>
                      <Button className="bg-[#8C4A3C] hover:bg-[#6D3A2F]">
                        <Plus className="h-4 w-4 mr-2" />
                        新建申报
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Application Guide */}
              <div className="bg-white rounded-lg border border-[#D9C7B8] p-6">
                <h2 className="text-xl font-bold mb-4 text-[#8C4A3C]">申报指南</h2>

                <div className="space-y-4">
                  <div className="bg-[#F9F5F1] rounded-lg p-4">
                    <h3 className="font-medium text-lg mb-2">非遗项目申报流程</h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      <li>准备申报材料，包括项目介绍、历史渊源、传承谱系等</li>
                      <li>填写申报表格，上传相关图片、视频等多媒体资料</li>
                      <li>提交申报，等待专家评审</li>
                      <li>根据评审意见进行修改完善（如需）</li>
                      <li>通过审核后，获得非遗项目认证</li>
                    </ol>
                  </div>

                  <div className="bg-[#F9F5F1] rounded-lg p-4">
                    <h3 className="font-medium text-lg mb-2">传承人认定申请流程</h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      <li>准备个人资料，包括个人简历、技艺特点、代表作品等</li>
                      <li>填写申请表格，上传作品照片、技艺展示视频等</li>
                      <li>提交申请，等待专家评审</li>
                      <li>参加现场技艺展示和面试（如需）</li>
                      <li>通过评审后，获得传承人认定证书</li>
                    </ol>
                  </div>

                  <div className="flex justify-between items-center bg-[#F9F5F1] rounded-lg p-4">
                    <div>
                      <h3 className="font-medium text-lg mb-1">需要帮助？</h3>
                      <p className="text-sm text-gray-600">如果您在申报过程中遇到任何问题，请联系我们的工作人员</p>
                    </div>
                    <Button className="bg-[#8C4A3C] hover:bg-[#6D3A2F]">联系客服</Button>
                  </div>
                </div>
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
