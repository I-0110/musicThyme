// import dynamic from 'next/dynamic';
// import { MainScene } from '@/lib/games/asteroids-notes/MainScene';
// import { useState } from 'react';
// import { ClefType } from '@/app/lib/games/asteroids-notes/constants';

// // Phaser can't run on the server - dynamic import with ssr: false
// const GameLoader = dynamic(() => import("@/ui/games/GameLoader"), { ssr: false });

// export default function AsteroidsNotes() {
//     const [clef, setClef] = useState<ClefType>('treble');

//     return (
//         <div>
//             <h1>Asteroids Notes</h1>
//             <p>Identify the note before it hits the clef!</p>
//             <GameLoader scene={MainScene} />
//         </div>
//     );
// }