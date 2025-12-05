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
        correctMemeUrl: '/images/bird-yay.gif',
        audioUrl: '/audio/bird-theme.mp3',
        imageUrl: '/images/bird.jpeg',
        incorrectMemeUrl: '/images/bird-meme.gif'
    },
    cat: {
        name: 'Cat',
        correctInstr: 'cl',
        correctMemeUrl: '/images/cat-yay.gif',
        audioUrl: '/audio/cat-theme.mp3',
        imageUrl: '/images/cat.jpeg',
        incorrectMemeUrl: '/images/cat-meme.png'
    },
    duck: {
        name: 'Duck',
        correctInstr: 'ob',
        correctMemeUrl: '/images/duck-yay.gif',
        audioUrl: '/audio/duck-theme.mp3',
        imageUrl: '/images/duck.jpeg',
        incorrectMemeUrl: '/images/duck-meme.png'
    },
    grandpa: {
        name: 'Grandpa',
        correctInstr: 'bsn',
        correctMemeUrl: '/images/grandpa-yay.gif',
        audioUrl: '/audio/grandpa-theme.mp3',
        imageUrl: '/images/grandpa.jpeg',
        incorrectMemeUrl: '/images/grandpa-meme.png'
    },
    hunters: {
        name: 'Hunters',
        correctInstr: 'obtimp',
        correctMemeUrl: '/images/hunters-yay.gif',
        audioUrl: '/audio/hunters-theme.mp3',
        imageUrl: '/images/hunters.jpeg',
        incorrectMemeUrl: '/images/hunters-meme.png'
    },
    peter: {
        name: 'Peter',
        correctInstr: 'str',
        correctMemeUrl: '/images/peter-yay.gif',
        audioUrl: '/audio/peter-theme.mp3',
        imageUrl: '/images/peter.jpeg',
        incorrectMemeUrl: '/images/peter-meme.png'
    },
    wolf: {
        name: 'Wolf',
        correctInstr: 'hn',
        correctMemeUrl: '/images/wolf-yay.gif',
        audioUrl: '/audio/wolf-theme.mp3',
        imageUrl: '/images/wolf.jpeg',
        incorrectMemeUrl: '/images/wolf-meme.png'
    },
}
