'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

const WinningScreen = () => {
    const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-200 to-blue-500">
            <Confetti width={dimensions.width} height={dimensions.height} />
            <h1 className="text-9xl text-white">You Won!</h1>
            <Link href="/">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
                    Play Again
                </button>
            </Link>
          
        </div>
    );
};

export default WinningScreen;
