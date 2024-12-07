import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPageRoutes } from "@/lib/routes-config";
import { getMarkdownContent, getMetadata } from "@/lib/mdx";
import { Locale } from "@/i18n-config";
import { components } from "@/components/mdx-components";
import Markdown from 'react-markdown';

type Props = {
  params: { lang: Locale; slug: string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug = ["instruction"] } = params;
  // 将多级路径转换为单一路径
  const path = slug.length > 1 ? slug[slug.length - 1] : slug[0];
  const { title, description } = await getMetadata(path, "windsurf", lang);

  return {
    title,
    description,
  };
}

export default async function Page({ params }: Props) {
  const { lang, slug = ["instruction"] } = params;
  // 将多级路径转换为单一路径
  const path = slug.length > 1 ? slug[slug.length - 1] : slug[0];
  console.log('Params:', { lang, slug, path });
  
  const source = await getMarkdownContent(path, "windsurf", lang);
  console.log('Source content:', source?.substring(0, 100));

  if (!source) {
    console.log('Source is null, showing 404');
    notFound();
  }

  return (
    <article className="prose prose-lg dark:prose-invert max-w-none p-8">
      <div className="debug-info">
        <p>Debug Info:</p>
        <pre>{JSON.stringify({ lang, slug, path }, null, 2)}</pre>
      </div>
      <div className="source-content">
        <p>Raw Source Content:</p>
        <pre>{source}</pre>
      </div>
      <div className="markdown-content">
        <p>Markdown Content:</p>
        <Markdown>{source}</Markdown>
      </div>
      <div className="mdx-content">
        <p>MDX Content:</p>
        <MDXRemote source={source} components={components} />
      </div>
    </article>
  );
}

export async function generateStaticParams({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const routes = getPageRoutes(lang, "windsurf");
  return routes.map((route) => ({
    slug: route.href.split("/").filter(Boolean),
  }));
}
