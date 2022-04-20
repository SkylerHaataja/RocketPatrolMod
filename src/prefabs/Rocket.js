// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = 6;
        this.shotSpeed = 12;
        this.sfxRocket = scene.sound.add('sfx_rocket', {volume: 0.7}); // add rocket sfx
    }

    update() {
        // left/right movement
        if(!this.isFiring) {
            if(keyA.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if(keyD.isDown && this.x <= game.config.width - 
                borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }
        // fire button
        if(Phaser.Input.Keyboard.JustDown(keyS) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();
        }
        // if fired, move up
        if(this.isFiring && this.y+this.height >= borderUISize) {
            this.y -= this.shotSpeed;
        }
        // reset on miss
        if(this.y+this.height <= borderUISize){
            this.reset();
        }
    }

    // reset rocket to "ground"
    reset() {
        this.isFiring = false;
        this.y = game.config.height - 160;
    }
}