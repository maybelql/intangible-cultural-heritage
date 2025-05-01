/**
 * 内存管理辅助工具
 */

// 优化图像以减少内存使用
export const optimizeImage = (
  base64Data: string,
  maxWidth: number = 1200,
  quality: number = 0.8
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      // 创建临时Canvas进行缩放
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      
      // 计算新尺寸，保持宽高比
      if (width > maxWidth) {
        const ratio = maxWidth / width;
        width = maxWidth;
        height = height * ratio;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('无法创建Canvas上下文'));
        return;
      }
      
      // 绘制调整大小后的图像
      ctx.drawImage(img, 0, 0, width, height);
      
      // 获取较低质量的JPEG以减小数据大小
      const optimizedData = canvas.toDataURL('image/jpeg', quality);
      
      // 清理资源
      img.onload = null;
      img.onerror = null;
      canvas.width = 0;
      canvas.height = 0;
      
      resolve(optimizedData);
    };
    
    img.onerror = () => {
      reject(new Error('图像处理失败'));
    };
    
    img.src = base64Data;
  });
};

// 防抖函数，用于减少函数调用频率
export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

// 节流函数，用于限制函数调用频率
export const throttle = <T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

// 请求垃圾回收（仅在Node.js环境中使用--expose-gc时有效）
export const tryGarbageCollect = () => {
  if (typeof global !== 'undefined' && global.gc) {
    try {
      global.gc();
      console.log('垃圾回收已触发');
    } catch (e) {
      console.error('垃圾回收失败', e);
    }
  }
};

// 监控内存使用情况（仅在Node.js环境中有效）
export const logMemoryUsage = () => {
  if (typeof process !== 'undefined' && process.memoryUsage) {
    const memoryData = process.memoryUsage();
    console.log('内存使用情况:', {
      rss: `${Math.round(memoryData.rss / 1024 / 1024)} MB`,
      heapTotal: `${Math.round(memoryData.heapTotal / 1024 / 1024)} MB`,
      heapUsed: `${Math.round(memoryData.heapUsed / 1024 / 1024)} MB`,
      external: `${Math.round(memoryData.external / 1024 / 1024)} MB`,
    });
  }
}; 