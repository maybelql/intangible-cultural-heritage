"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, Book, Users, Palette, User, Menu, X, ShoppingCart } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { name: "首页", href: "/", icon: Home },
    { name: "非遗故事", href: "/stories", icon: Book },
    { name: "非遗商城", href: "/shop", icon: ShoppingCart },
    { name: "非遗传承", href: "/inheritance", icon: Users },
    { name: "设计城", href: "/design", icon: Palette },
    { name: "我的", href: "/profile", icon: User },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#D9C7B8] bg-white/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#8C4A3C] mr-2"></div>
            <span className="font-bold text-xl text-[#8C4A3C]">寻遗</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#8C4A3C]",
                  pathname === item.href ? "text-[#8C4A3C]" : "text-gray-600",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-[#8C4A3C]">
            登录
          </Button>
          <Button size="sm" className="bg-[#8C4A3C] hover:bg-[#6D3A2F]">
            注册
          </Button>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#D9C7B8]">
          <div className="container py-4 grid grid-cols-5 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center justify-center py-2 rounded-lg",
                    isActive ? "bg-[#F0E6D9] text-[#8C4A3C]" : "text-gray-600",
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <span className="text-xs">{item.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
