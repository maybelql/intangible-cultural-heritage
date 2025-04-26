"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { User, Settings, ShoppingBag, Heart, Bookmark, Store, Database, FileText } from "lucide-react"

interface ProfileSidebarProps {
  activePage: string
}

export function ProfileSidebar({ activePage }: ProfileSidebarProps) {
  return (
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
          <Link
            href="/profile"
            className={`flex items-center gap-2 p-2 rounded-md ${
              activePage === "profile"
                ? "bg-[#F0E6D9] text-[#8C4A3C]"
                : "hover:bg-[#F0E6D9] text-gray-600 hover:text-[#8C4A3C] transition-colors"
            }`}
          >
            <User className="h-4 w-4" />
            <span>个人信息</span>
          </Link>
          <Link
            href="/profile/orders"
            className={`flex items-center gap-2 p-2 rounded-md ${
              activePage === "orders"
                ? "bg-[#F0E6D9] text-[#8C4A3C]"
                : "hover:bg-[#F0E6D9] text-gray-600 hover:text-[#8C4A3C] transition-colors"
            }`}
          >
            <ShoppingBag className="h-4 w-4" />
            <span>订单管理</span>
          </Link>
          <Link
            href="/profile/favorites"
            className={`flex items-center gap-2 p-2 rounded-md ${
              activePage === "favorites"
                ? "bg-[#F0E6D9] text-[#8C4A3C]"
                : "hover:bg-[#F0E6D9] text-gray-600 hover:text-[#8C4A3C] transition-colors"
            }`}
          >
            <Heart className="h-4 w-4" />
            <span>我的收藏</span>
          </Link>
          <Link
            href="/profile/designs"
            className={`flex items-center gap-2 p-2 rounded-md ${
              activePage === "designs"
                ? "bg-[#F0E6D9] text-[#8C4A3C]"
                : "hover:bg-[#F0E6D9] text-gray-600 hover:text-[#8C4A3C] transition-colors"
            }`}
          >
            <Bookmark className="h-4 w-4" />
            <span>我的设计</span>
          </Link>
          <Link
            href="/profile/store"
            className={`flex items-center gap-2 p-2 rounded-md ${
              activePage === "store"
                ? "bg-[#F0E6D9] text-[#8C4A3C]"
                : "hover:bg-[#F0E6D9] text-gray-600 hover:text-[#8C4A3C] transition-colors"
            }`}
          >
            <Store className="h-4 w-4" />
            <span>店铺管理</span>
            <span className="ml-auto text-xs px-1.5 py-0.5 bg-[#8C4A3C] text-white rounded-full">新</span>
          </Link>
          <Link
            href="/profile/data-management"
            className={`flex items-center gap-2 p-2 rounded-md ${
              activePage === "data-management"
                ? "bg-[#F0E6D9] text-[#8C4A3C]"
                : "hover:bg-[#F0E6D9] text-gray-600 hover:text-[#8C4A3C] transition-colors"
            }`}
          >
            <Database className="h-4 w-4" />
            <span>数据管理</span>
          </Link>
          <Link
            href="/profile/application"
            className={`flex items-center gap-2 p-2 rounded-md ${
              activePage === "application"
                ? "bg-[#F0E6D9] text-[#8C4A3C]"
                : "hover:bg-[#F0E6D9] text-gray-600 hover:text-[#8C4A3C] transition-colors"
            }`}
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
  )
}
