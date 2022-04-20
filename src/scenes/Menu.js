class Menu extends Phaser.Scene {
    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/sfx_blip.wav');
        this.load.audio('sfx_explosion', './assets/sfx_explode.wav');
        this.load.audio('sfx_rocket', './assets/harpoon.wav');
        this.load.audio('soundtrack', ['./assets/Water-Level.wav']);
        this.load.image('background', './assets/background.png');
        this.load.image('forground', './assets/forground.png');
        this.load.image('fish_bg', './assets/fish_bg.png');
    }

    constructor() {
        super("menuScene");
    }
    create() {
        this.background = this.add.tileSprite(0, 0, 960, 640, 'background').setOrigin(0,0);
        this.fish_bg = this.add.tileSprite(0, 0, 960, 640, 'fish_bg').setOrigin(0,0);
        this.forground = this.add.tileSprite(0, 0, 960, 640, 'forground').setOrigin(0,0);
        // meny text config
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FFC3B2',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        menuConfig.color = '#000';
        // show menu text
        this.add.text(game.config.width/2, borderUISize - borderPadding, 'Fantastic Spear Fishing', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 2*borderUISize - borderPadding , 
        'Player 1, Use a and d keys to move & s key to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#b2eeff';
        this.add.text(game.config.width/2, 3*borderUISize - borderPadding, 
        'Player 2, Use ⟷ arrows to move & ↓ arrow to fire', menuConfig).setOrigin(0.5);
        
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, 4*borderUISize - borderPadding, 
        'Press ⭠ for Novice or ➝ for Expert', menuConfig).setOrigin(0.5);
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        this.background.tilePositionX += Math.sin(this.background.tilePositionY/15.8);
        this.background.tilePositionY += 1;
        this.fish_bg.tilePositionX += 1;
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 60000    
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 10,
                gameTimer: 45000    
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
        }
      }
}