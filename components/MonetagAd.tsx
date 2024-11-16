'use client'

import React, { useEffect } from 'react';

interface MonetagAdProps {
    className?: string;
}

const MonetagAd: React.FC<MonetagAdProps> = ({ className }) => {
    useEffect(() => {
        const handleAdLoad = () => {
            console.log('Trying to load Monetag ad...');
            if (window.propellerads) {
                console.log('PropellerAds object found');
                window.propellerads.push({});
            } else {
                console.log('PropellerAds object not found');
            }
        };

        // 确保脚本加载完成
        if (document.readyState === 'complete') {
            handleAdLoad();
        } else {
            window.addEventListener('load', handleAdLoad);
        }

        return () => {
            window.removeEventListener('load', handleAdLoad);
        };
    }, []);

    return (
        <div className={`monetag-ad-container ${className || ''}`}>
            <div id="propeller-ad"></div>
            {process.env.NODE_ENV === 'development' && (
                <div className="text-sm text-gray-500">
                    广告位置 (可能在开发环境中不可见)
                </div>
            )}
        </div>
    );
};

export default MonetagAd; 