// 'use client';

// import { useEffect, useRef } from 'react';
// import type Phaser from 'phaser';

// export default function AsteroidsNotesGame() {
//     const gameContainerRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         let game: Phaser.Game;
//         let destroyed = false;

//         const init = async () => {
//             // Dynamic import of Phaser to ensure it only loads on the client
//             const Phaser = (await import('phaser')).default;

//             // Import the main game scene
//             const { AsteroidMainScene } = await import('./scenes/Asteroids/MainScene');

//             if (destroyed) return; // If component unmounted while loading, do nothing

//             // Game configuration
//             game = new Phaser.Game({
//                 type: Phaser.AUTO,
//                 width: 800,
//                 height: 600,
//                 parent: gameContainerRef.current ?? undefined,
//                 physics: {
//                     default: 'arcade',
//                     arcade: {
//                         gravity: { x:0, y: 300 },
//                         debug: false,
//                     },
//                 },
//                 scene: [
//                     AsteroidMainScene,
//                 ],
//                 // Scales to fit the container on mobile devices
//                 scale: {
//                     mode: Phaser.Scale.FIT,
//                     autoCenter: Phaser.Scale.CENTER_BOTH,
//                 },
//             });
//         };
        
//         init();

//         // Cleanup when you leave the game page
//         return () => {
//             destroyed = true; // Prevent state updates if game is still loading
//             game?.destroy(true); // Destroy Phaser game instance to free resources
//             // Note: Phaser's destroy method should handle cleanup of event listeners and game objects.        
//         };

//     }, []);

//     return (
//         <div className='w-full flex flex-col items-center gap-4'>
//             <div className='text-sm text-center text-gray-100'>
//                 <span className='text-green-500 font-bold'>Instruments</span> = Instruments (+10 pts) &nbsp;|&nbsp;
//                 <span className='text-red-500 font-bold'>Red Items</span> = Red Bombs! (-5 pts) &nbsp;|&nbsp;
//                 <span className='text-white font-bold'>Deinonychus attacks or White Bombs</span> = Game Over!
//             </div>
//             {/* Phaser mounts into this div */}
//             <div ref={gameContainerRef} className='w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl' />
//         </div>
//     )
// }