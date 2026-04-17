// Instruments user will collect
const INSTRUMENTS = ['flute', 'oboe', 'clarinet', 'bassoon', 'frenchhorn','violin', 'viola', 'cello', 'doublebass'];

export default class MainScene extends Phaser.Scene {
    // Declare all variables with types
    private player!: Phaser.Physics.Arcade.Sprite;
    private platforms!: Phaser.Physics.Arcade.StaticGroup;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private collectibles!: Phaser.Physics.Arcade.Group;
    private bombs!: Phaser.Physics.Arcade.Group;
    private scoreText!: Phaser.GameObjects.Text;
    private feedbackText!: Phaser.GameObjects.Text;

    private score: number = 0;
    private gameOver: boolean = false;
    private level: number = 1;

    constructor() {
        super({ key: 'MainScene' });
    }

    // Preload all assets before the scene starts
    preload(): void {
        // Load background and platform images
        this.load.image('sky', '/galaxy.jpg');
        this.load.image('ground', '/games/platformmm.png');
        this.load.image('bomb', '/games/bomb.png'); 
        this.load.image('deinonychus', '/games/deinonychus.png');

        // Stars are replace by instruments
        INSTRUMENTS.forEach(instrument => {
            this.load.image(instrument, `/instruments/${instrument}.png`);
        });

        this.load.spritesheet('dude', '/games/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    // Create game objects and set up the scene. Runs once when the scene starts. 
    create() {
        const { width, height } = this.scale;

        // Background
        this.add.image(width / 2, height / 2, 'sky');

        // Platforms
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(width / 2, height - 32, 'ground').setScale(2).refreshBody();
        // Now let's create some ledges
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        // Player
        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        // Player animations
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 8,
            repeat: -1
        });

        // Input Events
        this.cursors = this.input.keyboard!.createCursorKeys();

        // Collectibles: mix of instruments and bombs
        this.spawnCollectibles();

        // Bouncing bombs (Deinonychus)
        this.bombs = this.physics.add.group();

        // Score Text
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', color: '#fff' });

        // Feedback Text
        this.feedbackText = this.add.text(width / 2, height / 2, '', { 
            fontSize: '48px', 
            color: '#ff0',
            backgroundColor: '#000',
            padding: { x: 20, y: 10 },
        })
            .setOrigin(0.5)
            .setVisible(false)
            .setDepth(10); // Always on top

        // Collisions and Overlaps
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.collectibles, this.platforms);
        this.physics.add.collider(this.bombs, this.platforms);

        // When player touches a collectible, run handleCollect function
        this.physics.add.overlap(
            this.player, 
            this.collectibles, 
            this.handleCollect as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,    
            undefined, 
            this
        );

        // When player touches a bomb, run hitBomb function
        this.physics.add.collider(
            this.player,
            this.bombs,
            this.hitBomb as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
            undefined,
            this
        ); 
    }

    // Spawn Collectibles: mix of instruments and bombs
    private spawnCollectibles(): void {
        this.collectibles = this.physics.add.group();

        Array.from({ length: 12 }, (_, i) => {
            const isInstrument = Math.random() < 0.7;

            const name = isInstrument
                ? INSTRUMENTS[Phaser.Math.Between(0, INSTRUMENTS.length - 1)]
                : 'bomb';

            const item = this.collectibles.create(12 + i * 70, 0, name) as Phaser.Physics.Arcade.Sprite;
            item.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            item.setData('type', isInstrument ? 'instrument' : 'bomb');
            if (isInstrument) item.setData('name', name);
            if (!isInstrument) item.setTint(0xff4444);
        });
    }

    // Handle collecting an item
    private handleCollect(
        _player: Phaser.GameObjects.GameObject, 
        item: Phaser.GameObjects.GameObject
    ): void {
        const sprite = item as Phaser.Physics.Arcade.Sprite;
        const type = sprite.getData('type') as string;

    // Disable and hide the collected item
    sprite.disableBody(true, true);

    if (type === 'instrument') {
        // Good collect = add points
        const name = sprite.getData('name') as string;
        this.score += 10;
        this.scoreText.setText(`Score: ${this.score}`);
        this.showFeedback(`+10 (${name})`, '#00aa00');
    } else {
        // Bad collect = lose points
        this.score = Math.max(0, this.score - 5); 
        this.scoreText.setText(`Score: ${this.score}`);
        this.showFeedback('Bomb! -5', '#ff0');
        this.cameras.main.shake(300, 0.01);
    }

    // Count only instruments - bombs don't count towards the next level
    const remainingInstruments = this.collectibles
        .getChildren()
        .filter(child => {
            const spr = child as Phaser.Physics.Arcade.Sprite;
            return spr.active && spr.getData('type') === 'instrument';
        }).length;
    
    if (remainingInstruments === 0) {
        this.nextLevel();
    }
}

// Add bomb! Spawns a bouncing bomb on the opposite side from the player
private addBomb(): void {
    const x = this.player.x < 400 
        ? Phaser.Math.Between(400, 800) 
        : Phaser.Math.Between(0, 400);
    
    // Bombs bounces around
    const dino = this.bombs.create(x, 16, 'deinonychus') as Phaser.Physics.Arcade.Sprite;
    dino.setBounce(1);
    dino.setCollideWorldBounds(true);
    dino.setVelocity(Phaser.Math.Between(-200, 200), 20);   

    // Falling Deinonychus for extra chaos (no bounce)
    const bombX = Phaser.Math.Between(100, 700);
    const bomb = this.bombs.create(bombX, 0, 'bomb') as Phaser.Physics.Arcade.Sprite;
    bomb.setBounce(0.2);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-100, 100), 200);
}
// Next level
private nextLevel(): void {
    this.level++;

    const { width, height } = this.scale;
    const msg = this.add.text(width / 2, height / 2, `Level ${this.level}`, {
        fontSize: '64px',
        color: '#0ff',
        backgroundColor: '#000',
        padding: { x: 20, y: 10 },
    }).setOrigin(0.5).setDepth(10);

    this.time.delayedCall(1500, () => {
        msg.destroy();

        this.spawnCollectibles();
        this.physics.add.collider(this.collectibles, this.platforms);
        this.physics.add.overlap(
            this.player, 
            this.collectibles,
            this.handleCollect as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
            undefined,
            this
        );

        this.addBomb();
    })
}
// Handle player hitting a bomb
private hitBomb(): void {
    this.physics.pause();
    this.player.setTint(0xff0000);
    this.player.anims.play('turn');
    this.gameOver = true;

    this.add.text(400, 300, 'Game Over\nClick to restart', { 
        fontSize: '64px', 
        color: '#f00',
        align: 'center',
        backgroundColor: '#000',
        padding: { x: 20, y: 10 },
    }).setOrigin(0.5).setDepth(10);

    // Click anywhere to restart the game
    this.input.once('pointerup', () =>
        this.scene.restart());
    }

    // Show feedback text for a short time
    private showFeedback(message: string, color: string) {
        this.feedbackText
            .setText(message)
            .setColor(color)
            .setVisible(true);

        // Hide after 1 second
        this.time.delayedCall(1000, () => {
            this.feedbackText.setVisible(false);
        });
    }

    // Update --> runs every frame (60 times per second)
    update() {
        if (this.gameOver) return;

        if (this.cursors.left?.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        } else if (this.cursors.right?.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if (this.cursors.up?.isDown && (this.player.body as Phaser.Physics.Arcade.Body).touching.down) {
            this.player.setVelocityY(-330);
        }
    }
}