import VirtualGuy from "./gameObjects/virtualguy.js";
import Comun from './comun.js'
export default class Mundo5 extends Phaser.Scene {
    constructor() {
        super({ key: 'Mundo5' });
    }

    init(data){
        // Cargamos la información que nos viene de la anterior escena
        this.vida = data.vida;
        this.puntos = data.puntos;
    }

    preload() {
        // Información del mapa de la escena
        this.keyMapa = 'mapaE';
        this.pathMapa = 'assets/mapas/mapaE.json';
        
        // Cargamos los assets
        this.comun = new Comun(this);
        this.comun.preCarga(this.keyMapa, this.pathMapa);
    }

    create() {
        // Detalles del mapa
        this.numPinchos = [13, 14, 15, 35, 245, 246, 251, 254, 255, 258];
        this.numFuego = [61, 40, 656];
        this.xGuy = 50;
        this.yGuy = 50;
        this.keyMundo = 'Mundo5';
        this.keyNextMundo = 'Final'; // Fin del juego
        this.comun.crear(this.keyMapa, this.keyMundo, this.keyNextMundo, this.numPinchos, this.numFuego, this.vida, this.puntos, this.xGuy, this.yGuy);
        
        // Creación del personaje
        this.virtualguy = new VirtualGuy(this, this.xGuy, this.yGuy);
        this.comun.virtualG(this.virtualguy);

        // Creación de flechas y trampolín
        this.comun.createArrowObjects();
        this.comun.createSpringObjects();

        this.onWall = false;
        this.jump = this.sound.add('audio_jump');

        // Controles
        this.cursor = this.input.keyboard.createCursorKeys();
    }

    update(time, delta) {
        this.death = true;
        this.virtualguy.update(time, this.cursor, this.onWall, this.jump);
        this.comun.moveBackground();
        this.comun.setControllMuerte(this.death);
    }
}