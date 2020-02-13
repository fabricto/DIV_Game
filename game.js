export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() {  
    this.load.image("dino", "assets/dino/walk1.png");
    this.load.image("mundo2", "assets/mundo2/BG.png")
    
  }

  create() {
    let posy =200; 
    let posx= this.sys.game.config.height-100;
    let center_width = this.sys.game.config.width/2;
    let center_height = this.sys.game.config.height/2;
   this.dino = this.add.image(posy,posx,"dino").setDisplaySize(100,70);
   //this.mundo2 = this.add.image(center_width,center_height,"mundo2");  
  }

  update(time, delta) {    
  // this.dino.x++;
   this.dino.y--;
  }
}