class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame, pointValue);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;
        this.val = 0;
        this.canHit = true;

    }

    update(){
        if(this.val == 0){
            // move spaceship left
            this.x -= this.moveSpeed;
            this.flipX = false;
        }
        else{
            this.x += this.moveSpeed;
            this.flipX = true;
        }

        if(this.x <= 0 - this.width && this.val == 0){
            this.reset();
        }
        if(this.x >= game.config.width && this.val == 1){
            this.reset();
        }
    }

    reset(){
        this.val = Phaser.Math.Between(0,1);
        if(this.val == 0){
            this.x = game.config.width;
        }
        else{
            this.x = 0-this.width;
        }
    }
}