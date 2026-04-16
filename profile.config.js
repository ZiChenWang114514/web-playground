/* =====================================================================
 * 个人主页配置 · 唯一需要编辑的文件
 * =====================================================================
 *
 * 使用方式
 * --------
 *   1. 只编辑本文件。修改任意字段后保存，刷新浏览器即可看到效果。
 *   2. 带 ⚠️ TODO 的字段需要你亲自填入。
 *   3. 要新增一条 news / project / publication，直接复制一条已有对象
 *      粘贴到数组里即可。要删除，把整个对象删掉。
 *
 * 文件结构
 * --------
 *   PROFILE            —— 名字、tagline、bio、头像路径
 *   CONTACTS           —— 邮箱、GitHub 等链接
 *   RESEARCH_INTERESTS —— 研究兴趣卡片
 *   NEWS               —— 最近动态时间线
 *   PROJECTS           —— 项目卡片网格
 *   PUBLICATIONS       —— 论文 / 预印本
 *   EDUCATION          —— 教育经历
 *   AWARDS             —— 获奖荣誉
 *
 * ===================================================================== */


// =====================================================================
// 1. 基础信息
// =====================================================================
const PROFILE = {
  name: {
    zh: "王子宸",
    en: "Zichen Wang"
  },

  // 简短 tagline（中性措辞，不含具体课题）
  tagline: "PhD Student · Computational Biology at the Peking–Tsinghua Bio intersection",

  // 头衔行
  title: "博士生 @ 北京大学 前沿交叉学科研究院 (AAIS) 整合生命科学中心 (CLS)",

  // 简介 —— 仅基础背景介绍，不涉及具体在研课题
  bio: [
    `我是<strong>王子宸</strong>（Zichen Wang），
     <a href="https://www.aais.pku.edu.cn/" target="_blank" rel="noopener">北京大学前沿交叉学科研究院 (AAIS)</a>
     <a href="https://cls.pku.edu.cn/" target="_blank" rel="noopener">整合生命科学中心 (CLS)</a>
     的博士研究生。`,
    `⚠️ TODO: 第二段可以写你总体的学术背景/方法论偏好（不涉及具体课题）。
     例如：「我的训练背景横跨结构生物学、机器学习与化学信息学，关注以计算方法驱动生命科学问题的解决路径。」`,
    `⚠️ TODO: 可选第三段。例如兴趣爱好、教学/科普经历、合作意向等。`
  ],

  // 头像（放 assets/ 下，然后把此字段改成 "assets/avatar.jpg"）
  avatar: "assets/avatar-placeholder.svg",

  location: "Beijing, China",

  // 身份标签（不含具体课题方向）
  tags: ["PKU", "AAIS", "CLS", "PhD Student"]
};


// =====================================================================
// 2. 联系方式与外部链接
// =====================================================================
// type 可选: email / github / scholar / orcid / linkedin / twitter / cv / website
const CONTACTS = [
  { type: "email",    label: "Email",          value: "wangzc@stu.pku.edu.cn",           href: "mailto:wangzc@stu.pku.edu.cn" },
  { type: "github",   label: "GitHub",         value: "@ZiChenWang114514",               href: "https://github.com/ZiChenWang114514" },
  { type: "scholar",  label: "Google Scholar", value: "⚠️ TODO",                         href: "⚠️ TODO" },
  { type: "orcid",    label: "ORCID",          value: "⚠️ TODO: 0000-0000-0000-0000",    href: "⚠️ TODO" },
  { type: "cv",       label: "CV (PDF)",       value: "Download",                       href: "assets/cv.pdf" }
];


// =====================================================================
// 3. 研究兴趣（宽泛主题方向，不含具体在研课题）
//
// 建议：写 3-4 条「一级研究主题」，如「结构生物学」「化学信息学」
//       「机器学习在生命科学中的应用」等；避免暴露未发表工作的细节。
// =====================================================================
const RESEARCH_INTERESTS = [
  {
    emoji: "🧬",
    title: "⚠️ TODO: 一级研究主题 1",
    desc: "⚠️ TODO: 一句话描述（例：结构生物学中的机器学习方法）。"
  },
  {
    emoji: "🧪",
    title: "⚠️ TODO: 一级研究主题 2",
    desc: "⚠️ TODO: 一句话描述。"
  },
  {
    emoji: "📊",
    title: "⚠️ TODO: 一级研究主题 3",
    desc: "⚠️ TODO: 一句话描述。"
  }
];


// =====================================================================
// 4. 最近动态 (news)   —— 按时间倒序，日期用 YYYY-MM 或 YYYY-MM-DD
//
// 建议只放对外可公开的动态：发表、获奖、会议报告、暑期访问等。
// =====================================================================
const NEWS = [
  { date: "2026-04", text: "个人主页 <a href='.'>wang.zichen.github.io</a> 上线（基于 web-playground 框架）。" },
  { date: "⚠️ TODO", text: "⚠️ TODO: 添加可公开的里程碑（例：「新论文 accepted by ...」/「参加 ... 会议并做报告」/「获得 ... 奖学金」）。" }
];


// =====================================================================
// 5. 项目卡片
//
// 建议：此处只放你愿意对外展示的公开项目（开源仓库、发表工作、科普作品）。
//       进行中 / 未发表课题请勿放在此处。
// =====================================================================
const PROJECTS = [
  {
    emoji: "📊",
    title: "Career Landscape",
    tagline: "15 个科研与工程领域的就业景气全景图谱（可交互气泡图，数据可溯源到 31 个 2025-2026 市场研究报告）",
    tags: ["Plotly.js", "Dataviz", "Career"],
    link: "career-landscape/"
  },
  {
    emoji: "⚠️",
    title: "⚠️ TODO: 公开项目名称",
    tagline: "⚠️ TODO: 一句话简介。建议只放 (a) 已开源的仓库 (b) 已发表的工作 (c) 对外可公开的科普作品。",
    tags: ["⚠️ TODO"],
    link: "#"
  }
];


// =====================================================================
// 6. 论文 / 预印本
//   作者列表中把自己加粗：用 **Wang Z.**
// =====================================================================
const PUBLICATIONS = [
  // 示例格式：
  // {
  //   authors: "Author A, **Wang Z.**, Author B, ...",
  //   title: "Title of the paper.",
  //   venue: "Journal / Conference, Year",
  //   link: "https://...",
  //   note: "Co-first author"   // 可选
  // }
  {
    authors: "⚠️ TODO",
    title: "⚠️ TODO: 第一篇论文的标题",
    venue: "⚠️ TODO: 期刊或会议名, 年份",
    link: "⚠️ TODO"
  }
];


// =====================================================================
// 7. 教育经历
// =====================================================================
const EDUCATION = [
  {
    institution: "Peking University",
    degree: "Ph.D., Academy for Advanced Interdisciplinary Studies (AAIS) · Center for Life Sciences (CLS)",
    period: "⚠️ TODO: 入学年 – 至今",
    note: "⚠️ TODO: 导师 / 研究组（可选）"
  },
  {
    institution: "⚠️ TODO: 本科学校",
    degree: "⚠️ TODO: B.S. in …",
    period: "⚠️ TODO",
    note: "⚠️ TODO: 院系 · 专业 · 荣誉（可选）"
  }
];


// =====================================================================
// 8. 奖项荣誉
// =====================================================================
const AWARDS = [
  // 示例：{ year: "2022", title: "国家奖学金", org: "教育部" }
  { year: "⚠️ TODO", title: "⚠️ TODO: 奖项名称", org: "⚠️ TODO: 颁发机构" }
];
