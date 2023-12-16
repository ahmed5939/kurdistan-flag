'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import krdImage from '../../public/Flag_of_Kurdistan.png';
import { useRouter } from 'next/navigation'

const Page = () => {

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [unlockedParts, setUnlockedParts] = useState(0);
    const [selectedOptionId, setSelectedOptionId] = useState('');
    const [countdown, setCountdown] = useState(25);
    const router = useRouter();

    useEffect(() => {
        // Fetch the questions from the API
        fetch('/api')
            .then((response) => response.json())
            .then((data) => {
                const shuffledQuestions = shuffleArray(data.data);
                setQuestions(shuffledQuestions);
                setCountdown(25);
            });

    }, []);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    // Handle option selection
    const handleOptionSelect = (optionId) => {
        setSelectedOptionId(optionId);
    };

    // Handle the answer submission
    const handleSubmitAnswer = () => {
       
        if (questions[currentQuestionIndex]?.correctOptionId === selectedOptionId) {
            const newUnlockedParts = unlockedParts + 1;
            setUnlockedParts(newUnlockedParts);

            if (newUnlockedParts < questions.length) {
                setCurrentQuestionIndex(currentQuestionIndex + 1); // Go to next question
            }
            setSelectedOptionId('');
            setCountdown(25);
        } else {
            setUnlockedParts(0);
            router.push('/lost');
          
        }
    };

    // Handle the countdown
    useEffect(() => {
        if (countdown === 0) {
            setUnlockedParts(0);
            router.push('/timeout');
        }
        const intervalId = setInterval(() => {
            setCountdown(countdown - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [countdown]);



    // Calculate the percentage of the flag to reveal
    const partsToReveal = unlockedParts;
    return (

        <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-[url('https://geopoliticalfutures.com/wp-content/uploads/2019/04/kurdistan-referendum.jpg')] font-mono">
            <div className=' w-4/5 h-11/12 rounded-xl border-4 border-yellow-700 bg-amber-50 bg-opacity-30 p-8'>
                <h1 className="text-4xl font-bold mb-4 text-amber-100 text-center">UNLOCK THE FLAG</h1>

                <span className="countdown font-mono text-6xl text-amber-500">
                    <span style={{ "--value": countdown }}></span>
                </span>

                <div className="relative mx-auto my-8 w-3/5 h-96 rounded border-2 border-yellow-700  ">
                    <Image
                        src={krdImage}
                        alt="Kurdistan Flag"
                        layout="fill"
                        objectFit="cover"
                        className=""

                    />
                    <div
                        className="absolute top-0 left-0 w-full h-full border-4 border-yellow-500 "
                        style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(3, 1fr)`,
                            gridTemplateRows: 'repeat(3, 1fr)',
                            gap: '2px',
                            
                        }}
                    >
                        {Array.from({ length: 9 }).map((_, index) => (
                            <div
                                key={index}
                                className={`${index < partsToReveal ? 'bg-transparent' : 'bg-neutral'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                <dialog id="wrong-answer" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg text-red-600">Wrong Answer</h3>
                        <p className="py-4 text-center">
                            Oops! You've answered incorrectly. Better luck next time!
                        </p>

                        <div className="modal-action">
                            <form method="dialog">
                               
                                <button className="btn btn-error text-white font-bold py-2 px-4 rounded w-full">
                                    Close
                                </button>
                            </form>
                        </div>
                    </div>
                </dialog>





                {unlockedParts === 9 && router.push('/win')}

                {questions.length > 0 && unlockedParts < 9 ? (
                    <div className='flex flex-col mx-auto'>
                        <div className="mb-4 text-xl font-bold text-center  ">{questions[currentQuestionIndex]?.text}</div>

                        <div className="flex mx-auto my-3">
                            {questions[currentQuestionIndex]?.options.map((option) => (
                                <button
                                    key={option.id}
                                    className={`py-2 px-4 w-64 rounded m-1 ${option.id === selectedOptionId ? ' bg-amber-400 hover:bg-red-500 text-white' : ' bg-amber-200 hover:bg-amber-400  text font-bold'}`}
                                    onClick={() => handleOptionSelect(option.id)}
                                >
                                    {option.text}
                                </button>
                            ))}
                        </div>

                        <button
                            className=" bg-amber-400 hover:bg-amber-100 hover:text-black text-white font-bold py-2 px-4 rounded w-4/12 mx-auto"
                            onClick={handleSubmitAnswer}
                        >
                            Submit Answer
                        </button>
                    </div>


                ) : (
                    <div></div>
                )}
            </div>
        </div>

    );

};

export default Page;
