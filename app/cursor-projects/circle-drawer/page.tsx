'use client'
import { useState, useRef, useEffect } from 'react'

interface Point {
    x: number
    y: number
}

interface CenterPoint {
    x: number
    y: number
    radius: number // 中心点半径
    minDistance: number // 最小允许距离
}

export default function CircleDrawerPage() {
    const [gameState, setGameState] = useState<'initial' | 'drawing' | 'complete'>('initial')
    const [points, setPoints] = useState<Point[]>([])
    const [accuracy, setAccuracy] = useState<number | null>(null)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const isDrawing = useRef(false)
    const startPoint = useRef<Point | null>(null)
    const centerPoint = useRef<CenterPoint | null>(null)
    const errorMessageTimeout = useRef<NodeJS.Timeout | null>(null)

    const handleStart = () => {
        setGameState('drawing')
        setPoints([])
        setAccuracy(null)
        setErrorMessage('')
        requestAnimationFrame(() => {
            drawCenterPointAndText()
        })
    }

    // 显示错误信息的函数
    const showError = (message: string) => {
        setErrorMessage(message)
        // 清除之前的定时器
        if (errorMessageTimeout.current) {
            clearTimeout(errorMessageTimeout.current)
        }
        // 设置新的定时器，2秒后清除错误信息
        errorMessageTimeout.current = setTimeout(() => {
            setErrorMessage('')
        }, 2000)
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

            // 设置中心点
            centerPoint.current = {
                x: canvas.width / 2,
                y: canvas.height / 2,
                radius: 5, // 中心点的半径
                minDistance: 50 // 最小允许距离
            }

            // 重新绘制中心点和文字
            drawCenterPointAndText()
        }

        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        return () => window.removeEventListener('resize', resizeCanvas)
    }, [gameState])

    const drawCenterPointAndText = () => {
        const canvas = canvasRef.current
        if (!canvas || !centerPoint.current) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // 设置文字样式
        ctx.font = 'bold 16px Arial'
        ctx.textAlign = 'center'

        // 绘制上方文字
        ctx.fillStyle = '#9ca3af'
        ctx.fillText('画一个圆', centerPoint.current.x, centerPoint.current.y - 20)

        // 绘制中心点
        ctx.beginPath()
        ctx.arc(centerPoint.current.x, centerPoint.current.y, centerPoint.current.radius, 0, Math.PI * 2)
        ctx.fillStyle = '#22c55e'
        ctx.fill()

        // 绘制下方文字
        ctx.fillStyle = '#9ca3af'
        ctx.fillText('围绕这个点', centerPoint.current.x, centerPoint.current.y + 30)
    }

    const drawPath = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx || points.length < 2) return

        // 清除画布
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // 先画路径
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

        // 最后绘制中心点和文字，确保它们在最上层
        drawCenterPointAndText()
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (gameState !== 'drawing') return

        const canvas = canvasRef.current
        if (!canvas || !centerPoint.current) return

        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        // 计算到中心点的距离
        const distance = Math.sqrt(
            Math.pow(x - centerPoint.current.x, 2) +
            Math.pow(y - centerPoint.current.y, 2)
        )

        // 如果距离小于最小允许距离，显示错误信息并阻止绘制
        if (distance < centerPoint.current.minDistance) {
            showError('距离圆点太近啦！')
            return
        }

        isDrawing.current = true
        startPoint.current = { x, y }
        setPoints([{ x, y }])
    }

    // 添加鼠标移动和抬起事件处理函数
    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing.current || gameState !== 'drawing') return

        const canvas = canvasRef.current
        if (!canvas) return

        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        setPoints(prev => {
            const newPoints = [...prev, { x, y }]
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

    // 添加计算圆形度的函数
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
        const maxVariance = avgRadius * avgRadius
        const score = Math.max(0, 100 * (1 - radiusVariance / maxVariance))
        return Math.min(100, score)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-6">看你画的圆够不够圆！</h1>

            {gameState === 'initial' && (
                <div className="text-center">
                    <h2 className="text-xl mb-8">Can you draw a perfect circle?</h2>
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
                <div className="relative w-full max-w-4xl h-[600px] border rounded-lg overflow-hidden bg-white dark:bg-black">
                    <canvas
                        ref={canvasRef}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        className="w-full h-full"
                    />
                    {/* 错误信息提示 */}
                    {errorMessage && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                                    bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
                            {errorMessage}
                        </div>
                    )}
                </div>
            )}

            {accuracy !== null && (
                <div className="mt-6 text-center">
                    <p className="text-2xl font-bold">
                        圆形度得分: {accuracy.toFixed(1)}%
                    </p>
                    <div className="mt-4 flex flex-col items-center gap-3">
                        <button
                            onClick={handleStart}
                            className="w-32 px-6 py-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 
                                     text-white rounded-lg hover:opacity-90 transition-opacity duration-300"
                        >
                            再试一次
                        </button>
                        <a
                            href={`https://service.weibo.com/share/share.php?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(`我在画圆游戏中获得了 ${accuracy.toFixed(1)}% 的分数！快来挑战我吧！ #画圆游戏# `)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-32 px-4 py-2 bg-[#E6162D] 
                                     text-white rounded-lg hover:bg-[#ff1a1a] transition-colors duration-300"
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M9.82727273,24 C9.82727273,24 18.0363636,24 18.0363636,24 C18.0363636,24 18.0363636,18.5137255 18.0363636,18.5137255 C18.0363636,14.6209804 15.1090909,12.0911765 12.9818182,11.0767647 C15.1090909,10.0623529 18.0363636,7.53254902 18.0363636,3.63980392 C18.0363636,3.63980392 18.0363636,0 18.0363636,0 L9.82727273,0 L9.82727273,24 Z M0,24 L7.85454545,24 L7.85454545,0 L0,0 L0,24 Z" />
                            </svg>
                            分享微博
                        </a>
                    </div>
                </div>
            )}
        </div>
    )
} 