import { Planet, PlanetSection } from "./interface"
// Please add QuizQuestion to import { Character } from "./interface";

export const sections: PlanetSection[] = [
    { slug: 'overview', title: 'Overview' },
    { slug: 'activities', title: 'Activities' },
]

export const planetMvt: Planet[] = [
    {
        id: 'mars',
        title: 'Mars, the Bringer of War',
        planetName: 'Mars',
        orderNumber: 1,
        youtube: 'fdwwzn3X6hE?si=5NN806mikXMKasTN',
        imageUrl: '/planets/mars.png'
    },
    {
        id: 'venus',
        title: 'Venus, the Bringer of Peace',
        planetName: 'Venus',
        orderNumber: 2,
        youtube: '-Ptd3_LusE8?si=muta6njEgdZ3Ulzy',
        imageUrl: '/planets/venus.png'
    },
    {
        id: 'mercury',
        title: 'Mercury, the Winged Messenger',
        planetName: 'Mercury',
        orderNumber: 3,
        youtube: '8ykZKsrs8LM?si=O0q0T9hiaWyLAEq4',
        imageUrl: '/planets/mercury.png'
    },
    {
        id: 'jupiter',
        title: 'Jupiter, the Bringer of Jollity',
        planetName: 'Jupiter',
        orderNumber: 4,
        youtube: '-C1nC0NHnbo?si=tFyQOlir5ijM8N2_',
        imageUrl: '/planets/jupiter.png'
    },
    {
        id: 'saturn',
        title: 'Saturn, the Bringer of Old Age',
        planetName: 'Saturn',
        orderNumber: 5,
        youtube: 'e2CQlJe4rwc?si=CoeLvafZtDbKvKUX',
        imageUrl: '/planets/saturn.png'
    },
    {
        id: 'uranus',
        title: 'Uranus, the Magician',
        planetName: 'Uranus',
        orderNumber: 6,
        youtube: 'yTSQm3aJbP8?si=KJb1u-0_gsBF63dB',
        imageUrl: '/planets/uranus.png'
    },
    {
        id: 'neptune',
        title: 'Neptune, the Mystic',
        planetName: 'Neptune',
        orderNumber: 7,
        youtube: 'PBhYlmIbbfw?si=oZ0NIFMMUZmMdhuv',
        imageUrl: '/planets/neptune.png'
    },
];