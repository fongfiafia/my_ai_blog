import { getDocsTocs } from "@/lib/markdown";
import TocObserver from "./toc-observer";
import Image from 'next/image';

export default async function Toc({ path }: { path: string }) {
  const tocs = await getDocsTocs(path);

  return (
    <div className="lg:flex hidden toc flex-[1.5] min-w-[80px] max-w-[150px] py-8 sticky top-16 h-[95.95vh] ml-3">
      <div className="flex flex-col gap-3 w-full pl-2">
        <h3 className="font-medium text-sm">On this page</h3>
        <div className="pb-2 pt-0.5 overflow-y-auto">
          <TocObserver data={tocs} />


          <Image
            src="/gzh_new.png"
            alt="公众号二维码"
            width={120}
            height={120}
            className="mx-auto"
            style={{ margin: '0px', marginTop: '8px' }}
          />
        </div>
      </div>
    </div>
  );
}
