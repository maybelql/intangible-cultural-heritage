import Link from "next/link"
import Image from "next/image"
import { Search, Filter, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"

export default function StoriesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FFFBF5]">
      <Navigation />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-[#8C4A3C] mb-8">非遗故事</h1>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar Filters */}
            <div className="w-full md:w-64 shrink-0">
              <div className="bg-white rounded-lg border border-[#D9C7B8] p-4 sticky top-20">
                <h2 className="font-bold text-lg mb-4 flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  筛选条件
                </h2>

                <div className="space-y-6">
                  {/* Region Filter */}
                  <div>
                    <h3 className="font-medium text-sm mb-2">地区</h3>
                    <div className="space-y-2">
                      {["华北", "华东", "华南", "西南", "西北"].map((region) => (
                        <div key={region} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`region-${region}`}
                            className="h-4 w-4 rounded border-gray-300 text-[#8C4A3C] focus:ring-[#8C4A3C]"
                          />
                          <label htmlFor={`region-${region}`} className="ml-2 text-sm">
                            {region}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div>
                    <h3 className="font-medium text-sm mb-2">类别</h3>
                    <div className="space-y-2">
                      {["传统技艺", "传统美术", "传统音乐", "传统戏剧", "传统舞蹈"].map((category) => (
                        <div key={category} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`category-${category}`}
                            className="h-4 w-4 rounded border-gray-300 text-[#8C4A3C] focus:ring-[#8C4A3C]"
                          />
                          <label htmlFor={`category-${category}`} className="ml-2 text-sm">
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Time Period Filter */}
                  <div>
                    <h3 className="font-medium text-sm mb-2">年代</h3>
                    <div className="space-y-2">
                      {["唐代以前", "宋元时期", "明清时期", "近现代"].map((period) => (
                        <div key={period} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`period-${period}`}
                            className="h-4 w-4 rounded border-gray-300 text-[#8C4A3C] focus:ring-[#8C4A3C]"
                          />
                          <label htmlFor={`period-${period}`} className="ml-2 text-sm">
                            {period}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-[#8C4A3C] hover:bg-[#6D3A2F]">应用筛选</Button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="搜索非遗故事、传承人..."
                  className="pl-10 border-[#D9C7B8] focus-visible:ring-[#8C4A3C]"
                />
              </div>

              {/* Tabs */}
              <Tabs defaultValue="all" className="mb-6">
                <TabsList className="bg-[#F0E6D9]">
                  <TabsTrigger value="all" className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white">
                    全部
                  </TabsTrigger>
                  <TabsTrigger
                    value="popular"
                    className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
                  >
                    热门
                  </TabsTrigger>
                  <TabsTrigger
                    value="latest"
                    className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
                  >
                    最新
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Stories Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(9)].map((_, index) => (
                  <Link href={`/stories/${index + 1}`} key={index}>
                    <Card className="overflow-hidden border-[#D9C7B8] hover:shadow-md transition-shadow">
                      <div className="relative h-48">
                        <Image
                          src={[
                            "/photo/刺绣/苏绣花鸟纹1.jpg",
                            "/photo/木雕/东阳木雕花窗1.jpg",
                            "/photo/陶瓷纹样/陶瓷纹样-青花缠枝莲1.jpg",
                            "/photo/刺绣/粤绣牡丹1.jpg",
                            "/photo/木雕/龙眼木雕1.jpg",
                            "/photo/木雕/黄杨木雕人物1.jpg",
                            "/photo/刺绣/刺绣-如意纹1.jpg",
                            "/photo/陶瓷纹样/陶瓷纹样-青花缠枝莲1.jpg",
                            "/photo/木雕/东阳木雕花窗1.jpg",
                          ][index]}
                          alt={`非遗故事${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <div className="flex items-center text-white text-xs">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{["江苏", "浙江", "四川", "云南", "北京"][index % 5]}</span>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg mb-2 line-clamp-1">
                          {["景德镇青花瓷", "苏州刺绣", "川剧变脸", "云南扎染", "北京景泰蓝"][index % 5]}的传承故事
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          探索{["景德镇青花瓷", "苏州刺绣", "川剧变脸", "云南扎染", "北京景泰蓝"][index % 5]}
                          背后的匠人精神与文化底蕴，感受非物质文化遗产的独特魅力...
                        </p>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-xs px-2 py-1 bg-[#8C4A3C]/10 text-[#8C4A3C] rounded-full">
                            {["传统技艺", "传统美术", "传统戏剧", "传统技艺", "传统美术"][index % 5]}
                          </span>
                          <span className="text-xs text-gray-500">阅读量 {1000 + index * 123}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" className="border-[#D9C7B8]">
                    <span className="sr-only">上一页</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
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
                  <Button variant="outline" className="border-[#D9C7B8]">
                    ...
                  </Button>
                  <Button variant="outline" className="border-[#D9C7B8]">
                    8
                  </Button>
                  <Button variant="outline" size="icon" className="border-[#D9C7B8]">
                    <span className="sr-only">下一页</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </Button>
                </div>
              </div>
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
