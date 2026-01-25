import { EasyGame } from "./interface";
import { CELLO_LETTERS, CLARINET_LETTERS, DOUBLEBASS_LETTERS, FLUTE_LETTERS,GLOCKENSPIEL_LETTERS, PIANO_LETTERS, VIOLA_LETTERS, VIOLIN_LETTERS, XYLOPHONE_LETTERS
 } from "../instrument-type";

export const instrumentGame: EasyGame[] = [
    {
        id: 'lion',
        instruments: {
            name: 'piano',
            family: 'keyboard',
            letters: PIANO_LETTERS,
        },
        letter: "S",
    },
    {
        id: 'hens',
        instruments:
            {
                name: 'piano',
                family: 'keyboard',
                letters: PIANO_LETTERS,
            },
            {
                name: 'clarinet',
                family: 'woodwinds',
                letters: CLARINET_LETTERS,
            },
            {
                name: 'violin',
                family: 'strings',
                letters: VIOLIN_LETTERS,
            },
            {
                name: 'viola',
                family: 'strings',
                letters: VIOLA_LETTERS,
            },
        letter: '',
    },
]