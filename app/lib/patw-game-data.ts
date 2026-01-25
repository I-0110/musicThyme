export type Characters = 'bird' | 'cat' | 'duck' | 'grandpa' | 'hunters' | 'peter' | 'wolf';

export type Instruments = 'fl' | 'cl' | 'ob' | 'bsn' | 'obtimp' | 'str' | 'hn';

export const characterData: Record<Characters, {
    name: string;
    correctInstr: Instruments;
    correctMemeUrl: string;
    audioUrl: string;
    imageUrl: string;
    incorrectMemeUrl: string;
}> = {
    bird: {
        name: 'Bird',
        correctInstr: 'fl',
        correctMemeUrl: '/patw/charImages/bird-yay.gif',
        audioUrl: '/patw/audio/BIRD.mp3',
        imageUrl: '/patw/charImages/bird.png',
        incorrectMemeUrl: '/patw/charImages/birdno.gif'
    },
    cat: {
        name: 'Cat',
        correctInstr: 'cl',
        correctMemeUrl: '/images/cat-yay.gif',
        audioUrl: '/patw/audio/CAT.mp3',
        imageUrl: '/patw/charImages/cat.png',
        incorrectMemeUrl: '/images/cat-meme.gif'
    },
    duck: {
        name: 'Duck',
        correctInstr: 'ob',
        correctMemeUrl: '/images/duck-yay.gif',
        audioUrl: '/patw/audio/DUCK.mp3',
        imageUrl: '/patw/charImages/duck.png',
        incorrectMemeUrl: '/images/duck-meme.gif'
    },
    grandpa: {
        name: 'Grandpa',
        correctInstr: 'bsn',
        correctMemeUrl: '/images/grandpa-yay.gif',
        audioUrl: '/patw/audio/GRAND.mp3',
        imageUrl: '/patw/charImages/grandpa.png',
        incorrectMemeUrl: '/images/grandpa-meme.gif'
    },
    hunters: {
        name: 'Hunters',
        correctInstr: 'obtimp',
        correctMemeUrl: '/images/hunters-yay.gif',
        audioUrl: '/patw/audio/HUNTERS.mp3',
        imageUrl: '/patw/charImages/hunter.png',
        incorrectMemeUrl: '/images/hunters-meme.gif'
    },
    peter: {
        name: 'Peter',
        correctInstr: 'str',
        correctMemeUrl: '/images/peter-yay.gif',
        audioUrl: '/patw/audio/PETER.mp3',
        imageUrl: '/patw/charImages/peter.png',
        incorrectMemeUrl: '/images/peter-meme.gif'
    },
    wolf: {
        name: 'Wolf',
        correctInstr: 'hn',
        correctMemeUrl: '/images/wolf-yay.gif',
        audioUrl: '/patw/audio/WOLF.mp3',
        imageUrl: '/patw/charImages/wolf.png',
        incorrectMemeUrl: '/images/wolf-meme.gif'
    },
}