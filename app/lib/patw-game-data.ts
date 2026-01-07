import { InstrumentFamily, Instruments } from "./instrument-type";

export type Characters = 'bird' | 'cat' | 'duck' | 'grandpa' | 'hunters' | 'peter' | 'wolf';

export interface VideoSource {
    youtube?: string;
}

export interface CharacterData {
    id: Characters;
    charImg?: string;
    instrument: Instruments[];
    instrFam: InstrumentFamily[];
    instrImg?: string[];
    instrFamImg?: string[];
    charAudio: string;
    videoInstr: VideoSource;
}

export interface CharacterGuess {
    characterId: Characters;
    charImg?: string;
    correctInstr?: Instruments;
    correctMemeUrl?: string;
    audioUrl: string;
    incorrectMemeUrl?: string;
}

export const character: CharacterData[] = [
    {
        id: 'bird',
        instrument: ['flute'],
        instrFam: ['woodwinds'],
        charAudio: '/patw/audio/BIRD.mp3',
        videoInstr: {
            youtube: ''
        },
    },
    {
        id: 'cat',
        instrument: ['clarinet'],
        instrFam: ['woodwinds'],
        charAudio: '/patw/audio/CAT.mp3',
        videoInstr: {
            youtube: ''
        },
    },
    {
        id: 'duck',
        instrument: ['oboe'],
        instrFam: ['woodwinds'],
        charAudio: '/patw/audio/DUCK.mp3',
        videoInstr: {
            youtube: ''
        },
    },
    {
        id: 'grandpa',
        instrument: ['bassoon'],
        instrFam: ['woodwinds'],
        charAudio: '/patw/audio/GRAND.mp3',
        videoInstr: {
            youtube: ''
        },
    },
    {
        id: 'hunters',
        instrument: ['oboe', 'timpani','trumpet'],
        instrFam: ['woodwinds','brass','percussion'],
        charAudio: '/patw/audio/GRAND.mp3',
        videoInstr: {
            youtube: ''
        },
    },
    {
        id: 'peter',
        instrument: ['violin', 'viola', 'cello', 'double bass'],
        instrFam: ['strings'],
        charAudio: '/patw/audio/PETER.mp3',
        videoInstr: {
            youtube: ''
        },
    },
    {
        id: 'wolf',
        instrument: ['french horn'],
        instrFam: ['brass'],
        charAudio: '/patw/audio/WOLF.mp3',
        videoInstr: {
            youtube: ''
        },
    },
]

export const listenGame: CharacterGuess[] =[
    {
        characterId: 'bird',
        correctInstr: 'flute',
        audioUrl: '/patw/audio/BIRD.mp3',
    },
    {
        characterId: 'cat',
        correctInstr: 'clarinet',
        audioUrl: '/patw/audio/BIRD.mp3',
    },
    {
        characterId: 'grandpa',
        correctInstr: 'bassoon',
        audioUrl: '/patw/audio/GRAND.mp3',
    },
    {
        characterId: 'hunters',
        correctInstr: 'oboe, trumpet and timpani',
        audioUrl: '/patw/audio/GRAND.mp3',
    },
    {
        characterId: 'peter',
        correctInstr: 'string family',
        audioUrl: '/patw/audio/PETER.mp3',
    },
    {
        characterId: 'wolf',
        correctInstr: 'french horn',
        audioUrl: '/patw/audio/WOLF.mp3',
    },
]

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
        correctInstr: 'flute',
        correctMemeUrl: '/patw/images/bird-yay.gif',
        audioUrl: '/patw/audio/bird-theme.mp3',
        imageUrl: '/patw/images/bird.jpeg',
        incorrectMemeUrl: '/patw/images/bird-meme.gif'
    },
    cat: {
        name: 'Cat',
        correctInstr: 'clarinet',
        correctMemeUrl: '/patw/images/cat-yay.gif',
        audioUrl: '/patw/audio/cat-theme.mp3',
        imageUrl: '/patw/images/cat.jpeg',
        incorrectMemeUrl: '/patw/images/cat-meme.gif'
    },
    duck: {
        name: 'Duck',
        correctInstr: 'oboe',
        correctMemeUrl: '/patw/images/duck-yay.gif',
        audioUrl: '/patw/audio/duck-theme.mp3',
        imageUrl: '/patw/images/duck.jpeg',
        incorrectMemeUrl: '/patw/images/duck-meme.gif'
    },
    grandpa: {
        name: 'Grandpa',
        correctInstr: 'bassoon',
        correctMemeUrl: '/patw/images/grandpa-yay.gif',
        audioUrl: '/patw/audio/grandpa-theme.mp3',
        imageUrl: '/patw/images/grandpa.jpeg',
        incorrectMemeUrl: '/patw/images/grandpa-meme.gif'
    },
    hunters: {
        name: 'Hunters',
        correctInstr: 'oboe, trumpet and timpani',
        correctMemeUrl: '/patw/images/hunters-yay.gif',
        audioUrl: '/patw/audio/hunters-theme.mp3',
        imageUrl: '/patw/images/hunters.jpeg',
        incorrectMemeUrl: '/patw/images/hunters-meme.gif'
    },
    peter: {
        name: 'Peter',
        correctInstr: 'string family',
        correctMemeUrl: '/patw/images/peter-yay.gif',
        audioUrl: '/patw/audio/peter-theme.mp3',
        imageUrl: '/patw/images/peter.jpeg',
        incorrectMemeUrl: '/patw/images/peter-meme.gif'
    },
    wolf: {
        name: 'Wolf',
        correctInstr: 'french horn',
        correctMemeUrl: '/patw/images/wolf-yay.gif',
        audioUrl: '/patw/audio/wolf-theme.mp3',
        imageUrl: '/patw/images/wolf.jpeg',
        incorrectMemeUrl: '/patw/images/wolf-meme.gif'
    },
}
