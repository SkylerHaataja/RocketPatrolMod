class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    
    preload() {

        // load images/tile/sprites
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('rocket', './assets/spear.png');
        this.load.image('rocket2', './assets/spear2.png');
        this.load.image('gun', './assets/harpoon_PH.png');
        this.load.image('gun2', './assets/harpoon_PH2.png');
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
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0,0);
        /* The add.tileSprite() method expects five parameters: x-position, y-position,
           width, height, and a key string that tells us which image to use. */
        // adding harpoons
        this.gun1 = this.add.tileSprite((game.config.width/3), game.config.height - borderUISize+2, 21, 42, 'gun').setOrigin(0.5);
        this.gun2 = this.add.tileSprite((game.config.width/3) * 2, game.config.height - borderUISize+2, 21, 42, 'gun2').setOrigin(0.5);
        // UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x8080AF).setOrigin(0, 0);
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, (game.config.width/3), game.config.height - borderUISize - borderPadding-13, 'rocket').setOrigin(0.5, 0);
        this.p2Rocket = new Rocket2(this, (game.config.width/3) * 2, game.config.height - borderUISize - borderPadding -13, 'rocket2').setOrigin(0.5, 0);
        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'spaceship', 0, 10).setOrigin(0,0);
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
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, 
            borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        this.scoreRight = this.add.text(game.config.width - borderUISize - borderPadding - scoreConfig.fixedWidth, 
                borderUISize + borderPadding*2, this.p2Score, scoreConfig);
        
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
        this.starfield.tilePositionX -= 2;
        this.starfield.tilePositionY -= 1;
        if (!this.gameOver) {               
            this.p1Rocket.update();       // update rocket sprite (x2)
            this.p2Rocket.update();
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
        } 
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03) && Math.abs(this.ship03.y-this.p1Rocket.y)<64) {
            console.log("rocket y: " + this.p1Rocket.y);
            console.log("spaceship y: " + this.ship03.y);
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);   
        }
        if (this.checkCollision(this.p1Rocket, this.ship02) && Math.abs(this.ship02.y-this.p1Rocket.y)<64) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01) && Math.abs(this.ship01.y-this.p1Rocket.y)<64) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }

        if(this.checkCollision(this.p2Rocket, this.ship03) && Math.abs(this.ship03.y-this.p2Rocket.y)<64) {
            this.p2Rocket.reset();
            this.shipExplode2(this.ship03);   
        }
        if (this.checkCollision(this.p2Rocket, this.ship02) && Math.abs(this.ship02.y-this.p2Rocket.y)<64) {
            this.p2Rocket.reset();
            this.shipExplode2(this.ship02);
        }
        if (this.checkCollision(this.p2Rocket, this.ship01) && Math.abs(this.ship01.y-this.p2Rocket.y)<64) {
            this.p2Rocket.reset();
            this.shipExplode2(this.ship01);
        }
        this.gun1.x=this.p1Rocket.x;
        this.gun2.x=this.p2Rocket.x;
        this.time.text = game.settings.gameTimer;
        
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