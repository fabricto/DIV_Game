
import Menu from './src/menu.js';
import Mundo1 from './src/mundo1.js';
export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  create() {
    this.scene.add('Mundo1', new Mundo1);
    this.scene.add("Menu", new Menu);
    this.scene.start("Menu");
  }
}