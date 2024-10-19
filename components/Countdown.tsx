'use client';  // 添加这行来标记为客户端组件

import React, { useState, useEffect } from 'react';

interface CountdownProps {
    targetDate: string;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState(0);
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const target = new Date(targetDate).getTime();
            const difference = target - now;

            if (difference > 0) {
                const totalSeconds = Math.floor(difference / 1000);
                setTimeLeft(totalSeconds);

                // 假设总时间为30天
                const totalTime = 30 * 24 * 60 * 60;
                const newProgress = (totalSeconds / totalTime) * 100;
                setProgress(newProgress);
            } else {
                clearInterval(interval);
                setTimeLeft(0);
                setProgress(0);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    const days = Math.floor(timeLeft / (24 * 60 * 60));
    const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
    const seconds = timeLeft % 60;

    const color = `hsl(${progress * 1.2}, 100%, 50%)`;

    return (
        <div className="countdown-container">
            <svg className="countdown-svg" viewBox="0 0 100 100">
                <circle
                    className="countdown-circle-bg"
                    cx="50"
                    cy="50"
                    r="45"
                />
                <circle
                    className="countdown-circle"
                    cx="50"
                    cy="50"
                    r="45"
                    style={{
                        strokeDashoffset: `${((100 - progress) / 100) * 283}`,
                        stroke: color
                    }}
                />
            </svg>
            <div className="countdown-text">
                {days}天 {hours}时<br />{minutes}分 {seconds}秒
            </div>
        </div>
    );
};

export default Countdown;
