import type { Locale } from './i18n-config'

export type EachRoute = {
  title: string;
  href: string;
  noLink?: true;
  items?: EachRoute[];
};

// 中文路由配置
const CN_ROUTES: EachRoute[] = [
  {
    title: "开卷有益",
    href: "/instruction",
    noLink: true,
    items: [
      { title: "引言", href: "/instruction" },
    ],
  },
  {
    title: "基础教程",
    href: "/basic",
    noLink: true,
    items: [
      { title: "Cursor 是什么", href: "/what_is_cursor" },
      { title: "Cursor 下载安装与注册", href: "/cursor_download" },
      { title: "Cursor 界面布局  🎬", href: "/cursor_interface" },
      { title: "创建第一个Cursor 项目  🎬", href: "/first_project_cursor" },
      { title: "Cursor AI辅助功能初体验  🎬", href: "/try_chat_cursor" },
    ],
  },
  {
    title: "进阶教程",
    href: "/advance",
    noLink: true,
    items: [
      { title: "Cursor 智能代码补全详解(Tab)", href: "/cursor_tab" },
      { title: "Cursor AI代码生成详解(Cmd+K)", href: "/cursor_cmdk" },
      { title: "Cursor AI聊天详解(Chat)", href: "/cursor_chat" },
      { title: "Cursor Composer详解(Cmd+I)", href: "/cursor_composer" },
    ],
  },
  {
    title: "高阶教程",
    href: "/promote",
    noLink: true,
    items: [
      { title: "Cursor 选择模型", href: "/cursor_change_model" },
      { title: "Cursor 建立上下文🔥", href: "/cursor_context" },
    ],
  },
  {
    title: "技巧",
    href: "/tips",
    noLink: true,
    items: [
      { title: "Cursor 白嫖方案(低调行事)", href: "/cursor_free" },
      { title: "Cursor+Git版本管理🔥", href: "/cursor_git" },
      { title: "Cursor+Deepseek平民套餐组合🔥", href: "/cursor_deepseek" },
    ],
  },
  {
    title: "实战视频",
    href: "/video",
    noLink: true,
    items: [
      { title: "Cursor 实战视频🔥", href: "/cursor_teach_video" },
    ],
  },
];

// 英文路由配置
const EN_ROUTES: EachRoute[] = [
  {
    title: "Introduction",
    href: "/instruction",
    noLink: true,
    items: [
      { title: "Preface", href: "/instruction" },
    ],
  },
  {
    title: "Basic Tutorial",
    href: "/basic",
    noLink: true,
    items: [
      { title: "What is Cursor", href: "/what_is_cursor" },
      { title: "Download & Installation", href: "/cursor_download" },
      { title: "Interface Layout 🎬", href: "/cursor_interface" },
      { title: "Create First Project 🎬", href: "/first_project_cursor" },
      { title: "Try AI Features 🎬", href: "/try_chat_cursor" },
    ],
  },
  {
    title: "Advanced Tutorial",
    href: "/advance",
    noLink: true,
    items: [
      { title: "Smart Code Completion (Tab)", href: "/cursor_tab" },
      { title: "AI Code Generation (Cmd+K)", href: "/cursor_cmdk" },
      { title: "AI Chat Features (Chat)", href: "/cursor_chat" },
      { title: "Cursor Composer (Cmd+I)", href: "/cursor_composer" },
    ],
  },
  {
    title: "Pro Tutorial",
    href: "/promote",
    noLink: true,
    items: [
      { title: "Choose AI Model", href: "/cursor_change_model" },
      { title: "Build Context 🔥", href: "/cursor_context" },
    ],
  },
  {
    title: "Tips & Tricks",
    href: "/tips",
    noLink: true,
    items: [
      { title: "Free Plan Tips", href: "/cursor_free" },
      { title: "Cursor + Git Version Control 🔥", href: "/cursor_git" },
      { title: "Cursor + Deepseek Budget Combo 🔥", href: "/cursor_deepseek" },
    ],
  },
  {
    title: "Practice Videos",
    href: "/video",
    noLink: true,
    items: [
      { title: "Cursor Practice Videos 🔥", href: "/cursor_teach_video" },
    ],
  },
];

// 根据语言获取路由配置
export const getRoutes = (locale: Locale = 'cn'): EachRoute[] => {
  return locale === 'cn' ? CN_ROUTES : EN_ROUTES;
};

type Page = { title: string; href: string };

function getRecursiveAllLinks(node: EachRoute) {
  const ans: Page[] = [];
  if (!node.noLink) {
    ans.push({ title: node.title, href: node.href });
  }
  node.items?.forEach((subNode) => {
    const temp = { ...subNode, href: `${node.href}${subNode.href}` };
    ans.push(...getRecursiveAllLinks(temp));
  });
  return ans;
}

export const getPageRoutes = (locale: Locale = 'cn'): Page[] => {
  return getRoutes(locale).map((it) => getRecursiveAllLinks(it)).flat();
};

// 为了向后兼容，保留原来的导出
export const ROUTES = CN_ROUTES;
export const page_routes = getPageRoutes('cn');
