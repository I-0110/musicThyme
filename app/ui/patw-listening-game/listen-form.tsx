"use client";

import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Characters, Instruments } from '@/app/lib/patw-game-data';
import Image from 'next/image';

export interface PatwListenFormProps {
    currentCharacter: Characters;
    characterImageUrl?: string;
    audioUrl: string;
    characterName: string;
    onInstrumentClick: (selectedInstrument: Instruments) => void;
    instantFeedback?: boolean;
    currentIndex: number;
    totalCharacters: number;
}

export default function PatwListenForm({
    currentCharacter,
    characterImageUrl,
    audioUrl,
    characterName,
    onInstrumentClick,
    instantFeedback = true,
    currentIndex,
    totalCharacters,
}: PatwListenFormProps) {
  const [instruments, setInstruments] = useState<Instruments | ''>('');
  
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Match the data format with hyphens
  const instrumentsOptions: { label: string; value: Instruments }[] = [
    { label: 'flute', value: 'fl' },
    { label: 'clarinet', value: 'cl' },
    { label: 'bassoon', value: 'bsn' },
    { label: 'oboe', value: 'ob' },
    { label: 'string instruments', value: 'str' },
    { label: 'oboe and timpani', value: 'obtimp' },
    { label: 'french horn', value: 'hn' },
  ];

  const instrumentImages = {
    bsn: '/instruments/bassoon.png',
    cl: '/instruments/clarinet.png',
    fl: '/instruments/flute.png',
    hn: '/instruments/frenchhorn.png',
    ob: '/instruments/oboe.png',
    str: '/instruments/violin.png',
    obtimp: '/instruments/timpani.png',
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!instruments) {
        setErrorMessage('Please select an instrument');
        return;
    }

    setErrorMessage('');
    onInstrumentClick(instruments);
    };

    const handleInstrumentClick = (instrument: Instruments) => {
    setInstruments(instrument);
    // Instant feedback - trigger
    if (instantFeedback && onInstrumentClick){
      onInstrumentClick(instrument);
    }
    setErrorMessage('');
  };

    // Create grid items: empty box, character in the middle-center, and instruments around character
    const gridItems = [
        { type: 'instrument' as const, position: 0, instrument: instrumentsOptions[0] },
        { type: 'audio' as const, position: 1 },
        { type: 'instrument' as const, position: 2, instrument: instrumentsOptions[1] },
        { type: 'instrument' as const, position: 3, instrument: instrumentsOptions[2] },
        { type: 'character' as const, position: 4},
        { type: 'instrument' as const, position: 5, instrument: instrumentsOptions[3] },
        { type: 'instrument' as const, position: 6, instrument: instrumentsOptions[4] },
        { type: 'instrument' as const, position: 7, instrument: instrumentsOptions[5] },
        { type: 'instrument' as const, position: 8, instrument: instrumentsOptions[6] },
    ]

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
        <form onSubmit={handleSubmit} className='w-full h-full max-w-4xl'>
        {/* Desktop: 3x3 Grid */}
        <div className="hidden md:grid md:grid-cols-3 md:grid-rows-3 gap-2 w-full h-full max-h-auto">
          {gridItems.map((item, index) => (
            <div key={index} className="w-full">
              {item.type === 'audio' && (
                <div className="w-full h-full rounded-lg bg-thyme-100/75 flex flex-col items-center justify-center p-3 text-center">
                  <h2 className='text-base font-semibold text-thyme-500'>
                    Listen to the {characterName}&apos;s Theme
                  </h2>
                  <audio
                      controls
                      src={audioUrl}
                      className='w-full'
                  >
                      Your browser does not support the audio element.
                  </audio>
                  {/* Progress Indicator */}
                  <p className='text-md text-thyme-500 mt-2'>
                    Character {currentIndex + 1} of {totalCharacters}
                  </p>
                </div>
              )}
              
              {item.type === 'character' && (
                <div className="w-full h-full rounded-lg bg-thyme-100/75 flex flex-col items-center justify-center p-2">
                  {characterImageUrl ? (
                    <Image 
                      src={characterImageUrl} 
                      alt={currentCharacter}
                      width={80}
                      height={80}
                      className="object-contain mb-2"
                      priority
                    />
                  ) : null}
                  <p className="text-lg text-thyme-500 font-bold capitalize text-center">
                    {currentCharacter}
                  </p>
                </div>
              )}
              
              {item.type === 'instrument' && item.instrument && (
              <button
                type="button"
                onClick={() => handleInstrumentClick(item.instrument.value)}
                className={`w-full h-full rounded-lg bg-thyme-200/75 flex flex-col items-center justify-center p-4 text-center transition-all ${
                  instruments === item.instrument.value
                    ? 'border-thyme-500 text-thyme-500'
                    : 'border-thyme-200 hover:border-thyme-400 hover:bg-thyme-400/75 hover:text-thyme-100 '
                }`}
              >
                <Image 
                  src={instrumentImages[item.instrument.value]}
                  alt={item.instrument.label}
                  width={80}
                  height={80}
                  className="object-contain mb-2"
                  priority
                />
                <strong className="text-md">{item.instrument.label}</strong>
              </button>
            )}
            </div>
          ))}
        </div>

        {/* Mobile: Character on top + Dropdown */}
        <div className="md:hidden space-y-6 mb-6">
          {/* Character Display */}
          <div className="rounded-lg bg-thyme-100/75 flex flex-col items-center p-3">
            {characterImageUrl ? (
              <Image 
                src={characterImageUrl} 
                alt={currentCharacter}
                width={150}
                height={150}
                className="object-contain mb-3"
                priority
              />
            ) : null}
            <p className="text-2xl font-bold capitalize text-center">
              {currentCharacter}
            </p>
          </div>

          {/* Audio Player */}
          <div className="bg-gray-50 rounded-lg p-3">
            <h2 className='text-lg font-semibold text-gray-800 mb-0'>
              Listen to the {characterName}&apos;s Theme
            </h2>
            <audio
                controls
                src={audioUrl}
                className='w-full'
            >
                Your browser does not support the audio element.
            </audio>
          </div>

          {/* Dropdown Selection */}
          <div className='bg-thyme-100/75'>
            <select
              id="instrument-select"
              value={instruments}
              onChange={(e) => {
                const selected = e.target.value as Instruments;
                setInstruments(selected);
                if (selected && instantFeedback && onInstrumentClick) {
                  onInstrumentClick(selected);
                }
                setErrorMessage('');
              }}
              className="w-full px-2 py-3 border-2 border-thyme-300 rounded-lg focus:border-thyme-500 text-lg text-thyme-500"
            >
              <option value="">Choose an instrument...</option>
              {instrumentsOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="flex items-center gap-2 text-red-600 mb-4">
            <ExclamationCircleIcon className="h-5 w-5" />
            <p className="text-sm">{errorMessage}</p>
          </div>
        )}
      </form>
    </div>
  );
}