import { Character, Details } from "./interface";
// Please add QuizQuestion to import { Character } from "./interface";

export const carnivalCharacters: Character[] = [
    {
        id: '1',
        title: 'Introduction and Royal March of the Lion',
        characterName: 'Lion',
        orderNumber: 1,
        video: {
            youtube: 'nRLyBNV1lc0?si=eMWLDb3-9qbguW3O&amp;start=17',
        },
        imageUrl: '/cota/images/lion.jpg'
    },
    {
        id: '2',
        title: 'Hens and Roosters',
        characterName: 'Rooster',
        orderNumber: 2,
        video: {
            youtube: 'xU4RcRWVGyM?si=-hozXB1NkV33IJA7&amp;start=17',
        },
        imageUrl: '/cota/images/rooster.png'
    },
    {
        id: '3',
        title: 'Wild Horses',
        characterName: 'Horse',
        orderNumber: 3,
        video: {
            youtube: '-aLM7nJB2u4?si=K7cTf9Oyux3_vTxg&amp;start=16',
        },
        imageUrl: '/cota/images/horse.png'
    },
    {
        id: '4',
        title: 'Tortoise',
        characterName: 'Tortoise',
        orderNumber: 4,
        video: {
            youtube: '2cpT5_VTp1M?si=SoySyIsJoMzXa8WZ&amp;start=17',
        },
        imageUrl: '/cota/images/tortoise.png'
    },
    {
        id: '5',
        title: 'Elephant',
        characterName: 'Elephant',
        orderNumber: 5,
        video: {
            youtube: 'Bi5afK-Kvq4?si=y2YFprY_A8eFn9xx&amp;start=25',
        },
        imageUrl: '/cota/images/elephant.png'
    },
    {
        id: '6',
        title: 'Kangaroos',
        characterName: 'Kangaroo',
        orderNumber: 6,
        video: {
            youtube: 'LZDEkWP4oHk?si=m3otLqtbaEfRgnyK&amp;start=15',
        },
        imageUrl: '/cota/images/kangaroo.png'
    },
    {
        id: '7',
        title: 'Aquarium',
        characterName: 'Fishes',
        orderNumber: 7,
        video: {
            youtube: 'zec-6vxxFTE?si=DldU5DavgI64YupB&amp;start=25',
        },
        imageUrl: '/cota/images/fish.png'
    },
    {
        id: '8',
        title: 'Personnages with Long Ears',
        characterName: 'Donkey',
        orderNumber: 8,
        video: {
            youtube: '1kybrQokreo?si=kGmzdYNXrQ2vOcxR&amp;start=25',
        },
        imageUrl: '/cota/images/donkey.png'
    },
    {
        id: '9',
        title: 'The Cuckoo in the Heart of the Woods',
        characterName: 'Cuckoo',
        orderNumber: 9,
        video: {
            youtube: 'PtjwKZn_2Qg?si=lNDrc1vib1AWilq_&amp;start=20',
        },
        imageUrl: '/cota/images/cuckoo.png'
    },
    {
        id: '10',
        title: 'Aviary',
        characterName: 'Birds',
        orderNumber: 10,
        video: {
            youtube: 'xkmpKKVVO4Q?si=H_vSHj0RLqsynbiu&amp;start=24',
        },
        imageUrl: '/cota/images/birds.png'
    },
    {
        id: '11',
        title: 'Pianists',
        characterName: 'Pianists',
        orderNumber: 11,
        video: {
            youtube: 'xD9N_gfuhqw?si=u6fT0ItyokwReCGo&amp;start=23',
        },
        imageUrl: '/cota/images/pianist.png'
    },
    {
        id: '12',
        title: 'Fossils',
        characterName: 'Fossils',
        orderNumber: 12,
        video: {
            youtube: '-i_llX9gJNs?si=dhyQeb-6b2JYypWu&amp;start=15',
        },
        imageUrl: '/cota/images/fossil.png'
    },
    {
        id: '13',
        title: 'The Swan',
        characterName: 'Swan',
        orderNumber: 13,
        video: {
            youtube: '_o85H4nDytA?si=qLaoAyHv3fflu5CA&amp;start=24',
        },
        imageUrl: '/cota/images/swan.png'
    },
    {
        id: '14',
        title: 'Finale',
        characterName: 'Finale',
        orderNumber: 14,
        video: {
            youtube: 'Mucn0eHP2rE?si=SAD7lafrKb17B86w&amp;start=20',
        },
        imageUrl: '/circus.jpg'
    },
];

export const characterDetails: Details[] = [
    {
        characterId: '1',
        mood: ['majestic', 'mysterious'], 
        tempo: 'moderate = moderato', 
        dynamics: ['soft to loud = crescendo', 'loud to soft = descrecendo', 'medium-soft = mezzo-piano'],
        mainFamily: ['strings', 'percussion'],
        instruments: ['piano', 'violin', 'viola', 'double bass', 'cello'],
        vocabulary: [
            {
                term: 'Crescendo',
                definition: 'Performers will play their instruments soft and gradually will play louder',
                example: 'When we listen the Introduction and Royal March of the Lion, you can hear the lion roaring. This is possible because we use crescendo and descrescendo.'
            },
            {
                term: 'Descrescendo',
                definition: 'Performers will play their instruments loud and gradually will play soft.',
                example: 'When we listen the Introduction and Royal March of the Lion, you can hear the lion roaring. This is possible because we use crescendo and descrescendo.'
            },
         ],
        moves: ['march', 'walk'],
    },
    {
        characterId: '2',
        mood: ['majestic', 'mysterious'], 
        tempo: 'moderate = moderato', 
        dynamics: ['soft to loud = crescendo', 'loud to soft = descrecendo', 'medium-soft = mezzo-piano'],
        mainFamily: ['strings', 'percussion'],
        instruments: ['piano', 'violin', 'viola', 'clarinet'],
        vocabulary: [
            {
                term: 'Staccato',
                definition: 'Performers will play the notes shorter.',
                example: 'When we listen the Introduction and Royal March of the Lion, you can hear the lion roaring. This is possible because we use crescendo and descrescendo.'
            },
            {
                term: 'Glissando',
                definition: 'Performers will play',
                example: 'When we listen the Introduction and Royal March of the Lion, you can hear the lion roaring. This is possible because we use crescendo and descrescendo.'
            },
         ],
        moves: ['march', 'walk'],
    },
]



// export const carnivalMovements: Character[] = [
//     {
//         id: '1',
//         title: 'Introduction and Royal March of the Lion',
//         characterName: 'Lion',
//         orderNumber: 1,
//         audio: {
//             spotify: '',
//             startTime: 0,
//             endTime: 30
//         },
//         details: {
//             tempo: 'moderate = moderato',
//             mood: 'majestic',
//             movement: ['walk'],
//             mainFamily: ['strings', 'percussion'],
//             instruments: ['piano', 'double bass', 'cello'],
//             dynamics: [
//                 'loud = forte',
//                 'soft to loud = crescendo', 'loud to soft = descrecendo'
//             ]
//         },
//         description: 'The king of the jungle makes a grand entrance with powerful chords and bold melodies.',
//         musicalFacts: [
//             'Features strong piano chords representing the lion\'s roar',
//             'Uses tremolo strings to create a sense of majesty',
//             'The tempo is steady and regal, like a royal march'
//         ],
//         funFacts: 'The piano plays big, crashing chords that sound like a lion\'s mighty roar!',
//         performanceVideo: ['replace for actual link'],
//         vocabulary: [
//             { term: 'Crescendo', definition: 'Getting gradually louder', example: 'The lion\'s roar grows from soft to LOUD!' },
//             { term: 'Decrescendo', definition: 'Getting gradually softer', example: 'The roar fades away as the lion walks past' },
//             { term: 'Forte', definition: 'Play loudly', example: 'The lion\'s theme is played forte - strong and powerful' }
//         ],
//         activitiesVideo: ['replace'],
//         activities: [
//             'March around the room like a king when you hear the bold chords',
//             'Create your own "roar" sounds with a thunder stick or egg shakers during crescendos and descrescendos'
//         ],
//         imageUrl: '/cota/images/lion.jpg'
//     },
//     {
//         id: '2',
//         title: 'Roosters and Hens',
//         characterName: 'Rooster',
//         orderNumber: 2,
//         audio: {
//             spotify: '',
//             startTime: 0,
//             endTime: 30
//         },
//         details: {
//             tempo: 'fast = allegro',
//             mood: 'playful',
//             movement: ['tip-toe','jog'],
//             mainFamily: ['strings','percussion','woodwinds'],
//             instruments: ['violin', 'piano', 'clarinet'],
//             dynamics: [
//                 'loud = forte',
//                 'soft to loud = crescendo'
//             ]
//         },
//         description: 'The chickens in a barnyard are clucking and eating.',
//         musicalFacts: [
//             'Piano plays rapid, repeated notes like pecking, called "staccato"',
//             'Violin adds high-pitched clucking sounds',
//             'Clarinet can create sounds like a rooster call'
//         ],
//         funFacts: 'Listen carefully and you can hear the chickens clucking and pecking for food!',
//         performanceVideo: ['replace for actual link'],
//         vocabulary: [
//             { term: 'Staccato', definition: 'Short, detached notes', example: 'The piano plays staccato to sound like pecking' },
//             { term: 'Allegro', definition: 'Fast and lively tempo', example: 'Chickens move allegro around the barnyard' }
//         ],
//         activitiesVideo: ['replace'],
//         activities: [
//             'Make pecking motions with your feet to the rhythm',
//             'Try playing staccato notes with your fingers on a drum',
//         ],
//         imageUrl: '/cota/images/rooster.png'
//     },
//     {
//         id: '3',
//         title: 'Wild Donkeys',
//         characterName: 'Horse',
//         orderNumber: 3,
//         audio: {
//             spotify: '',
//             startTime: 0,
//             endTime: 30
//         },
//         details: {
//             tempo: 'very fast = presto',
//             mood: 'energetic',
//             movement: ['gallop'],
//             mainFamily: ['strings','percussion'],
//             instruments: ['piano'],
//             dynamics: [
//                 'loud = forte',
//             ]
//         },
//         description: 'Two pianos race up and down the keyboard, representing wild horses galloping.',
//         musicalFacts: [
//             'Uses two pianos playing rapid scales',
//             'Creates the sound of galloping and braying',
//             'One of the fastest movements in the suite'
//         ],
//         funFacts: 'The two pianos sound like they\'re having a race, just like wild horses running free!',
//         performanceVideo: ['replace for actual link'],
//         vocabulary: [
//             { term: 'Scale', definition: 'Notes going up or down in order', example: 'The pianos play fast scales like galloping hooves' },
//             { term: 'Presto', definition: 'Very fast tempo', example: 'Wild donkeys run presto across the plains' }
//         ],
//         activitiesVideo: ['replace'],
//         activities: [
//             'Gallop around the room during the fastest parts',
//             'Practice playing scales quickly on piano or a xylophone',
//         ],
//         imageUrl: '/cota/images/horse.png'
//     },
// ];

// export const quizQuestions: QuizQuestion[] = [
//     // Tempo Questions
//     {
//         id: 'q1',
//         movementId: '1',
//         text: 'What is the tempo of the Lion\'s theme?',
//         type: 'tempo',
//         options: [
//             { id: '1a', label: 'Largo. Very slowly, like creeping', type: 'tempo' },
//             { id: '1b', label: 'Moderato. Steady and proud, like marching', type: 'tempo' }
//         ],
//         correctAnswerId: '1b',
//         hint: 'Think about how a king would walk.',
//         explanation: 'The Lion marches proudly at a steady, moderato tempo - like a king entering his throne room!'
//     },
//     // Mood Question
//     {
//         id: 'q2',
//         movementId: '2',
//         text: 'What mood does the Rooster\'s theme have?',
//         type: 'mood',
//         options: [
//             { id: '2a', label: 'Playful and busy', type: 'mood' },
//             { id: '2b', label: 'Graceful and elegant', type: 'mood' }
//         ],
//         correctAnswerId: '2a',
//         hint: 'Think about chickens running around a barnyard.',
//         explanation: 'The music is playful and busy, just like chickens pecking and clucking around the farm!'
//     },
// ];
