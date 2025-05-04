// 商品数据类型定义
export interface ShopItemDetail {
  id: number;
  title: string;
  description: string;
  category: string;
  price: string;
  sales: string;
  image: string;
  artisan: string;
  material?: string;
  size?: string;
  origin?: string;
  relatedItems: number[];
}

// 商品数据
const shopItemsData: ShopItemDetail[] = [
  {
    id: 1,
    title: "牡丹刺绣丝巾",
    description: "传统牡丹纹样，纯手工刺绣",
    category: "刺绣作品",
    price: "¥1280",
    sales: "已售 156",
    image: "/photo/刺绣/刺绣-牡丹花1.jpg",
    artisan: "张丽华",
    material: "100%桑蚕丝",
    size: "90cm × 90cm",
    origin: "苏州",
    relatedItems: [4, 5, 6]
  },
  {
    id: 2,
    title: "龙纹木雕摆件",
    description: "传统龙纹雕刻，精美工艺",
    category: "木雕工艺",
    price: "¥980",
    sales: "已售 89",
    image: "/photo/木雕/木雕-龙纹1.jpg",
    artisan: "李明",
    material: "优质红木",
    size: "30cm × 15cm × 10cm",
    origin: "东阳",
    relatedItems: [5, 6, 3]
  },
  {
    id: 3,
    title: "粉彩花鸟茶具",
    description: "景德镇粉彩工艺，精美花鸟",
    category: "陶瓷艺术",
    price: "¥680",
    sales: "已售 64",
    image: "/photo/陶瓷纹样/陶瓷纹样-粉彩花鸟1.jpg",
    artisan: "王建国",
    material: "高级瓷土",
    size: "一壶四杯，壶高12cm",
    origin: "景德镇",
    relatedItems: [6, 1, 2]
  },
  {
    id: 4,
    title: "蝴蝶刺绣团扇",
    description: "传统蝴蝶纹样，精美刺绣",
    category: "刺绣作品",
    price: "¥880",
    sales: "已售 42",
    image: "/photo/刺绣/刺绣-蝴蝶1.jpg",
    artisan: "陈玉兰",
    material: "桑蚕丝线，竹骨",
    size: "直径25cm",
    origin: "杭州",
    relatedItems: [1, 5, 6]
  },
  {
    id: 5,
    title: "人物木雕摆件",
    description: "传统人物雕刻，精湛工艺",
    category: "木雕工艺",
    price: "¥1280",
    sales: "已售 38",
    image: "/photo/木雕/木雕-人物1.jpg",
    artisan: "赵大伟",
    material: "黄杨木",
    size: "高20cm",
    origin: "福建",
    relatedItems: [2, 3, 4]
  },
  {
    id: 6,
    title: "青花缠枝莲茶具",
    description: "传统青花工艺，精美纹样",
    category: "陶瓷艺术",
    price: "¥980",
    sales: "已售 29",
    image: "/photo/陶瓷纹样/陶瓷纹样-青花缠枝莲1.jpg",
    artisan: "刘艺",
    material: "景德镇瓷土",
    size: "一壶六杯，壶高15cm",
    origin: "景德镇",
    relatedItems: [3, 1, 2]
  }
];

// 根据ID获取商品详细信息
export function getShopItemById(id: number): ShopItemDetail | undefined {
  return shopItemsData.find(item => item.id === id);
}

// 获取相关商品
export function getRelatedShopItems(ids: number[]): ShopItemDetail[] {
  return ids.map(id => shopItemsData.find(item => item.id === id)).filter((item): item is ShopItemDetail => !!item);
}

// 获取所有商品
export function getAllShopItems(): ShopItemDetail[] {
  return shopItemsData;
}

// 根据分类获取商品
export function getShopItemsByCategory(category: string): ShopItemDetail[] {
  return shopItemsData.filter(item => item.category === category);
}
