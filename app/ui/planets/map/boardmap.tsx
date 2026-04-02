'use client';

import { useState } from 'react';
import { ArrowRightIcon, RocketLaunchIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { Planet } from '@/app/lib/planets/interface';
import Link from 'next/link';

interface BoardMapProps {
  planets: Planet[];
}

export default function BoardMap({ planets }: BoardMapProps) {
  const [hover, setHover] = useState<number | null>(null);
  const [selected, setSelected] = useState<Planet | null>(null);

  const handlePlanetClick = (planet: Planet) => {
    setSelected(planet);
  };

  // Sort planets by orderNumber
  const sortPlanets = [...planets].sort((a, b) => a.orderNumber - b.orderNumber);

  return (
    <div className='h-screen flex flex-col md:flex-row gap-4 p-4 overflow-hidden'>

      {/* Left: Planet Cards — 2-column grid */}
      <div className='grid grid-cols-2 gap-2 md:w-1/2 content-start auto-rows-min'>
        {sortPlanets.map((planet, index) => {
          const isHover = hover !== null;
          const isThisHover = hover === index;
          const isLastOdd = index === sortPlanets.length - 1 && sortPlanets.length % 2 !== 0;

          return (
            <div
              key={planet.id}
              className={`bg-planet-teal/65 dark:bg-planet-sea-green-200/65 rounded-lg shadow-lg
                transition-all duration-300 cursor-pointer
                flex flex-col items-center justify-center p-2
                ${isLastOdd ? 'col-span-2 max-w-[50%] mx-auto w-full' : ''}
                ${isHover && !isThisHover ? 'grayscale brightness-75 scale-95' : ''}
                ${isThisHover ? 'scale-105 z-10 shadow-2xl' : ''}
              `}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(null)}
              onClick={() => handlePlanetClick(planet)}
            >
              {/* Planet Image */}
              {planet.imageUrl && (
                <div className='relative w-full h-12 mb-1'>
                  <Image
                    src={planet.imageUrl}
                    alt={planet.planetName}
                    fill
                    className='object-contain rounded'
                  />
                </div>
              )}

              {/* Planet Info */}
              <div className='text-center'>
                <p className='text-sm font-semibold text-white wrap-break-word'>
                  {planet.orderNumber}. {planet.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right: Info Panel — always visible */}
      <div className='md:w-1/2 bg-planet-grape/75 rounded-lg flex items-center justify-center p-4 content-start'>
        {!selected ? (
          // Default empty state — contextual hint
          <div className='text-white text-center space-y-3 px-4'>
            <RocketLaunchIcon className='w-12 h-12 mx-auto opacity-60' />
            <p className='text-sm font-semibold'>Select a planet on the map to explore its story</p>
            <p className='text-xs text-white/50'>Each world holds a character, a mission, and a mystery.</p>
          </div>
        ) : (
          // Selected planet overview
          <div className='relative w-full h-full text-white flex flex-col gap-3'>

            {/* Close */}
            <button
              onClick={() => setSelected(null)}
              className='absolute top-0 right-0 text-white/60 hover:text-red-400 z-10'
              aria-label='Close'
            >
              <XMarkIcon className='w-5 h-5' />
            </button>

            {/* Header */}
            <div className='text-center justify-center pr-6'>
              <h2 className='text-xl font-bold'>{selected.planetName}</h2>
              <p className='text-xs text-white/70 mt-0'>{selected.title}</p>
              <Link
                href={`/planets/interactive-map/${selected.id}/overview`}
                className='text-planet-cyan hover:text-white inline-flex items-center gap-1 text-sm font-semibold transition-colors'
                onClick={() =>
                  console.log('Planet ID:', selected.id, 'Full URL:', `/planets/interactive-map/${selected.id}/activities`)
                }
              >
                Explore {selected.planetName}
                <ArrowRightIcon className='w-4 h-4' />
              </Link>
            </div>

            {/* Video — full width of panel */}
            {selected.youtube && (
              <div className='hidden sm:block w-full'>
                <div className='relative w-full aspect-video'>
                  <iframe 
                    src={`https://www.youtube.com/embed/${selected.youtube}`}
                    title="YouTube video player" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                    className='absolute w-full h-full rounded-2xl'
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}