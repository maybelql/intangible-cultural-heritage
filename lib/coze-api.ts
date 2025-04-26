// 定义工作流运行时的参数类型
export interface WorkflowRunParams {
  workflow_id: string;
  parameters: Record<string, any>;
}

// 定义文件上传响应类型
export interface FileUploadResponse {
  file_id: string;
  url?: string;
  name?: string;
}

// API 响应类型
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// 事件类型
export interface WorkflowEvent {
  type: string;
  output?: any;
}

// 预览参数类型
export interface PreviewParams {
  image: string;
  product: string;
  color: string;
}

// 预览选项
export type PreviewOptions = {
  product: "wallet" | "shirt";
  color: string;
};

// 预览结果
export type PreviewResult = {
  success: boolean;
  imageUrl?: string;
  error?: string;
};

// Coze API 客户端类
export class CozeAPI {
  private token: string;
  private baseURL: string;

  constructor(config: { 
    token: string; 
    baseURL: string;
    allowPersonalAccessTokenInBrowser?: boolean; 
  }) {
    this.token = config.token;
    this.baseURL = config.baseURL;
  }

  // 将 Base64 转换为 Blob
  private base64ToBlob(base64: string): Blob {
    // 如果数据量太大，可能会导致内存问题
    // 避免处理过大的图像数据
    if (base64.length > 10000000) { // 约10MB
      throw new Error('图像数据过大，请使用较小的图像');
    }

    const parts = base64.split(';base64,');
    const contentType = parts[0].split(':')[1] || 'image/png';
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    
    // 使用分块处理大型数据，避免一次性分配过大内存
    const chunkSize = 16384; // 16KB chunks
    const uInt8Array = new Uint8Array(rawLength);
    
    let i = 0;
    while (i < rawLength) {
      const chunk = Math.min(chunkSize, rawLength - i);
      for (let j = 0; j < chunk; j++) {
        uInt8Array[i + j] = raw.charCodeAt(i + j);
      }
      i += chunk;
    }

    return new Blob([uInt8Array], { type: contentType });
  }

  // 上传文件
  async uploadFile(file: File | Blob): Promise<ApiResponse<FileUploadResponse>> {
    try {
      const formData = new FormData();
      formData.append('file', file, 'image.png');

      const response = await fetch(`${this.baseURL}/v1/files`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
        body: formData
      });

      const data = await response.json();
      
      if (!response.ok) {
        return {
          success: false,
          error: data.message || '上传文件失败'
        };
      }

      return {
        success: true,
        data: {
          file_id: data.file_id,
          url: data.url,
          name: data.name
        }
      };
    } catch (error) {
      console.error('上传文件错误:', error);
      return {
        success: false,
        error: (error as Error).message || '上传文件失败'
      };
    }
  }

  // 上传Base64图片
  async uploadBase64Image(base64Data: string): Promise<ApiResponse<string>> {
    try {
      const blob = this.base64ToBlob(base64Data);
      const uploadResponse = await this.uploadFile(blob);
      
      if (!uploadResponse.success || !uploadResponse.data) {
        return {
          success: false,
          error: uploadResponse.error || '上传图片失败'
        };
      }
      
      return {
        success: true,
        data: uploadResponse.data.file_id
      };
    } catch (error) {
      console.error('上传Base64图片错误:', error);
      return {
        success: false,
        error: (error as Error).message || '上传Base64图片失败'
      };
    }
  }

  // 调用工作流
  async runWorkflow(params: WorkflowRunParams): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${this.baseURL}/v1/workflows/${params.workflow_id}/runs`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          parameters: params.parameters
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        return {
          success: false,
          error: data.message || '调用工作流失败'
        };
      }

      return {
        success: true,
        data: data
      };
    } catch (error) {
      console.error('调用工作流错误:', error);
      return {
        success: false,
        error: (error as Error).message || '调用工作流失败'
      };
    }
  }

  // 生成预览图片
  async generatePreview(params: PreviewParams): Promise<ApiResponse<string>> {
    try {
      // 检查图像大小
      if (params.image.length > 5000000) { // 约5MB
        return {
          success: false,
          error: '图像太大，请使用较小的图像或降低分辨率'
        };
      }
      
      // 1. 上传图片获取 file_id
      const uploadResponse = await this.uploadBase64Image(params.image);
      if (!uploadResponse.success || !uploadResponse.data) {
        return {
          success: false,
          error: uploadResponse.error || '上传图片失败'
        };
      }
      
      const fileId = uploadResponse.data;
      
      // 2. 调用工作流
      const workflowResponse = await this.streamWorkflow({
        workflow_id: '7496851850826629159', // 可配置的工作流ID
        parameters: {
          input: JSON.stringify({
            file_id: fileId,
            product: params.product,
            color: params.color
          })
        }
      });
      
      // 3. 处理响应
      for await (const event of workflowResponse) {
        // 根据实际响应结构调整
        if (event.type === 'done' && event.output) {
          return {
            success: true,
            data: event.output.imageUrl
          };
        }
      }
      
      return {
        success: false,
        error: '未收到有效的预览图片'
      };
    } catch (error) {
      console.error('生成预览错误:', error);
      return {
        success: false,
        error: (error as Error).message || '生成预览失败'
      };
    }
  }
  
  // 流式工作流调用
  async streamWorkflow(params: WorkflowRunParams): Promise<AsyncGenerator<WorkflowEvent>> {
    try {
      const response = await fetch(`${this.baseURL}/v1/workflows/${params.workflow_id}/runs/stream`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          parameters: params.parameters
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '流式调用工作流失败');
      }
      
      // 返回可迭代的 ReadableStream
      return this.streamEventParser(response.body);
    } catch (error) {
      console.error('流式调用工作流错误:', error);
      throw error;
    }
  }
  
  // 流事件解析器
  private async *streamEventParser(stream: ReadableStream<Uint8Array> | null): AsyncGenerator<WorkflowEvent> {
    if (!stream) throw new Error('无效的响应流');
    
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        // 解码当前块数据
        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;
        
        // 一次处理多行数据，减少循环次数
        if (buffer.includes('\n')) {
          const lines = buffer.split('\n');
          buffer = lines.pop() || ''; // 保留最后一个可能不完整的行
          
          for (const line of lines) {
            if (line.trim() === '') continue;
            
            try {
              const event = JSON.parse(line);
              yield event;
              
              // 如果是完成事件，结束流
              if (event.type === 'done') {
                // 清理资源
                buffer = '';
                reader.releaseLock();
                return;
              }
            } catch (e) {
              console.warn('解析事件失败:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('流处理错误:', error);
      throw error;
    } finally {
      // 确保释放资源
      reader.releaseLock();
      buffer = '';
    }
  }

  // 模拟workflows属性，兼容旧代码
  get workflows() {
    return {
      runs: {
        stream: async (params: WorkflowRunParams) => {
          return this.streamWorkflow(params);
        }
      }
    };
  }
}

// 创建默认API实例
const apiClient = new CozeAPI({
  token: 'pat_6mnAGbuISXSYMVv8yyJnPygPddBjd3lsjZChTWbm12XFHf0Y4Nnp6EyMYYqpakRZ',
  baseURL: 'https://api.coze.cn',
  allowPersonalAccessTokenInBrowser: true,
});

// 导出简化的API调用函数
export async function generatePreview(
  imageBase64: string,
  product: string,
  color: string
): Promise<string> {
  const result = await apiClient.generatePreview({
    image: imageBase64,
    product,
    color
  });
  
  if (!result.success || !result.data) {
    throw new Error(result.error || '生成预览失败');
  }
  
  return result.data;
}

// 导出API实例创建函数
export const createCozeAPI = (token: string, baseURL: string) => {
  return new CozeAPI({
    token,
    baseURL
  });
}; 