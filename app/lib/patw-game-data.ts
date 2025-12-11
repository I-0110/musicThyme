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
        correctMemeUrl: '/patw/images/bird-yay.gif',
        audioUrl: '/patw/audio/bird-theme.mp3',
        imageUrl: '/patw/images/bird.jpeg',
        incorrectMemeUrl: '/patw/images/bird-meme.gif'
    },
    cat: {
        name: 'Cat',
        correctInstr: 'cl',
        correctMemeUrl: '/patw/images/cat-yay.gif',
        audioUrl: '/patw/audio/cat-theme.mp3',
        imageUrl: '/patw/images/cat.jpeg',
        incorrectMemeUrl: '/patw/images/cat-meme.gif'
    },
    duck: {
        name: 'Duck',
        correctInstr: 'ob',
        correctMemeUrl: '/patw/images/duck-yay.gif',
        audioUrl: '/patw/audio/duck-theme.mp3',
        imageUrl: '/patw/images/duck.jpeg',
        incorrectMemeUrl: '/patw/images/duck-meme.gif'
    },
    grandpa: {
        name: 'Grandpa',
        correctInstr: 'bsn',
        correctMemeUrl: '/patw/images/grandpa-yay.gif',
        audioUrl: '/patw/audio/grandpa-theme.mp3',
        imageUrl: '/patw/images/grandpa.jpeg',
        incorrectMemeUrl: '/patw/images/grandpa-meme.gif'
    },
    hunters: {
        name: 'Hunters',
        correctInstr: 'obtimp',
        correctMemeUrl: '/patw/images/hunters-yay.gif',
        audioUrl: '/patw/audio/hunters-theme.mp3',
        imageUrl: '/patw/images/hunters.jpeg',
        incorrectMemeUrl: '/patw/images/hunters-meme.gif'
    },
    peter: {
        name: 'Peter',
        correctInstr: 'str',
        correctMemeUrl: '/patw/images/peter-yay.gif',
        audioUrl: '/patw/audio/peter-theme.mp3',
        imageUrl: '/patw/images/peter.jpeg',
        incorrectMemeUrl: '/patw/images/peter-meme.gif'
    },
    wolf: {
        name: 'Wolf',
        correctInstr: 'hn',
        correctMemeUrl: '/patw/images/wolf-yay.gif',
        audioUrl: '/patw/audio/wolf-theme.mp3',
        imageUrl: '/patw/images/wolf.jpeg',
        incorrectMemeUrl: '/patw/images/wolf-meme.gif'
    },
}
