// import Phaser from 'phaser';
// import {
//     type ClefType,
//     type NoteData,
//     CLEF_NOTES,
//     GAME_HEIGHT,
//     GAME_WIDTH,
//     COLORS,
//     MISSED_X,
//     LETTERS,
//     LINE_SPACING,
//     NOTE_RADIUS_X,
//     NOTE_RADIUS_Y,
//     STAFF_X1,
//     STAFF_X2,
//     STAFF_Y,
//     SPAWN_INTERVAL,
//     MAX_LIVES,
//     NOTE_SPEED_MAX,
// } from './constants';

// // Types
// interface ActiveNote {
//     data: NoteData;
//     gfx: Phaser.GameObjects.Graphics;
// }

// // Scene
// export class AsteroidsNotesScene extends Phaser.Scene {
//     // Config (set via init())
//     private clef: ClefType = 'treble';

//     // State 
//     private score = 0;
//     private lives = MAX_LIVES;
//     private streak = 0;
//     private gameOver = false;

//     // Speed serived from score so it never needs a separe field
//     private get noteSpeed(): number {
//         return Math.min(NOTE_SPEED_MAX, NOTE_SPEED_INITIAL + this.score * 0.8);   
//     }

//     // Notes currently falling on the screen
//     private activeNotes: ActiveNote[] = [];
// }