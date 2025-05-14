"use client";

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generatePreview } from '@/lib/coze-api';

export default function ApiTestPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [productType, setProductType] = useState<"wallet" | "shirt">("wallet");
  const [color, setColor] = useState("#FFFFFF");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setBase64Image(base64);
    };
    reader.readAsDataURL(file);
  };
  
  const handleGeneratePreview = async () => {
    if (!base64Image) {
      setError("请先上传图片");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await generatePreview(base64Image, productType, color);
      setImageUrl(result);
    } catch (err) {
      console.error("生成预览失败:", err);
      setError(err instanceof Error ? err.message : "生成预览失败");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Coze API 测试页面</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">上传图片</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="image-upload">选择图片</Label>
                <Input 
                  id="image-upload" 
                  type="file" 
                  accept="image/*" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="mt-1" 
                />
              </div>
              
              <div>
                <Label htmlFor="product-type">产品类型</Label>
                <div className="flex gap-4 mt-1">
                  <Button 
                    variant={productType === "wallet" ? "default" : "outline"}
                    onClick={() => setProductType("wallet")}
                  >
                    钱包
                  </Button>
                  <Button 
                    variant={productType === "shirt" ? "default" : "outline"}
                    onClick={() => setProductType("shirt")}
                  >
                    T恤
                  </Button>
                </div>
              </div>
              
              <div>
                <Label htmlFor="color">颜色</Label>
                <div className="flex gap-4 mt-1">
                  {["#FFFFFF", "#000000", "#8C4A3C", "#D9C7B8"].map((c) => (
                    <div
                      key={c}
                      className={`w-8 h-8 rounded-md border-2 cursor-pointer ${
                        color === c ? "border-blue-500" : "border-gray-300"
                      }`}
                      style={{ backgroundColor: c }}
                      onClick={() => setColor(c)}
                    />
                  ))}
                </div>
              </div>
              
              <Button 
                onClick={handleGeneratePreview} 
                disabled={isLoading || !base64Image}
                className="w-full"
              >
                {isLoading ? "生成中..." : "生成预览"}
              </Button>
              
              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">预览结果</h2>
            
            <div className="bg-gray-100 rounded-md aspect-square flex items-center justify-center">
              {isLoading ? (
                <div className="text-center">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <span>生成中...</span>
                </div>
              ) : imageUrl ? (
                <img 
                  src={imageUrl} 
                  alt="预览效果" 
                  className="max-w-full max-h-full object-contain" 
                />
              ) : (
                <div className="text-gray-500">
                  {base64Image ? (
                    <div className="text-center">
                      <div>已上传图片预览</div>
                      <img 
                        src={base64Image} 
                        alt="上传图片" 
                        className="max-w-full max-h-[200px] object-contain mt-2" 
                      />
                    </div>
                  ) : (
                    "请上传图片并点击生成预览"
                  )}
                </div>
              )}
            </div>
            
            {imageUrl && (
              <div className="mt-4">
                <Button className="w-full" onClick={() => window.open(imageUrl, '_blank')}>
                  在新窗口打开图片
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* 显示Base64编码 */}
      {base64Image && (
        <Card className="mt-8">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Base64 编码</h2>
            <div className="bg-gray-100 p-4 rounded-md max-h-[200px] overflow-auto">
              <pre className="text-xs break-all">{base64Image}</pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 