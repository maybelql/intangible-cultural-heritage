import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '寻遗 - 非物质文化遗产数字平台',
  description: '连接传统与现代，促进非物质文化遗产的可持续发展',
  generator: '寻遗',
}

// 添加性能优化的头部元数据
export const viewport = {
  themeColor: '#8C4A3C',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <head>
        {/* DNS预取和资源预加载 */}
        <link rel="dns-prefetch" href="https://api.coze.cn" />
        <link rel="preconnect" href="https://api.coze.cn" crossOrigin="anonymous" />
        
        {/* 预加载关键CSS */}
        <link rel="preload" href="/fonts/style.css" as="style" />
        
        {/* 浏览器优化提示 */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
