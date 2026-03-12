import { EasyGame } from "../interface";

export const easyGamesData: EasyGame[] = [
    {
        id: 'lion',
        instruments: [
            {
                instr: 'piano',
                family: 'keyboard',
                letters: ['P', 'I', 'A', 'N', 'O'],
            },
            {
                instr: 'violin',
                family: 'strings',
                letters: ['V', 'I', 'O', 'L', 'I', 'N'],
            },
            {
                instr: 'viola',
                family: 'strings',
                letters: ['V', 'I', 'O', 'L', 'A'],
            },
            {
                instr: 'cello',
                family: 'strings',
                letters: ['C', 'E', 'L', 'L', 'O'],
            },
            {
                instr: 'double bass',
                family: 'strings',
                letters: ['D', 'O', 'U', 'B', 'L', 'E', ' ', 'B', 'A', 'S', 'S'],
            },
        ], 
        letter: 'S',
    },
    {
        id: 'hens',
        instruments: [
            {
                instr: 'piano',
                family: 'keyboard',
                letters: ['P', 'I', 'A', 'N', 'O'],
            },
            {
                instr: 'violin',
                family: 'strings',
                letters: ['V', 'I', 'O', 'L', 'I', 'N'],
            },
            {
                instr: 'viola',
                family: 'strings',
                letters: ['V', 'I', 'O', 'L', 'A'],
            },
            {
                instr: 'clarinet',
                family: 'woodwinds',
                letters: ['C', 'L', 'A', 'R', 'I', 'N', 'E', 'T'],
            },
        ], 
        letter: 'A',
    },
];