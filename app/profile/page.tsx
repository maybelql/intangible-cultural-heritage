import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import {
  User,
  Settings,
  ShoppingBag,
  Heart,
  Bookmark,
  Store,
  Package,
  Clock,
  ChevronRight,
  Database,
  FileText,
} from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FFFBF5]">
      <Navigation />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-64 shrink-0">
              <div className="bg-white rounded-lg border border-[#D9C7B8] p-6 sticky top-20">
                <div className="flex flex-col items-center mb-6">
                  <div className="relative w-24 h-24 mb-4">
                    <Image
                      src="/placeholder.svg?height=100&width=100&text=头像"
                      alt="用户头像"
                      fill
                      className="rounded-full object-cover border-4 border-[#F0E6D9]"
                    />
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#8C4A3C] rounded-full flex items-center justify-center text-white text-xs">
                      <Settings className="h-3 w-3" />
                    </div>
                  </div>
                  <h2 className="text-xl font-bold mb-1">用户名</h2>
                  <div className="text-xs px-2 py-1 bg-[#8C4A3C]/10 text-[#8C4A3C] rounded-full">普通用户</div>
                </div>

                <nav className="space-y-1">
                  <Link href="/profile" className="flex items-center gap-2 p-2 rounded-md bg-[#F0E6D9] text-[#8C4A3C]">
                    <User className="h-4 w-4" />
                    <span>个人信息</span>
                  </Link>
                  <Link
                    href="/profile/orders"
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-[#F0E6D9] text-gray-600 hover:text-[#8C4A3C] transition-colors"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>订单管理</span>
                  </Link>
                  <Link
                    href="/profile/favorites"
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-[#F0E6D9] text-gray-600 hover:text-[#8C4A3C] transition-colors"
                  >
                    <Heart className="h-4 w-4" />
                    <span>我的收藏</span>
                  </Link>
                  <Link
                    href="/profile/designs"
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-[#F0E6D9] text-gray-600 hover:text-[#8C4A3C] transition-colors"
                  >
                    <Bookmark className="h-4 w-4" />
                    <span>我的设计</span>
                  </Link>
                  <Link
                    href="/profile/store"
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-[#F0E6D9] text-gray-600 hover:text-[#8C4A3C] transition-colors"
                  >
                    <Store className="h-4 w-4" />
                    <span>店铺管理</span>
                    <span className="ml-auto text-xs px-1.5 py-0.5 bg-[#8C4A3C] text-white rounded-full">新</span>
                  </Link>
                  <Link
                    href="/profile/data-management"
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-[#F0E6D9] text-gray-600 hover:text-[#8C4A3C] transition-colors"
                  >
                    <Database className="h-4 w-4" />
                    <span>数据管理</span>
                  </Link>
                  <Link
                    href="/profile/application"
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-[#F0E6D9] text-gray-600 hover:text-[#8C4A3C] transition-colors"
                  >
                    <FileText className="h-4 w-4" />
                    <span>申报管理</span>
                  </Link>
                </nav>

                <div className="mt-6 pt-6 border-t border-[#D9C7B8]">
                  <Button className="w-full bg-[#8C4A3C] hover:bg-[#6D3A2F]">申请成为传承人</Button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* User Info */}
              <div className="bg-white rounded-lg border border-[#D9C7B8] p-6 mb-8">
                <h2 className="text-xl font-bold mb-6 text-[#8C4A3C]">个人信息</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-sm text-gray-500 mb-2">基本信息</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b border-[#F0E6D9]">
                        <span className="text-sm">用户名</span>
                        <span className="text-sm font-medium">文化爱好者</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-[#F0E6D9]">
                        <span className="text-sm">实名认证</span>
                        <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">未认证</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-[#F0E6D9]">
                        <span className="text-sm">注册时间</span>
                        <span className="text-sm">2023-01-15</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-[#F0E6D9]">
                        <span className="text-sm">会员等级</span>
                        <span className="text-sm">普通会员</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-sm text-gray-500 mb-2">联系方式</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b border-[#F0E6D9]">
                        <span className="text-sm">手机号码</span>
                        <span className="text-sm">138****6789</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-[#F0E6D9]">
                        <span className="text-sm">电子邮箱</span>
                        <span className="text-sm">user@example.com</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-[#F0E6D9]">
                        <span className="text-sm">收货地址</span>
                        <span className="text-sm">已设置 2 个地址</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Button variant="outline" className="border-[#8C4A3C] text-[#8C4A3C]">
                    编辑个人信息
                  </Button>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-lg border border-[#D9C7B8] p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-[#8C4A3C]">最近订单</h2>
                  <Link href="/profile/orders" className="text-sm text-[#8C4A3C] hover:underline flex items-center">
                    查看全部 <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>

                <div className="space-y-4">
                  {[...Array(2)].map((_, index) => (
                    <Card key={index} className="overflow-hidden border-[#D9C7B8]">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <Package className="h-4 w-4 mr-2 text-[#8C4A3C]" />
                            <span className="text-sm font-medium">订单号: 2023050{index + 1}9876</span>
                          </div>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              index === 0 ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {index === 0 ? "已完成" : "配送中"}
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="relative w-20 h-20 flex-shrink-0">
                            <Image
                              src={`/placeholder.svg?height=80&width=80&text=商品${index + 1}`}
                              alt={`商品${index + 1}`}
                              fill
                              className="rounded-md object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium mb-1">{["青花瓷图案T恤", "传统纹样笔记本"][index]}</h3>
                            <div className="flex items-center text-xs text-gray-500 mb-2">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>2023-05-{10 + index}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-[#8C4A3C]">¥{99 + index * 50} × 1</span>
                              <Button variant="outline" size="sm" className="h-7 border-[#8C4A3C] text-[#8C4A3C]">
                                {index === 0 ? "再次购买" : "查看详情"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* My Designs */}
              <div className="bg-white rounded-lg border border-[#D9C7B8] p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-[#8C4A3C]">我的设计</h2>
                  <Link href="/profile/designs" className="text-sm text-[#8C4A3C] hover:underline flex items-center">
                    查看全部 <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[...Array(3)].map((_, index) => (
                    <Card key={index} className="overflow-hidden border-[#D9C7B8]">
                      <div className="relative aspect-square">
                        <Image
                          src={`/placeholder.svg?height=200&width=200&text=设计${index + 1}`}
                          alt={`设计${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-1">我的设计 {index + 1}</h3>
                        <div className="flex items-center text-xs text-gray-500 mb-3">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>2023-04-{15 + index}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1 h-7 border-[#8C4A3C] text-[#8C4A3C]">
                            编辑
                          </Button>
                          <Button size="sm" className="flex-1 h-7 bg-[#8C4A3C] hover:bg-[#6D3A2F]">
                            定制
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Activity Stats */}
              <div className="bg-white rounded-lg border border-[#D9C7B8] p-6">
                <h2 className="text-xl font-bold mb-6 text-[#8C4A3C]">活动统计</h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-[#F9F5F1] rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-[#8C4A3C]">12</div>
                    <div className="text-sm text-gray-600">收藏故事</div>
                  </div>
                  <div className="bg-[#F9F5F1] rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-[#8C4A3C]">5</div>
                    <div className="text-sm text-gray-600">设计作品</div>
                  </div>
                  <div className="bg-[#F9F5F1] rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-[#8C4A3C]">8</div>
                    <div className="text-sm text-gray-600">订单数量</div>
                  </div>
                  <div className="bg-[#F9F5F1] rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-[#8C4A3C]">20</div>
                    <div className="text-sm text-gray-600">评论数量</div>
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
