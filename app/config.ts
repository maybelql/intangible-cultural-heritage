// 首页配置（服务器端）
export const homeConfig = {
  dynamic: 'force-static',
  revalidate: 3600 // 每小时重新验证一次
};

// 其他页面配置可以在这里添加
export const designConfig = {
  dynamic: 'force-dynamic', // 设计页面使用动态生成
};

// 全局性能配置
export const siteConfig = {
  name: '寻遗 - 非物质文化遗产数字平台',
  description: '连接传统与现代，促进非物质文化遗产的可持续发展',
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://xunyi.com'
}; 