import Image from 'next/image'

const miniPrograms = [
    {
        id: 1,
        name: "工资个税计算器",
        description: "工资个税计算器，支持年终奖个税计算，第一个逻辑比较复杂的小程序",
        qrcode: "/tax_calculation.png" // 图片路径待更新
    },
    {
        id: 2,
        name: "AI毒舌",
        description: "鲁迅、罗永浩风格的AI毒舌；还有包括一句话小说、三行情书等等",
        qrcode: "/say_word.jpg" // 图片路径待更新
    }
]

export default function WxMiniprogramPage() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">用Cursor制作的小程序</h1>
            <div className="grid md:grid-cols-2 gap-6">
                {miniPrograms.map((program) => (
                    <div
                        key={program.id}
                        className="group relative overflow-hidden rounded-xl border bg-background p-6 shadow-md transition-shadow hover:shadow-lg"
                    >
                        <div className="flex flex-col items-center">
                            <div className="relative h-48 w-48 mb-4 bg-muted rounded-lg overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                    二维码加载中
                                </div>
                                <Image
                                    src={program.qrcode}
                                    alt={`${program.name}小程序码`}
                                    fill
                                    className="object-cover"
                                />

                            </div>

                            <h3 className="text-xl font-semibold mb-2 text-center">
                                {program.name}
                            </h3>

                            <p className="text-muted-foreground text-center leading-relaxed">
                                {program.description}
                            </p>

                            <div className="mt-4 text-sm text-center text-muted-foreground">
                                扫描二维码立即体验
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
} 