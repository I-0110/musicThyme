// export type ClefType = 'treble' | 'bass'; // | 'alto';

// // Canvas
// export const GAME_WIDTH = 800;
// export const GAME_HEIGHT = 500;

// // Staff layout
// export const STAFF_X1 = 110; // staff lines begin after the clef symbol
// export const STAFF_X2 = 780; // staff lines ends on right edge
// export const MISSED_X = 108; // notes are "missed" when their centre crossed here

// // Build the staff line spacing from top to bottom. Remember coding sees numbers quite different order than music. 
// const STAFF_MIDDLE_LINE = 220; 

// export const LINE_SPACING = 14; // px between adjacent staff lines
// const HALF_SPACING = LINE_SPACING / 2; // 7px - half a space

// // STAFF_Y[0] = top line (line 5), STAFF_Y[4] = bottom line (line 1)
// export const STAFF_Y = [
//     STAFF_MIDDLE_LINE - LINE_SPACING * 2, // 192 line 5 (top)
//     STAFF_MIDDLE_LINE - LINE_SPACING, // 206 line 4
//     STAFF_MIDDLE_LINE,
//     STAFF_MIDDLE_LINE + LINE_SPACING, // 234 line 2
//     STAFF_MIDDLE_LINE + LINE_SPACING * 2, // 248 line 1 (bottom)
// ]

// // Note shape
// export const NOTE_RADIUS_X = 10; // horizontal radius of the note oval
// export const NOTE_RADIUS_Y = 7; // vertical radius

// // Gameplay
// export const NOTE_SPEED_INITIAL = 80; // px / second at the start
// export const NOTE_SPEED_MAX = 220; // px / second at the start
// export const SPAWN_INTERVAL = 3000; // ms between automatic spawns
// export const MAX_LIVES = 5;

// // The 7 letter buttons shown at the bottom of the screen (C D E F G A B)
// export const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G',] as const;

// // NoteData
// export interface NoteData {
//     name: string;
//     y: number; // px y on the staff (world space)
//     ledger: 'above' | 'below' | null; // do we need a ledger line? 
// }

// // Treble clef — reads bottom line (E4) → top line (F5), plus middle-C ledger
// //
// //   Line 5 (top)  = F5  → STAFF_Y[0] = 192
// //   Space 4       = E5  → 199
// //   Line 4        = D5  → STAFF_Y[1] = 206
// //   Space 3       = C5  → 213
// //   Line 3 (mid)  = B4  → STAFF_Y[2] = 220
// //   Space 2       = A4  → 227
// //   Line 2        = G4  → STAFF_Y[3] = 234
// //   Space 1       = F4  → 241
// //   Line 1 (bot)  = E4  → STAFF_Y[4] = 248
// //   Space below   = D4  → 255
// //   Ledger below  = C4  → 262
// export const TREBLE_NOTES: NoteData[] = [
//     {
//         name: 'C',
//         y: STAFF_Y[4] + LINE_SPACING, 
//         ledger: 'below'
//     }, // 262 - middle C
//     {
//         name: 'D',
//         y: STAFF_Y[4] + HALF_SPACING, 
//         ledger: null
//     }, // 255 
//     {
//         name: 'E',
//         y: STAFF_Y[4], 
//         ledger: null
//     }, // 248 - Line 1
//     {
//         name: 'F',
//         y: STAFF_Y[4] + HALF_SPACING , 
//         ledger: null
//     }, // 241 - Space 1
//     {
//         name: 'G',
//         y: STAFF_Y[3], 
//         ledger: null
//     }, // 234 - Line 2
//     {
//         name: 'A',
//         y: STAFF_Y[3] + HALF_SPACING , 
//         ledger: null
//     }, // 227 - Space 2
//     {
//         name: 'B',
//         y: STAFF_Y[2], 
//         ledger: null
//     }, // 220 - Line 3
//     {
//         name: 'C',
//         y: STAFF_Y[2] + HALF_SPACING , 
//         ledger: null
//     }, // 213 - Space 3
//     {
//         name: 'D',
//         y: STAFF_Y[1], 
//         ledger: null
//     }, // 206 - Line 4
//     {
//         name: 'E',
//         y: STAFF_Y[1] + HALF_SPACING , 
//         ledger: null
//     }, // 199 - Space 4
//     {
//         name: 'F',
//         y: STAFF_Y[0],
//         ledger: null
//     }, // 192 - Line 5
//     {
//         name: 'G',
//         y: STAFF_Y[0] + HALF_SPACING, 
//         ledger: 'above'
//     }, // 185 - ledger note G
//     {
//         name: 'A',
//         y: STAFF_Y[4] + LINE_SPACING, 
//         ledger: 'above'
//     }, // 178 - ledger note A
// ];

// export const BASS_NOTES: NoteData[] = [
//     {
//         name: 'E',
//         y: STAFF_Y[4] + LINE_SPACING, 
//         ledger: 'below'
//     }, // 262 - middle C
//     {
//         name: 'F',
//         y: STAFF_Y[4] + HALF_SPACING, 
//         ledger: null
//     }, // 255 
//     {
//         name: 'G',  
//         y: STAFF_Y[4], 
//         ledger: null
//     }, // 248 - Line 1
//     {
//         name: 'E',
//         y: STAFF_Y[4] + HALF_SPACING , 
//         ledger: null
//     }, // 241 - Space 1
//     {
//         name: 'F',
//         y: STAFF_Y[3], 
//         ledger: null
//     }, // 234 - Line 2
//     {
//         name: 'G',
//         y: STAFF_Y[3] + HALF_SPACING , 
//         ledger: null
//     }, // 227 - Space 2
//     {
//         name: 'A',
//         y: STAFF_Y[2], 
//         ledger: null
//     }, // 220 - Line 3
//     {
//         name: 'B',
//         y: STAFF_Y[2] + HALF_SPACING , 
//         ledger: null
//     }, // 213 - Space 3
//     {
//         name: 'C',
//         y: STAFF_Y[1], 
//         ledger: null
//     }, // 206 - Line 4
//     {
//         name: 'D',
//         y: STAFF_Y[1] + HALF_SPACING , 
//         ledger: null
//     }, // 199 - Space 4
//     {
//         name: 'E',
//         y: STAFF_Y[0],
//         ledger: null
//     }, // 192 - Line 5
//     {
//         name: 'F',
//         y: STAFF_Y[0] + HALF_SPACING, 
//         ledger: 'above'
//     }, // 185 - ledger note G
//     {
//         name: 'G',
//         y: STAFF_Y[4] + LINE_SPACING, 
//         ledger: 'above'
//     }, // 178 - ledger note A
// ];

// // TODO: Create Alto Clef down here
// export const ALTO_NOTES: NoteData[] = [
//     // Define Alto clef notes here
// ];


// export const CLEF_NOTES: Record<ClefType, NoteData[]> = {
//     treble: TREBLE_NOTES,
//     bass: BASS_NOTES,
//     // alto: ALTO_NOTES,
// };

// // Mneumonic hints
// export const MNEMONICS: Record<ClefType, { lines: string; spaces: string }> = {
//     treble: { 
//         lines: 'Lines: E G B D F', 
//         spaces: 'Spaces: F A C E' 
//     },
//     bass:   { 
//         lines: 'Lines: G B D F A', 
//         spaces: 'Spaces: A C E G' 
//     },
//     // alto: { 
//     //     lines: 'Lines: G B D F A', 
//     //     spaces: 'Spaces: A C E G' 
//     // },
// };
 
// // ── Clef symbol (Unicode music notation) ─────────────────────────────────────
// export const CLEF_SYMBOL: Record<ClefType, string> = {
//     treble: '𝄞',
//     bass:   '𝄢',
// };