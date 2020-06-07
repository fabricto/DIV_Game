export default class VirtualGuy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'virtual_guy');
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.setSize(20, 30);
        this.playerGravity = 400;
        this.playerGrip = 20;
        this.playerSpeed = 125;
        this.playerJump = 300;
        this.playerLastJumped = 0;
        this.playerSpeedWall = 1200;
        this.playerJumpWall = 275;
        this.timeJump = 500;
        this.timeSoundWalk = 3;
        this.soundWalk = true;
        this.isWalk = false;
    }

    update(time, cursor, onWall, jump) {

        this.setDefaultValues(onWall);
        var blockedLeft = this.body.blocked.left;
        var blockedRight = this.body.blocked.right;
        var canJump = (time - this.playerLastJumped) > this.timeJump;

        // Controles
        if (cursor.right.isDown) {
            this.setVelocityX(this.playerSpeed);
            this.flipX = false;
            this.anims.play('guy_run', true);
            if (this.soundWalk && this.body.onFloor()) {
                this.soundWalk = false;
                this.isWalk = true;
                this.timeSoundWalk = 0;
            }

        }
        else if (cursor.left.isDown) {
            this.setVelocityX(-this.playerSpeed);
            this.flipX = true;
            this.anims.play('guy_run', true);
            if (this.soundWalk && this.body.onFloor()) {
                this.soundWalk = false;
                this.isWalk = true;
                this.timeSoundWalk = 0;
            }
        }
        else {
            this.setVelocityX(0);
            this.anims.play('guy_idle', true);
        }

        if (this.isWalk) {
            if (this.timeSoundWalk == 3) {
                this.soundWalk = true;
                this.timeSoundWalk = 0;
            } else {
                this.timeSoundWalk += 1;

            }
        }


        if (!this.body.onFloor()) {

            if (blockedLeft || blockedRight) {
                this.body.setGravityY(0);
                this.setVelocityY(this.playerGrip);
                this.anims.play('guy_wall', true);
            }
            else {
                this.setFrame(42);
            }
        }

        if (cursor.up.isDown && canJump) {

            if (this.body.onFloor() || blockedLeft || blockedRight) {
                jump.play();
            }

            if (this.body.onFloor()) {
                this.setVelocityY(- this.playerJump);
                this.playerLastJumped = time;
            }
            else if (blockedLeft) {

                this.setVelocityY(- this.playerJumpWall);
                this.setVelocityX(this.playerSpeedWall);
                this.playerLastJumped = time;

            }
            else if (blockedRight) {
                this.setVelocityY(- this.playerJumpWall);
                this.setVelocityX(- this.playerSpeedWall);
                this.playerLastJumped = time;

            }
        }
    }

    setDefaultValues(onWall) {
        this.body.setGravityY(this.playerGravity);
        this.onWall = false;
    }
}