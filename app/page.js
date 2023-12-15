import React from "react";
import Link from "next/link";
export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2" style={{backgroundImage: "url('/home/ahmed/kurdistan-flag/public/Flag_of_Kurdistan.png')"}}>
      <h1 className="text-4xl font-bold mb-5">Welcome to "Unlock the Flag"!</h1>
      <p className="text-lg mb-2">Join us in celebrating Kurdistan National Flag Day.</p>
      <p className="text-lg mb-2">Learn about Kurdish culture, history, and geography through engaging questions.</p>
      <p className="text-lg mb-2">Each correct answer reveals a part of the Kurdistan flag.</p>
      <p className="text-lg mb-5">Are you ready to unlock the flag?</p>
      <Link href="/game">
        <button className="px-4 py-2 font-bold text-wite bg-blue-500 rounded hover:bg-blue-700 animate-pulse">Start</button>
      </Link>
    </div>
  );
}