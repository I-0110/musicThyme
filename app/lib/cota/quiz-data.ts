import { CharacterOrder, QuizQuestion } from "./interface";

export const carnivalMovements: CharacterOrder[] = [
    {
        id: '1',
        title: 'Introduction and Royal March of the Lion',
        characterName: 'Lion',
        orderNumber: 1,
        audio: {
            spotify: '',
            startTime: 0,
            endTime: 30
        },
        correctAnswers: {
            tempo: 'moderate = moderato',
            mood: 'majestic',
            movement: ['walk'],
            mainFamily: ['strings', 'percussion'],
            instruments: ['piano', 'double bass', 'cello'],
            dynamics: [
                'loud = forte',
                'soft to loud = crescendo', 'loud to soft = descrecendo'
            ]
        },
        description: 'The king of the jungle makes a grand entrance with powerful chords and bold melodies.',
        musicalFacts: [
            'Features strong piano chords representing the lion\'s roar',
            'Uses tremolo strings to create a sense of majesty',
            'The tempo is steady and regal, like a royal march'
        ],
        funFacts: 'The piano plays big, crashing chords that sound like a lion\'s mighty roar!',
        imageUrl: 'cota/images/lion.jpg'
    },
    {
        id: '2',
        title: 'Roosters and Hens',
        characterName: 'Rooster',
        orderNumber: 2,
        audio: {
            spotify: '',
            startTime: 0,
            endTime: 30
        },
        correctAnswers: {
            tempo: 'fast = allegro',
            mood: 'playful',
            movement: ['tip-toe','jog'],
            mainFamily: ['strings','percussion','woodwinds'],
            instruments: ['violin', 'piano', 'clarinet'],
            dynamics: [
                'loud = forte',
                'soft to loud = crescendo'
            ]
        },
        description: 'The chickens in a barnyard are clucking and eating.',
        musicalFacts: [
            'Piano plays rapid, repeated notes like pecking, called "staccato"',
            'Violin adds high-pitched clucking sounds',
            'Clarinet can create sounds like a rooster call'
        ],
        funFacts: 'Listen carefully and you can hear the chickens clucking and pecking for food!',
        imageUrl: 'cota/images/rooster.png'
    },
    {
        id: '3',
        title: 'Wild Donkeys',
        characterName: 'Horse',
        orderNumber: 3,
        audio: {
            spotify: '',
            startTime: 0,
            endTime: 30
        },
        correctAnswers: {
            tempo: 'very fast = presto',
            mood: 'energetic',
            movement: ['gallop'],
            mainFamily: ['strings','percussion'],
            instruments: ['piano'],
            dynamics: [
                'loud = forte',
            ]
        },
        description: 'Two pianos race up and down the keyboard, representing wild horses galloping.',
        musicalFacts: [
            'Uses two pianos playing rapid scales',
            'Creates the sound of galloping and braying',
            'One of the fastest movements in the suite'
        ],
        funFacts: 'The two pianos sound like they\'re having a race, just like wild horses running free!',
        imageUrl: 'cota/images/horse.png'
    },
    {
        id: '1',
        title: 'Introduction and Royal March of the Lion',
        characterName: 'Lion',
        orderNumber: 1,
        audio: {
            spotify: '',
            startTime: 0,
            endTime: 30
        },
        correctAnswers: {
            tempo: 'moderate = moderato',
            mood: 'majestic',
            movement: ['walk'],
            mainFamily: ['strings', 'percussion'],
            instruments: ['piano', 'double bass', 'cello'],
            dynamics: [
                'loud = forte',
                'soft to loud = crescendo', 'loud to soft = descrecendo'
            ]
        },
        description: 'The king of the jungle makes a grand entrance with powerful chords and bold melodies.',
        musicalFacts: [
            'Features strong piano chords representing the lion\'s roar',
            'Uses tremolo strings to create a sense of majesty',
            'The tempo is steady and regal, like a royal march'
        ],
        funFacts: 'The piano plays big, crashing chords that sound like a lion\'s mighty roar!',
        imageUrl: 'cota/images/lion.jpg'
    },
    {
        id: '1',
        title: 'Introduction and Royal March of the Lion',
        characterName: 'Lion',
        orderNumber: 1,
        audio: {
            spotify: '',
            startTime: 0,
            endTime: 30
        },
        correctAnswers: {
            tempo: 'moderate = moderato',
            mood: 'majestic',
            movement: ['walk'],
            mainFamily: ['strings', 'percussion'],
            instruments: ['piano', 'double bass', 'cello'],
            dynamics: [
                'loud = forte',
                'soft to loud = crescendo', 'loud to soft = descrecendo'
            ]
        },
        description: 'The king of the jungle makes a grand entrance with powerful chords and bold melodies.',
        musicalFacts: [
            'Features strong piano chords representing the lion\'s roar',
            'Uses tremolo strings to create a sense of majesty',
            'The tempo is steady and regal, like a royal march'
        ],
        funFacts: 'The piano plays big, crashing chords that sound like a lion\'s mighty roar!',
        imageUrl: 'cota/images/lion.jpg'
    },
];

export const quizQuestions: QuizQuestion[] = [
    // Tempo Questions
    {
        id: 'q1',
        movementId: '1',
        text: 'What is the tempo of the Lion\'s theme?',
        type: 'tempo',
        options: [
            { id: '1a', label: 'Largo. Very slowly, like creeping', type: 'tempo' },
            { id: '1b', label: 'Moderato. Steady and proud, like marching', type: 'tempo' }
        ],
        correctAnswerId: '1b',
        hint: 'Think about how a king would walk.',
        explanation: 'The Lion marches proudly at a steady, moderato tempo - like a king entering his throne room!'
    },
    // Mood Question
    {
        id: 'q2',
        movementId: '2',
        text: 'What mood does the Rooster\'s theme have?',
        type: 'mood',
        options: [
            { id: '2a', label: 'Playful and busy', type: 'mood' },
            { id: '2b', label: 'Graceful and elegant', type: 'mood' }
        ],
        correctAnswerId: '2a',
        hint: 'Think about chickens running around a barnyard.',
        explanation: 'The music is playful and busy, just like chickens pecking and clucking around the farm!'
    },
];
