import VirtualGuy from "./gameObjects/virtualguy.js";
import Comun from './comun.js'
export default class Mundo4 extends Phaser.Scene {
    constructor() {
        super({ key: 'Mundo4' });
    }

    init(data){
        // Cargamos la información que nos viene de la anterior escena
        this.vida = data.vida;
        this.puntos = data.puntos;
    }

    preload() {
        // Información del mapa de la escena
        this.keyMapa = 'mapaD';
        this.pathMapa = 'assets/mapas/mapaD.json';

        // Cargamos los assets
        this.comun = new Comun(this);
        this.comun.preCarga(this.keyMapa, this.pathMapa);
    }

    create() {
        // Detalles del mapa
        this.numPinchos = [245, 246, 247, 248, 51, 254, 255, 258];
        this.numFuego = [58, 88, 656];
        this.xGuy = 70;
        this.yGuy = 400;
        this.keyMundo = 'Mundo4';
        this.keyNextMundo = 'Mundo5';
        this.comun.crear(this.keyMapa, this.keyMundo, this.keyNextMundo, this.numPinchos, this.numFuego, this.vida, this.puntos, this.xGuy, this.yGuy);
        
        // Creación del personaje
        this.virtualguy = new VirtualGuy(this, this.xGuy, this.yGuy);
        this.comun.virtualG(this.virtualguy);
        
        // Creación de trampolines
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