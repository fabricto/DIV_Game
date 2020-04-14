import VirtualGuy from './gameObjects/virtualguy.js'

export default class Mundo1 extends Phaser.Scene {
  constructor() {
    super({ key: 'Mundo1' });
  }

  preload() {
    this.load.image('fondo', './assets/mapas/Blue.png');
    this.load.image('tiles', 'assets/mapas/tiles.png');
    this.load.image('spikes', 'assets/mapas/spikes.png');

    this.load.spritesheet('virtual_guy', './assets/virtualguy.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('fuego', './assets/mapas/fire.png', { frameWidth: 16, frameHeight: 32 });
    this.load.spritesheet('fruta', './assets/mapas/Apple.png', { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet('portal', './assets/mapas/portal.png', { frameWidth: 16, frameHeight: 16 })

    this.load.tilemapTiledJSON('mapa', 'assets/mapas/mapaA.json');

    this.load.audio('audio_walking', 'assets/audio/footstep.mp3');
    this.load.audio('audio_jump', 'assets/audio/jump.mp3');
    this.load.audio('audio_slide', 'assets/audio/dust.mp3');
    this.load.audio('audio_hit', 'assets/audio/hit.mp3');
    this.load.audio('audio_fruit', 'assets/audio/fruit.mp3');

  }

  create() {
    this.fondoJuego = this.add.tileSprite(0, 0, 1056, 704, 'fondo');

    this.mapa = this.make.tilemap({ key: 'mapa' });
    this.tiles = this.mapa.addTilesetImage('tiles');
    this.spikestiles = this.mapa.addTilesetImage('spikes');

    this.layer = this.mapa.createDynamicLayer('terreno', this.tiles, 0, 0);
    this.spikeslayer = this.mapa.createDynamicLayer('pinchos', this.spikestiles, 0, 0);

    this.layer.setCollisionByProperty({ colision: true });

    this.scoreText = this.add.text(16, 16, 'PUNTOS: 0', { fontSize: '32px Roboto Condensed', fill: '#FFF' });

    this.fire = this.physics.add.group({
      key: 'fuego',
      repeat: 42,
      setXY: {
        x: 184,
        y: 640,
        stepX: 16
      }
    });

    this.anims.create({
      key: 'fire_on',
      frames: this.anims.generateFrameNumbers('fuego', {
        start: 0,
        end: 2
      }),
      frameRate: 20,
      repeat: -1,
    });

    this.fire.playAnimation('fire_on', this.fire);

    this.portal = this.mapa.createFromObjects('salida', 'portal', { key: 'portal' });

    this.anims.create({
      key: 'portal_on',
      frames: this.anims.generateFrameNumbers('portal', {
        start: 0,
        end: 2
      }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.play('portal_on', this.portal);

    this.frutas = this.physics.add.group();
    this.frutas.enableBody = true;
    this.frutas = this.mapa.createFromObjects('frutas', 'fruta', { key: 'fruta' });
    this.physics.world.enable(this.frutas);
    this.anims.create({
      key: 'spin',
      frames: this.anims.generateFrameNumbers('fruta', {
        start: 0,
        end: 17
      }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.play('spin', this.frutas);

    this.virtualguy = new VirtualGuy(this, 70, 400);
    this.virtualguy.setCollideWorldBounds(true);
    this.onWall = false;
    this.anims.create({
      key: 'guy_idle',
      frames: this.anims.generateFrameNumbers('virtual_guy', {
        start: 0,
        end: 10
      }),
      repeat: -1,
      frameRate: 20
    });

    this.anims.create({
      key: 'guy_run',
      frames: this.anims.generateFrameNumbers('virtual_guy', {
        start: 29,
        end: 40
      }),
      repeat: -1,
      frameRate: 20
    });

    this.anims.create({
      key: 'guy_wall',
      frames: this.anims.generateFrameNumbers('virtual_guy', {
        start: 24,
        end: 28
      }),
      repeat: -1,
      frameRate: 20
    });

    this.physics.add.collider(this.virtualguy, this.layer);
    this.physics.add.collider(this.virtualguy, this.spikeslayer);
    this.physics.add.overlap(this.virtualguy, this.fire, this.touchObject, null, this);
    this.physics.add.overlap(this.virtualguy, this.frutas, this.collectObject, null, this);

    this.spikeslayer.setTileIndexCallback([253, 257, 260, 251], this.touchObject, this);

    this.cursor = this.input.keyboard.createCursorKeys();

    this.walk = this.sound.add('audio_walking');
    this.jump = this.sound.add('audio_jump');
    this.sound.add('audio_slide');
    this.sound.add('audio_hit');
    this.sound.add('audio_fruit');
  }

  update(time, delta) {
    this.fondoJuego.tilePositionY -= 0.5;
    this.fondoJuego.setScale(2);
    this.virtualguy.update(time, this.cursor, this.onWall, this.jump, this.walk);
  }

  touchObject(player, tile) {
    this.scene.restart();
    this.sound.play('audio_hit');
  }

  collectObject(player, fruta) {
    fruta.destroy();
    player.score += 10;
    this.scoreText.setText('PUNTOS: ' + player.score);
    this.sound.play('audio_fruit');
  }

}