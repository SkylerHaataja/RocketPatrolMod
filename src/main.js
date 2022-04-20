
let config = {
    type: Phaser.AUTO,
    width: 620,
    height: 360,
    scene: [ Menu, Play ],
    zoom: 2,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
          tileBias: 4,
          gravity: { y: 250 },
        }
      },
}
let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, keyDOWN, keyA, keyS, keyD;

