import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { Heart, Share, Bookmark, MessageSquare, MapPin, User, Calendar } from "lucide-react"

export default function StoryDetailPage({ params }: { params: { id: string } }) {
  // In a real app, we would fetch the story data based on the ID
  const storyId = params.id

  return (
    <div className="flex min-h-screen flex-col bg-[#FFFBF5]">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[300px] md:h-[400px]">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          <div className="container relative h-full mx-auto px-4 flex flex-col justify-end pb-8">
            <div className="flex items-center text-white text-sm mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span>江苏省苏州市</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">苏州刺绣：针尖上的艺术</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-white text-sm">
                <User className="h-4 w-4 mr-1" />
                <span>作者：文化研究员</span>
              </div>
              <div className="flex items-center text-white text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                <span>发布时间：2023-05-15</span>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white rounded-lg border border-[#D9C7B8] p-6 mb-8">
                <Tabs defaultValue="intro">
                  <TabsList className="bg-[#F0E6D9] mb-6">
                    <TabsTrigger
                      value="intro"
                      className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
                    >
                      简介
                    </TabsTrigger>
                    <TabsTrigger
                      value="history"
                      className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
                    >
                      历史渊源
                    </TabsTrigger>
                    <TabsTrigger
                      value="technique"
                      className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
                    >
                      技艺流程
                    </TabsTrigger>
                    <TabsTrigger
                      value="inheritor"
                      className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
                    >
                      传承人
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="intro" className="space-y-4">
                    <p>
                      苏州刺绣，简称"苏绣"，是中国传统刺绣中的一个重要流派，以其精细、雅致、光洁、平整、色彩协调、构图合理而著称于世。苏绣的历史可以追溯到春秋战国时期，距今已有2000多年的历史。
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                      <Image
                        src="/placeholder.svg?height=300&width=400"
                        alt="苏州刺绣作品"
                        width={400}
                        height={300}
                        className="rounded-lg"
                      />
                      <Image
                        src="/placeholder.svg?height=300&width=400"
                        alt="苏州刺绣作品"
                        width={400}
                        height={300}
                        className="rounded-lg"
                      />
                    </div>
                    <p>
                      苏绣以其"平、细、密、匀、和、顺"的特点闻名于世。苏绣的针法多达40余种，主要有平针、乱针、套针、滚针、接针等。苏绣的题材广泛，包括人物、山水、花鸟、鱼虫等，尤以双面绣最为精妙，正反两面均可观赏，针法一致，图案相同，色彩一致。
                    </p>
                    <p>2006年5月20日，苏绣经国务院批准列入第一批国家级非物质文化遗产名录。</p>
                  </TabsContent>

                  <TabsContent value="history">
                    <p>历史渊源内容将在这里展示...</p>
                  </TabsContent>

                  <TabsContent value="technique">
                    <p>技艺流程内容将在这里展示...</p>
                  </TabsContent>

                  <TabsContent value="inheritor">
                    <p>传承人内容将在这里展示...</p>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Video Section */}
              <div className="bg-white rounded-lg border border-[#D9C7B8] p-6 mb-8">
                <h2 className="text-xl font-bold mb-4 text-[#8C4A3C]">传承人采访</h2>
                <div className="aspect-video bg-black rounded-lg relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center">
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
                        className="h-8 w-8 text-white"
                      >
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </Button>
                  </div>
                  <Image
                    src="/placeholder.svg?height=400&width=800&text=传承人采访视频"
                    alt="传承人采访视频"
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  苏绣传承人沈寿（1874-1921），字瑞卿，号瑶圃，江苏吴县人。她是中国近代著名的刺绣艺术家，被誉为"刺绣圣手"。在本视频中，我们采访了沈寿的再传弟子，了解苏绣技艺的传承历程。
                </p>
              </div>

              {/* Comments Section */}
              <div className="bg-white rounded-lg border border-[#D9C7B8] p-6">
                <h2 className="text-xl font-bold mb-4 text-[#8C4A3C]">评论区</h2>
                <div className="space-y-4">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="flex gap-4 pb-4 border-b border-[#D9C7B8] last:border-0">
                      <div className="w-10 h-10 rounded-full bg-[#F0E6D9] flex-shrink-0"></div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">用户{index + 1}</span>
                          <span className="text-xs text-gray-500">2023-06-{10 + index}</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                          {
                            [
                              "太精彩了！苏绣的针法真是令人叹为观止，希望有机会能亲眼见到这些作品。",
                              "感谢分享这么详细的介绍，对苏绣有了更深入的了解。",
                              "我家就在苏州，小时候经常看到长辈们绣花，现在想想真是一种文化瑰宝。",
                            ][index]
                          }
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <button className="flex items-center gap-1 hover:text-[#8C4A3C]">
                            <Heart className="h-3 w-3" />
                            <span>{12 + index * 5}</span>
                          </button>
                          <button className="flex items-center gap-1 hover:text-[#8C4A3C]">
                            <MessageSquare className="h-3 w-3" />
                            <span>回复</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <textarea
                    className="w-full p-3 border border-[#D9C7B8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C4A3C] resize-none"
                    rows={3}
                    placeholder="分享你的看法..."
                  ></textarea>
                  <div className="flex justify-end mt-2">
                    <Button className="bg-[#8C4A3C] hover:bg-[#6D3A2F]">发表评论</Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-80 shrink-0">
              {/* Action Buttons */}
              <div className="bg-white rounded-lg border border-[#D9C7B8] p-4 mb-6">
                <div className="grid grid-cols-4 gap-2">
                  <Button variant="outline" className="flex flex-col items-center border-[#D9C7B8] h-auto py-2">
                    <Heart className="h-5 w-5 mb-1" />
                    <span className="text-xs">点赞</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center border-[#D9C7B8] h-auto py-2">
                    <Bookmark className="h-5 w-5 mb-1" />
                    <span className="text-xs">收藏</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center border-[#D9C7B8] h-auto py-2">
                    <MessageSquare className="h-5 w-5 mb-1" />
                    <span className="text-xs">评论</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center border-[#D9C7B8] h-auto py-2">
                    <Share className="h-5 w-5 mb-1" />
                    <span className="text-xs">分享</span>
                  </Button>
                </div>
              </div>

              {/* Related Stories */}
              <div className="bg-white rounded-lg border border-[#D9C7B8] p-4 mb-6">
                <h3 className="font-bold text-lg mb-4 text-[#8C4A3C]">相关故事</h3>
                <div className="space-y-4">
                  {[...Array(3)].map((_, index) => (
                    <Link href={`/stories/${index + 10}`} key={index} className="flex gap-3 group">
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={`/placeholder.svg?height=80&width=80&text=${index + 1}`}
                          alt={`相关故事${index + 1}`}
                          fill
                          className="rounded-md object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm group-hover:text-[#8C4A3C] line-clamp-2">
                          {
                            ["南京云锦：金丝织就的华美", "景德镇青花瓷：千年窑火不熄", "杭州丝织：丝路明珠的璀璨"][
                              index
                            ]
                          }
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">阅读量 {1200 + index * 300}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Design Recommendations */}
              <div className="bg-white rounded-lg border border-[#D9C7B8] p-4">
                <h3 className="font-bold text-lg mb-4 text-[#8C4A3C]">设计推荐</h3>
                <div className="space-y-4">
                  {[...Array(2)].map((_, index) => (
                    <Link href={`/design/${index + 1}`} key={index} className="block group">
                      <div className="relative aspect-[4/3] w-full mb-2">
                        <Image
                          src={`/placeholder.svg?height=150&width=200&text=设计${index + 1}`}
                          alt={`设计推荐${index + 1}`}
                          fill
                          className="rounded-md object-cover"
                        />
                      </div>
                      <h4 className="font-medium text-sm group-hover:text-[#8C4A3C]">
                        {["苏绣图案丝巾", "苏绣元素手机壳"][index]}
                      </h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm font-medium text-[#8C4A3C]">¥{199 + index * 50}</span>
                        <span className="text-xs text-gray-500">已售 {120 + index * 50}</span>
                      </div>
                    </Link>
                  ))}
                  <Button className="w-full bg-[#8C4A3C] hover:bg-[#6D3A2F]">前往设计城</Button>
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
