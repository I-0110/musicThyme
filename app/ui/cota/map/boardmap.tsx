'use client';

import { useState } from 'react';
import { ArrowRightIcon, HomeIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { Character } from '@/app/lib/cota/interface';
import { getGrid } from '@/app/lib/cota/functions';

interface BoardMapProps {
  characters: Character[];
  // onCharacterClick: (character: Character) => void;
  // onStartQuiz?: (characterId: string) => void;
  // onPlayAudio?: (characterId: string) => void;
}

export default function BoardMap({ 
  characters
}: BoardMapProps) {
  // useState variables
  const [hover, setHover] = useState<number | null>(null);
  const [selected, setSelected] = useState<Character | null>(null);

  // Handling click
  const handleCharacterClick = (character: Character) => { 
    setSelected(character);
  };

  // Sort characters by orderNumber
  const sortCharacters = [...characters].sort((a, b) => a.orderNumber - b.orderNumber);

  return (
    <div className='h-screen flex flex-col'>
      <div className='grid grid-cols-5 grid-rows-4 gap-2'>
        {sortCharacters.map((character, index) => {
          const position = getGrid(index);
          const isHover = hover !== null;
          const isThisHover = hover === index;

          return (
            <div 
              key={character.id}
              className={`bg-carnival-300/65 dark:bg-carnival-200/65 rounded-lg shadow-lg
                transition-all duration-300 cursor-pointer
                flex flex-col items-center justify-center p-2
                ${isHover && !isThisHover ? 'grayscale brightness-75 scale-95' : ''}
                ${isThisHover ? 'scale-105 z-10 shadow-2xl' : ''}
              `}
              style={{
                gridColumn: position.col + 1,
                gridRow: position.row + 1
              }}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(null)}
              onClick={() => handleCharacterClick(character)}
            >
              {/* Character Image */}
              {character.imageUrl && (
                <div className='relative w-full h-12 mb-1'>
                  <Image 
                    src={character.imageUrl}
                    alt={character.characterName}
                    fill
                    className="object-contain rounded"
                  />
                </div>
              )}

              {/* Character Info */}
              <div className='text-center'>
                <p className='text-sm font-semibold text-carnival-500 dark:text-shadow-carnival-100'>
                  {character.orderNumber}. {character.title}
                </p>
              </div>
            </div>
          );
        })}
        
        {/* Center without characters */}
        <div className='col-start-2 col-span-3 row-start-2 row-span-2
        bg-carnival-yellow rounded-lg
        flex items-center justify-center text-center p-4'
        >
          {!selected ? (
            // Show home icon when nothing is selected
            <div className='text-carnival-500'>
              <HomeIcon className='w-12 h-12 mx-auto mb-2' />
              <p className='text-sm font-semibold'>Click any character to explore!</p>
            </div>
            ) : (
              // Show selected character intro overview
              <div className='relative w-full h-full text-carnival-500'>
                <button
                  onClick={() => setSelected(null)}
                  className='absolute top-2 right-2 text-gray-500 hover:text-red-600 z-10'
                  aria-label='Close'
                >
                  <XMarkIcon className='w-6 h-6' />
                </button>

                {/* Two Column Layout */}
                <div className='flex flex-col md:flex-row h-full items-center justify-center'>
                  
                  {/* Left Column - Image and Title */}
                  <div className='flex flex-col items-center md:w-1/2'>
                    {selected.imageUrl && (
                      <div className='relative w-32 h-32 mb-3'>
                        <Image
                          src={selected.imageUrl}
                          alt={selected.characterName}
                          fill
                          className='object-fit rounded-lg' 
                        />
                      </div>
                    )}
                    <h2 className='text-xl font-bold mb-1 text-center'>{selected.characterName}</h2>
                    <p className='text-sm text-center'>{selected.title}</p>
                  </div>

                  {/* Right Column - Video and Read More */}
                  <div className='flex flex-col items-center md:w-1/2 gap-3'>
                    {/* YouTube Video */}
                    {selected.video.youtube && (
                      <div className='w-full max-w-sm'>
                        <div className='relative w-full aspect-video'>
                          <iframe 
                            src={`https://www.youtube.com/embed/${selected.video.youtube}`}
                            title="YouTube video player" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin" 
                            allowFullScreen
                            className='absolute top-0 left-0 w-full h-full rounded-lg'
                          />
                        </div>
                      </div>
                    )}

                    {/* Read More Button */}
                    <button
                      className='flex items-center gap-2 text-carnival-500 hover:font-extrabold hover:text-carnival-400 text-sm font-semibold'
                      onClick={() => console.log('Read more clicked for:', selected.id)}
                    >
                      Read More
                      <ArrowRightIcon className='w-4 h-4' />
                    </button>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}