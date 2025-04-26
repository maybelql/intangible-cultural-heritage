import { homeConfig } from './config';

// 导出配置参数，这些只在服务器端生效
export const dynamic = homeConfig.dynamic;
export const revalidate = homeConfig.revalidate;

// 这个文件的默认导出会被忽略，因为实际内容在page.tsx中
export default function PageConfig() {
  return null;
} 