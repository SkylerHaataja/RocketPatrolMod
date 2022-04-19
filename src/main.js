
let scale = 1;
let config = {
    type: Phaser.AUTO,
    width: 640*scale,
    height: 480*scale,
    scene: [ Menu, Play ],
    
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;


// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, keyDOWN, keyA, keyS, keyD;

