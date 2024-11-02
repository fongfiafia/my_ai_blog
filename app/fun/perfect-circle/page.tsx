'use client'
import { useState, useRef, useEffect } from 'react'

interface Point {
    x: number
    y: number
}

export default function CircleDrawerPage() {
    const [gameState, setGameState] = useState<'initial' | 'drawing' | 'complete'>('initial')
    const [points, setPoints] = useState<Point[]>([])
    const [accuracy, setAccuracy] = useState<number | null>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const isDrawing = useRef(false)
    const startPoint = useRef<Point | null>(null)

    const handleStart = () => {
        setGameState('drawing')
        setPoints([])
        setAccuracy(null)
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

    const drawPath = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx || points.length < 2) return

        // 清除画布
        ctx.clearRect(0, 0, canvas.width, canvas.height)

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

    const calculateCircleAccuracy = (points: Point[]): number => {
        if (points.length < 3) return 0

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
        const maxVariance = avgRadius * avgRadius // 最大可能的方差
        const score = Math.max(0, 100 * (1 - radiusVariance / maxVariance))
        return Math.min(100, score)
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
            // 立即调用 drawPath，而不是等待状态更新
            requestAnimationFrame(() => {
                drawPath()
            })
            return newPoints
        })

        // 检查是否回到起点
        if (startPoint.current && points.length > 10) {
            const distance = Math.sqrt(
                Math.pow(x - startPoint.current.x, 2) +
                Math.pow(y - startPoint.current.y, 2)
            )
            if (distance < 20) {
                isDrawing.current = false
                setGameState('complete')
                const score = calculateCircleAccuracy(points)
                setAccuracy(score)
            }
        }
    }

    const handleMouseUp = () => {
        isDrawing.current = false
    }

    return (
        <div className="p-6 flex flex-col items-center min-h-[calc(100vh-4rem)]">
            {gameState === 'initial' && (
                <div className="text-center" style={{ marginTop: '30%' }}>
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
                <div className="relative w-full h-[600px] border rounded-lg overflow-hidden bg-white dark:bg-black">
                    <canvas
                        ref={canvasRef}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        className="w-full h-full"
                    />
                </div>
            )}

            {accuracy !== null && (
                <div className="mt-6 text-center">
                    <p className="text-2xl font-bold">
                        圆形度得分: {accuracy.toFixed(1)}%
                    </p>
                    <div className="mt-4 flex flex-row items-center gap-3">
                        <button
                            onClick={handleStart}
                            className="w-32 px-6 py-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 
                                     text-white rounded-lg hover:opacity-90 transition-opacity duration-300"
                        >
                            再试一次
                        </button>
                        <a
                            href={`http://service.weibo.com/share/share.php?url=https://www.lookai.top/fun/perfect-circle/&title=${encodeURIComponent(`我画的圆接近 ${accuracy.toFixed(1)}% 完美！！你能打败我吗？#画出完美的圆#perfect-circle`)}&pic=https://www.lookai.top/draw_circle.png`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-32 px-4 py-2 bg-[#E6162D] 
                                     text-white rounded-lg hover:bg-[#ff1a1a] transition-colors duration-300"
                        >
                            分享微博
                        </a>
                    </div>
                </div>
            )}
        </div>
    )
} 