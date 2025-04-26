import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"

export default function HeritagePage() {
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
                <span className="block font-serif">非遗传承</span>
                <span className="block text-2xl font-medium mt-2">非物质文化遗产传承与发展</span>
              </h1>
              <p className="mt-6 text-lg text-gray-700">探索中国非物质文化遗产的魅力，传承千年工艺，连接古今智慧</p>
            </div>
          </div>
        </section>

        {/* Heritage Categories */}
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
                  key={category.name}
                  href={`/heritage?category=${category.name}`}
                  className="group"
                >
                  <Card className="overflow-hidden border-[#D9C7B8] hover:shadow-lg transition-shadow">
                    <div className="relative h-32">
                      <Image
                        src={category.icon}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-lg mb-1">{category.name}</h3>
                      <p className="text-sm text-gray-600">{category.count} 项</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Heritage List */}
        <section className="py-12 bg-[#F9F5F1]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#8C4A3C]">非遗传承</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "苏绣传承人",
                  description: "苏州刺绣技艺的传承与发展",
                  image: "/photo/刺绣/苏绣花鸟纹1.jpg",
                  link: "/heritage/1",
                },
                {
                  title: "木雕大师",
                  description: "东阳木雕工艺的现代创新",
                  image: "/photo/木雕/东阳木雕花窗1.jpg",
                  link: "/heritage/2",
                },
                {
                  title: "陶瓷艺术家",
                  description: "景德镇陶瓷艺术的传承与创新",
                  image: "/photo/陶瓷纹样/陶瓷纹样-青花缠枝莲1.jpg",
                  link: "/heritage/3",
                },
                {
                  title: "粤绣传承",
                  description: "广东刺绣工艺的现代演绎",
                  image: "/photo/刺绣/粤绣牡丹1.jpg",
                  link: "/heritage/4",
                },
                {
                  title: "蜀绣技艺",
                  description: "四川刺绣工艺的传承与发展",
                  image: "/photo/刺绣/蜀绣龙凤1.jpg",
                  link: "/heritage/5",
                },
                {
                  title: "湘绣艺术",
                  description: "湖南刺绣工艺的现代创新",
                  image: "/photo/刺绣/湘绣山水1.png",
                  link: "/heritage/6",
                },
              ].map((item) => (
                <Link key={item.title} href={item.link}>
                  <Card className="overflow-hidden border-[#D9C7B8] hover:shadow-lg transition-shadow">
                    <div className="relative h-48 w-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-lg mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
} 