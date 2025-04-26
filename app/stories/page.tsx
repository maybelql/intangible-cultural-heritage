"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Filter, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"

// 故事数据类型
interface Story {
  id: number;
  title: string;
  description: string;
  region: string;
  category: string;
  period: string;
  image: string;
  views: number;
}

// 模拟数据
const MOCK_STORIES: Story[] = [
  {
    id: 1,
    title: "景德镇青花瓷的传承故事",
    description: "探索景德镇青花瓷背后的匠人精神与文化底蕴，感受非物质文化遗产的独特魅力...",
    region: "华东",
    category: "传统技艺",
    period: "明清时期",
    image: "/placeholder.svg?height=200&width=300&text=非遗故事1",
    views: 1230
  },
  {
    id: 2,
    title: "苏州刺绣的传承故事",
    description: "探索苏州刺绣背后的匠人精神与文化底蕴，感受非物质文化遗产的独特魅力...",
    region: "华东",
    category: "传统美术",
    period: "明清时期",
    image: "/placeholder.svg?height=200&width=300&text=非遗故事2",
    views: 1120
  },
  {
    id: 3,
    title: "川剧变脸的传承故事",
    description: "探索川剧变脸背后的匠人精神与文化底蕴，感受非物质文化遗产的独特魅力...",
    region: "西南",
    category: "传统戏剧",
    period: "清代",
    image: "/placeholder.svg?height=200&width=300&text=非遗故事3",
    views: 1567
  },
  {
    id: 4,
    title: "云南扎染的传承故事",
    description: "探索云南扎染背后的匠人精神与文化底蕴，感受非物质文化遗产的独特魅力...",
    region: "西南",
    category: "传统技艺",
    period: "明清时期",
    image: "/placeholder.svg?height=200&width=300&text=非遗故事4",
    views: 986
  },
  {
    id: 5,
    title: "北京景泰蓝的传承故事",
    description: "探索北京景泰蓝背后的匠人精神与文化底蕴，感受非物质文化遗产的独特魅力...",
    region: "华北",
    category: "传统美术",
    period: "明清时期",
    image: "/placeholder.svg?height=200&width=300&text=非遗故事5",
    views: 1340
  },
  {
    id: 6,
    title: "粤绣的传承故事",
    description: "探索粤绣背后的匠人精神与文化底蕴，感受非物质文化遗产的独特魅力...",
    region: "华南",
    category: "传统美术",
    period: "清代",
    image: "/placeholder.svg?height=200&width=300&text=非遗故事6",
    views: 890
  },
  {
    id: 7,
    title: "陕西皮影戏的传承故事",
    description: "探索陕西皮影戏背后的匠人精神与文化底蕴，感受非物质文化遗产的独特魅力...",
    region: "西北",
    category: "传统戏剧",
    period: "宋元时期",
    image: "/placeholder.svg?height=200&width=300&text=非遗故事7",
    views: 760
  },
  {
    id: 8,
    title: "苗族银饰的传承故事",
    description: "探索苗族银饰背后的匠人精神与文化底蕴，感受非物质文化遗产的独特魅力...",
    region: "西南",
    category: "传统技艺",
    period: "近现代",
    image: "/placeholder.svg?height=200&width=300&text=非遗故事8",
    views: 1020
  },
  {
    id: 9,
    title: "敦煌壁画的传承故事",
    description: "探索敦煌壁画背后的匠人精神与文化底蕴，感受非物质文化遗产的独特魅力...",
    region: "西北",
    category: "传统美术",
    period: "唐代以前",
    image: "/placeholder.svg?height=200&width=300&text=非遗故事9",
    views: 1650
  }
];

// 地区选项
const REGIONS = ["华北", "华东", "华南", "西南", "西北"];
// 类别选项
const CATEGORIES = ["传统技艺", "传统美术", "传统音乐", "传统戏剧", "传统舞蹈"];
// 年代选项
const PERIODS = ["唐代以前", "宋元时期", "明清时期", "近现代"];

export default function StoriesPage() {
  // 搜索关键词
  const [searchTerm, setSearchTerm] = useState("");
  // 当前展示类型
  const [currentTab, setCurrentTab] = useState("all");
  // 筛选状态
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([]);
  // 筛选后的故事列表
  const [filteredStories, setFilteredStories] = useState<Story[]>(MOCK_STORIES);

  // 处理地区筛选变化
  const handleRegionChange = (region: string) => {
    setSelectedRegions(prev => 
      prev.includes(region) 
        ? prev.filter(r => r !== region)
        : [...prev, region]
    );
  };

  // 处理类别筛选变化
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // 处理年代筛选变化
  const handlePeriodChange = (period: string) => {
    setSelectedPeriods(prev => 
      prev.includes(period) 
        ? prev.filter(p => p !== period)
        : [...prev, period]
    );
  };

  // 应用筛选
  const applyFilters = () => {
    let results = [...MOCK_STORIES];
    
    // 根据搜索词筛选
    if (searchTerm) {
      results = results.filter(story => 
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // 根据地区筛选
    if (selectedRegions.length > 0) {
      results = results.filter(story => selectedRegions.includes(story.region));
    }
    
    // 根据类别筛选
    if (selectedCategories.length > 0) {
      results = results.filter(story => selectedCategories.includes(story.category));
    }
    
    // 根据年代筛选
    if (selectedPeriods.length > 0) {
      results = results.filter(story => selectedPeriods.includes(story.period));
    }
    
    // 根据当前标签排序
    if (currentTab === "popular") {
      results = [...results].sort((a, b) => b.views - a.views);
    } else if (currentTab === "latest") {
      // 假设id越大代表越新
      results = [...results].sort((a, b) => b.id - a.id);
    }
    
    setFilteredStories(results);
  };

  // 重置筛选条件
  const resetFilters = () => {
    setSelectedRegions([]);
    setSelectedCategories([]);
    setSelectedPeriods([]);
    setSearchTerm("");
  };

  // 监听筛选条件变化
  useEffect(() => {
    applyFilters();
  }, [currentTab]);

  return (
    <div className="flex min-h-screen flex-col bg-[#FFFBF5]">
      <Navigation />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-[#8C4A3C] mb-8">非遗故事</h1>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar Filters */}
            <div className="w-full md:w-64 shrink-0">
              <div className="bg-white rounded-lg border border-[#D9C7B8] p-4 sticky top-20">
                <h2 className="font-bold text-lg mb-4 flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  筛选条件
                </h2>

                <div className="space-y-6">
                  {/* Region Filter */}
                  <div>
                    <h3 className="font-medium text-sm mb-2">地区</h3>
                    <div className="space-y-2">
                      {REGIONS.map((region) => (
                        <div key={region} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`region-${region}`}
                            checked={selectedRegions.includes(region)}
                            onChange={() => handleRegionChange(region)}
                            className="h-4 w-4 rounded border-gray-300 text-[#8C4A3C] focus:ring-[#8C4A3C]"
                          />
                          <label htmlFor={`region-${region}`} className="ml-2 text-sm">
                            {region}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div>
                    <h3 className="font-medium text-sm mb-2">类别</h3>
                    <div className="space-y-2">
                      {CATEGORIES.map((category) => (
                        <div key={category} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategoryChange(category)}
                            className="h-4 w-4 rounded border-gray-300 text-[#8C4A3C] focus:ring-[#8C4A3C]"
                          />
                          <label htmlFor={`category-${category}`} className="ml-2 text-sm">
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Time Period Filter */}
                  <div>
                    <h3 className="font-medium text-sm mb-2">年代</h3>
                    <div className="space-y-2">
                      {PERIODS.map((period) => (
                        <div key={period} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`period-${period}`}
                            checked={selectedPeriods.includes(period)}
                            onChange={() => handlePeriodChange(period)}
                            className="h-4 w-4 rounded border-gray-300 text-[#8C4A3C] focus:ring-[#8C4A3C]"
                          />
                          <label htmlFor={`period-${period}`} className="ml-2 text-sm">
                            {period}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-[#8C4A3C] hover:bg-[#6D3A2F]"
                      onClick={applyFilters}
                    >
                      应用筛选
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 border-[#8C4A3C] text-[#8C4A3C]"
                      onClick={resetFilters}
                    >
                      重置
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="搜索非遗故事、传承人..."
                  className="pl-10 border-[#D9C7B8] focus-visible:ring-[#8C4A3C]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && applyFilters()}
                />
              </div>

              {/* Tabs */}
              <Tabs defaultValue="all" className="mb-6" onValueChange={setCurrentTab}>
                <TabsList className="bg-[#F0E6D9]">
                  <TabsTrigger value="all" className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white">
                    全部
                  </TabsTrigger>
                  <TabsTrigger
                    value="popular"
                    className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
                  >
                    热门
                  </TabsTrigger>
                  <TabsTrigger
                    value="latest"
                    className="data-[state=active]:bg-[#8C4A3C] data-[state=active]:text-white"
                  >
                    最新
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Filter Summary */}
              {(selectedRegions.length > 0 || selectedCategories.length > 0 || selectedPeriods.length > 0 || searchTerm) && (
                <div className="mb-4 p-3 bg-[#F9F5F1] rounded-lg">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-sm font-medium text-[#8C4A3C]">筛选条件:</span>
                    
                    {searchTerm && (
                      <span className="text-xs px-2 py-1 bg-[#8C4A3C]/10 text-[#8C4A3C] rounded-full flex items-center">
                        搜索: {searchTerm}
                      </span>
                    )}
                    
                    {selectedRegions.map(region => (
                      <span key={region} className="text-xs px-2 py-1 bg-[#8C4A3C]/10 text-[#8C4A3C] rounded-full flex items-center">
                        {region}
                      </span>
                    ))}
                    
                    {selectedCategories.map(category => (
                      <span key={category} className="text-xs px-2 py-1 bg-[#8C4A3C]/10 text-[#8C4A3C] rounded-full flex items-center">
                        {category}
                      </span>
                    ))}
                    
                    {selectedPeriods.map(period => (
                      <span key={period} className="text-xs px-2 py-1 bg-[#8C4A3C]/10 text-[#8C4A3C] rounded-full flex items-center">
                        {period}
                      </span>
                    ))}

                    <button 
                      onClick={resetFilters}
                      className="text-xs text-[#8C4A3C] hover:underline ml-auto"
                    >
                      清除全部
                    </button>
                  </div>
                </div>
              )}

              {/* Results count */}
              <div className="mb-4">
                <p className="text-sm text-gray-500">
                  共找到 <span className="font-medium text-[#8C4A3C]">{filteredStories.length}</span> 个结果
                </p>
              </div>

              {/* Stories Grid */}
              {filteredStories.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredStories.map((story) => (
                    <Link href={`/stories/${story.id}`} key={story.id}>
                      <Card className="overflow-hidden border-[#D9C7B8] hover:shadow-md transition-shadow">
                        <div className="relative h-48">
                          <Image
                            src={story.image}
                            alt={story.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <div className="flex items-center text-white text-xs">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span>{story.region}</span>
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-bold text-lg mb-2 line-clamp-1">
                            {story.title}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {story.description}
                          </p>
                          <div className="flex justify-between items-center mt-3">
                            <span className="text-xs px-2 py-1 bg-[#8C4A3C]/10 text-[#8C4A3C] rounded-full">
                              {story.category}
                            </span>
                            <span className="text-xs text-gray-500">阅读量 {story.views}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg border border-[#D9C7B8]">
                  <div className="w-20 h-20 bg-[#F0E6D9] rounded-full flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-[#8C4A3C]" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">未找到相关故事</h3>
                  <p className="text-sm text-gray-500 mb-6">请尝试其他筛选条件或重置筛选</p>
                  <Button 
                    className="bg-[#8C4A3C] hover:bg-[#6D3A2F]"
                    onClick={resetFilters}
                  >
                    重置筛选
                  </Button>
                </div>
              )}

              {filteredStories.length > 0 && (
                /* Pagination */
                <div className="flex justify-center mt-8">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" className="border-[#D9C7B8]">
                      <span className="sr-only">上一页</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                    </Button>
                    <Button variant="outline" className="border-[#D9C7B8] bg-[#8C4A3C] text-white">
                      1
                    </Button>
                    <Button variant="outline" className="border-[#D9C7B8]">
                      2
                    </Button>
                    <Button variant="outline" size="icon" className="border-[#D9C7B8]">
                      <span className="sr-only">下一页</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#8C4A3C] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">关于寻遗</h3>
              <p className="text-sm opacity-80">
                寻遗是一个致力于中国非物质文化遗产保护与传承的数字平台，连接传统与现代，促进非遗文化的可持续发展。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">快速链接</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <Link href="/stories">非遗故事</Link>
                </li>
                <li>
                  <Link href="/inheritance">非遗传承</Link>
                </li>
                <li>
                  <Link href="/design">设计城</Link>
                </li>
                <li>
                  <Link href="/profile">个人中心</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">联系我们</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li>邮箱: contact@xunyi.com</li>
                <li>电话: 18670905213</li>
                <li>地址: xxxxxxxx</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">关注我们</h3>
              <div className="flex space-x-4">
                {/* Social media icons would go here */}
                <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                <div className="w-8 h-8 bg-white/20 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm opacity-70">
            <p>© {new Date().getFullYear()} 寻遗 - 非物质文化遗产数字平台. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
