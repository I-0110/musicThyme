import { Character, CharacterSection } from "./interface";
// Please add QuizQuestion to import { Character } from "./interface";

export const sections: CharacterSection[] = [
    { slug: 'overview', title: 'Overview' },
    { slug: 'content', title: 'Content' },
    { slug: 'vocabulary', title: 'Vocabulary' },
    { slug: 'activities', title: 'Activities' },
]

export const carnivalCharacters: Character[] = [
    {
        id: 'lion',
        title: 'Introduction and Royal March of the Lion',
        characterName: 'Lion',
        orderNumber: 1,
        video: {
            youtube: 'nRLyBNV1lc0?si=eMWLDb3-9qbguW3O&amp;start=17',
        },
        imageUrl: '/cota/images/lion.jpg'
    },
    {
        id: 'hens',
        title: 'Hens and Roosters',
        characterName: 'Hens',
        orderNumber: 2,
        video: {
            youtube: 'xU4RcRWVGyM?si=-hozXB1NkV33IJA7&amp;start=17',
        },
        imageUrl: '/cota/images/rooster.png'
    },
    {
        id: 'donkey',
        title: 'Wild Donkeys',
        characterName: 'Horse',
        orderNumber: 3,
        video: {
            youtube: '-aLM7nJB2u4?si=K7cTf9Oyux3_vTxg&amp;start=16',
        },
        imageUrl: '/cota/images/horse.png'
    },
    {
        id: 'tortoise',
        title: 'Tortoise',
        characterName: 'Tortoise',
        orderNumber: 4,
        video: {
            youtube: '2cpT5_VTp1M?si=SoySyIsJoMzXa8WZ&amp;start=17',
        },
        imageUrl: '/cota/images/tortoise.png'
    },
    {
        id: 'elephant',
        title: 'Elephant',
        characterName: 'Elephant',
        orderNumber: 5,
        video: {
            youtube: 'Bi5afK-Kvq4?si=y2YFprY_A8eFn9xx&amp;start=25',
        },
        imageUrl: '/cota/images/elephant.png'
    },
    {
        id: 'kangaroo',
        title: 'Kangaroos',
        characterName: 'Kangaroo',
        orderNumber: 6,
        video: {
            youtube: 'LZDEkWP4oHk?si=m3otLqtbaEfRgnyK&amp;start=15',
        },
        imageUrl: '/cota/images/kangaroo.png'
    },
    {
        id: 'aquarium',
        title: 'Aquarium',
        characterName: 'Aquarium',
        orderNumber: 7,
        video: {
            youtube: 'zec-6vxxFTE?si=DldU5DavgI64YupB&amp;start=25',
        },
        imageUrl: '/cota/images/fish.png'
    },
    {
        id: 'person',
        title: 'Personnages with Long Ears',
        characterName: 'Donkey',
        orderNumber: 8,
        video: {
            youtube: '1kybrQokreo?si=kGmzdYNXrQ2vOcxR&amp;start=25',
        },
        imageUrl: '/cota/images/donkey.png'
    },
    {
        id: 'cuckoo',
        title: 'The Cuckoo in the Heart of the Woods',
        characterName: 'Cuckoo',
        orderNumber: 9,
        video: {
            youtube: 'PtjwKZn_2Qg?si=lNDrc1vib1AWilq_&amp;start=20',
        },
        imageUrl: '/cota/images/cuckoo.png'
    },
    {
        id: 'aviary',
        title: 'Aviary',
        characterName: 'Birds',
        orderNumber: 10,
        video: {
            youtube: 'xkmpKKVVO4Q?si=H_vSHj0RLqsynbiu&amp;start=24',
        },
        imageUrl: '/cota/images/birds.png'
    },
    {
        id: 'pianists',
        title: 'Pianists',
        characterName: 'Pianists',
        orderNumber: 11,
        video: {
            youtube: 'xD9N_gfuhqw?si=u6fT0ItyokwReCGo&amp;start=23',
        },
        imageUrl: '/cota/images/pianist.png'
    },
    {
        id: 'fossils',
        title: 'Fossils',
        characterName: 'Fossils',
        orderNumber: 12,
        video: {
            youtube: '-i_llX9gJNs?si=dhyQeb-6b2JYypWu&amp;start=15',
        },
        imageUrl: '/cota/images/fossil.png'
    },
    {
        id: 'swan',
        title: 'The Swan',
        characterName: 'Swan',
        orderNumber: 13,
        video: {
            youtube: '_o85H4nDytA?si=qLaoAyHv3fflu5CA&amp;start=24',
        },
        imageUrl: '/cota/images/swan.png'
    },
    {
        id: 'finale',
        title: 'Finale',
        characterName: 'Finale',
        orderNumber: 14,
        video: {
            youtube: 'Mucn0eHP2rE?si=SAD7lafrKb17B86w&amp;start=20',
        },
        imageUrl: '/circus.jpg'
    },
];

// export const carnivalMovements: Character[] = [
//     {
//         id: '3',
//         title: 'Wild Donkeys',
//             movement: 
//             mainFamily: ['strings','percussion'],
//             instruments: ['piano'],
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
