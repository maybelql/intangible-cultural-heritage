"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Clock, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InteractiveChinaMap } from "@/components/interactive-china-map"
import { HeritageCarousel } from "@/components/heritage-carousel"
import { Navigation } from "@/components/navigation"

// Define the heritage item interface
interface HeritageItem {
  id: number
  name: string
  category: string
}

// Define the heritage items data structure
const heritageItems: { [province: string]: HeritageItem[] } = {
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
  北京: [
    { id: 8, name: "景泰蓝", category: "传统技艺" },
    { id: 9, name: "京剧", category: "传统戏剧" },
  ],
  上海: [
    { id: 10, name: "海派剪纸", category: "传统美术" },
  ],
  广东: [
    { id: 11, name: "粤绣", category: "传统技艺" },
    { id: 12, name: "粤剧", category: "传统戏剧" },
  ],
  福建: [
    { id: 13, name: "福州脱胎漆器", category: "传统技艺" },
    { id: 14, name: "闽剧", category: "传统戏剧" },
  ],
};

export default function HomePage() {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Function to handle province click
  const handleProvinceClick = (province: string) => {
    setSelectedProvince(province);
    setShowDetails(true);
  };
  return (
    <div className="flex min-h-screen flex-col bg-[#FFFBF5]">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0">
            <Image
              src="/photo/刺绣/刺绣-如意纹1.jpg"
              alt="非遗文化背景"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div className="container relative mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-[#8C4A3C] sm:text-5xl md:text-6xl">
                <span className="block font-serif">寻遗</span>
                <span className="block text-2xl font-medium mt-2">非物质文化遗产数字平台</span>
              </h1>
              <p className="mt-6 text-lg text-gray-700">探索中国非物质文化遗产的魅力，传承千年工艺，连接古今智慧</p>
              <div className="mt-10 flex justify-center gap-4">
                <Button className="bg-[#8C4A3C] hover:bg-[#6D3A2F]">开始探索</Button>
                <Button variant="outline" className="border-[#8C4A3C] text-[#8C4A3C]">
                  了解更多
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Digital Map Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#8C4A3C]">非遗数字地图</h2>
            <div className="bg-[#F9F5F1] rounded-xl p-6 shadow-sm">
              <InteractiveChinaMap />
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                {Object.keys(heritageItems).map((provinceName) => {
                  const items = heritageItems[provinceName];
                  return (
                    <Card key={provinceName} className="overflow-hidden border-[#D9C7B8] bg-white/80 backdrop-blur-sm min-w-[140px]">
                      <CardContent className="p-4 flex flex-col">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center">
                            <MapPin className="h-4.5 w-4.5 text-[#8C4A3C] mr-2.5" />
                            <span className="font-medium text-base">{provinceName}</span>
                          </div>
                          <span className="text-sm text-gray-500 ml-3">{items.length}项</span>
                        </div>
                        <div className="mt-3 text-sm text-gray-600 w-full">
                          <button
                            onClick={() => handleProvinceClick(provinceName)}
                            className="flex items-center hover:text-[#8C4A3C] transition-colors w-full text-left"
                          >
                            查看详情 <ChevronRight className="h-3.5 w-3.5 ml-2" />
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Heritage Items Dialog */}
        {showDetails && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-[90%] max-w-md max-h-[80vh] overflow-hidden shadow-xl">
              <div className="p-4 border-b bg-[#F9F5F1]">
                <h2 className="text-center text-xl font-bold text-[#8C4A3C]">
                  {selectedProvince} 非遗名录
                </h2>
              </div>
              <div className="overflow-y-auto max-h-[calc(80vh-100px)] p-4">
                {selectedProvince &&
                  heritageItems[selectedProvince]?.map((item) => (
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

                {/* If no data for the province */}
                {selectedProvince && !heritageItems[selectedProvince] && (
                  <div className="text-center py-4 text-gray-500">
                    暂无{selectedProvince}的非遗数据
                  </div>
                )}
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

        {/* Popular Recommendations */}
        <section className="py-12 bg-[#F9F5F1]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#8C4A3C]">热门推荐</h2>

            <Tabs defaultValue="stories" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger
                  value="stories"
                  className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
                >
                  非遗故事
                </TabsTrigger>
                <TabsTrigger
                  value="designs"
                  className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
                >
                  热销设计
                </TabsTrigger>
              </TabsList>

              <TabsContent value="stories">
                <HeritageCarousel type="stories" />
              </TabsContent>

              <TabsContent value="designs">
                <HeritageCarousel type="designs" />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#8C4A3C]">非遗分类</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "传统技艺", icon: "/photo/木雕/东阳木雕花窗1.jpg", count: 156 },
                { name: "传统美术", icon: "/photo/刺绣/苏绣花鸟纹1.jpg", count: 89 },
                { name: "传统音乐", icon: "/photo/陶瓷纹样/陶瓷纹样-青花缠枝莲1.jpg", count: 64 },
                { name: "传统戏剧", icon: "/photo/木雕/龙眼木雕1.jpg", count: 42 },
              ].map((category) => (
                <Link
                  href={`/stories?category=${category.name}`}
                  key={category.name}
                  className="flex flex-col items-center p-6 rounded-lg bg-[#F9F5F1] hover:bg-[#F0E6D9] transition-colors"
                >
                  <div className="w-16 h-16 mb-4 rounded-full bg-white p-2 flex items-center justify-center">
                    <Image src={category.icon || "/placeholder.svg"} alt={category.name} width={40} height={40} />
                  </div>
                  <h3 className="font-medium text-lg">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count}项</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Activities */}
        <section className="py-12 bg-[#F9F5F1]">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-[#8C4A3C]">近期活动</h2>
              <Link href="/inheritance" className="text-[#8C4A3C] hover:underline flex items-center">
                查看全部 <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "苏州刺绣技艺展",
                  date: "2023-06-15",
                  location: "苏州博物馆",
                  image: "/photo/刺绣/粤绣牡丹1.jpg",
                },
                {
                  title: "景德镇陶瓷工艺直播",
                  date: "2023-06-20",
                  location: "线上活动",
                  image: "/photo/陶瓷纹样/陶瓷纹样-青花缠枝莲1.jpg",
                },
                {
                  title: "传统木雕培训课程",
                  date: "2023-06-25",
                  location: "北京工艺美术馆",
                  image: "/photo/木雕/黄杨木雕人物1.jpg",
                },
              ].map((activity, index) => (
                <Card key={index} className="overflow-hidden border-[#D9C7B8]">
                  <div className="relative h-40">
                    <Image
                      src={activity.image || "/placeholder.svg"}
                      alt={activity.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2">{activity.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{activity.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{activity.location}</span>
                    </div>
                    <Button variant="outline" className="w-full mt-4 border-[#8C4A3C] text-[#8C4A3C]">
                      预约报名
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
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
                <a href="#" className="text-white hover:text-[#F0E6D9] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-[#F0E6D9] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-[#F0E6D9] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
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
