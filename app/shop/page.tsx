import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { getAllShopItems } from "@/data/shop-items"

export default function ShopPage() {
  // 获取所有商品数据
  const shopItems = getAllShopItems();
  return (
    <div className="flex min-h-screen flex-col bg-[#FFFBF5]">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0">
            <Image
              src="/photo/刺绣/刺绣-凤凰1.jpg"
              alt="商城背景"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div className="container relative mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-[#8C4A3C] sm:text-5xl md:text-6xl">
                <span className="block font-serif">非遗商城</span>
                <span className="block text-2xl font-medium mt-2">传统工艺与现代设计的完美结合</span>
              </h1>
              <p className="mt-6 text-lg text-gray-700">精选非遗传承人作品，让传统工艺走进现代生活</p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#8C4A3C]">商品分类</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "刺绣作品", icon: "/photo/刺绣/刺绣-牡丹花1.jpg", count: 156 },
                { name: "木雕工艺", icon: "/photo/木雕/木雕-龙纹1.jpg", count: 89 },
                { name: "陶瓷艺术", icon: "/photo/陶瓷纹样/陶瓷纹样-粉彩花鸟1.jpg", count: 64 },
                { name: "文创产品", icon: "/photo/刺绣/刺绣-蝴蝶1.jpg", count: 42 },
              ].map((category) => (
                <Link
                  key={category.name}
                  href={`/shop?category=${category.name}`}
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
                      <p className="text-sm text-gray-600">{category.count} 件商品</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-12 bg-[#F9F5F1]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#8C4A3C]">精选商品</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shopItems.map((item) => (
                <Link key={item.id} href={`/shop/${item.id}`}>
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
                      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-[#8C4A3C] font-medium">{item.price}</span>
                        <span className="text-sm text-gray-600">{item.sales}</span>
                      </div>
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