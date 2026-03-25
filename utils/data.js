// 江淮地区景点数据
const attractions = [
  {
    id: 1,
    name: "黄山",
    image: "/images/attractions/huangshan.jpg",
    location: "安徽省黄山市",
    category: "自然风光",
    level: "AAAAA",
    description: "黄山以奇松、怪石、云海、温泉、冬雪“五绝”著称于世，拥有“天下第一奇山”之称。明代旅行家徐霞客曾两次登临黄山，赞叹道：“薄海内外无如徽之黄山，登黄山天下无山，观止矣！”后人引申为“五岳归来不看山，黄山归来不看岳”。",
    coordinates: {
      latitude: 30.1400,
      longitude: 118.1766
    },
    openingHours: "06:30-17:00 (旺季), 07:30-16:30 (淡季)",
    ticketPrice: "190元 (旺季), 150元 (淡季)",
    audioGuide: "/audios/huangshan.mp3",
    images: [
      "/images/attractions/huangshan1.jpg",
      "/images/attractions/huangshan2.jpg",
      "/images/attractions/huangshan3.jpg"
    ]
  },
  {
    id: 2,
    name: "九华山",
    image: "/images/attractions/jiuhuashan.jpg",
    location: "安徽省池州市",
    category: "宗教文化",
    level: "AAAAA",
    description: "九华山是中国佛教四大名山之一，是地藏菩萨的道场。景区内古刹林立，香烟缭绕，是佛教徒朝拜的圣地，也是游客们感受佛教文化、欣赏自然风光的好去处。",
    coordinates: {
      latitude: 30.5380,
      longitude: 117.8170
    },
    openingHours: "08:00-17:30",
    ticketPrice: "160元",
    audioGuide: "/audios/jiuhuashan.mp3",
    images: [
      "/images/attractions/jiuhuashan1.jpg",
      "/images/attractions/jiuhuashan2.jpg"
    ]
  },
  {
    id: 3,
    name: "宏村",
    image: "/images/attractions/hongcun.jpg",
    location: "安徽省黄山市黟县",
    category: "古村落",
    level: "AAAAA",
    description: "宏村是徽派古村落的代表，始建于南宋绍熙年间，至今已有800多年历史。整个村落依山傍水而建，村后以青山为屏障，地势高爽，可挡北面来风，既无山洪暴发冲击之危机，又有仰视山色泉声之乐。",
    coordinates: {
      latitude: 30.1167,
      longitude: 117.9667
    },
    openingHours: "07:30-17:30",
    ticketPrice: "104元",
    audioGuide: "/audios/hongcun.mp3",
    images: [
      "/images/attractions/hongcun1.jpg",
      "/images/attractions/hongcun2.jpg"
    ]
  },
  {
    id: 4,
    name: "夫子庙秦淮风光带",
    image: "/images/attractions/fuzimiao.jpg",
    location: "江苏省南京市",
    category: "文化休闲",
    level: "AAAAA",
    description: "夫子庙秦淮风光带以夫子庙古建筑群为中心、十里秦淮为轴线、明城墙为纽带，串联起众多全国重点文物保护单位、省级和市级文物保护单位，以儒家思想与科举文化、民俗文化等为内涵，集旅游观光、美食购物、科普教育、节庆文化等功能于一体。",
    coordinates: {
      latitude: 32.0292,
      longitude: 118.7714
    },
    openingHours: "全天开放 (各景点开放时间不同)",
    ticketPrice: "免费 (部分景点收费)",
    audioGuide: "/audios/fuzimiao.mp3",
    images: [
      "/images/attractions/fuzimiao1.jpg",
      "/images/attractions/fuzimiao2.jpg"
    ]
  },
  {
    id: 5,
    name: "中山陵",
    image: "/images/attractions/zhongshanling.jpg",
    location: "江苏省南京市",
    category: "历史文化",
    level: "AAAAA",
    description: "中山陵是中国近代伟大的民主革命先行者孙中山先生的陵寝，及其附属纪念建筑群，面积8万余平方米。中山陵自1926年春动工，至1929年夏建成，1961年成为首批全国重点文物保护单位。",
    coordinates: {
      latitude: 32.0461,
      longitude: 118.8107
    },
    openingHours: "08:30-17:00 (周一闭馆维护)",
    ticketPrice: "免费 (需预约)",
    audioGuide: "/audios/zhongshanling.mp3",
    images: [
      "/images/attractions/zhongshanling1.jpg",
      "/images/attractions/zhongshanling2.jpg"
    ]
  },
  {
    id: 6,
    name: "瘦西湖",
    image: "/images/attractions/shouxihu.jpg",
    location: "江苏省扬州市",
    category: "自然风光",
    level: "AAAAA",
    description: "瘦西湖在清代康乾时期已形成基本格局，有“园林之盛，甲于天下”之誉。瘦西湖主要分为14大景点，包括五亭桥、二十四桥、荷花池、钓鱼台等。",
    coordinates: {
      latitude: 32.3931,
      longitude: 119.4265
    },
    openingHours: "06:30-18:00 (4-10月), 07:00-17:30 (11-3月)",
    ticketPrice: "100元 (旺季), 60元 (淡季)",
    audioGuide: "/audios/shouxihu.mp3",
    images: [
      "/images/attractions/shouxihu1.jpg",
      "/images/attractions/shouxihu2.jpg"
    ]
  }
];

// 旅游路线数据
const rawRoutes = [
  {
    id: 1,
    name: "江淮文化双遗之旅",
    days: 5,
    image: "/images/routes/route1.jpg",
    description: "探访黄山与宏村，感受世界文化与自然双遗产的魅力，体验徽派文化精髓。",
    attractions: [1, 3, { name: "西递", location: "安徽省黄山市黟县" }, { name: "屯溪老街", location: "安徽省黄山市屯溪区" }],
    itinerary: [
      "Day1: 抵达黄山，入住山脚酒店，夜游屯溪老街",
      "Day2: 全天游览黄山风景区，宿山上",
      "Day3: 继续游览黄山，下午下山前往宏村，宿宏村",
      "Day4: 游览宏村，下午前往西递，宿西递",
      "Day5: 游览西递，结束行程"
    ]
  },
  {
    id: 2,
    name: "金陵怀古之旅",
    days: 3,
    image: "/images/routes/route2.jpg",
    description: "漫步南京古城，探寻六朝古都的历史遗迹，感受金陵文化的深厚底蕴。",
    attractions: [4, 5, { name: "明孝陵", location: "江苏省南京市" }, { name: "南京博物院", location: "江苏省南京市" }],
    itinerary: [
      "Day1: 抵达南京，游览中山陵、明孝陵",
      "Day2: 参观南京博物院，下午游览夫子庙秦淮风光带，夜游秦淮河",
      "Day3: 游览总统府、南京大屠杀遇难同胞纪念馆，结束行程"
    ]
  },
  {
    id: 3,
    name: "江淮山水风情之旅",
    days: 4,
    image: "/images/routes/route3.jpg",
    description: "从南京出发，途经扬州，最终抵达九华山，领略江淮地区多样的山水风情。",
    attractions: [4, 6, 2, { name: "个园", location: "江苏省扬州市" }],
    itinerary: [
      "Day1: 南京集合，游览夫子庙秦淮风光带",
      "Day2: 前往扬州，游览瘦西湖、个园",
      "Day3: 前往九华山，游览九华街景区",
      "Day4: 游览九华山核心景区，结束行程"
    ]
  }
];

const attractionMap = attractions.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {});

function resolveRouteAttraction(item) {
  if (typeof item === 'number') {
    const matched = attractionMap[item];
    if (!matched) {
      return { id: null, name: `景点${item}`, location: "待补充", canNavigate: false };
    }
    return {
      id: matched.id,
      name: matched.name,
      location: matched.location,
      canNavigate: true
    };
  }

  const id = typeof item.id === 'number' ? item.id : null;
  return {
    id: id,
    name: item.name || "未命名景点",
    location: item.location || "待补充",
    canNavigate: !!id
  };
}

function withResolvedAttractions(route) {
  return {
    ...route,
    attractions: (route.attractions || []).map(resolveRouteAttraction)
  };
}

function getRouteList() {
  return rawRoutes.map(withResolvedAttractions);
}

function getRouteDetail(id) {
  const route = rawRoutes.find(item => item.id === id);
  return route ? withResolvedAttractions(route) : null;
}

const attractionGuideMap = {
  1: {
    transport: "建议早上从黄山市区或汤口镇出发，优先乘景区换乘车上山。",
    entry: "旺季客流较大，建议提前预约并错峰入园，优先确认索道开放情况。",
    route: "推荐“云谷寺-白鹅岭-始信峰-狮子峰-光明顶”主线，体力充足可延伸西海大峡谷。",
    duration: "建议游览 1-2 天。",
    tips: "山上早晚温差大，建议备防风外套和防滑鞋。"
  },
  2: {
    transport: "可先到池州或青阳，再换乘景区交通进入九华山核心区域。",
    entry: "节假日建议提前到达，寺院礼佛区域请遵守秩序、保持安静。",
    route: "推荐“九华街-化城寺-百岁宫-天台景区”线路，兼顾文化和山景。",
    duration: "建议游览 1 天。",
    tips: "台阶较多，建议穿轻便登山鞋并准备饮水。"
  },
  3: {
    transport: "可从黄山市区前往黟县后进入宏村，景区周边停车位节假日较紧张。",
    entry: "古村巷道较窄，建议步行慢游，尽量避开旅行团高峰时段。",
    route: "推荐“南湖-月沼-承志堂-雷岗山观景”环线。",
    duration: "建议游览 3-5 小时。",
    tips: "古建木构较多，参观时请勿触碰脆弱构件。"
  },
  4: {
    transport: "南京地铁 1 号线可达夫子庙周边，夜游建议优先公共交通。",
    entry: "秦淮河沿线夜间人流密集，建议提前规划用餐和游船时段。",
    route: "推荐“夫子庙-贡院街区-秦淮河步道-老门东”夜游动线。",
    duration: "建议游览 4-6 小时。",
    tips: "夜间拍照注意保管随身物品，热门时段排队时间较长。"
  },
  5: {
    transport: "可乘地铁至钟山风景区附近后换乘景区接驳。",
    entry: "中山陵部分时段需预约，建议提前核对当日开放安排。",
    route: "推荐“博爱坊-陵门-392 级台阶-祭堂”主游览线。",
    duration: "建议游览 2-4 小时。",
    tips: "台阶路段较长，建议轻装并根据体力安排停留。"
  },
  6: {
    transport: "扬州市区前往瘦西湖较方便，建议优先公交或打车到南门/西门。",
    entry: "旺季建议上午入园，船游项目可提前排队避免集中拥堵。",
    route: "推荐“五亭桥-二十四桥-白塔-徐园”经典园林线。",
    duration: "建议游览 4-6 小时。",
    tips: "临水步道较多，雨天请注意防滑。"
  }
};

const attractionProfileMap = {
  1: {
    slogan: "天下无山，黄山独秀",
    bestSeason: "春秋季",
    recommendedDuration: "1-2天",
    highlights: ["迎客松", "光明顶日出", "西海大峡谷", "云海观景"],
    crowdAdvice: "节假日建议清晨上山，避开索道高峰。"
  },
  2: {
    slogan: "佛国仙山，静心之旅",
    bestSeason: "四季皆宜",
    recommendedDuration: "1天",
    highlights: ["九华街", "化城寺", "百岁宫", "天台峰"],
    crowdAdvice: "礼佛时段较集中，上午中后段人流相对平稳。"
  },
  3: {
    slogan: "徽州古韵，水墨乡村",
    bestSeason: "春秋季",
    recommendedDuration: "半天-1天",
    highlights: ["南湖倒影", "月沼夜景", "承志堂木雕", "雷岗观景"],
    crowdAdvice: "旅行团通常上午抵达，下午体验更舒适。"
  },
  4: {
    slogan: "十里秦淮，古今同游",
    bestSeason: "秋冬夜游",
    recommendedDuration: "半天",
    highlights: ["夫子庙街区", "秦淮河夜景", "乌衣巷", "老门东"],
    crowdAdvice: "夜游高峰在19:00-21:00，建议提前到达。"
  },
  5: {
    slogan: "钟山巍巍，陵园肃穆",
    bestSeason: "春秋季",
    recommendedDuration: "3-4小时",
    highlights: ["博爱坊", "392级台阶", "祭堂", "钟山风景区联动"],
    crowdAdvice: "周末上午客流较大，建议错峰下午入园。"
  },
  6: {
    slogan: "烟雨扬州，园林诗意",
    bestSeason: "春季",
    recommendedDuration: "半天",
    highlights: ["五亭桥", "二十四桥", "白塔", "徐园"],
    crowdAdvice: "旺季中午后游船排队较长，可先步游再船游。"
  }
};

function getAttractionGuideText(id) {
  const attraction = attractions.find(item => item.id === id);
  if (!attraction) return "暂无导览信息";

  const guide = attractionGuideMap[id] || {};
  const lines = [
    `景点：${attraction.name}`,
    `位置：${attraction.location}`,
    `开放时间：${attraction.openingHours || "以景区公告为准"}`,
    `门票：${attraction.ticketPrice || "以景区公告为准"}`,
    "",
    `到达建议：${guide.transport || "建议提前查看交通与停车信息。"}`,
    `入园建议：${guide.entry || "建议错峰出行，提前确认开放政策。"}`,
    `推荐动线：${guide.route || "可结合景区导览图灵活安排游览顺序。"}`,
    `建议时长：${guide.duration || "建议预留半天以上游览时间。"}`,
    `注意事项：${guide.tips || "请遵守景区管理规定，注意安全。"}`
  ];
  return lines.join("\n");
}

module.exports = {
  attractions: attractions,
  routes: getRouteList(),
  getRouteList: getRouteList,
  getRouteDetail: getRouteDetail,
  getAttractionGuideText: getAttractionGuideText,
  // 获取景点详情
  getAttractionDetail: function(id) {
    const base = attractions.find(item => item.id === id);
    if (!base) return null;
    const profile = attractionProfileMap[id] || {};
    return {
      ...base,
      slogan: profile.slogan || "",
      bestSeason: profile.bestSeason || "四季皆宜",
      recommendedDuration: profile.recommendedDuration || "半天",
      highlights: profile.highlights || [],
      crowdAdvice: profile.crowdAdvice || "建议错峰出行以获得更好体验。"
    };
  },
  // 按分类筛选景点
  getAttractionsByCategory: function(category) {
    if (!category || category === "全部") {
      return attractions;
    }
    return attractions.filter(item => item.category === category);
  },
  // 搜索景点
  searchAttractions: function(keyword) {
    if (!keyword) return attractions;
    const key = keyword.toLowerCase();
    return attractions.filter(item =>
      item.name.toLowerCase().includes(key) ||
      item.location.toLowerCase().includes(key) ||
      item.description.toLowerCase().includes(key)
    );
  }
};
