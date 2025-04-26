"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Heart, ShoppingBag } from "lucide-react"

interface HeritageCarouselProps {
  type: "stories" | "designs"
}

interface StoryItem {
  id: number
  title: string
  description: string
  image: string
}

interface DesignItem {
  id: number
  title: string
  image: string
  price: string
  sales: string
}

export function HeritageCarousel({ type }: HeritageCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const storiesData: StoryItem[] = [
    {
      id: 1,
      title: "苏绣花鸟纹",
      description: "苏州刺绣技艺的传承与发展",
      image: "/photo/刺绣/苏绣花鸟纹1.jpg"
    },
    {
      id: 2,
      title: "东阳木雕花窗",
      description: "东阳木雕工艺的现代创新",
      image: "/photo/木雕/东阳木雕花窗1.jpg"
    },
    {
      id: 3,
      title: "青花缠枝莲",
      description: "景德镇陶瓷艺术的传承与创新",
      image: "/photo/陶瓷纹样/陶瓷纹样-青花缠枝莲1.jpg"
    },
    {
      id: 4,
      title: "粤绣牡丹",
      description: "广东刺绣工艺的现代演绎",
      image: "/photo/刺绣/粤绣牡丹1.jpg"
    },
    {
      id: 5,
      title: "蜀绣龙凤",
      description: "四川刺绣工艺的传承与发展",
      image: "/photo/刺绣/蜀绣龙凤1.jpg"
    },
    {
      id: 6,
      title: "湘绣山水",
      description: "湖南刺绣工艺的现代创新",
      image: "/photo/刺绣/湘绣山水1.png"
    },
    {
      id: 7,
      title: "黄杨木雕人物",
      description: "黄杨木雕工艺的传承与发展",
      image: "/photo/木雕/黄杨木雕人物1.jpg"
    },
    {
      id: 8,
      title: "龙眼木雕",
      description: "福建木雕工艺的现代创新",
      image: "/photo/木雕/龙眼木雕1.jpg"
    },
    {
      id: 9,
      title: "粉彩花鸟",
      description: "景德镇粉彩工艺的传承与创新",
      image: "/photo/陶瓷纹样/陶瓷纹样-粉彩花鸟1.jpg"
    }
  ]

  const designsData: DesignItem[] = [
    {
      id: 1,
      title: "苏绣花鸟纹",
      image: "/photo/刺绣/苏绣花鸟纹1.jpg",
      price: "¥1280",
      sales: "已售 156"
    },
    {
      id: 2,
      title: "东阳木雕花窗",
      image: "/photo/木雕/东阳木雕花窗1.jpg",
      price: "¥980",
      sales: "已售 89"
    },
    {
      id: 3,
      title: "青花缠枝莲",
      image: "/photo/陶瓷纹样/陶瓷纹样-青花缠枝莲1.jpg",
      price: "¥680",
      sales: "已售 64"
    },
    {
      id: 4,
      title: "粤绣牡丹",
      image: "/photo/刺绣/粤绣牡丹1.jpg",
      price: "¥880",
      sales: "已售 42"
    },
    {
      id: 5,
      title: "蜀绣龙凤",
      image: "/photo/刺绣/蜀绣龙凤1.jpg",
      price: "¥1280",
      sales: "已售 38"
    },
    {
      id: 6,
      title: "湘绣山水",
      image: "/photo/刺绣/湘绣山水1.png",
      price: "¥980",
      sales: "已售 29"
    }
  ]

  const data = type === "stories" ? storiesData : designsData
  const visibleItems = 3
  const maxSlide = Math.max(0, data.length - visibleItems)

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0))
  }

  const renderCard = (item: StoryItem | DesignItem, type: "stories" | "designs") => {
    return (
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
          {type === "stories" ? (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{(item as StoryItem).description}</span>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <span className="text-[#8C4A3C] font-medium">{(item as DesignItem).price}</span>
              <div className="flex items-center text-sm text-gray-600">
                <ShoppingBag className="h-4 w-4 mr-1" />
                {(item as DesignItem).sales}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * (100 / visibleItems)}%)` }}
        >
          {data.map((item, index) => (
            <div key={item.id} className="w-full sm:w-1/2 md:w-1/3 flex-shrink-0 p-2">
              {renderCard(item, type)}
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/80 hover:bg-white"
        onClick={prevSlide}
        disabled={currentSlide === 0}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/80 hover:bg-white"
        onClick={nextSlide}
        disabled={currentSlide === maxSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  )
}
