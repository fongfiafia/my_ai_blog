# Cursor AI Programming Tutorial Website

## Project Overview
This is a Cursor AI programming tutorial website developed based on Next.js (lookai.top), mainly targeting novice users with zero programming experience, providing Cursor usage tutorials and learning resources.

## Main Page Structure

### 1. Home Page (`app/page.tsx`)
- The main page of the website, including the website introduction and entry points to the main functions.
- Displays the slogan "Cursor Learning Website for Novices with Zero Foundation".
- Provides a "Start the Journey" button to guide users into the tutorials.
- Contains an FAQ section to answer common questions.

### 2. Tutorial Page (`app/cursor/[[...slug]]/page.tsx`)
The article content is placed here.

### 3. Layout Component (`app/layout.tsx`)
- Provides the overall layout structure of the website.
- Includes a navigation bar and a main content area.
- Integrates Google Analytics and advertising-related code.
- Adds SEO-related metadata.

### 4. Internationalization Support
When adding new languages in the future, only the following steps are required:
Add the new language in i18n-config.ts.
Create the corresponding dictionary file.
Add the corresponding routing configuration.

## Website Address
https://www.lookai.top

# 中文版

# Cursor AI编程教程网站

## 项目概述
这是一个基于Next.js开发的Cursor AI编程教程网站（lookai.top），主要面向零基础小白用户，提供Cursor使用教程和学习资源。

## 主要页面结构

### 1. 首页 (`app/page.tsx`)
- 网站主页面，包含网站简介和主要功能入口
- 显示"零基础小白Cursor学习网站"的标语
- 提供"开启旅程"按钮引导用户进入教程
- 包含FAQ部分回答常见问题

### 2. 教程页面 (`app/cursor/[[...slug]]/page.tsx`)
放置了文章内容

### 3. 布局组件 (`app/layout.tsx`)
- 提供网站的整体布局结构
- 包含导航栏、主内容区域
- 集成了Google Analytics和广告相关代码
- 添加了SEO相关的元数据

### 4. 国际化支持
未来添加新语言时，只需要：
在 i18n-config.ts 中添加新语言
创建对应的字典文件
添加对应的路由配置

## 网站地址
https://www.lookai.top


