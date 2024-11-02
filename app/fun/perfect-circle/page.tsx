'use client'
import { useState, useRef, useEffect } from 'react'

interface Point {
    x: number
    y: number
}

interface AnalysisModalProps {
    isOpen: boolean
    onClose: () => void
    accuracy: number | null
    canvasRef: React.RefObject<HTMLCanvasElement>
    points: Point[]
    onRestart: () => void
    onShare: () => void
}

// 在文件顶部添加这些工具函数
const calculateCircleAccuracy = (points: Point[]): { score: number; center: Point; avgRadius: number } => {
    if (points.length < 3) return { score: 0, center: { x: 0, y: 0 }, avgRadius: 0 }

    // 计算中心点
    const center = points.reduce(
        (acc, point) => ({
            x: acc.x + point.x / points.length,
            y: acc.y + point.y / points.length
        }),
        { x: 0, y: 0 }
    )

    // 计算平均半径
    const avgRadius = points.reduce((acc, point) => {
        const distance = Math.sqrt(
            Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2)
        )
        return acc + distance / points.length
    }, 0)

    // 计算标准差
    const radiusVariance = points.reduce((acc, point) => {
        const distance = Math.sqrt(
            Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2)
        )
        return acc + Math.pow(distance - avgRadius, 2) / points.length
    }, 0)

    // 计算圆形度得分（0-100）
    const maxVariance = avgRadius * avgRadius
    const score = Math.max(0, 100 * (1 - radiusVariance / maxVariance))

    return { score: Math.min(100, score), center, avgRadius }
}

const visualizeCalculation = (
    points: Point[],
    canvas: HTMLCanvasElement,
    center: Point,
    avgRadius: number
) => {
    const ctx = canvas.getContext('2d')
    if (!ctx || points.length < 3) return

    // 设置画布尺寸
    const parent = canvas.parentElement
    if (parent) {
        canvas.width = parent.clientWidth
        canvas.height = parent.clientHeight
    }

    // 计算缩放比例和偏移量，使圆居中显示
    const scale = 0.8 // 留出一些边距
    const maxRadius = Math.min(canvas.width, canvas.height) / 2 * scale
    const scaleRatio = maxRadius / avgRadius

    // 计算画布中心点
    const canvasCenter = {
        x: canvas.width / 2,
        y: canvas.height / 2
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 将所有点相对于原始圆心进行缩放和平移
    const transformPoint = (point: Point) => ({
        x: (point.x - center.x) * scaleRatio + canvasCenter.x,
        y: (point.y - center.y) * scaleRatio + canvasCenter.y
    })

    // 绘制原始路径
    ctx.strokeStyle = '#22c55e'
    ctx.lineWidth = 2
    ctx.beginPath()
    const firstPoint = transformPoint(points[0])
    ctx.moveTo(firstPoint.x, firstPoint.y)
    for (let i = 1; i < points.length; i++) {
        const point = transformPoint(points[i])
        ctx.lineTo(point.x, point.y)
    }
    ctx.stroke()

    // 绘制圆心
    ctx.fillStyle = '#3b82f6'
    ctx.beginPath()
    ctx.arc(canvasCenter.x, canvasCenter.y, 5, 0, Math.PI * 2)
    ctx.fill()

    // 绘制理想圆形
    ctx.strokeStyle = '#22c55e'
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.arc(canvasCenter.x, canvasCenter.y, maxRadius, 0, Math.PI * 2)
    ctx.stroke()
    ctx.setLineDash([])

    // 绘制偏差点
    points.forEach((point, index) => {
        if (index % 5 === 0) {
            const transformedPoint = transformPoint(point)
            const distance = Math.sqrt(
                Math.pow(transformedPoint.x - canvasCenter.x, 2) +
                Math.pow(transformedPoint.y - canvasCenter.y, 2)
            )
            const color = distance > maxRadius ? '#ef4444' : '#3b82f6'
            ctx.fillStyle = color
            ctx.beginPath()
            ctx.arc(transformedPoint.x, transformedPoint.y, 3, 0, Math.PI * 2)
            ctx.fill()
        }
    })
}

const calculateBeatPercentage = (score: number): number => {
    // 调低击败比例，增加挑战性
    if (score >= 98.5) return 99
    if (score >= 97.5) return 98
    if (score >= 96) return 95
    if (score >= 95) return 94
    if (score >= 93) return 93
    if (score >= 90) return 92
    if (score >= 85) return 80
    if (score >= 80) return 70
    if (score >= 75) return 60
    if (score >= 70) return 50
    if (score >= 65) return 40
    if (score >= 60) return 30
    if (score >= 55) return 20
    if (score >= 50) return 15
    return 5
}

const AnalysisModal: React.FC<AnalysisModalProps> = ({
    isOpen,
    onClose,
    accuracy,
    canvasRef,
    points,
    onRestart,
    onShare
}) => {
    const modalCanvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (isOpen && modalCanvasRef.current && points.length > 0) {
            const { score, center, avgRadius } = calculateCircleAccuracy(points)
            visualizeCalculation(points, modalCanvasRef.current, center, avgRadius)
        }
    }, [isOpen, points])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full">
                <div className="relative w-full aspect-square mb-4 flex items-center justify-center">
                    <canvas
                        ref={modalCanvasRef}
                        className="w-[90%] h-[90%]"
                    />
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold mb-2">
                        你的圆度得分: {accuracy?.toFixed(1)}%
                    </p>
                    <p className="text-xl text-green-500 dark:text-green-400 font-bold mb-4">
                        击败了 {calculateBeatPercentage(accuracy || 0)}% 的玩家！
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        绿色虚线为理想圆形，蓝点表示圆心，红色点表示偏离过大的位置
                    </p>
                    <div className="flex justify-center gap-2 flex-wrap sm:flex-nowrap">
                        <button
                            onClick={onRestart}
                            className="whitespace-nowrap px-4 py-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 
                                     text-white rounded-lg hover:opacity-90"
                        >
                            再试一次
                        </button>

                        <button
                            onClick={onShare}
                            className="whitespace-nowrap px-4 py-2 bg-blue-500 text-white rounded-lg 
                                     hover:bg-blue-600"
                        >
                            快速分享
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function CircleDrawerPage() {
    const [gameState, setGameState] = useState<'initial' | 'drawing' | 'complete' | 'analysis'>('initial')
    const [points, setPoints] = useState<Point[]>([])
    const [accuracy, setAccuracy] = useState<number | null>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const analysisCanvasRef = useRef<HTMLCanvasElement>(null)
    const isDrawing = useRef(false)
    const startPoint = useRef<Point | null>(null)

    const handleStart = () => {
        setGameState('drawing')
        setPoints([])
        setAccuracy(null)
        const canvas = canvasRef.current
        if (canvas) {
            const ctx = canvas.getContext('2d')
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height)
            }
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const resizeCanvas = () => {
            const parent = canvas.parentElement
            if (!parent) return

            canvas.width = parent.clientWidth
            canvas.height = parent.clientHeight

            // 重新获取上下文（因为改变canvas尺寸会重置上下文）
            const ctx = canvas.getContext('2d')
            if (ctx) {
                // 创建循环渐变色
                const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
                gradient.addColorStop(0, '#22c55e')    // 绿色
                gradient.addColorStop(0.33, '#eab308') // 黄色
                gradient.addColorStop(0.66, '#ef4444') // 红色
                gradient.addColorStop(1, '#22c55e')    // 回到绿色

                ctx.strokeStyle = gradient
                ctx.lineWidth = 8
                ctx.lineCap = 'round'
                ctx.lineJoin = 'round'
            }
        }

        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        return () => window.removeEventListener('resize', resizeCanvas)
    }, [gameState])

    const drawPath = (clearCanvas = true) => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx || points.length < 2) return

        // 只在需要时清除画布
        if (clearCanvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
        }

        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y)

        // 创建循环渐变色
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
        gradient.addColorStop(0, '#22c55e')    // 绿色
        gradient.addColorStop(0.33, '#eab308') // 黄色
        gradient.addColorStop(0.66, '#ef4444') // 红色
        gradient.addColorStop(1, '#22c55e')    // 回到绿色

        ctx.strokeStyle = gradient
        ctx.lineWidth = 8
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'

        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y)
        }
        ctx.stroke()
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (gameState !== 'drawing') return

        const canvas = canvasRef.current
        if (!canvas) return

        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        isDrawing.current = true
        startPoint.current = { x, y }
        setPoints([{ x, y }])

        // 立即绘制起始点
        const ctx = canvas.getContext('2d')
        if (ctx) {
            ctx.fillStyle = '#22c55e' // 使用绿色作为起始点
            ctx.beginPath()
            ctx.arc(x, y, 4, 0, Math.PI * 2)
            ctx.fill()
        }
    }

    const checkEndPoint = (x: number, y: number) => {
        if (startPoint.current && points.length > 10) {
            const distance = Math.sqrt(
                Math.pow(x - startPoint.current.x, 2) +
                Math.pow(y - startPoint.current.y, 2)
            )
            if (distance < 20) {
                isDrawing.current = false
                setGameState('analysis')
                const { score } = calculateCircleAccuracy(points)
                setAccuracy(score)
            }
        }
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing.current || gameState !== 'drawing') {
            return
        }

        const canvas = canvasRef.current
        if (!canvas) return

        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        setPoints(prev => {
            const newPoints = [...prev, { x, y }]
            if (gameState === 'drawing') {
                requestAnimationFrame(() => {
                    drawPath(true)
                })
            }
            return newPoints
        })

        checkEndPoint(x, y)
    }

    const handleMouseUp = () => {
        isDrawing.current = false
    }

    // 添加复制分享文案的函数
    const handleQuickShare = () => {
        const shareText = `我画的圆接近 ${accuracy?.toFixed(1)}% 完美！！你能打败我吗？够胆就来挑战我！ https://www.lookai.top/fun/perfect-circle `;

        navigator.clipboard.writeText(shareText)
            .then(() => {
                alert('分享文案已复制到剪贴板！');
            })
            .catch(err => {
                console.error('复制失败:', err);
                alert('复制失败，请手动复制');
            });
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
        e.preventDefault()
        if (!isDrawing.current || gameState !== 'drawing') return

        const touch = e.touches[0]
        const canvas = canvasRef.current
        if (!canvas) return

        const rect = canvas.getBoundingClientRect()
        const x = touch.clientX - rect.left
        const y = touch.clientY - rect.top

        setPoints(prev => {
            const newPoints = [...prev, { x, y }]
            if (gameState === 'drawing') {
                requestAnimationFrame(() => {
                    drawPath(true)
                })
            }
            return newPoints
        })

        checkEndPoint(x, y)
    }

    return (
        <div className="p-6 flex flex-col items-center min-h-[calc(100vh-4rem)]">
            {gameState === 'initial' && (
                <div className="text-center" style={{ marginTop: '10%' }}>
                    <h2 className="text-xl mb-4">Can you draw a perfect circle?</h2>
                    <h2 className="text-xl mb-4">你能画出最完美的圆吗？</h2>
                    <button
                        onClick={handleStart}
                        className="w-32 h-32 rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 
                                 text-white text-2xl font-bold hover:opacity-90
                                 transition-opacity duration-300 shadow-lg"
                    >
                        GO
                    </button>
                </div>
            )}

            {gameState !== 'initial' && (
                <div className="relative w-full max-w-[600px] aspect-square border rounded-lg overflow-hidden bg-white dark:bg-black touch-none">
                    <canvas
                        ref={canvasRef}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onTouchStart={(e) => {
                            e.preventDefault()
                            const touch = e.touches[0]
                            const canvas = canvasRef.current
                            if (!canvas) return
                            const rect = canvas.getBoundingClientRect()
                            const x = touch.clientX - rect.left
                            const y = touch.clientY - rect.top
                            isDrawing.current = true
                            startPoint.current = { x, y }
                            setPoints([{ x, y }])
                        }}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={(e) => {
                            e.preventDefault()
                            isDrawing.current = false
                        }}
                        className="w-full h-full absolute top-0 left-0"
                    />
                </div>
            )}

            <AnalysisModal
                isOpen={gameState === 'analysis'}
                onClose={() => setGameState('initial')}
                accuracy={accuracy}
                canvasRef={canvasRef}
                points={points}
                onRestart={handleStart}
                onShare={handleQuickShare}
            />

            <div className="w-full max-w-2xl mt-12 mb-8">
                <h2 className="text-2xl font-bold mb-6">常见问题 Frequent Asked Questions</h2>

                <div className="space-y-6">
                    <div className="border-b pb-4">
                        <h3 className="font-bold mb-2">Q: 如何获得更高的圆形度分数？</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            A: 保持绘制速度均匀，手臂放松，以肩膀为支点画圆。建议先练习大圆，熟练后再尝试小圆。保持绘制时的流畅性和稳定性是关键。
                        </p>
                    </div>

                    <div className="border-b pb-4">
                        <h3 className="font-bold mb-2">Q: 为什么我画的圆分数这么低？</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            A: 圆形度评分基于多个因素，包括圆的半径一致性、曲线平滑度等。即使看起来像圆，如果半径不均匀也会影响得分。持续练习可以提高准确度。
                        </p>
                    </div>

                    <div className="border-b pb-4">
                        <h3 className="font-bold mb-2">Q: 专业画师能画出多完美的圆？</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            A: 经过训练的专业画师通常达到 85-95% 的圆形度。不过这需要大量练习和正确的技巧。普通人经过练习也能达到 80% 以上的水平。
                        </p>
                    </div>

                    <div className="border-b pb-4">
                        <h3 className="font-bold mb-2">Q: 徒手画圆的技巧有哪些？</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            A: 1. 保持手腕放松，使用整个手臂的力量<br />
                            2. 以肩膀为轴心点进行旋转运动<br />
                            3. 保持匀速绘制，不要过快或过慢<br />
                            4. 专注于整体形状，而不是局部细节
                        </p>
                    </div>

                    <div className="border-b pb-4">
                        <h3 className="font-bold mb-2">Q: 这个游戏的评分标准是什么？</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            A: 评分系统会计算所有点到圆心的距离标准差，完美的圆所有点到圆心的距离应该相等。评分还考虑了曲线的平滑度和闭合性，满分100分代表完美的圆形。
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
} 