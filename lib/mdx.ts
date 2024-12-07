import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { Locale } from "@/i18n-config";
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus';

export async function getMarkdownContent(
  slug: string,
  type: string = "cursor",
  locale: Locale = "cn"
) {
  const contentDir = path.join(process.cwd(), "contents", type);
  const filePath = path.join(
    contentDir,
    `${slug}${locale === "en" ? ".en" : ""}.mdx`
  );

  console.log('Looking for file:', filePath);
  console.log('Current working directory:', process.cwd());
  console.log('File exists:', fs.existsSync(filePath));

  try {
    if (!fs.existsSync(filePath)) {
      console.log('File not found:', filePath);
      return null;
    }

    const source = fs.readFileSync(filePath, "utf-8");
    console.log('Raw source content:', source.substring(0, 100));

    // 尝试直接返回源文件内容，看看是否是编译过程出了问题
    return source;

    // const { content } = await compileMDX({
    //   source,
    //   options: { 
    //     parseFrontmatter: true,
    //     mdxOptions: {
    //       remarkPlugins: [remarkGfm],
    //       rehypePlugins: [rehypePrism],
    //     }
    //   },
    // });

    // console.log('Compiled content:', content);
    // return content;
  } catch (error) {
    console.error(`Error reading markdown file: ${filePath}`, error);
    return null;
  }
}

export async function getMetadata(
  slug: string,
  type: string = "cursor",
  locale: Locale = "cn"
) {
  const contentDir = path.join(process.cwd(), "contents", type);
  const filePath = path.join(
    contentDir,
    `${slug}${locale === "en" ? ".en" : ""}.mdx`
  );

  try {
    if (!fs.existsSync(filePath)) {
      return {
        title: "Not Found",
        description: "The requested page could not be found.",
      };
    }

    const source = fs.readFileSync(filePath, "utf-8");
    const { frontmatter } = await compileMDX({
      source,
      options: { 
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypePrism],
        }
      },
    });

    return {
      title: (frontmatter as any)?.title || "Untitled",
      description: (frontmatter as any)?.description || "",
    };
  } catch (error) {
    console.error(`Error reading markdown file: ${filePath}`, error);
    return {
      title: "Error",
      description: "An error occurred while loading the page.",
    };
  }
}
