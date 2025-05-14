
"use client";

import { Suspense, lazy, useState } from 'react';
import Link from "next/link"
import Image from "next/image"
import { MapPin, Clock, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChinaMap } from "@/components/china-map"
import { Navigation } from "@/components/navigation"
import { HeritageCarousel } from "@/components/heritage-carousel"
import { Badge } from "@/components/ui/badge"
import {InteractiveChinaMap} from "@/components/interactive-china-map"


export default function HomePage() {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  
  // 省份数据
  const provinceData = {
    江苏: {
      count: 156,
      icon: "/icons/jiangsu-icon.svg",
      image: "/photo/刺绣/刺绣-如意纹1.jpg",
      description: "江苏是中国非物质文化遗产大省，拥有丰富多样的传统技艺、表演艺术和民俗活动。其中包括举世闻名的南京云锦、苏州刺绣和昆曲等国家级非遗项目。"
    },
    浙江: {
      count: 129,
      icon: "/icons/zhejiang-icon.svg",
      image: "/photo/木雕/东阳木雕花窗1.jpg",
      description: "浙江非遗资源丰富，涵盖了传统音乐、舞蹈、戏剧、技艺等多个领域。西湖龙井茶艺和杭州丝织技艺等传统工艺尤为著名，展现了浙江独特的文化内涵。"
    },
    四川: {
      count: 147,
      icon: "/icons/sichuan-icon.svg",
      image: "/photo/陶瓷纹样/陶瓷纹样-青花缠枝莲1.jpg",
      description: "四川非遗资源丰富多彩，川剧变脸、蜀绣等非遗项目闻名全国。这些非物质文化遗产展现了四川深厚的历史底蕴和多元的地域文化特色。"
    },
    福建: {
      count: 113,
      icon: "/icons/fujian-icon.svg",
      image: "/photo/刺绣/苏绣花鸟纹1.jpg",
      description: "福建省非遗资源独具特色，福州脱胎漆器、闽剧和南音等非遗项目体现了福建的海洋文化特色和与台湾地区的文化联系，展现了丰富的地域文化内涵。"
    },
    广东: {
      count: 138,
      icon: "/icons/guangdong-icon.svg",
      image: "/photo/木雕/龙眼木雕1.jpg",
      description: "广东非遗资源展现了岭南文化的独特魅力，粤绣、粤剧和广东音乐等非遗项目闻名全国。这些传统文化艺术不仅在国内有广泛影响，还通过海外华人传播到世界各地。"
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FFFBF5]">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[600px] overflow-hidden">
          <div
              className="absolute inset-0 bg-gradient-to-b from-[#8C4A3C]/60 via-transparent to-[#8C4A3C]/60 z-10"></div>

          {/* 使用正确的图像路径 */}
          <Image
              src="/photo/刺绣/刺绣-如意纹1.jpg"
              alt="中国非遗文化"
              fill
              priority
              sizes="100vw"
              quality={85}
              className="object-cover opacity-70"
              style={{width: '100%', height: '100%'}}
          />

          <div className="container mx-auto px-4 py-20 relative z-20 h-full flex items-center justify-center">
            <div className="max-w-2xl text-center">
              <h1 className="text-5xl font-bold text-white mb-6">探寻中国非物质文化遗产的魅力</h1>
              <p className="text-xl text-white/90 mb-8">连接传统与现代，推动非遗文化的可持续发展</p>
              <Link href="/stories">
                <Button className="bg-[#8C4A3C] hover:bg-[#6D3A2F] text-white px-8 py-3 text-lg">
                  探索非遗
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Digital Map Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#8C4A3C]">非遗数字地图</h2>
            <div className="bg-[#F9F5F1] rounded-xl p-6 shadow-sm">
              <InteractiveChinaMap/>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {["江苏", "浙江", "福建", "广东", "四川"].map((province) => (
                    <Card key={province} className="overflow-hidden border-[#D9C7B8] bg-white/80 backdrop-blur-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-[#8C4A3C] mr-2"/>
                            <span className="font-medium">{province}</span>
                          </div>
                          <span className="text-sm text-gray-500">12项</span>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          <Link
                              href={`/stories?province=${province}`}
                              className="flex items-center hover:text-[#8C4A3C] transition-colors"
                          >
                            查看详情 <ChevronRight className="h-3 w-3 ml-1"/>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

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
                <Suspense fallback={<div className="h-96 flex items-center justify-center">正在加载非遗故事...</div>}>
                  <HeritageCarousel type="stories"/>
                </Suspense>
              </TabsContent>
              <TabsContent value="designs">
                <Suspense fallback={<div className="h-96 flex items-center justify-center">正在加载热销设计...</div>}>
                  <HeritageCarousel type="designs"/>
                </Suspense>
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
   {name: "传统技艺", icon: "/photo/木雕/东阳木雕花窗1.jpg", count: 156},
                {name: "传统美术", icon: "/photo/刺绣/苏绣花鸟纹1.jpg", count: 89},
                {name: "传统音乐", icon: "/photo/陶瓷纹样/陶瓷纹样-青花缠枝莲1.jpg", count: 64},
                {name: "传统戏剧", icon: "/photo/木雕/龙眼木雕1.jpg", count: 42},
              ].map((category) => (
                  <Link
                      href={`/stories?category=${category.name}`}
                      key={category.name}
                      className="flex flex-col items-center p-6 rounded-lg bg-[#F9F5F1] hover:bg-[#F0E6D9] transition-colors"
                  >
                    <div className="w-16 h-16 mb-4 rounded-full bg-white p-2 flex items-center justify-center">
                      <Image src={category.icon || "/placeholder.svg"} alt={category.name} width={40} height={40}/>
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
                查看全部 <ChevronRight className="h-4 w-4 ml-1"/>

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
                        <Clock className="h-4 w-4 mr-1"/>
                        <span>{activity.date}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-1"/>
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

        {/* 热门非遗展示区域 */}
        <section className="py-12 bg-[#F9F5F1]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#8C4A3C]">热门非遗展示</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(provinceData).slice(0, 3).map(([province, data]) => (
                  <Card key={province} className="overflow-hidden border-[#D9C7B8] bg-white/80 backdrop-blur-sm">
                    <div className="relative h-48">
                      <Image
                          src={data.image || data.icon}
                          alt={`${province}非遗`}
                          fill
                          className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-lg text-[#8C4A3C]">{province}非遗</h3>
                        <Badge variant="outline" className="border-[#8C4A3C] text-[#8C4A3C]">
                          {data.count}项
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {data.description}
                      </p>
                      <Link
                          href={`/stories?region=${province}`}
                          className="text-sm text-[#8C4A3C] hover:underline flex items-center"
                      >
                        探索更多 <ChevronRight className="h-4 w-4 ml-1"/>
                      </Link>
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
                <li>电话: 18670905213</li>
                <li>地址: xxxxxxxx</li>
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
