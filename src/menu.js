export default class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu' });
    }

    preload() {
        this.load.image('boton', './assets/btn.png');
        this.load.image('inicio', './assets/mapas/inicio.png');
        this.load.image('titulo', './assets/mapas/titulo.png');
        this.load.image('fondomenu', './assets/mapas/Purple.png');
    }

    create() {
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.fondoMenu = this.add.image(this.width / 2, this.height / 2, 'fondomenu').setOrigin(0.5).setScale(1.3);
        this.imageninicio = this.add.image(this.width / 2, this.height / 2, 'inicio').setOrigin(0.5).setScale(1.75);
        this.titulo = this.add.image(this.width / 2, this.height / 6, 'titulo').setOrigin(0.5);
        this.boton = this.add.image(this.width / 2, this.height / 1.75, 'boton').setInteractive().setScale(0.5);
        this.boton.on('pointerdown', () => this.scene.start('Mundo1', { vida: 5, puntos: 0 }));
    }

}