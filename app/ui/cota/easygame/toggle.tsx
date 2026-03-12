'use client'

import { useEasyGame } from '@/app/ui/cota/easygame/game';

interface ToggleProps {
    characterId: string;
    onComplete?: (letter: string) => void;
}

export default function GameToggle({ characterId, onComplete }: ToggleProps) {
    const { gameMode, setGameMode, isComplete } = useEasyGame({ characterId, onComplete });

    return (
        <div className="flex justify-center gap-4 mb-6">
            <button
                onClick={() => setGameMode('Off')}
                className={`px-6 py-3 rounded-lg font-bold transition-all ${
                gameMode === 'Off'
                    ? 'bg-red-500 text-white scale-110'
                    : 'bg-gray-600 text-gray-300'
                }`}
            >
                Off
            </button>
            <button 
                onClick={() => setGameMode('Easy')}
                disabled={isComplete}
                className={`px-6 py-3 rounded-lg font-bold transition-all ${
                    gameMode === 'Easy'
                    ? 'bg-green-500 text-white scale-110'
                    : isComplete
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-gray-600 text-gray-300'
                }`}
            >
                Easy {isComplete && '✓'}
            </button>
        </div>
    )
}