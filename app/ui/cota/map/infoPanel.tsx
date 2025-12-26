'use client';

// import { useState } from 'react';
// import { Character } from '@/app/lib/cota/interface';
// import { PlayIcon, AcademicCapIcon, BookOpenIcon, XMarkIcon, HomeModernIcon } from '@heroicons/react/24/outline';
// import Image from 'next/image';

// interface InfoPanelProps {
//   character: Character | null;
//   onClose: () => void;
//   onStartQuiz: () => void;
//   onPlayAudio: () => void;
// }

export default function InfoPanel() {
  // All characters in order
  // const allCharacters: Character[] = [];

  // // State management
  // const [character, setCharacter] = useState<Character>();
  // const [hover, setHover] = useState<number | null>(null);
  // const [expand, setExpand] = useState<number | null>(null);

  // const [loading, isLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // if (loading) return <p>Loading content...</p>
  // if (error) return <p className='text-red-600'>{error}</p>

  return <p>This is the Info Panel under construction.</p>
}

// export const InfoPanel: React.FC<InfoPanelProps> = ({ 
//   character, 
//   onClose,
//   onStartQuiz,
//   onPlayAudio
// }) => {
//   const [activeTab, setActiveTab] = useState<'overview' | 'videos' | 'vocabulary' | 'activities'>('overview');

//   if (!character) {
//     return (
//       <div className="h-full flex items-center justify-center bg-gradient-to from-carnival-100 to-music-100 rounded-xl">
//         <div className="text-center text-music-400">
//           <HomeModernIcon className="mb-4" />
//           <p className="text-lg font-semibold">Select a character to explore!</p>
//           <p className="text-sm mt-2">Click any character on the path</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="h-full flex flex-col bg-gradient-to from-carnival-100 to-music-100 rounded-xl p-6 overflow-hidden relative">
//       {/* Close button */}
//       <button
//         onClick={onClose}
//         className="absolute top-4 right-4 w-8 h-8 bg-carnival-300 hover:bg-carnival-400 text-white rounded-full flex items-center justify-center transition-colors z-10"
//       >
//         <XMarkIcon className="w-5 h-5" />
//       </button>

//       {/* Header */}
//       <div className="text-center items-center mb-4">
//         <Image 
//           src={character.imageUrl || '/images/circus.jpg'} 
//           alt={character.characterName}
//           width={30}
//           height={30}
//           className="object-contain mb-2"
//         />
//         <h2 className="text-2xl font-bold text-music-500">
//           Movement {character.orderNumber}
//         </h2>
//         <h3 className="text-xl text-carnival-300">{character.title}</h3>
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-2 mb-4 border-b-2 border-carnival-200">
//         {['overview', 'videos', 'vocabulary', 'activities'].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab as typeof activeTab)}
//             className={`px-4 py-2 font-semibold transition-colors capitalize ${
//               activeTab === tab
//                 ? 'text-carnival-300 border-b-2 border-carnival-300 -mb-0.5'
//                 : 'text-music-400 hover:text-carnival-300'
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Content */}
//       <div className="flex-1 overflow-y-auto">
//         {activeTab === 'overview' && (
//           <div className="space-y-3">
//             {/* Musical Characteristics Grid */}
//             <div className="grid grid-cols-2 gap-3 text-sm">
//               <div className="bg-white rounded-lg p-3 border border-carnival-200">
//                 <div className="font-semibold text-carnival-300">Tempo</div>
//                 <div className="text-music-500">{character.details.tempo}</div>
//               </div>
//               <div className="bg-white rounded-lg p-3 border border-carnival-200">
//                 <div className="font-semibold text-carnival-300">Mood</div>
//                 <div className="text-music-500">{character.details.mood}</div>
//               </div>
//               <div className="bg-white rounded-lg p-3 border border-carnival-200">
//                 <div className="font-semibold text-carnival-300">Instruments</div>
//                 <div className="text-music-500">
//                   {character.details.instruments.join(', ')}
//                 </div>
//               </div>
//               <div className="bg-white rounded-lg p-3 border border-carnival-200">
//                 <div className="font-semibold text-carnival-300">📢 Dynamics</div>
//                 <div className="text-music-500">{character.details.dynamics}</div>
//               </div>
//             </div>
            
//             {/* Description */}
//             <div className="bg-white rounded-lg p-4 border border-carnival-200">
//               <p className="text-music-500 leading-relaxed">
//                 {character.description}
//               </p>
//             </div>
            
//             {/* Fun Fact */}
//             <div className="bg-gradient-to- from-carnival-200 to-carnival-100 rounded-lg p-4 border border-carnival-300">
//               <div className="font-semibold text-carnival-400 mb-2">💡 Fun Fact</div>
//               <p className="text-music-500">{character.funFacts}</p>
//             </div>
            
//             {/* Action Buttons */}
//             <div className="flex gap-2">
//               <button 
//                 onClick={onPlayAudio}
//                 className="flex-1 bg-carnival-300 hover:bg-carnival-400 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
//               >
//                 <PlayIcon className="w-4 h-4" /> Listen
//               </button>
//               <button 
//                 onClick={onStartQuiz}
//                 className="flex-1 bg-music-300 hover:bg-music-400 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
//               >
//                 <BookOpenIcon className="w-4 h-4" /> Take Quiz
//               </button>
//             </div>
//           </div>
//         )}

//         {activeTab === 'videos' && (
//           <div className="space-y-4">
//             {/* Performance Video */}
//             <div className="bg-white rounded-lg p-4 border border-carnival-200">
//               <h4 className="font-semibold text-carnival-300 mb-2 flex items-center gap-2">
//                 <PlayIcon className="w-4 h-4" /> Performance Video
//               </h4>
//               <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
//                 <div className="text-center text-gray-500">
//                   <PlayIcon className="w-12 h-12 mx-auto mb-2" />
//                   <p className="text-sm">YouTube Player</p>
//                   <p className="text-xs">ID: {character.performanceVideo || 'Not available'}</p>
//                 </div>
//               </div>
//               <p className="text-sm text-music-400 mt-2">
//                 Watch a live performance of {character.title}
//               </p>
//             </div>

//             {/* Activity Video */}
//             <div className="bg-white rounded-lg p-4 border border-carnival-200">
//               <h4 className="font-semibold text-carnival-300 mb-2 flex items-center gap-2">
//                 <AcademicCapIcon className="w-4 h-4" /> Teaching Activities
//               </h4>
//               <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
//                 <div className="text-center text-gray-500">
//                   <AcademicCapIcon className="w-12 h-12 mx-auto mb-2" />
//                   <p className="text-sm">Activity Video</p>
//                   <p className="text-xs">ID: {character.activitiesVideo || 'Not available'}</p>
//                 </div>
//               </div>
//               <p className="text-sm text-music-400 mt-2">
//                 Ideas for classroom activities and movement exploration
//               </p>
//             </div>
//           </div>
//         )}

//         {activeTab === 'vocabulary' && (
//           <div className="space-y-3">
//             <div className="bg-gradient-to- from-music-200 to-carnival-200 rounded-lg p-4 border border-music-300">
//               <h4 className="font-semibold text-music-500 mb-2">Musical Terms</h4>
//               <p className="text-sm text-music-400">
//                 Learn the vocabulary used in this movement
//               </p>
//             </div>
//             {character.vocabulary.map((item, index) => (
//               <div key={index} className="bg-white rounded-lg p-4 border border-carnival-200">
//                 <div className="font-bold text-carnival-300 text-lg">{item.term}</div>
//                 <div className="text-music-500 mb-2">{item.definition}</div>
//                 <div className="bg-carnival-100 p-2 rounded border border-carnival-200">
//                   <span className="text-xs font-semibold text-carnival-400">Example: </span>
//                   <span className="text-sm text-music-500">{item.example}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {activeTab === 'activities' && (
//           <div className="space-y-3">
//             <div className="bg-gradient-to- from-music-200 to-music-300 rounded-lg p-4 border border-music-400">
//               <h4 className="font-semibold text-music-500 mb-2 flex items-center gap-2">
//                 <AcademicCapIcon className="w-5 h-5" /> Teacher Resources
//               </h4>
//               <p className="text-sm text-music-100">
//                 Activities to help students explore this movement
//               </p>
//             </div>
//             {character.activities.map((activity, index) => (
//               <div key={index} className="bg-white rounded-lg p-4 border border-carnival-200 flex gap-3">
//                 <div className="shrink-0 w-8 h-8 bg-carnival-300 text-white rounded-full flex items-center justify-center font-bold">
//                   {index + 1}
//                 </div>
//                 <p className="text-music-500 flex-1">{activity}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };