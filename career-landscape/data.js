// 领域大横评底层数据：15 个维度，完整 1:1 数据集
// 字段：领域 / 大类 / 干实验·计算驱动 (0-100) / 薪资潜力 (0-100) / 未来增长率 (0-100) / 核心描述
const DOMAIN_DATA = [
  // [计算机与金融]
  { field: "LLM 大模型算法", category: "计算机", compute: 100, salary: 98, growth: 95,
    desc: "极致的算力与算法狂欢，薪资登顶但面临极速迭代和高强度压力。" },
  { field: "搜广推算法", category: "计算机", compute: 100, salary: 85, growth: 70,
    desc: "互联网大厂现金流基石，薪资高但已成红海，极度内卷。" },
  { field: "后端开发 / 架构", category: "计算机", compute: 100, salary: 70, growth: 60,
    desc: "经典 IT 岗位，需求量大，但正面临 AI 辅助编程工具的冲击。" },
  { field: "底层系统 / 云计算", category: "计算机", compute: 100, salary: 85, growth: 75,
    desc: "解决高并发与算力调度，技术护城河深，属于越老越吃香的 CS 方向。" },
  { field: "嵌入式 / IoT", category: "计算机", compute: 70, salary: 75, growth: 75,
    desc: "偏向制造业与硬件，抗互联网下行周期能力强，加班相对较少。" },
  { field: "量化金融 (Quant)", category: "金融", compute: 100, salary: 95, growth: 70,
    desc: "纯数学、统计与代码驱动的金融掠食者，对智商和抗压能力要求极高。" },

  // [核心交叉 / 前沿]
  { field: "AI 药物设计 (AIDD)", category: "交叉", compute: 100, salary: 95, growth: 98,
    desc: "融合 AI 大模型与生物化学先验，算力驱动实体产业，护城河极深。" },
  { field: "计算生物学 / 生信", category: "交叉", compute: 95, salary: 80, growth: 85,
    desc: "多组学数据挖掘，大厂和头部药企的宠儿。" },
  { field: "计算化学 (CADD)", category: "化学", compute: 100, salary: 75, growth: 70,
    desc: "传统的分子对接与量化，正全面被 AIDD 重塑升级。" },

  // [经典生化锚点]
  { field: "合成生物学", category: "生物", compute: 60, salary: 85, growth: 90,
    desc: "底盘细胞改造，行业上限极高但目前卡在放大量产瓶颈。" },
  { field: "免疫学 / 抗体研发", category: "生物", compute: 20, salary: 80, growth: 80,
    desc: "创新药企的核心湿实验岗位，薪资在生物里算头部。" },
  { field: "电化学 / 电池材料", category: "化学", compute: 15, salary: 85, growth: 75,
    desc: "吃满新能源红利，但行业已进入拼成本的内卷期。" },
  { field: "基因组学", category: "生物", compute: 80, salary: 75, growth: 80,
    desc: "NGS 测序行业的基石，偏重数据分析。" },
  { field: "细胞生物学", category: "生物", compute: 10, salary: 50, growth: 55,
    desc: "万物之源的基础学科，但极难独立获得高薪。" },
  { field: "传统有机合成", category: "化学", compute: 5, salary: 40, growth: 35,
    desc: "纯劳动密集型湿实验，毒性高，天花板低。" }
];

// 学科配色：生物绿、化学红、计算机蓝、金融橙、交叉粉紫（突出 AIDD 赛道）
const CATEGORY_COLORS = {
  "计算机": "#1f77b4",
  "金融":   "#ff7f0e",
  "交叉":   "#e377c2",
  "生物":   "#2ca02c",
  "化学":   "#d62728"
};
