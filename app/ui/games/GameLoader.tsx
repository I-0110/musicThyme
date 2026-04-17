// 'use client';

// import dynamic from 'next/dynamic';
// import { useState } from 'react';

// // ssr: false is critical - Plaser uses window and document
// const ChaseTheOrchestraGame = dynamic(
//     () => import('./ChaseTheOrchestraGame'),
//     { ssr: false, loading: () => <p className='text-center p-8'>Loading game...</p> }
// );

// // ssr: false is critical - Plaser uses window and document
// const AsteroidsNotesGame = dynamic(
//     () => import('./arcade/AsteroidsNotes'),
//     { ssr: false, loading: () => <p className='text-center p-8'>Loading game...</p> }
// );

// type GameId = 'chase' | 'asteroids';

// export default function GameLoader() {
//     const [activeGame, setActiveGame] = useState<GameId | null>(null);
//     return (
//     <div>
//       {/* Game picker buttons */}
//       {!activeGame && (
//         <div className='flex gap-4 justify-center p-8'>
//           <button onClick={() => setActiveGame('chase')}>
//             Chase the Orchestra
//           </button>
//           <button onClick={() => setActiveGame('asteroids')}>
//             Asteroids Notes
//           </button>
//         </div>
//       )}

//       {/* Back button */}
//       {activeGame && (
//         <button onClick={() => setActiveGame(null)}>
//           ← Back to menu
//         </button>
//       )}

//       {/* Only one game mounts at a time */}
//       {activeGame === 'chase'    && <ChaseTheOrchestraGame />}
//       {activeGame === 'asteroids' && <AsteroidsNotesGame />}
//     </div>
//   );
// }