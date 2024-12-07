import Image from "next/image";
import Link from "next/link";

export const components = {
  // 自定义图片组件，使用 Next.js 的 Image 组件
  img: ({ src, alt, ...props }: any) => (
    <div className="relative w-full h-[400px] my-8">
      <Image
        src={src}
        alt={alt || ""}
        fill
        className="object-contain"
        {...props}
      />
    </div>
  ),

  // 自定义链接组件，使用 Next.js 的 Link 组件
  a: ({ href, children, ...props }: any) => {
    const isExternal = href?.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600 underline"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className="text-blue-500 hover:text-blue-600 underline"
        {...props}
      >
        {children}
      </Link>
    );
  },

  // 自定义标题组件
  h1: ({ children, ...props }: any) => (
    <h1 className="text-4xl font-bold mt-8 mb-4" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 className="text-3xl font-bold mt-6 mb-3" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 className="text-2xl font-bold mt-4 mb-2" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: any) => (
    <h4 className="text-xl font-bold mt-3 mb-2" {...props}>
      {children}
    </h4>
  ),

  // 自定义段落组件
  p: ({ children, ...props }: any) => (
    <p className="my-4 leading-7" {...props}>
      {children}
    </p>
  ),

  // 自定义列表组件
  ul: ({ children, ...props }: any) => (
    <ul className="list-disc list-inside my-4 space-y-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="list-decimal list-inside my-4 space-y-2" {...props}>
      {children}
    </ol>
  ),

  // 自定义代码块组件
  pre: ({ children, ...props }: any) => (
    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto" {...props}>
      {children}
    </pre>
  ),
  code: ({ children, ...props }: any) => (
    <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono" {...props}>
      {children}
    </code>
  ),

  // 自定义引用组件
  blockquote: ({ children, ...props }: any) => (
    <blockquote
      className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-4 italic"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // 自定义表格组件
  table: ({ children, ...props }: any) => (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: any) => (
    <th
      className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium uppercase tracking-wider"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: any) => (
    <td className="px-6 py-4 whitespace-nowrap" {...props}>
      {children}
    </td>
  ),

  // 自定义列表项组件
  li: ({ children, ...props }: any) => (
    <li className="ml-4" {...props}>
      {children}
    </li>
  ),
};
