// Type that applies for PatW and CotA projects

export type InstrumentFamily = 'full orchestra' | 'strings' | 'woodwinds' | 'brass' | 'percussion' | 'keyboard' | 'choir';

export type Instruments = 'piccolo' | 'flute' | 'alto flute' | 'oboe' | 'bass oboe' | 'english horn' | 'clarinet' | 'clarinet in Bb' | 'clarinet in A' | 'bass clarinet' | 'bassoon' | 'contra-bassoon' | 'french horn' | 'trumpet' | 'trumpet in C'| 'trumpet in Bb' | 'trombone' | 'tenor trombone' | 'bass trombone' | 'euphonium (tenor tuba)' | 'tuba' | 'bass tuba' | 'cello' | 'violin' | 'viola' |'cello' | 'double bass' | 'piano' | 'harp' | 'organ' | 'female choir' |  'glockenspiel' | 'xylophone' | 'glass harmonica' | 'triangle' | 'tambourine' | 'side drum' | 'bass drum' | 'gong' | 'bells' | 'celesta' |'cymbals' | 'timpani' | 'string family' | 'oboe, trumpet and timpani';

// Define individual instrument letter arrays
export const FLUTE_LETTERS = ["F", "L", "U", "T", "E"] as const;
export const CLARINET_LETTERS = ["C", "L", "A", "R", "I", "N", "E", "T"] as const;
export const PIANO_LETTERS = ["P", "I", "A", "N", "O"] as const;
export const GLOCKENSPIEL_LETTERS = ["G", "L", "O", "C", "K", "E", "N", "S", "P", "I", "E", "L"] as const;
export const XYLOPHONE_LETTERS = ["X", "Y", "L", "O", "P", "H", "O", "N", "E"] as const;
export const VIOLIN_LETTERS = ["V","I","O","L","I","N"] as const;
export const VIOLA_LETTERS = ["V","I","O","L","A"] as const;
export const CELLO_LETTERS = ["C", "E", "L", "L", "O"] as const;
export const DOUBLEBASS_LETTERS = ["D", "O", "U", "B", "L", "E", "B", "A", "S", "S"] as const;


