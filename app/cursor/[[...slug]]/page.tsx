import DocsBreadcrumb from "@/components/docs-breadcrumb";
import Pagination from "@/components/pagination";
import Toc from "@/components/toc";
import { page_routes } from "@/lib/routes-config";
import { notFound } from "next/navigation";
import { getDocsForSlug } from "@/lib/markdown";
import { Typography } from "@/components/typography";
import Image from 'next/image';

type PageProps = {
  params: { slug: string[] };
};

export default async function DocsPage({ params: { slug = [] } }: PageProps) {
  const pathName = slug.join("/");
  const res = await getDocsForSlug(pathName);

  if (!res) notFound();

  return (
    <div className="flex items-start gap-10">
      <div className="flex-[4.5] pt-10">
        <DocsBreadcrumb paths={slug} />
        <Typography>
          <h1 className="text-3xl -mt-2">{res.frontmatter.title}</h1>
          <p className="-mt-4 text-muted-foreground text-[16.5px]">
            {res.frontmatter.description}
          </p>
          <div>{res.content}</div>
          {!pathName.includes('context') && !pathName.includes('tips') && (

            <div className="flex justify-center">
              <div className="card p-3 rounded-lg shadow-md bg-white dark:bg-gray-800 w-[300px] text-center m-0">
                <h3 className="font-bold text-lg mb-2">如果文章对你有帮助<span className="text-red-500">👍</span></h3>
                <p className="font-medium mb-4">请我喝杯咖啡 ☕️</p>
                <Image
                  src="/coffee.jpg"
                  alt="赞赏二维码"
                  width={300}
                  height={600}
                  className="rounded-lg mx-auto"
                />
              </div>
            </div>
          )}

          {!pathName.includes('instruction') && !pathName.includes('context') && (
            <>
              <h2 className="text-2xl font-bold mb-4">加入社群</h2>
              <div className="text-left mb-6">
                <p className="font-bold mb-4">欢迎加入我的社群，加入社群你将获得：</p>
                <ul className="list-disc pl-5">
                  <li>一次与圈主的语音<strong>一对一</strong>疑惑解答</li>
                  <li>面向<strong>无编程基础</strong>的Cursor基础教程</li>
                  <li>面向<strong>有基础</strong>的Cursor进阶付费教程和<strong>实操</strong>技巧</li>
                  <li>Cursor和各类AI相关资讯</li>
                </ul>
              </div>
              <Image
                src="/star.png"
                alt="星球二维码"
                width={600}
                height={200}
              />
            </>
          )}
          <Pagination pathname={pathName} />
        </Typography>
      </div>
      <Toc path={pathName} />
    </div>
  );
}

export async function generateMetadata({ params: { slug = [] } }: PageProps) {
  const pathName = slug.join("/");
  const res = await getDocsForSlug(pathName);
  if (!res) return null;
  const { frontmatter } = res;
  return {
    title: frontmatter.title,
    description: frontmatter.description,
  };
}

export function generateStaticParams() {
  return page_routes.map((item) => ({
    slug: item.href.split("/").slice(1),
  }));
}