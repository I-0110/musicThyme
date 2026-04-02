// import { useState, useEffect } from 'react';
// import { easyGamesData } from '@/app/lib/cota/games/easy-data';

// interface UseEasyGameProps {
//     characterId: string;
//     onComplete?: (letter: string) => void;
// }

// export function useEasyGame({ characterId, onComplete }: UseEasyGameProps) {
//    const [isGame, setGame] = useState<'Off' | 'Easy'>('Off');
//    const [isInstrument, setInstrument] = useState<any>(null);
//    const [isLetters, setLetters] = useState<string[]>([]);
//    const [letterPositions, setLetterPositions] = useState<any>({});
//    const [showModal, setShowModal] = useState<'answer' | 'bonus' | 'success'>('answer');
//    const [selectedFam, setSelectedFam] = useState( '')
//    const [isComplete, setComplete] = useState(false);

//    // Get character data
//    const characterData = instrument.find(game => game.id === characterId);

//    useEffect(() => {
//     if (game === 'Off') {
//         resetGame();
//     } else if (game === 'Easy' && characterData && !isComplete) {
//         spreadLetters();
//     }
//    } [game]); 

//    const spreadLetters = () => {
//     if (!characterData) return;

//     // Randomly select instrument
//     const randomInstr = characterData.instruments[
//         Math.floor(Math.random() * characterData.instruments.length)
//     ];

//     setInstrument(randomInstr);
//     const letters = randomInstr.letters;
//     const positions: any = {};

//     // Spread across Overview, Content, and Vocabulary sections
//     const sections = ['Overview', 'Content', 'Vocabulary'];
//     letters.forEach((letter: string, index: number) => {
//         const section = sections[index % 3];
//         if (!positions[section]) positions[section] = [];
//         positions[section].push({ letter, id: `${letter}-${index}` });
//     });

//     setLetterPositions(positions);
//     setLetters([]);
//    };

//    const handleLetterClick = (letterKey: string) => {
//         if (!isLetters.includes(letterKey)) {
//             const newCollected = [...isLetters, letterKey];
//             setLetters(newCollected);

//             if (newCollected.length === isInstrument.letter.length) {
//                 setModalType('answer');
//                 setShowModal(true);
//             }
//         }
//    }

// }