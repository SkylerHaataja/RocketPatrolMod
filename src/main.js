
let config = {
    type: Phaser.AUTO,
    width: 960,
    height: 640,
    scene: [ Menu, Play ],
    zoom: 1,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
          tileBias: 4,
          gravity: { y: 250 },
        }
    },
    autoCenter: Phaser.Scale.Center,
    
}
let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, keyDOWN, keyA, keyS, keyD;

