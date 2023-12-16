import React from "react";
import Link from "next/link";
export default function HomePage() {
  return (
    <div className="hero min-h-screen" style={{backgroundImage: 'url(https://geopoliticalfutures.com/wp-content/uploads/2019/04/kurdistan-referendum.jpg)'}}>
    <div className="hero-overlay bg-opacity-60"></div>
    <div className="hero-content text-center text-neutral-content">
      <div className=" ">
        <h1 className="mb-5 text-5xl font-bold ">
        Welcome to "Unlock the Flag"!
        </h1>
        <p className="mb-5 text-xl">Join us in celebrating Kurdistan National Flag Day. <br></br> 
        Learn about Kurdish culture, history, and geography through engaging questions.
        <br></br> Each correct answer reveals a part of the Kurdistan flag.
        <br></br> Are you ready to unlock the flag?

        </p>
     

        <Link href="/game">
        <button className="px-16 py-2 font-bold text-wite btn  rounded hover:bg-amber-500 hover:text-white animate-pulse">Start</button>
      </Link>
      </div>
    </div>
  </div>
  );
}