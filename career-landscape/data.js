/* =====================================================================
 * 领域大横评底层数据集 · v2 (2026-04)
 *
 * 评分方法论（全部归一化到 0-100）：
 *   compute — 岗位日常工作中「屏幕前编码/建模」相对「湿实验台/实验仪器」的
 *             时间占比。100 = 纯代码，0 = 纯湿实验。定性判断，结合主流岗位
 *             JD 的任务分解。
 *   salary  — 国内 3-7 年经验中高级岗位的年度总薪酬（TC）中位数。以
 *             「传统有机合成应届博士 ≈ 25」「一线大厂资深后端 ≈ 75-80」
 *             「LLM / 量化 / 资深 AIDD 头部 ≈ 95-98」锚定。
 *             数据源：猎聘 / 脉脉 / Levels.fyi / eFinancialCareers (均在
 *             SOURCE_INDEX 中，2024-2026 公开报告)。
 *   growth  — 2025→2030 行业 CAGR 或 2024→2025 岗位发布 YoY 增速：
 *             <10% → 35-55，10-15% → 60-75，15-22% → 75-85，
 *             22-30% → 85-93，30%+ 或 LinkedIn 头部新兴职业 → 93-98。
 *
 * 说明：所有数据为公开市场研究报告汇总 + 作者校准，带有不可避免的主观
 * 成分；每条记录附 sources 字段指向 SOURCE_INDEX，读者可溯源重新评估。
 * ===================================================================== */

const DOMAIN_DATA = [
  // ===== 计算机 =====
  {
    field: "LLM 大模型算法", category: "计算机",
    compute: 100, salary: 95, growth: 95,
    desc: "负责基础模型的预训练、对齐、推理与评测；纯代码与数学工作。",
    salaryAnchor: "2026 校招硕士 SP 40-60 万；字节/阿里 AI 方向月薪 4-6 万（年包 ~80-100 万）；顶级博士/竞赛金牌 100-350 万。",
    growthAnchor: "LinkedIn《Jobs on the Rise 2026》将 AI Engineer 列为 U.S. 增速第一；生成式 AI 市场 CAGR 多家机构测算 25-35%。",
    sources: ["linkedin-jobs-rise-2026", "csdn-2026-ai-campus", "gv-ai-drug-discovery"]
  },
  {
    field: "搜广推算法", category: "计算机",
    compute: 100, salary: 85, growth: 55,
    desc: "广告 CTR/CVR、推荐召回排序、搜索相关性；特征工程与 AB 实验驱动。",
    salaryAnchor: "阿里 P7 算法 91-118 万，腾讯 T3-2 / 字节 2-2 同量级；资深搜广推曾是薪资天花板，现已被 LLM 岗分流。",
    growthAnchor: "程序化广告市场 CAGR 22.8% (Grand View 2024-2030) 但大厂算法中台扩编已趋缓，近两年岗位增量主要流向 GenAI 应用。",
    sources: ["alibaba-levels", "gv-programmatic"]
  },
  {
    field: "后端开发 / 架构", category: "计算机",
    compute: 100, salary: 72, growth: 50,
    desc: "后端服务、分布式系统、数据库与中间件；经典互联网工程岗。",
    salaryAnchor: "阿里 P6 资深后端 48-64 万、P7 91-118 万；一线大厂外二/三线城市或传统行业折扣明显。",
    growthAnchor: "BLS 预测美国软件开发者岗位 2023-2033 年 +17%（~1.6% 年复合）；国内大厂 2023-2025 持续优化，Copilot 类工具对岗位数量构成压力。",
    sources: ["alibaba-levels", "bls-software"]
  },
  {
    field: "底层系统 / 云计算", category: "计算机",
    compute: 100, salary: 80, growth: 82,
    desc: "内核、分布式存储、调度、网络协议栈、云原生基础设施。",
    salaryAnchor: "大厂 infra / 内核方向相对通用后端有 10-20% 溢价；资深 ~70-130 万。",
    growthAnchor: "Gartner: 2025 全球公有云支出 $7234 亿、同比 +21.5%；Mordor 2025-2030 CAGR 21.2%；AI 算力基建放大基础设施岗需求。",
    sources: ["gartner-cloud-2025", "mordor-cloud"]
  },
  {
    field: "嵌入式 / IoT", category: "计算机",
    compute: 85, salary: 52, growth: 68,
    desc: "面向 MCU/SoC 的固件、驱动、RTOS；汽车电子与工业 IoT 主战场。",
    salaryAnchor: "国内中高级嵌入式 25-55 万；新能源车电子/机器人相关岗位有 10-20% 溢价，但整体仍低于互联网后端。",
    growthAnchor: "Mordor: IoT 市场 2025-2030 CAGR 15.04%；IoT Analytics 预计 2030 年联网设备 390 亿台；国内新能源车+工业 IoT 双引擎。",
    sources: ["mordor-iot", "iot-analytics"]
  },

  // ===== 金融 =====
  {
    field: "量化金融 (Quant)", category: "金融",
    compute: 100, salary: 97, growth: 60,
    desc: "统计/机器学习信号挖掘、低延迟交易系统、组合优化；纯数学与代码。",
    salaryAnchor: "Levels.fyi: Citadel QR L1-L3 TC $336-650k+；Jane Street QR 中位 $300k；国内头部私募（九坤/幻方/明汯）资深研究员年包 200-1000 万+。",
    growthAnchor: "行业门槛高、扩招谨慎，非 CAGR 驱动；2024-2025 国内监管收紧后新设岗位放缓，但头部机构始终保持高溢价选择性招聘。",
    sources: ["levels-citadel-qr", "efc-quant-salary"]
  },

  // ===== 交叉 =====
  {
    field: "AI 药物设计 (AIDD)", category: "交叉",
    compute: 90, salary: 78, growth: 92,
    desc: "分子生成、结构预测、DEL/虚拟筛选、蛋白设计；ML-Scientist 岗位。",
    salaryAnchor: "国内晶泰/英矽智能/深势/分子之心等资深研究员 50-120 万；美国 Isomorphic/Recursion/Insitro 资深 ML-Scientist $300-600k TC。",
    growthAnchor: "Grand View: AI-in-Drug-Discovery 市场 CAGR 24.8% (2026-2033)；Fortune Business Insights 给出 30.59% (2024-2030)；保守方 Precedence 9.9%。主流区间 20-30%。",
    sources: ["gv-ai-drug-discovery", "fortune-ai-drug", "precedence-ai-drug"]
  },
  {
    field: "计算生物学 / 生信", category: "交叉",
    compute: 95, salary: 58, growth: 75,
    desc: "多组学数据分析、单细胞/空间转录组、群体遗传、统计模型。",
    salaryAnchor: "国内资深生信工程师 30-70 万（华大/诺禾/贝瑞/百济/药企）；美国资深 Bioinformatician $150-220k。",
    growthAnchor: "生信市场 CAGR 2025-2030 12.9-14.94% (Research & Markets, Allied)；亚太区 CAGR 18.4% 为全球最快。",
    sources: ["rnm-bioinformatics", "allied-bioinformatics"]
  },
  {
    field: "计算化学 (CADD)", category: "化学",
    compute: 95, salary: 60, growth: 68,
    desc: "量子化学、分子动力学、FEP、对接与 QSAR；制药 R&D 常设岗。",
    salaryAnchor: "国内资深 CADD 科学家 40-80 万（药明/恒瑞/百济/晶泰）；美国 Senior Comp Chemist $160-240k。",
    growthAnchor: "CADD 市场 CAGR 9.71%-17.2%（取决于口径，Allied 11.48%、towardshealthcare 17.2%）；与 AIDD 边界融合。",
    sources: ["allied-cadd", "towards-cadd"]
  },

  // ===== 生物 =====
  {
    field: "合成生物学", category: "生物",
    compute: 30, salary: 48, growth: 82,
    desc: "底盘细胞工程、代谢通路设计、DBTL 循环；仍以湿实验为主。",
    salaryAnchor: "国内凯赛/华恒/微构工场等资深科学家 30-60 万；2022-2024 融资寒冬后美股同行（Ginkgo 等）薪资承压。",
    growthAnchor: "多家机构给出 17-22% CAGR：Grand View 17.3%、MarketsandMarkets 20.6%、P.S. Market Research 21.6%。国家「十四五」生物经济规划加持。",
    sources: ["gv-synbio", "mnm-synbio", "psmr-synbio"]
  },
  {
    field: "免疫学 / 抗体研发", category: "生物",
    compute: 20, salary: 60, growth: 72,
    desc: "杂交瘤、噬菌体展示、流式、体内药效；双抗/ADC 是热点子方向。",
    salaryAnchor: "国内百济/信达/荣昌/药明生物资深抗体科学家 40-90 万；美国 Senior Antibody Engineer $160-230k。",
    growthAnchor: "单抗治疗市场 CAGR 2025-2030 11.04-12.4% (Grand View, MarketDataForecast)；双抗/ADC 子领域增速 20%+。",
    sources: ["gv-mab", "mdf-antibodies"]
  },

  // ===== 化学 =====
  {
    field: "电化学 / 电池材料", category: "化学",
    compute: 25, salary: 55, growth: 68,
    desc: "电极/电解液配方、电池循环测试；高镍/固态/钠离子子方向差异大。",
    salaryAnchor: "国内 CATL/BYD/亿纬/国轩资深工程师 30-70 万；美国 Senior Battery Scientist $140-220k。",
    growthAnchor: "EV 电池市场 CAGR 2025-2030 12.19-14.4% (FactMR, knowledge-sourcing)；IEA 预计 2030 年电池需求 >3 TWh，较 2024 的 ~1 TWh 翻 3 倍。BNEF 2025 小幅下调预期。",
    sources: ["iea-ev-2025", "factmr-ev-battery"]
  },
  {
    field: "传统有机合成", category: "化学",
    compute: 10, salary: 28, growth: 38,
    desc: "药物分子设计与合成、路线优化；国内以 CRO 与创新药 medchem 为主。",
    salaryAnchor: "国内 药明/康龙 中级合成化学家 15-35 万；资深 medchem lead 50-80 万；美国资深 medchem $140-200k。",
    growthAnchor: "medchem 市场整体 CAGR 6-8%；国内 CRO 行业自 2023 年中美双边压力下扩张放缓，应届岗位供需恶化。",
    sources: ["allied-cadd", "acs-salaries"]
  },

  // ===== 生物 (锚点) =====
  {
    field: "基因组学", category: "生物",
    compute: 55, salary: 55, growth: 72,
    desc: "测序产线、样本制备、下机数据分析；单细胞与空间组学是增长极。",
    salaryAnchor: "国内华大/诺禾/贝瑞/燃石资深科学家 30-65 万；美国 Senior Genomic Scientist $150-220k。",
    growthAnchor: "MarketsandMarkets: 基因组学整体 CAGR 2025-2030 12.6%；NGS 子市场 14.6%、单细胞 12.2%、空间组学 12.4-23%。",
    sources: ["mnm-genomics", "mnm-ngs", "mnm-single-cell"]
  },
  {
    field: "细胞生物学", category: "生物",
    compute: 15, salary: 32, growth: 58,
    desc: "细胞培养、成像、扰动筛选；基础学科，工业界主要依附于细胞治疗公司。",
    salaryAnchor: "国内细胞生物 postdoc / 初级科学家 15-35 万；美国 NIH 博士后约 $61-75k，工业界 biotech 资深 $130-180k。",
    growthAnchor: "基础细胞生物岗位需求平稳；细胞与基因治疗（CGT）市场 2025-2030 CAGR 18-24% (Precedence, GlobalData) 为存在细分领域提供窗口。",
    sources: ["precedence-cgt", "globaldata-cgt", "nih-postdoc"]
  }
];

// =====================================================================
// 学科配色
// =====================================================================
const CATEGORY_COLORS = {
  "计算机": "#1f77b4",
  "金融":   "#ff7f0e",
  "交叉":   "#e377c2",
  "生物":   "#2ca02c",
  "化学":   "#d62728"
};

// =====================================================================
// 公共信源索引（供 UI 悬停与 Sources 面板引用）
//
// 收集原则：
//   · 只收录 2024-2026 年公开可访问、第三方可复现的报告/数据库
//   · 一级信源优先（咨询公司主报告、政府统计、公司财报、公开薪资平台）
//   · 二级来源（博客/CSDN 行业汇总）仅用于锚定国内校招/大厂薪资口径
// =====================================================================
const SOURCE_INDEX = {
  "linkedin-jobs-rise-2026": {
    title: "LinkedIn Jobs on the Rise 2026 (U.S.)",
    publisher: "LinkedIn News",
    year: 2026,
    url: "https://www.linkedin.com/pulse/linkedin-jobs-rise-2026-25-fastest-growing-roles-us-linkedin-news-dlb1c"
  },
  "csdn-2026-ai-campus": {
    title: "2026 校招 AI 研发岗薪资全景（国内大厂汇总）",
    publisher: "CSDN 行业评述",
    year: 2026,
    url: "https://blog.csdn.net/m0_56255097/article/details/152949691"
  },
  "gv-ai-drug-discovery": {
    title: "AI in Drug Discovery Market, 2033",
    publisher: "Grand View Research",
    year: 2025,
    url: "https://www.grandviewresearch.com/industry-analysis/artificial-intelligence-drug-discovery-market"
  },
  "fortune-ai-drug": {
    title: "AI in Drug Discovery Market Report, 2030",
    publisher: "Fortune Business Insights",
    year: 2025,
    url: "https://www.fortunebusinessinsights.com/artificial-intelligence-in-drug-discovery-market-105354"
  },
  "precedence-ai-drug": {
    title: "AI in Drug Discovery Market Size",
    publisher: "Precedence Research",
    year: 2025,
    url: "https://www.precedenceresearch.com/artificial-intelligence-in-drug-discovery-market"
  },
  "gv-synbio": {
    title: "Synthetic Biology Market Size & Share Report, 2033",
    publisher: "Grand View Research",
    year: 2025,
    url: "https://www.grandviewresearch.com/industry-analysis/synthetic-biology-market"
  },
  "mnm-synbio": {
    title: "Synthetic Biology Market: Growth, Size, Share, and Trends",
    publisher: "MarketsandMarkets",
    year: 2025,
    url: "https://www.marketsandmarkets.com/Market-Reports/synthetic-biology-market-889.html"
  },
  "psmr-synbio": {
    title: "Synthetic Biology Market Size & Growth Report, 2030",
    publisher: "P.S. Market Research",
    year: 2025,
    url: "https://www.psmarketresearch.com/market-analysis/synthetic-biology-market"
  },
  "rnm-bioinformatics": {
    title: "Bioinformatics Market - Forecasts from 2025 to 2030",
    publisher: "Research and Markets",
    year: 2025,
    url: "https://www.researchandmarkets.com/reports/5457536/bioinformatics-market-forecasts-from-2025-to"
  },
  "allied-bioinformatics": {
    title: "Bioinformatics Market Size, Share & Growth Report, 2030",
    publisher: "Allied Market Research",
    year: 2025,
    url: "https://www.alliedmarketresearch.com/bioinformatics-market"
  },
  "allied-cadd": {
    title: "Computer-Aided Drug Discovery Market Study By 2030",
    publisher: "Allied Market Research",
    year: 2025,
    url: "https://www.alliedmarketresearch.com/computer-aided-drug-discovery-market-A16823"
  },
  "towards-cadd": {
    title: "Computer-Aided Drug Design (CADD) Market Trends 2025",
    publisher: "Towards Healthcare",
    year: 2025,
    url: "https://www.towardshealthcare.com/insights/computer-aided-drug-design-cadd-market-sizing"
  },
  "levels-citadel-qr": {
    title: "Citadel Quantitative Researcher Salary | $336K-$650K+",
    publisher: "Levels.fyi",
    year: 2026,
    url: "https://www.levels.fyi/companies/citadel/salaries/data-scientist/title/quantitative-researcher"
  },
  "efc-quant-salary": {
    title: "Quant researcher salaries revealed at 30 hedge funds & trading firms",
    publisher: "eFinancialCareers",
    year: 2025,
    url: "https://www.efinancialcareers.com/news/quant-researcher-salaries"
  },
  "alibaba-levels": {
    title: "大厂 P6/P7/P8 职业技能、薪资水平、成长路线对照表",
    publisher: "阿里云开发者社区",
    year: 2025,
    url: "https://developer.aliyun.com/article/1627864"
  },
  "gv-programmatic": {
    title: "Programmatic Advertising Market Size, 2030",
    publisher: "Grand View Research",
    year: 2024,
    url: "https://www.grandviewresearch.com/industry-analysis/programmatic-advertising-market-report"
  },
  "bls-software": {
    title: "Occupational Outlook: Software Developers",
    publisher: "U.S. Bureau of Labor Statistics",
    year: 2024,
    url: "https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm"
  },
  "gartner-cloud-2025": {
    title: "Worldwide Public Cloud End-User Spending to Total $723 Billion in 2025",
    publisher: "Gartner Press Release",
    year: 2024,
    url: "https://www.gartner.com/en/newsroom/press-releases/2024-11-19-gartner-forecasts-worldwide-public-cloud-end-user-spending-to-total-723-billion-dollars-in-2025"
  },
  "mordor-cloud": {
    title: "Cloud Computing Market Report 2025-2030",
    publisher: "Mordor Intelligence",
    year: 2025,
    url: "https://www.mordorintelligence.com/industry-reports/cloud-computing-market"
  },
  "mordor-iot": {
    title: "Internet of Things (IoT) Market Size, Share & Outlook 2030",
    publisher: "Mordor Intelligence",
    year: 2025,
    url: "https://www.mordorintelligence.com/industry-reports/internet-of-things-iot-market"
  },
  "iot-analytics": {
    title: "Number of connected IoT devices growing 14% to 21.1 billion",
    publisher: "IoT Analytics",
    year: 2025,
    url: "https://iot-analytics.com/number-connected-iot-devices/"
  },
  "gv-mab": {
    title: "Monoclonal Antibodies Market Size & Share Report, 2030",
    publisher: "Grand View Research",
    year: 2025,
    url: "https://www.grandviewresearch.com/industry-analysis/monoclonal-antibodies-market"
  },
  "mdf-antibodies": {
    title: "Antibodies Market Size, Trends, Growth & Global Forecast 2025-2033",
    publisher: "Market Data Forecast",
    year: 2025,
    url: "https://www.marketdataforecast.com/market-reports/antibodies-market"
  },
  "iea-ev-2025": {
    title: "Global EV Outlook 2025",
    publisher: "International Energy Agency (IEA)",
    year: 2025,
    url: "https://www.iea.org/reports/global-ev-outlook-2025"
  },
  "factmr-ev-battery": {
    title: "Electric Vehicle Battery Market (2025 - 2035)",
    publisher: "Fact.MR",
    year: 2025,
    url: "https://www.factmr.com/report/3587/electric-vehicle-battery-market"
  },
  "acs-salaries": {
    title: "ACS Salary Survey",
    publisher: "American Chemical Society",
    year: 2024,
    url: "https://www.acs.org/careers/salaries.html"
  },
  "mnm-genomics": {
    title: "Genomics Market Report 2025-2030",
    publisher: "MarketsandMarkets",
    year: 2025,
    url: "https://www.marketsandmarkets.com/Market-Reports/genomics-market-613.html"
  },
  "mnm-ngs": {
    title: "Next-Generation Sequencing Market 2025-2030",
    publisher: "MarketsandMarkets",
    year: 2025,
    url: "https://www.marketsandmarkets.com/Market-Reports/next-generation-sequencing-ngs-technologies-market-546.html"
  },
  "mnm-single-cell": {
    title: "Single Cell Sequencing Market 2025-2030",
    publisher: "MarketsandMarkets",
    year: 2025,
    url: "https://www.marketsandmarkets.com/Market-Reports/single-cell-sequencing-market-244864213.html"
  },
  "precedence-cgt": {
    title: "Cell and Gene Therapy Market Size",
    publisher: "Precedence Research",
    year: 2025,
    url: "https://www.precedenceresearch.com/cell-and-gene-therapy-market"
  },
  "globaldata-cgt": {
    title: "Cell and gene therapy market set to grow at 31.3% CAGR through 2030",
    publisher: "GlobalData",
    year: 2024,
    url: "https://www.globaldata.com/media/pharma/cell-gene-therapy-market-set-grow-31-3-cagr-2030-forecasts-globaldata/"
  },
  "nih-postdoc": {
    title: "NIH Ruth L. Kirschstein NRSA Stipend Levels",
    publisher: "NIH Office of Extramural Research",
    year: 2024,
    url: "https://grants.nih.gov/grants/guide/notice-files/NOT-OD-24-104.html"
  }
};
