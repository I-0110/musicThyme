import GameLoader from '@/app/ui/games/GameLoader';

export const metadata = {
    title: 'Asteroids Notes! on Music Thyme',
    description: 'Asteroids attacks! Hurry! Click the right letter note before the asteroid hits you! Each note you catch earns you points, but if an asteroid hits you, it&apos;s game over. Can you beat your high score and become the ultimate hero of Saturn Planet?',
};

export default function AsteroidsNotes() {
    return (
        <div className='flex flex-col items-center bg-planet-deep gap-6 p-6'>
            <h1 className='text-3xl font-bold text-center text-yellow-400'>Asteroids Notes!</h1>
            <p className='text-center text-gray-200 max-w-2xl'>
                Asteroids attacks! Hurry! Click the right letter note before the asteroid hits you! Each note you catch earns you points, but if an asteroid hits you, it&apos;s game over. Can you beat your high score and become the ultimate hero of Saturn Planet?
            </p>
            <GameLoader />
        </div>
    );
}