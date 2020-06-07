import Menu from './src/menu.js'
import Mundo1 from './src/mundo1.js'
import Mundo2 from './src/mundo2.js'
import Mundo3 from './src/mundo3.js'
import Mundo4 from './src/mundo4.js'
import Mundo5 from './src/mundo5.js'
import Final from './src/final.js'
export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'main' });
    }
    create() {
        // Las escenas del juego
        this.scene.add('Final', new Final);
        this.scene.add('Mundo5', new Mundo5);
        this.scene.add('Mundo4', new Mundo4);
        this.scene.add('Mundo3', new Mundo3);
        this.scene.add('Mundo2', new Mundo2);
        this.scene.add('Mundo1', new Mundo1);
        this.scene.add("Menu", new Menu);
        this.scene.start("Menu");
    }
}