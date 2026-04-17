// import Phaser from "phaser";
// import { COLORS, NOTE_RADIUS_X, NOTE_RADIUS_Y, STAFF_X1, STAFF_X2, STAFF_Y, TIME_LIMIT, LETTERS, NOTES, ASTEROID_X, type NoteData,  } from "@/app/lib/games/shared/constants";

// export class AsteroidMainScene extends Phaser.Scene {
//     // Game state
//     private score = 0;
//     private lives = 3;
//     private streak = 0;
//     private timeLeft = TIME_LIMIT;
//     private accepting = false; 
//     private gameOver = false;
//     private currentNote: NoteData | null = null;

//     // Game objects
//     private noteGfx!: Phaser.GameObjects.Graphics;
//     private timerBar!: Phaser.GameObjects.Rectangle;
//     private scoreText!: Phaser.GameObjects.Text;
//     private livesText!: Phaser.GameObjects.Text;
//     private streakText!: Phaser.GameObjects.Text;
//     private feedbackText!: Phaser.GameObjects.Text;
//     private timerEvent!: Phaser.Time.TimerEvent;

//     constructor() {
//         super({ key: 'AsteroidMainScene' });
//     }

//     preload(): void {
//         this.load.image('heart-filled', './games/heart-filled.png');
//         this.load.image('heart-empty', './games/heart-empty.png');
//     }

//     create(): void {
//         // Reset state every time we play again
//         this.score = 0;
//         this.lives = 3;
//         this.streak = 0;
//         this.timeLeft = TIME_LIMIT;
//         this.accepting = false;
//         this.gameOver = false;
//         this.heartImages = [];

//         const { width, height } = this.scale;

//         // Background
//         this.add.rectangle(width / 2, height / 2, width, height, COLORS.background);

//         // Staff lines and Treble Clef
//         this.drawStaff();
//         this.add.text(STAFF_X1 - 28, 106, '𝄞', { 
//             fontSize: '133px', 
//             color: COLORS.textPrimary,
//             fontFamily: 'Bravura, serif',
//         });

//         // Mnemonic hints (top-right corner)
//         this.add.text(width - 14, 100, 'Lines: E G B D F or Every Good Boy Deserves Football', {
//             fontSize: '12px',
//             color: COLORS.textMuted,
//             fontFamily: 'Arial, sans-serif',
//         }).setOrigin(1, 0);
//         this.add.text(width - 14, 120, 'Spaces: F A C E or FACE', {
//             fontSize: '12px',
//             color: COLORS.textMuted,
//             fontFamily: 'Arial, sans-serif',
//         }).setOrigin(1, 0);

//         // Note graphics (the "asteroid")
//         this.noteGfx = this.add.graphics({ x: STAFF_X1, y: STAFF_Y[0] });

//         // Timer bar (below the staff). Background track (dark rectangle, always full width) 
//         this.add.rectangle(width / 2, STAFF_Y[4] + 40, STAFF_X2 - STAFF_X1, 20, COLORS.btnDefault);

//         // The shrinking timer bar (green/yellow/red rectangle on top)
//         this.timerBar = this.add
//             .rectangle(STAFF_X1, STAFF_Y[4] + 40, STAFF_X2 - STAFF_X1, 20, COLORS.timerGreen)
//             .setOrigin(0, 0.5);

//         // Score, Lives, Streak Text
//         this.scoreText = this.add.text(20, 16, 'Score: 0', { 
//             fontSize: '24px', 
//             color: COLORS.textPrimary,
//             fontFamily: 'Arial, sans-serif', 
//         });
//         // Heart images for lives
//         for (let i = 0; i < 3; i++) {
//             const heart = this.add.image(20 + i * 40, 52, 'heart-filled').setOrigin(0, 0.5);
//             this.heartImages.push(heart);
//         }
//         // Streak Text
//         this.streakText = this.add.text(20, 80, 'Streak: 0', { 
//             fontSize: '24px', 
//             color: COLORS.textStreak,
//             fontFamily: 'Arial, sans-serif', 
//         });
//         this.feedbackText = this.add.text(width / 2, height - 100, '', { 
//             fontSize: '24px', 
//             color: COLORS.textGood,
//             fontFamily: 'Arial, sans-serif',
//             fontStyle: 'bold', 
//         }).setOrigin(0.5, 0);

//         // Answer buttons (C D E F G A B)
//         this.createButtons();

//         // Start the first round
//         this.timerEvent = this.time.addEvent({
//             delay: 100,
//             loop: true,
//             callback: this.tickTimer,
//             callbackScope: this,
//         });

//         this.spawnNote();
//     }

//     // Show lives with hearts
//     private heartImages: Phaser.GameObjects.Image[] = [];

//     // Draw the horizontal lines for the musical staff
//     private drawStaff(): void {
//         const g = this.add.graphics();
//         g.lineStyle(2, COLORS.staffLine, 0.85);

//         for (const y of STAFF_Y) {
//             g.beginPath();
//             g.moveTo(STAFF_X1, y);
//             g.lineTo(STAFF_X2, y);
//             g.strokePath();
//         }
//     }

//     // Random note to display (asteroid to dodge)
//     private spawnNote(): void {
//         this.accepting = false;
//         this.feedbackText.setText('').setAlpha(1);

//         // Randomly pick one of the 9 notes (lines and spaces)
//         const idx = Phaser.Math.Between(0, NOTES.length - 1);
//         this.currentNote = NOTES[idx];

//         this.drawNote(this.currentNote);

//         // Reset timer bar
//         this.timeLeft = TIME_LIMIT;
//         this.timerBar.width = 540;
//         this.timerBar.fillColor = COLORS.timerGreen;

//         // Brief delay before accepting input to prevent accidental clicks
//         this.time.delayedCall(250, () => {
//             this.accepting = true;
//         });
//     }

//     // Draw the note as a white oval with a cutout to look like an asteroid
//     private drawNote(note: NoteData): void {
//         this.noteGfx.clear(); // Clear previous note

//         const x = ASTEROID_X;
//         const y = note.y;

//         // If the note needs a ledger line
//         if (note.ledger) {
//             this.noteGfx.lineStyle(2, COLORS.staffLine, 1);
//             this.noteGfx.beginPath();
//             this.noteGfx.moveTo(x - NOTE_RADIUS_X - 8, y);
//             this.noteGfx.lineTo(x + NOTE_RADIUS_X + 8, y);
//             this.noteGfx.strokePath();
//         }

//         // White oval (note head)
//         this.noteGfx.fillStyle(COLORS.noteWhite, 1);
//         this.noteGfx.fillEllipse(x, y, NOTE_RADIUS_X * 2, NOTE_RADIUS_Y * 2);

//         // Cutout circle to create the "asteroid" look
//         this.noteGfx.fillStyle(COLORS.noteCutout, 1);
//         this.noteGfx.fillCircle(x - 6, y - 4, 6);
//     }

//     // Create the answer buttons at the bottom of the screen
//     private createButtons(): void {
//         const btnWidth = 80;
//         const gap = 16;
//         const totalWidth = LETTERS.length * btnWidth + (LETTERS.length - 1) * gap;
//         const startX = (this.scale.width - totalWidth) / 2 + btnWidth / 2;
//         const y = 415;

//         LETTERS.forEach((letter, idx) => {
//             const x = startX + idx * (btnWidth + gap);

//             // Rectangle acts as the button background
//             const background = this.add
//                 .rectangle(x, y, btnWidth, 52, COLORS.btnDefault)
//                 .setInteractive({ useHandCursor: true })
//                 .setStrokeStyle(2, COLORS.btnHover);

//             // Button text
//             const label = this.add.text(x, y, letter, {
//                 fontSize: '24px',
//                 color: COLORS.textBtn,
//                 fontFamily: 'Arial, sans-serif',
//                 fontStyle: 'bold',
//             }).setOrigin(0.5);

//             // Hover effect
//             background.on('pointerover', () => {
//                 background.setFillStyle(COLORS.btnHover);
//                 label.setColor(COLORS.textBtnHover);
//             });
//             background.on('pointerout', () => {
//                 background.setFillStyle(COLORS.btnDefault);
//                 label.setColor(COLORS.textBtn);
//             });

//             // Click handler
//             background.on('pointerdown', () => this.checkAnswer(letter, background, label));
//         });
//     }

//     // Show brief feedback message that fades out automatically
//     private showFeedback(message: string, color: string): void {
//         this.feedbackText
//             .setText(message)
//             .setColor(color)
//             .setAlpha(1);
        
//         // Tweens to fade out the feedback text after showing it
//         this.tweens.add({
//             targets: this.feedbackText,
//             alpha: 0,
//             delay: 700,
//             duration: 300,
//         });
//     }

//     // Called every 100ms to update the timer bar and check for timeouts
//     private tickTimer(): void {
//         if (!this.accepting) return;

//         this.timeLeft = +(this.timeLeft - 0.1).toFixed(1); // Decrease time left

//         const pct = Math.max(this.timeLeft / TIME_LIMIT, 0);

//         // Shrink the bar width proportionally
//         this.timerBar.width = pct * 540;

//         // Change color based on time left
//         if (pct < 0.25) this.timerBar.fillColor = COLORS.timerRed;
//         else if (pct < 0.5) this.timerBar.fillColor = COLORS.timerYellow;
//         else this.timerBar.fillColor = COLORS.timerGreen;

//         // Time's up!
//         if (this.timeLeft <= 0) {
//             this.accepting = false;
//             this.showFeedback(
//                 `Time's up  ! It was ${this.currentNote?.name ?? '?'}`, 
//                 COLORS.textBad
//             );
//             this.streak = 0;
//             this.streakText.setText('');
//             this.loseLife();
//             if (this.lives > 0) {
//                 this.time.delayedCall(1150, () => this.spawnNote());
//             }
//         }
//     }

//     // Remove a life and check for game over
//     private updateHearts(): void {
//         this.heartImages.forEach((heart, index) => {
//             const texture = index < this.lives ? 'heart-filled' : 'heart-empty';
//             heart.setTexture(texture);
//         });
//     }

//     private loseLife(): void {
//         this.lives = Math.max(0, this.lives - 1);
//         this.updateHearts(); 

//         if (this.lives <= 0) {
//             // Pass the score to GameOverScene via the data argument
//             this.time.delayedCall(500, () =>
//                 this.showGameOver());
//         }
//     }

//     private updateHearts(): void {
//         this.heartImages.forEach((heart, i) => {
//             heart.setTexture(i < this.lives ? 'heart-filled' : 'heart-empty');
//         });
//     }
    
//     private drawStaff(): void {
//         const g = this.add.graphics();
//         g.lineStyle(2, COLORS.staffLine, 0.85);
//         for (const y of STAFF_Y) {
//             g.beginPath(); 
//             g.moveTo(STAFF_X1, y); 
//             g.lineTo(STAFF_X2, y); 
//             g.strokePath();
//         }
//     }

//     private spawnNote(): void {
//         this.accepting = false;
//         this.feedbackText.setText('').setAlpha(1);
//         const idx = Phaser.Math.Between(0, NOTES.length - 1);
//         this.currentNote = NOTES[idx];
//         this.drawNote(this.currentNote);
//         this.timeLeft = TIME_LIMIT;
//         this.timerBar.width = STAFF_X2 - STAFF_X1;
//         this.timerBar.fillColor = COLORS.timerGreen;
//         this.time.delayedCall(250, () => { this.accepting = true; });
//     }

//     private drawNote(note: NoteData): void {
//         this.noteGfx.clear();
//         const x = ASTEROID_X;
//         const y = note.y;
//         if (note.ledger) {
//             this.noteGfx.lineStyle(2, COLORS.staffLine, 1);
//             this.noteGfx.beginPath();
//             this.noteGfx.moveTo(x - NOTE_RADIUS_X - 8, y);
//             this.noteGfx.lineTo(x + NOTE_RADIUS_X + 8, y);
//             this.noteGfx.strokePath();
//         }
//         this.noteGfx.fillStyle(COLORS.noteWhite, 1);
//         this.noteGfx.fillEllipse(x, y, NOTE_RADIUS_X * 2, NOTE_RADIUS_Y * 2);
//         this.noteGfx.fillStyle(COLORS.noteCutout, 1);
//         this.noteGfx.fillCircle(x - 6, y - 4, 6);
//     }

//     private createButtons(): void {
//         const btnWidth = 80; 
//         const gap = 16;
//         const totalWidth = LETTERS.length * btnWidth + (LETTERS.length - 1) * gap;
//         const startX = (this.scale.width - totalWidth) / 2 + btnWidth / 2;
//         const y = 415;

//         LETTERS.forEach((letter, idx) => {
//             const x = startX + idx * (btnWidth + gap);
//             const background = this.add
//                 .rectangle(x, y, btnWidth, 52, COLORS.btnDefault)
//                 .setInteractive({ useHandCursor: true })
//                 .setStrokeStyle(2, COLORS.btnHover);
//             const label = this.add.text(x, y, letter, {
//                 fontSize: '24px', 
//                 color: COLORS.textBtn,
//                 fontFamily: 'Arial, sans-serif',
//                 fontStyle: 'bold',
//             }).setOrigin(0.5);
//             // background.on('pointerover', () = {          
//             //     background.setFillStyle(COLORS.btnHover);
//             //     label.setColor(COLORS.textBtnHover);
//             // });
//             background.on('pointerout', () => {
//                 background.setFillStyle(COLORS.btnDefault);
//                 label.setColor(COLORS.textBtn);
//             });
//             background.on('pointerdown', () => this.checkAnswer(letter, background, label));
//         })
//     }

//     private checkAnswer(
//         letter: string,
//         bg: Phaser.GameObjects.Rectangle,
//         label: Phaser.GameObjects.Text,
//     ): void {
//         if (!this.accepting || !this.currentNote || this.isGameOver) return;
//         this.accepting = false;

//         if (letter === this.currentNote.name) {
//         const bonus = this.streak * 5;
//         this.score += 10 + bonus;
//         this.streak++;
//         this.scoreText.setText(`Score: ${this.score}`);
//         this.streakText.setText(this.streak > 1 ? `Streak: ${this.streak} (+${bonus} pts)` : '');
//         bg.setFillStyle(COLORS.btnCorrect); label.setColor(COLORS.textBtnRight);
//         this.showFeedback(`+${10 + bonus}${bonus > 0 ? ` (streak bonus)` : ''}`, COLORS.textGood);
//         this.time.delayedCall(500, () => { bg.setFillStyle(COLORS.btnDefault); label.setColor(COLORS.textBtn); this.spawnNote(); });
//         } else {
//         this.streak = 0; this.streakText.setText('');
//         bg.setFillStyle(COLORS.btnWrong); label.setColor(COLORS.textBtnWrong);
//         this.showFeedback(`It was ${this.currentNote.name}`, COLORS.textBad);
//         this.loseLife();
//         this.time.delayedCall(1000, () => { bg.setFillStyle(COLORS.btnDefault); label.setColor(COLORS.textBtn); });
//         }
//     }
// }

