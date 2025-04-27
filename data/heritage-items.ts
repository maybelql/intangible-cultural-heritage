// 非遗项目详细信息数据
export interface HeritageItemDetail {
  id: number;
  name: string;
  category: string;
  province: string;
  city: string;
  description: string;
  history: string;
  technique: string;
  inheritor: string;
  images: {
    hero: string;
    gallery: string[];
    video?: string;
  };
  relatedItems: number[];
}

export const heritageItemsData: HeritageItemDetail[] = [
  {
    id: 1,
    name: "南京云锦",
    category: "传统技艺",
    province: "江苏",
    city: "南京市",
    description: "南京云锦是中国传统丝织工艺，以其精美华丽的图案和复杂的织造技术闻名于世。云锦织造技艺已有1500多年历史，被誉为\"中国织锦之冠\"。",
    history: "云锦起源于三国时期，盛于唐宋，明清时期达到鼎盛。明代，南京成为全国的织锦中心，云锦被指定为皇家御用织物，用于龙袍、朝服等皇家服饰。",
    technique: "云锦织造采用多梭多综提花技术，一匹云锦往往需要数月甚至数年才能完成。传统云锦织机复杂，需要两人配合操作，一人在上机操作综，一人在下机穿梭引纬。",
    inheritor: "姚惠芬，国家级非物质文化遗产南京云锦传统工艺代表性传承人，从事云锦研究与制作40余年，致力于云锦传统工艺的保护与创新。",
    images: {
      hero: "/photo/刺绣/刺绣-如意纹1.jpg",
      gallery: [
        "/photo/刺绣/苏绣花鸟纹1.jpg",
        "/photo/刺绣/刺绣-凤凰1.jpg",
        "/photo/刺绣/刺绣-如意纹1.jpg"
      ]
    },
    relatedItems: [2, 5, 8]
  },
  {
    id: 2,
    name: "苏州刺绣",
    category: "传统技艺",
    province: "江苏",
    city: "苏州市",
    description: "苏州刺绣，简称\"苏绣\"，是中国传统刺绣中的一个重要流派，以其精细、雅致、光洁、平整、色彩协调、构图合理而著称于世。苏绣的历史可以追溯到春秋战国时期，距今已有2000多年的历史。",
    history: "苏绣起源于春秋战国时期，唐宋时期已相当发达，明清时期达到鼎盛。清代，苏绣成为宫廷御用刺绣，并远销海外。",
    technique: "苏绣以其\"平、细、密、匀、和、顺\"的特点闻名于世。苏绣的针法多达40余种，主要有平针、乱针、套针、滚针、接针等。苏绣的题材广泛，包括人物、山水、花鸟、鱼虫等，尤以双面绣最为精妙，正反两面均可观赏，针法一致，图案相同，色彩一致。",
    inheritor: "姚建萍，国家级非物质文化遗产苏绣代表性传承人，从事苏绣研究与制作50余年，作品多次获国际大奖。",
    images: {
      hero: "/photo/刺绣/苏绣花鸟纹1.jpg",
      gallery: [
        "/photo/刺绣/粤绣牡丹1.jpg",
        "/photo/刺绣/蜀绣龙凤1.jpg",
        "/photo/刺绣/湘绣山水1.png"
      ]
    },
    relatedItems: [1, 7, 11]
  },
  {
    id: 3,
    name: "昆曲",
    category: "传统戏剧",
    province: "江苏",
    city: "苏州市",
    description: "昆曲，又称昆剧、昆腔，是中国最古老的戏曲剧种之一，被誉为\"百戏之祖\"，2001年被联合国教科文组织列为\"人类口述和非物质遗产代表作\"。",
    history: "昆曲起源于明代嘉靖年间的江苏昆山，距今已有600多年历史。明清两代，昆曲在全国广泛流传，成为当时最重要的戏曲剧种。",
    technique: "昆曲表演讲究\"字正腔圆\"，动作细腻优美，表演程式化，音乐以曲为主，伴奏乐器以笛、箫、琵琶等为主。昆曲的表演要求演员具备\"唱、念、做、打\"四种基本功。",
    inheritor: "张继青，国家级非物质文化遗产昆曲代表性传承人，北方昆曲剧院院长，从事昆曲表演与研究40余年。",
    images: {
      hero: "/photo/木雕/木雕-人物1.jpg",
      gallery: [
        "/photo/木雕/木雕-人物2.jpg",
        "/photo/木雕/黄杨木雕人物1.jpg",
        "/photo/木雕/黄杨木雕人物2.jpg"
      ]
    },
    relatedItems: [9, 12, 14]
  },
  {
    id: 4,
    name: "西湖龙井茶艺",
    category: "传统技艺",
    province: "浙江",
    city: "杭州市",
    description: "西湖龙井茶是中国十大名茶之一，产于浙江省杭州市西湖龙井村周围群山，具有1200多年历史。西湖龙井茶艺是品茶、赏茶的一种艺术形式，体现了中国传统茶文化的精髓。",
    history: "西湖龙井茶的历史可追溯到唐代，宋代时已负盛名，明清时期达到鼎盛。乾隆皇帝六次南巡，都到西湖龙井村品茶，并赐予\"御茶\"称号。",
    technique: "西湖龙井茶的制作工艺精细，主要包括采摘、杀青、揉捻、烘干四道工序。传统的龙井茶炒制全部采用手工，要求炒茶师具备丰富的经验和精湛的技艺。",
    inheritor: "王水根，国家级非物质文化遗产西湖龙井茶传统炒制技艺代表性传承人，从事龙井茶制作50余年。",
    images: {
      hero: "/photo/陶瓷纹样/陶瓷纹样-青花缠枝莲1.jpg",
      gallery: [
        "/photo/陶瓷纹样/陶瓷纹样-青花缠枝莲2.jpg",
        "/photo/陶瓷纹样/陶瓷纹样-青花缠枝莲3.jpg",
        "/photo/陶瓷纹样/陶瓷纹样-青花缠枝莲4.jpg"
      ]
    },
    relatedItems: [5, 10, 13]
  },
  {
    id: 5,
    name: "杭州丝织技艺",
    category: "传统技艺",
    province: "浙江",
    city: "杭州市",
    description: "杭州丝织技艺是中国传统丝织工艺的重要组成部分，以其精美的图案、华丽的色彩和精湛的工艺闻名于世。杭州丝织品种类繁多，包括丝绸、缎、绫、纱、罗等。",
    history: "杭州丝织业始于五代十国时期，宋代时杭州成为全国丝织业中心，元代时杭州丝织品远销海外，明清时期达到鼎盛。",
    technique: "杭州丝织技艺包括缫丝、织造、染色、印花等多道工序。传统的丝织工艺采用手工操作，需要织工具备丰富的经验和精湛的技艺。",
    inheritor: "金文华，国家级非物质文化遗产杭州丝织技艺代表性传承人，从事丝织研究与制作45余年。",
    images: {
      hero: "/photo/陶瓷纹样/陶瓷纹样-粉彩花鸟1.jpg",
      gallery: [
        "/photo/陶瓷纹样/陶瓷纹样-粉彩花鸟2.jpg",
        "/photo/陶瓷纹样/陶瓷纹样-粉彩花鸟3.jpg",
        "/photo/陶瓷纹样/陶瓷纹样-粉彩花鸟4.jpg"
      ]
    },
    relatedItems: [1, 4, 11]
  },
  {
    id: 6,
    name: "川剧变脸",
    category: "传统戏剧",
    province: "四川",
    city: "成都市",
    description: "川剧变脸是四川省传统戏剧川剧中的特技表演，演员在瞬间变换面部妆容，令人叹为观止。变脸技艺是川剧的代表性绝活，被誉为\"东方魔术\"。",
    history: "川剧变脸起源于清代乾隆年间，最初是为了表现剧中人物的内心变化。经过200多年的发展，变脸技艺不断完善，成为川剧的标志性表演。",
    technique: "川剧变脸的主要技法有抹脸、吹脸、扯脸、揉脸等。变脸的秘诀在于演员的手法快速、准确，同时配合身体动作和音乐节奏，达到瞬间变换的效果。",
    inheritor: "彭登怀，国家级非物质文化遗产川剧变脸技艺代表性传承人，从事川剧表演与研究50余年。",
    images: {
      hero: "/photo/木雕/龙眼木雕1.jpg",
      gallery: [
        "/photo/木雕/龙眼木雕2.jpg",
        "/photo/木雕/龙眼木雕3.jpg",
        "/photo/木雕/龙眼木浮雕1.jpg"
      ]
    },
    relatedItems: [3, 7, 9]
  },
  {
    id: 7,
    name: "蜀绣",
    category: "传统技艺",
    province: "四川",
    city: "成都市",
    description: "蜀绣是中国四大名绣之一，产于四川省，以其色彩鲜艳、构图饱满、针法活泼、题材广泛而著称。蜀绣作品多以花鸟、山水、人物、龙凤为题材。",
    history: "蜀绣起源于汉代，唐宋时期已相当发达，明清时期达到鼎盛。蜀绣曾多次被选为国礼，赠送给外国元首和贵宾。",
    technique: "蜀绣针法多达20余种，主要有平绣、乱针绣、打籽绣、掺针绣等。蜀绣的特点是色彩鲜艳、构图饱满、针法活泼、形象生动。",
    inheritor: "李晓霞，国家级非物质文化遗产蜀绣代表性传承人，从事蜀绣研究与制作40余年。",
    images: {
      hero: "/photo/刺绣/蜀绣龙凤1.jpg",
      gallery: [
        "/photo/刺绣/刺绣-如意纹1.jpg",
        "/photo/刺绣/苏绣花鸟纹1.jpg",
        "/photo/刺绣/粤绣牡丹1.jpg"
      ]
    },
    relatedItems: [2, 11, 13]
  },
  {
    id: 8,
    name: "景泰蓝",
    category: "传统技艺",
    province: "北京",
    city: "北京市",
    description: "景泰蓝，又称掐丝珐琅，是中国传统金属工艺品，以铜为胎，以金银丝掐成各种花纹图案，再在花纹间填充珐琅质，经过烧制、磨光、镀金等工序而成。",
    history: "景泰蓝起源于元代，明代景泰年间达到鼎盛，故名\"景泰蓝\"。清代，景泰蓝成为宫廷御用工艺品，并远销海外。",
    technique: "景泰蓝制作工艺复杂，主要包括制胎、掐丝、点蓝、烧制、磨光、镀金等多道工序。传统的景泰蓝制作全部采用手工，要求工匠具备丰富的经验和精湛的技艺。",
    inheritor: "张同禄，国家级非物质文化遗产景泰蓝制作技艺代表性传承人，从事景泰蓝研究与制作50余年。",
    images: {
      hero: "/photo/陶瓷纹样/陶瓷纹样-景泰蓝云纹1.jpg",
      gallery: [
        "/photo/陶瓷纹样/陶瓷纹样-景泰蓝云纹2.jpg",
        "/photo/陶瓷纹样/陶瓷纹样-景泰蓝云纹3.jpg",
        "/photo/陶瓷纹样/陶瓷纹样-景泰蓝云纹4.jpg"
      ]
    },
    relatedItems: [1, 10, 13]
  },
  {
    id: 9,
    name: "京剧",
    category: "传统戏剧",
    province: "北京",
    city: "北京市",
    description: "京剧是中国五大戏曲剧种之一，被誉为\"国粹\"，2010年被联合国教科文组织列入\"人类非物质文化遗产代表作名录\"。京剧融合了多种地方戏曲，形成了自己独特的艺术风格。",
    history: "京剧形成于清代乾隆年间，由徽班进京演出的徽剧与汉剧、昆曲等剧种融合而成。清代道光年间，京剧已成为北京最受欢迎的戏曲剧种。",
    technique: "京剧表演讲究\"唱、念、做、打\"四功，分生、旦、净、丑四种角色。京剧音乐以板式变化为主，伴奏乐器以京胡、京二胡、月琴等为主。",
    inheritor: "梅葆玖，已故国家级非物质文化遗产京剧代表性传承人，京剧大师梅兰芳之子，从事京剧表演与研究60余年。",
    images: {
      hero: "/photo/木雕/木雕-龙纹1.jpg",
      gallery: [
        "/photo/木雕/木雕-龙纹2.jpg",
        "/photo/木雕/木雕-龙纹3.jpg",
        "/photo/木雕/木雕1.jpg"
      ]
    },
    relatedItems: [3, 6, 12]
  },
  {
    id: 10,
    name: "海派剪纸",
    category: "传统美术",
    province: "上海",
    city: "上海市",
    description: "海派剪纸是中国传统剪纸艺术的重要流派，产生于上海，融合了江南剪纸和北方剪纸的特点，以其精细、雅致、新颖的风格著称。",
    history: "海派剪纸起源于清末民初，随着上海开埠后中西文化的交融，海派剪纸吸收了西方绘画、版画等艺术元素，形成了独特的艺术风格。",
    technique: "海派剪纸技法多样，主要有阳剪、阴刻、镂空等。海派剪纸的特点是构图新颖、线条流畅、形象生动、色彩丰富。",
    inheritor: "李守白，国家级非物质文化遗产剪纸代表性传承人，从事剪纸研究与创作50余年。",
    images: {
      hero: "/photo/traditional-arts/paper-cutting1.jpg",
      gallery: [
        "/photo/traditional-arts/paper-cutting2.jpg",
        "/photo/traditional-arts/paper-cutting3.jpg",
        "/photo/traditional-arts/paper-cutting4.jpg"
      ]
    },
    relatedItems: [4, 8, 13]
  },
  {
    id: 11,
    name: "粤绣",
    category: "传统技艺",
    province: "广东",
    city: "广州市",
    description: "粤绣是中国四大名绣之一，产于广东省，以其色彩鲜艳、图案精美、针法多样、立体感强而著称。粤绣作品多以花鸟、山水、人物、龙凤为题材。",
    history: "粤绣起源于唐代，明清时期达到鼎盛。粤绣曾多次被选为国礼，赠送给外国元首和贵宾。",
    technique: "粤绣针法多达30余种，主要有平绣、乱针绣、打籽绣、掺针绣等。粤绣的特点是色彩鲜艳、图案精美、针法多样、立体感强。",
    inheritor: "何小嫦，国家级非物质文化遗产粤绣代表性传承人，从事粤绣研究与制作45余年。",
    images: {
      hero: "/photo/刺绣/粤绣牡丹1.jpg",
      gallery: [
        "/photo/刺绣/刺绣-凤凰1.jpg",
        "/photo/刺绣/苏绣花鸟纹1.jpg",
        "/photo/刺绣/蜀绣龙凤1.jpg"
      ]
    },
    relatedItems: [2, 7, 13]
  },
  {
    id: 12,
    name: "粤剧",
    category: "传统戏剧",
    province: "广东",
    city: "广州市",
    description: "粤剧是中国五大戏曲剧种之一，流行于广东、广西、香港、澳门等地区，以粤语演唱，融合了多种地方戏曲，形成了自己独特的艺术风格。",
    history: "粤剧起源于明代，清代中期形成独立剧种，20世纪初达到鼎盛。粤剧曾多次出国演出，深受海外华人喜爱。",
    technique: "粤剧表演讲究\"唱、做、念、打\"四功，分生、旦、净、丑四种角色。粤剧音乐以板式变化为主，伴奏乐器以高胡、二胡、月琴等为主。",
    inheritor: "红线女，已故国家级非物质文化遗产粤剧代表性传承人，从事粤剧表演与研究70余年。",
    images: {
      hero: "/photo/traditional-drama/cantonese-opera1.jpg",
      gallery: [
        "/photo/traditional-drama/cantonese-opera2.jpg",
        "/photo/traditional-drama/cantonese-opera3.jpg",
        "/photo/traditional-drama/cantonese-opera4.jpg"
      ]
    },
    relatedItems: [3, 6, 9]
  },
  {
    id: 13,
    name: "福州脱胎漆器",
    category: "传统技艺",
    province: "福建",
    city: "福州市",
    description: "福州脱胎漆器是中国传统漆器的重要流派，以其轻巧、坚固、光亮、色彩丰富而著称。脱胎漆器是在泥胎或木胎上多次涂漆，待漆干后将胎体取出而成。",
    history: "福州脱胎漆器起源于唐代，宋元时期已相当发达，明清时期达到鼎盛。福州脱胎漆器曾多次被选为国礼，赠送给外国元首和贵宾。",
    technique: "福州脱胎漆器制作工艺复杂，主要包括制胎、脱胎、涂漆、磨光、装饰等多道工序。传统的脱胎漆器制作全部采用手工，要求工匠具备丰富的经验和精湛的技艺。",
    inheritor: "黄春辉，国家级非物质文化遗产福州脱胎漆器制作技艺代表性传承人，从事漆器研究与制作50余年。",
    images: {
      hero: "/photo/traditional-crafts/fuzhou-lacquer1.jpg",
      gallery: [
        "/photo/traditional-crafts/fuzhou-lacquer2.jpg",
        "/photo/traditional-crafts/fuzhou-lacquer3.jpg",
        "/photo/traditional-crafts/fuzhou-lacquer4.jpg"
      ]
    },
    relatedItems: [4, 8, 10]
  },
  {
    id: 14,
    name: "闽剧",
    category: "传统戏剧",
    province: "福建",
    city: "福州市",
    description: "闽剧是中国地方戏曲剧种之一，流行于福建省福州市及周边地区，以闽语演唱，融合了多种地方戏曲，形成了自己独特的艺术风格。",
    history: "闽剧起源于明代，清代中期形成独立剧种，20世纪初达到鼎盛。闽剧曾多次出国演出，深受海外闽籍华人喜爱。",
    technique: "闽剧表演讲究\"唱、做、念、打\"四功，分生、旦、净、丑四种角色。闽剧音乐以板式变化为主，伴奏乐器以高胡、二胡、月琴等为主。",
    inheritor: "林丽芳，国家级非物质文化遗产闽剧代表性传承人，从事闽剧表演与研究60余年。",
    images: {
      hero: "/photo/traditional-drama/min-opera1.jpg",
      gallery: [
        "/photo/traditional-drama/min-opera2.jpg",
        "/photo/traditional-drama/min-opera3.jpg",
        "/photo/traditional-drama/min-opera4.jpg"
      ]
    },
    relatedItems: [3, 9, 12]
  }
];

// 根据ID获取非遗项目详细信息
export function getHeritageItemById(id: number): HeritageItemDetail | undefined {
  return heritageItemsData.find(item => item.id === id);
}

// 根据省份获取非遗项目
export function getHeritageItemsByProvince(province: string): HeritageItemDetail[] {
  return heritageItemsData.filter(item => item.province === province);
}

// 获取相关非遗项目
export function getRelatedHeritageItems(ids: number[]): HeritageItemDetail[] {
  return heritageItemsData.filter(item => ids.includes(item.id));
}
