'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import krdImage from '../../public/Flag_of_Kurdistan.png';

const Page = () => {

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [unlockedParts, setUnlockedParts] = useState(0);
    const [selectedOptionId, setSelectedOptionId] = useState('');


    useEffect(()  =>  {
        // Fetch the questions from the API
        fetch('/api')
            .then((response) => response.json())
            .then((data) => {
                const shuffledQuestions = shuffleArray(data.data);
                setQuestions(shuffledQuestions);
    
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
        } else {
            alert("Incorrect answer. Try again!");
        }
    };

    // Calculate the percentage of the flag to reveal
    const partsToReveal = unlockedParts;
     return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-lime-100">
            <div className=' w-2/3 h-11/12'>
            <h1 className="text-4xl font-bold mb-4">Kurdistan Flag Quiz</h1>

          <div className="relative mt-8 w-1/2 h-96 rounded border-2 border-yellow-700">
            
            <Image
                src={krdImage}
                alt="Kurdistan Flag"
                layout="fill"
                objectFit="cover"
                className=""
                
            />

           
            
            <div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(3, 1fr)`,
                    gridTemplateRows: 'repeat(3, 1fr)',
                }}
            >
               {Array.from({ length: 9 }).map((_, index) => (
                    <div
                        key={index}
                        style={{
                            backgroundColor: index < partsToReveal ? 'transparent' : 'rgba(128, 128, 128, 0.9)',
                        }}
                    />
                ))}

                

                
            </div>
        </div>

            {unlockedParts === 9 && <div className="mt-4 text-green-600">Congratulations! You've unlocked the entire flag!</div>}
          
            {questions.length > 0 && unlockedParts<9?(
                <>
                    <div className="mb-4 text-xl font-bold">{questions[currentQuestionIndex]?.text}</div>

                    <div className="mb-4">
                        {questions[currentQuestionIndex]?.options.map((option) => (
                            <button
                                key={option.id}
                                className={`py-2 px-4 rounded m-1 ${option.id === selectedOptionId ? ' bg-amber-500 hover:bg-green-700 text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
                                onClick={() => handleOptionSelect(option.id)}
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>

                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleSubmitAnswer}
                    >
                        Submit Answer
                    </button>
                </>

                
            ) : (
                <div></div>
            )}
            </div>
        </div>
    );
};

export default Page;
