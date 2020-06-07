export default class Final extends Phaser.Scene {
    constructor() {
        super({ key: 'Final' });
    }

    init(data){
        this.vida = data.vida;
        this.puntos = data.puntos;
    }

    preload() {
        this.load.image('boton', './assets/btn.png');
        this.load.image('felicidades', './assets/mapas/felicidades.png');
        this.load.image('puntuacion', './assets/mapas/puntuacion.png');
        this.load.image('replay', './assets/mapas/replay.png');
        this.load.image('fondofin', './assets/mapas/fin.png');
    }

    create() {
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.score = (this.vida * 20) + this.puntos; // Calculamos la puntuación final de la partida
        this.fondoFin = this.add.image(this.width / 2, this.height / 2, 'fondofin').setOrigin(0.5).setScale(1.2);
        this.felicidades = this.add.image(this.width / 2, this.height / 6, 'felicidades').setOrigin(0.5);
        this.puntuacion = this.add.image(this.width / 2, this.height / 3, 'puntuacion').setOrigin(0.5);
        this.scoreFinalText = this.add.text(this.width / 2, this.height / 2.25, '' + this.score, { font: '60px Consolas', fill: '#FFF' }).setOrigin(0.5);
        this.replay = this.add.image(this.width / 2, this.height / 1.5, 'replay').setOrigin(0.5);
        this.boton = this.add.image(this.width / 2, this.height / 1.25, 'boton').setInteractive();
        this.boton.setScale(0.5);
        this.boton.on('pointerdown', () => this.scene.start('Mundo1', { vida: 5, puntos: 0})); // Volver a jugar
    }

}