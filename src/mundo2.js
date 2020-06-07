import VirtualGuy from "./gameObjects/virtualguy.js";
import Comun from './comun.js'
export default class Mundo2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Mundo2' });
    }

    init(data){
        // Cargamos la información que nos viene de la anterior escena
        this.vida = data.vida;
        this.puntos = data.puntos;
    }

    preload() {
        // Información del mapa de la escena
        this.keyMapa = 'mapaB';
        this.pathMapa = 'assets/mapas/mapaB.json';
        
        // Cargamos los assets
        this.comun = new Comun(this);
        this.comun.preCarga(this.keyMapa, this.pathMapa);
    }

    create() {
        // Detalles del mapa
        this.numPinchos = [245, 254, 247];
        this.numFuego = [57, 104, 656];
        this.xGuy = 50;
        this.yGuy = 350;
        this.keyMundo = 'Mundo2';
        this.keyNextMundo = 'Mundo3';
        this.comun.crear(this.keyMapa, this.keyMundo, this.keyNextMundo, this.numPinchos, this.numFuego, this.vida, this.puntos, this.xGuy, this.yGuy);
        
        // Creación del personaje
        this.virtualguy = new VirtualGuy(this, this.xGuy, this.yGuy);
        this.comun.virtualG(this.virtualguy);
        
        // Creación de flechas
        this.comun.createArrowObjects();
        
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