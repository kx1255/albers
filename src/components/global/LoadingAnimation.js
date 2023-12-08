import React, { useState, useEffect } from 'react';
import './LoadingAnimation.scss';

const LoadingAnimation = () => {
    const [ballColor, setBallColor] = useState('#FFCC00');
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const generateRandomColor = () => {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        };


        const interval = setInterval(() => {
            const randomColor = generateRandomColor();
            setBallColor(randomColor);
        }, 1000);

        window.onload = () => {
            clearInterval(interval);
            setIsLoading(false);
        };

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`loading-animation ${isLoading ? 'visible' : 'hidden'}`}>
            <div className="ball" style={{ backgroundColor: ballColor }}></div>
        </div>
    );
};

export default LoadingAnimation;
