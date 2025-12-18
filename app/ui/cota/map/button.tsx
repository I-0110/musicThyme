'use client'

import { Character } from '@/app/lib/cota/interface';
import Image from 'next/image';

interface CardProps {
    character: Character;
    isActive: boolean;
    onClick: () => void;
}

export default function CharacterCardButton({
    character,
    isActive,
    onClick
}: CardProps) {
    return (
        <button
            onClick={onClick}
            className={`
                relative w-full h-full rounded-xl transition-all duration-300 flex flex-col items-center justify-center p-3 border-2
                ${isActive
                        ? 'bg-gradient-to from-carnival-300 to-carnival-200 scale-105 shadow-lg border-carnival-300'
                        : 'bg-gradient-to from-carnival-100 to-carnival-yellow hover:scale-105 hover:shadow-md border-carnival-200'
                    }
                `}
        >
            {/* Character Image */}
            <Image 
                src={character.imageUrl || '/images/circus.jpg'} 
                alt={character.characterName}
                width={30}
                height={30}
                className="object-contain mb-2"
            />

            {/* Order number and name */}
            <div className={`text-center ${isActive ? 'text-carnival-500' : 'text-carnival-100'}
            `}>
                <div className='text-lg font-bold'>{character.orderNumber}</div>
                <div className='text-sm font-semibold line-clamp-2'>
                    {character.characterName}
                </div>
            </div>

            {/* Active indicator */}
            {isActive && (
                <div className='absolute -top-2 -right-2 w-6 h-6 bg-carnival-300 rounded-full flex items-center justify-center'>
                    <span className="text-white text-xs font-bold">✓</span>
                </div>
            )}
        </button>
    )
}