import VirtualGuy from "./gameObjects/virtualguy.js";
import Comun from './comun.js'
export default class Mundo3 extends Phaser.Scene {
    constructor() {
        super({ key: 'Mundo3' });
    }

    init(data){
        // Cargamos la información que nos viene de la anterior escena
        this.vida = data.vida;
        this.puntos = data.puntos;
    }

    preload() {
        // Información del mapa de la escena
        this.keyMapa = 'mapaC';
        this.pathMapa = 'assets/mapas/mapaC.json';

        // Cargamos los assets
        this.comun = new Comun(this);
        this.comun.preCarga(this.keyMapa, this.pathMapa);
    }

    create() {
        // Detalles del mapa
        this.numPinchos = [36, 37, 245, 58, 59, 247];
        this.numFuego = [55, 40, 656];
        this.xGuy = 976;
        this.yGuy = 464;
        this.keyMundo = 'Mundo3';
        this.keyNextMundo = 'Mundo4';
        this.comun.crear(this.keyMapa, this.keyMundo, this.keyNextMundo, this.numPinchos, this.numFuego, this.vida, this.puntos, this.xGuy, this.yGuy);
        
        // Creación del personaje
        this.virtualguy = new VirtualGuy(this, this.xGuy, this.yGuy);
        this.comun.virtualG(this.virtualguy);
       
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