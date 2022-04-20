// Skyler Haataja, Rocket Patrol Mod, 4/20/2022
// Worload: 20 Hours
// Points Breakdown:
//      Create a new spaceship type (w/ new artwork) that's smaller, 
//      moves faster, and is worth more points (20)
//          A new item called chest gives 100 points, moves faster, 
//          has a smaller hitbox, and is the furthest away
//      
//      Parrallax scrolling (10 points)
//          Made the bubbles background move in a sin wave upwards
//          Added fish that move across
//
//      Implement a simultaneous two-player mode. In this mode there are
//      two rockets at the same time, each with its own (key) controls,
//      each capable of independent firing. (30)
// 
//      Redesign the game's artwork, UI, and sound to change its 
//      theme/aesthetic (to something other than sci-fi) (60)
//          Theme is now underwater with harpoons and fish
//
// No outside help however, 
//      explosion asset is from OpenGameArt:
//          https://opengameart.org/content/pixel-explosion-12-frames
//      bloop.wav is from Ascending Bubbles Accent from freesfx.co.uk
//          https://www.freesfx.co.uk/sfx/bubble

let config = {
    type: Phaser.AUTO,
    width: 960,
    height: 640,
    scene: [ Menu, Play ],
    zoom: 1,
    pixelArt: true,
    autoCenter: Phaser.Scale.Center,
    
}
let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, keyDOWN, keyA, keyS, keyD;

