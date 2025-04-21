import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { InheritanceGraph } from "@/components/inheritance-graph"
import { Calendar, MapPin } from "lucide-react"

export default function InheritancePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FFFBF5]">
      <Navigation />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-[#8C4A3C] mb-8">非遗传承</h1>

          {/* Inheritance Graph Section */}
          <section className="bg-white rounded-lg border border-[#D9C7B8] p-6 mb-8">
            <div className="h-[500px] bg-[#F9F5F1] rounded-lg p-4">
              <InheritanceGraph />
            </div>
            <p className="mt-4 text-sm text-gray-600">
              点击节点可查看传承人详细信息，了解非遗技艺的传承脉络。图谱展示了主要传承人之间的师承关系，反映了非物质文化遗产的活态传承。
            </p>
          </section>

          {/* Activities Timeline */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#8C4A3C]">活动动态</h2>
              <Button variant="outline" className="border-[#8C4A3C] text-[#8C4A3C]">
                查看全部
              </Button>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-[#D9C7B8] transform md:translate-x-[-0.5px]"></div>

              <div className="space-y-8">
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                  >
                    <div className="md:w-1/2 md:px-8 mb-4 md:mb-0">
                      <Card className="overflow-hidden border-[#D9C7B8]">
                        <div className="relative h-48">
                          <Image
                            src={`/placeholder.svg?height=200&width=400&text=活动${index + 1}`}
                            alt={`活动${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          {index === 0 && (
                            <div className="absolute top-2 right-2 bg-[#8C4A3C] text-white text-xs px-2 py-1 rounded">
                              进行中
                            </div>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-bold text-lg mb-2">
                            {["景德镇陶瓷工艺展", "苏州刺绣技艺培训", "非遗传承人讲座", "传统木雕技艺展示"][index]}
                          </h3>
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>2023-06-{15 + index * 5}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mb-3">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>
                              {["江西景德镇陶瓷博物馆", "苏州丝绸博物馆", "北京文化中心", "浙江东阳木雕馆"][index]}
                            </span>
                          </div>
                          <Button className="w-full bg-[#8C4A3C] hover:bg-[#6D3A2F]">
                            {index === 0 ? "立即报名" : "查看详情"}
                          </Button>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Timeline Node */}
                    <div className="absolute left-0 md:left-1/2 w-6 h-6 rounded-full bg-[#8C4A3C] transform translate-x-[-50%] flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Inheritor Stories */}
          <section>
            <h2 className="text-xl font-bold mb-6 text-[#8C4A3C]">传承人故事</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(2)].map((_, index) => (
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
                      <h3 className="font-bold text-lg mb-2">
                        {["景德镇陶瓷传承人：张明", "苏绣传承人：李芳"][index]}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {
                          [
                            "张明，国家级非物质文化遗产景德镇陶瓷烧制技艺代表性传承人，从事陶瓷制作40余年，精通青花、粉彩等多种工艺...",
                            "李芳，苏州刺绣国家级传承人，15岁开始学习刺绣，擅长双面绣、乱针绣等多种针法，作品《猫》曾获国际金奖...",
                          ][index]
                        }
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>2023-04-{10 + index * 5}</span>
                        </div>
                        <Button variant="outline" size="sm" className="border-[#8C4A3C] text-[#8C4A3C]">
                          阅读故事
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Button className="bg-[#8C4A3C] hover:bg-[#6D3A2F]">查看更多传承人故事</Button>
            </div>
          </section>
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
