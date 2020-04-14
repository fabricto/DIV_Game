import Mundo1 from './mundo1.js';
export default class Menu extends Phaser.Scene {
  constructor() {
    super({ key: 'Menu', });
  }

  preload() {
    this.load.image('boton', './assets/btn.png');
    this.load.spritesheet('virtual_guy', './assets/virtualguy.png', { frameWidth: 32, frameHeight: 32 });
  }

  create() {
    this.width = this.sys.game.config.width;
    this.height = this.sys.game.config.height;
    this.boton = this.add.image(this.width / 2, this.height / 2, 'boton').setInteractive();
    this.boton.setScale(0.5);
    this.boton.on('pointerdown', () => this.scene.start('Mundo1'));
    this.iniciar = this.add.text(this.width / 2, this.height / 2 - 40, 'Iniciar Juego').setOrigin(0.5);
    this.titulo = this.add.text(this.width / 2, this.height / 6, 'The cave').setOrigin(0.5);
    this.guy = this.physics.add.sprite(this.width / 5, this.height / 2, 'virtual_guy').setScale(2);
    this.anims.create({
      key: 'guy_menu',
      frames: this.anims.generateFrameNumbers('virtual_guy', {
        start: 0,
        end: 43
      }),
      repeat: -1,
      frameRate: 15
    });
    this.guy.anims.play('guy_menu', true);
  }
}