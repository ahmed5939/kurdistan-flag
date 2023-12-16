'use client';
import Link from 'next/link';
import React from 'react';

const LostScreen = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-red-400 to-purple-300">
            <h1 className="text-5xl font-bold text-gray-100 mb-6">
                Time is up!
            </h1>
            <p className="text-2xl text-white mb-8">
                you have run out of time. Why not give it another shot?
            </p>
            <Link href="/">
            <button className="bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-800 transition duration-300 shadow-lg">
                Try Again
            </button>
            </Link>
            <p className="text-sm text-white mt-6 italic">
                you need to be faster next time.
            </p>
        </div>
    );
};

export default LostScreen;
