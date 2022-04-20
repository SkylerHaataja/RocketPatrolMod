class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    
    preload() {

        // load images/tile/sprites
        this.load.image('snapper', './assets/snapper.png');
        this.load.image('chest', './assets/chest.png');
        this.load.image('swordfish', './assets/swordfish.png');
        this.load.image('flounder', './assets/flounder.png');
        this.load.image('background', './assets/background.png');
        this.load.image('forground', './assets/forground.png');
        this.load.image('fish_bg', './assets/fish_bg.png');
        this.load.image('rocket', './assets/arrow.png');
        this.load.image('rocket2', './assets/arrow2.png');
        this.load.image('gun', './assets/harpoon.png');
        this.load.image('gun2', './assets/harpoon2.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', 
        {frameWidth: 128, frameHeight: 100, startFrame: 0, endFrame: 7});
        //loud music
        this.load.audio('soundtrack', ['./assets/spacetime-twang.wav']);

    }

    create() {
        // loop soundtrack
        var music = this.sound.add('soundtrack');
        music.setLoop(true);
        music.play();
        // place tile sprite
        this.background = this.add.tileSprite(0, 0, 960, 640, 'background').setOrigin(0,0);
        this.fish_bg = this.add.tileSprite(0, 0, 960, 640, 'fish_bg').setOrigin(0,0);
        this.forground = this.add.tileSprite(0, 0, 960, 640, 'forground').setOrigin(0,0);
        /* The add.tileSprite() method expects five parameters: x-position, y-position,
           width, height, and a key string that tells us which image to use. */
        // adding harpoons
        this.gun1 = this.add.tileSprite((game.config.width/3), game.config.height - 62, 97, 127, 'gun').setOrigin(0.5);
        this.gun2 = this.add.tileSprite((game.config.width/3) * 2, game.config.height - 62, 97, 127, 'gun2').setOrigin(0.5);
        // UI background
        this.add.rectangle(0,0, game.config.width, borderUISize, 0x8080AF).setOrigin(0, 0);
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, (game.config.width/3), game.config.height - 160, 'rocket').setOrigin(0.5, 0);
        this.p2Rocket = new Rocket2(this, (game.config.width/3) * 2, game.config.height - 160, 'rocket2').setOrigin(0.5, 0);
        // add snappers (x3)
        this.Snapper = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 2 + 10, 'snapper', 0, 30).setOrigin(0, 0);
        this.Swordfish = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 4 + borderPadding * 2, 'swordfish', 0, 20).setOrigin(0, 0);
        this.Flounder = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'flounder', 0, 10).setOrigin(0,0);
        this.Chest = new Spaceship(this, game.config.width*6, borderUISize * 2 - 35, 'chest', 0, 100).setOrigin(0, 0).setScale(.75);
        // define keys
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 7, first: 0}),
            frameRate: 30
        });
        
        // initialize score
        this.p1Score = 0;
        this.p2Score = 0;
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FFC3B2',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        let scoreConfig2 = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#b2eeff',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize/2, 
            4, this.p1Score, scoreConfig);
        this.scoreRight = this.add.text(game.config.width - borderUISize/2 - scoreConfig2.fixedWidth, 
                4, this.p2Score, scoreConfig2);
        
        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 
            'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 
            + 64, 'Press (R) to Restart or ⭠ for Menu', scoreConfig).setOrigin(0.5);
            
            this.gameOver = true;
        }, null, this);
        this.count = 0;
    }
    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.game.sound.stopAll();
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.game.sound.stopAll();
            this.scene.start("menuScene");
        }
        this.background.tilePositionX += Math.sin(this.background.tilePositionY/15.8);
        this.background.tilePositionY += 1;
        this.fish_bg.tilePositionX += 1;
        if (!this.gameOver) {               
            this.p1Rocket.update();       // update rocket sprite (x2)
            this.p2Rocket.update();
            this.Chest.update();
            this.Snapper.update();           // update spaceships (x3)
            this.Swordfish.update();
            this.Flounder.update();
        } 
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.Flounder) && Math.abs(this.Flounder.y-this.p1Rocket.y)<64) {
            console.log("rocket y: " + this.p1Rocket.y);
            console.log("spaceship y: " + this.Flounder.y);
            this.p1Rocket.reset();
            this.shipExplode(this.Flounder);   
        }
        if (this.checkCollision(this.p1Rocket, this.Swordfish) && Math.abs(this.Swordfish.y-this.p1Rocket.y)<64) {
            this.p1Rocket.reset();
            this.shipExplode(this.Swordfish);
        }
        if (this.checkCollision(this.p1Rocket, this.Snapper) && Math.abs(this.Snapper.y-this.p1Rocket.y)<64) {
            this.p1Rocket.reset();
            this.shipExplode(this.Snapper);
        }
        if (this.checkCollision(this.p1Rocket, this.Chest) && Math.abs(this.Chest.y-this.p1Rocket.y)<64) {
            this.p1Rocket.reset();
            this.shipExplode(this.Chest);
        }

        if(this.checkCollision(this.p2Rocket, this.Flounder) && Math.abs(this.Flounder.y-this.p2Rocket.y)<64) {
            this.p2Rocket.reset();
            this.shipExplode2(this.Flounder);   
        }
        if (this.checkCollision(this.p2Rocket, this.Swordfish) && Math.abs(this.Swordfish.y-this.p2Rocket.y)<64) {
            this.p2Rocket.reset();
            this.shipExplode2(this.Swordfish);
        }
        if (this.checkCollision(this.p2Rocket, this.Snapper) && Math.abs(this.Snapper.y-this.p2Rocket.y)<64) {
            this.p2Rocket.reset();
            this.shipExplode2(this.Snapper);
        }
        if (this.checkCollision(this.p2Rocket, this.Chest) && Math.abs(this.Chest.y-this.p2Rocket.y)<64) {
            this.p2Rocket.reset();
            this.shipExplode(this.Chest);
        }
        this.gun1.x=this.p1Rocket.x;
        this.gun2.x=this.p2Rocket.x;
        this.time.text = game.settings.gameTimer;
        if(this.count >= 100){
            
        }
    }
    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        this.sound.play('sfx_explosion', {volume: 0.4});
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(.25, .25);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                         // reset ship position
            ship.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
        });       
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;       
    }
    shipExplode2(ship) {
        // temporarily hide ship
        this.sound.play('sfx_explosion', {volume: 0.4});
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(.25, .25);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                         // reset ship position
            ship.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
        });       
        // score add and repaint
        this.p2Score += ship.points;
        this.scoreRight.text = this.p2Score;       
    }

    // white borders
    updateBorder(){
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
    }
}