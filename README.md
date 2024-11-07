## AriaDocs - Documentation Template

This feature-packed documentation template, built with Next.js, offers a sleek and responsive design, perfect for all your project documentation needs.

<img src="./public/public-og.png" />

<br/>

Here are all versions of the AriaDocs template, each crafted for specific use cases:


- **Advanced Docs:** A comprehensive template offering extensive features for in-depth documentation needs. Perfect for larger projects that require detailed explanations and advanced configurations.  
  [Explore the Advanced Docs](https://github.com/nisabmohd/Aria-Docs/tree/master)

- **Lite Version:** A streamlined, no-frills template perfect for straightforward documentation needs.  
  [Explore the Lite Version](https://github.com/nisabmohd/Aria-Docs/tree/minimal-docs)

- **Version with Versioning:** A powerful option for projects that require historical documentation tracking. Manage multiple versions of your docs effortlessly.  
  [Check out the Versioning Feature](https://github.com/nisabmohd/Aria-Docs/tree/version_docs)

- **i18n Support Version (WIP):** Designed for international audiences, this version will offer comprehensive multilingual support.  
  [Preview the i18n Support](https://github.com/nisabmohd/Aria-Docs/tree/i18n-support)

### Quick Start

You can create a new Ariadocs project using the command:

```bash
npx create-aria-doc <project-directory>
```

### Expected Output

When you run the CLI, you can expect an output similar to this:

```
Creating a new Ariadocs project in /path/to/your/project from the master branch...
Cloning Master (Full Documentation)...
Ariadocs project successfully created in /path/to/your/project!

Next steps:
1. Navigate to your project directory:
   cd <project-directory>
2. Install dependencies:
   npm install
3. Start the development server:
   npm run dev
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nisabmohd/Aria-Docs)

Got it! Here's a way to present the features in a more structured and visually appealing way using a table:




## Features

```plaintext
Features
├── MDX supported
├── Nested pages support
├── Blog section (New)
├── Syntax highlighting
├── Table of contents
├── Pagination
├── Search
├── Code line highlight & code title
├── Static site generation
├── Custom components
├── Light mode & dark mode
├── Code Switcher
├── Code copy
└── Table of content observer highlight
```

# TODO
脚本生成sitemap.xml 现在not work
距离视频发布还有，收藏我，不迷路
<Countdown targetDate="2024-10-20T18:00:00" />



1. **安装国际化库**: 使用 next-i18next 库,这是一个专门为 Next.js 设计的国际化解决方案。可以通过 npm 或 yarn 进行安装:

   ```
   npm install next-i18next
   ```

2. **配置 i18n 设置**: 在项目根目录下创建一个 `next-i18next.config.js` 文件,并进行相关配置,如语言列表、默认语言等:

   ```javascript
   module.exports = {
     i18n: {
       defaultLocale: 'zh',
       locales: ['zh', 'en'],
     },
   }
   ```

3. **创建语言文件**: 为每种语言创建一个包含翻译字符串的 JSON 文件,放在 `public/locales/{locale}` 目录下。例如 `public/locales/zh/common.json`:

   ```json
   {
     "hello": "你好",
     "about": "关于我们",
     "contact": "联系我们"
   }
   ```

4. **在页面中使用翻译**: 在需要翻译的地方使用 `useTranslation` hook 来获取翻译函数 `t` 并应用到相应的文本中:

   ```jsx
   import { useTranslation } from 'next-i18next'

   export default function HomePage() {
     const { t } = useTranslation('common')

     return (
       <div>
         <h1>{t('hello')}</h1>
         <p>{t('about')}</p>
         <p>{t('contact')}</p>
       </div>
     )
   }
   ```

5. **配置页面级别的语言切换**: 创建一个语言切换组件,允许用户切换网站的语言:

   ```jsx
   import Link from 'next/link'
   import { useRouter } from 'next/router'

   const LanguageSwitcher = () => {
     const { locale, asPath } = useRouter()

     return (
       <div>
         {['zh', 'en'].map((l) => (
           <Link key={l} href={asPath} locale={l}>
             <a>{l === locale ? '✓' : ''} {l}</a>
           </Link>
         ))}
       </div>
     )
   }

   export default LanguageSwitcher
   ```

6. **在应用程序中使用语言切换组件**: 在适当的位置(如页眉或导航栏)插入语言切换组件。

7. **构建和部署支持 i18n 的应用程序**: 在构建和部署应用程序时,确保正确配置 i18n 设置。

通过以上步骤,你就可以在 Next.js 网站中实现国际化 i18n 功能了。如果你在实现过程中遇到任何问题,欢迎随时告诉我,我会尽力提供帮助。