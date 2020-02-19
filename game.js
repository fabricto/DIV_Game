export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() {  
   this.nombres =["mundo2","bush1","cactus1","cactus2","cactus3","crate","grass","signArrow","skeleton","stone","stoneblock","tree","1","2","3","14","15","16"];
   this.dir =["BG.png", "Objects/Bush1.png", "Objects/Cactus1.png", "Objects/Cactus2.png", "Objects/Cactus3.png", "Objects/Crate.png", "Objects/Grass2.png", "Objects/SignArrow.png", "Objects/Skeleton.png","Objects/Stone.png",  "Objects/StoneBlock.png", "Objects/Tree.png", "Tile/1.png", "Tile/2.png", "Tile/3.png","Tile/14.png","Tile/15.png","Tile/16.png"]; 
   
    for(var i = 0; i<this.nombres.length; i++){
      this.load.image(this.nombres[i], "assets/mundo2/"+this.dir[i]);
    }

    this.load.atlasXML('dino','assets/dino/sprites.png', 'assets/dino/sprites.xml');
    
  }

  create() {
    let posy =200; 
    let final =this.sys.game.config.width;
    let posx= this.sys.game.config.height-100;
    let center_width = this.sys.game.config.width/2;
    let center_height = this.sys.game.config.height/2;
  
    this.mundo2 = this.add.tileSprite(center_width, center_height,1280,960,"mundo2");
    this.add.image(200, 900 , 'skeleton');
    this.plataforms = this.physics.add.staticGroup();
    this.plataforms.create(100, 400 , 'bush1');
    this.plataforms.create(800, 400 , 'cactus1');
    this.plataforms.create(100, 800 , 'cactus2');
    this.plataforms.create(600, 600 , 'cactus3');
    this.plataforms.create(600, 100 , 'crate');
    this.plataforms.create(200, 800 , 'grass');
    this.plataforms.create(300, 400 , 'signArrow');
    this.plataforms.create(0, 0 , 'stoneblock');
    this.plataforms.create(1000, 100 , 'tree');
    this.plataforms.create(60, posx+100 , '1').refreshBody();this.plataforms.create(188, posx+100 , '2').refreshBody();
    this.plataforms.create(316, posx+100 , '2').refreshBody();
    this.plataforms.create(444, posx+100 , '2').refreshBody();
    this.plataforms.create(572, posx+100 , '2').refreshBody();
    this.plataforms.create(700, posx+100 , '2').refreshBody();
    this.plataforms.create(828, posx+100 , '2').refreshBody();
    this.plataforms.create(956, posx+100 , '2').refreshBody();
    this.plataforms.create(1084, posx+100 , '2').refreshBody();
    this.plataforms.create(final-60, posx+100, '3').refreshBody();

    this.plataforms.create(100, 600 , '14').setScale(0.5);
    this.plataforms.create(220, 600 , '15').setScale(0.5);
    this.plataforms.create(348, 600 , '16').setScale(0.5);

   
    this.dino = this.physics.add.sprite(300,posx,'dino');
    this.dino.setBounce(0.2);
    this.dino.setScale(0.2);
    this.dino.setCollideWorldBounds(true);
    
  this.anims.create({
    key: 'turn',
    frames: this.anims.generateFrameNames('dino', { 
      prefix: "dino",
      suffix:".png",
      start:9
     }),
    frameRate: 10,
    repeat: -1
});
  this.anims.create({
    key: 'run',
    frames: this.anims.generateFrameNames('dino', { 
      prefix: "dino",
      suffix:".png",
      start:1,
      end: 8
       }),
    frameRate: 10,
    repeat: -1
  });

  this.cursors = this.input.keyboard.createCursorKeys();
  this.physics.add.collider(this.dino, this.plataforms);

  }

  update(time, delta) {   
    if (this.cursors.right.isDown)
    {
      this.dino.flipX=false;
        this.dino.setVelocityX(160);

        this.dino.anims.play('run', true);
    }
   else if (  this.cursors.left.isDown)
    {
      this.dino.flipX=true;
      this.dino.setVelocityX(-160);

      this.dino.anims.play('run', true);
    }
  else
  {
    this.dino.setVelocityX(0);

    this.dino.anims.play('turn');
  }
  if (  this.cursors.up.isDown && this.dino.body.touching.down)
  {
    this.dino.setVelocityY(-530);
  }
  } 

}