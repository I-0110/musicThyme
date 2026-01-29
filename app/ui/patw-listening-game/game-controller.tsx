'use client';

import { useState } from 'react';
import PatwListenForm from './listen-form';
import { Characters, Instruments, characterData } from '@/app/lib/patw-game-data';
// import Image from 'next/image';

export default function GameController() {
    // All characters in order
    const allCharacters: Characters[] = [
        'peter',
        'wolf',
        'bird',
        'cat',
        'duck',
        'grandpa',
        'hunters',
    ];

    // State management
    const [currentCharacter, setCurrentCharacter] = useState<Characters>('peter');
    const [results, setResults] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    // Current character data and index
    const character = characterData[currentCharacter];
    const currentIndex = allCharacters.indexOf(currentCharacter);

    // Handle instrument selection - instant feedback (no submit needed)
    const handleInstrumentSelect = (instrument: Instruments) => {
        const correct = instrument === character.correctInstr;
        setIsCorrect(correct);
        setResults(true);
    };

    // Move to next character
    const handleNext = () => {
        setResults(false);

        if (currentIndex < allCharacters.length - 1) {
            setCurrentCharacter(allCharacters[currentIndex + 1]);
        } else {
            setCurrentCharacter(allCharacters[0]);
            alert('Congratulations! You completed all the characters!');
        }
    };

    // Try the same character again
    const handleTryAgain = () => {
        setResults(false);
    };

    return (
        <>
            {/* Form or Results */}
            <div>
                {!results ? (
                    <div className='flex flex-col justify-center gap-6 rounded-lg bg-transparent px-6 py-10'>
                        <PatwListenForm
                            currentCharacter={currentCharacter}
                            characterImageUrl={character.imageUrl}
                            audioUrl={character.audioUrl}
                            characterName={character.name}
                            onInstrumentClick={handleInstrumentSelect}
                            instantFeedback={true}
                            currentIndex={currentIndex}
                            totalCharacters={allCharacters.length}
                        />
                    </div>
                ) : (
                    <div 
                        className='flex flex-col gap-6 rounded-lg px-6 py-10'
                        style={{
                            backgroundColor: isCorrect ? '#f0fdf4' : '#fef2f2',
                            borderColor: isCorrect ? '#86efac' : '#fca5a5',
                            border: '2px solid'
                        }}
                    >
                        <div className='text-center'>
                            {isCorrect ? (
                                <>
                                    <h2 className='text-3xl font-bold text-green-700 mb-4'>
                                        Yippie Hurray! 🎉
                                    </h2>
                                    {/* {character.correctMemeUrl && (
                                        <Image 
                                            className="w-64 h-64 mx-auto mb-4 object-contain"
                                            src={character.correctMemeUrl}
                                            alt="Correct"
                                            width={256}
                                            height={256}
                                            priority
                                        />   
                                    )} */}
                                </>
                            ) : (
                                <>
                                    <h2 className='text-3xl font-bold text-red-700 mb-4'>
                                        Oops! Try Again 😅
                                    </h2>
                                    {/* {character.incorrectMemeUrl && (
                                        <Image 
                                            className="w-64 h-64 mx-auto mb-4 object-contain"
                                            src={character.incorrectMemeUrl}
                                            alt="Try again"
                                            width={256}
                                            height={256}
                                            priority
                                            unoptimized
                                        />   
                                    )} */}
                                    <p className='text-lg text-red-800'>
                                        Try again! Listen carefully to the theme.
                                    </p>
                                </>
                            )}
                        </div>

                        <div className='flex gap-4 justify-center'>
                            {!isCorrect && (
                                <button
                                    onClick={handleTryAgain}
                                    className='px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium'
                                >
                                    Try Again
                                </button>
                            )}
                            {isCorrect && (
                                <button 
                                    onClick={handleNext}
                                    className='px-6 py-3 bg-thyme-400 text-white rounded-lg font-medium hover:bg-thyme-500 transition-colors'
                                >
                                    {currentIndex < allCharacters.length - 1 ? 'Next Character' : 'Finish & Restart'}
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}