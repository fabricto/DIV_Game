export default class Comun extends Phaser.Scene {
    constructor(scene) {
        super(scene, "Comun");
        this.scene = scene;
    }

    preCarga(key, path) {
        this.scene.load.image('tiles', 'assets/mapas/tiles.png');
        this.scene.load.image('spikes', 'assets/mapas/spikes.png');
        this.scene.load.image('trampolin', 'assets/mapas/spring.png');
        this.scene.load.image('fondomapaA', './assets/mapas/Blue.png');
        this.scene.load.image('fondomapaB', './assets/mapas/Green.png');
        this.scene.load.image('fondomapaC', './assets/mapas/Rose.png');
        this.scene.load.image('fondomapaD', './assets/mapas/Orange.png');
        this.scene.load.image('fondomapaE', './assets/mapas/Yellow.png');

        this.scene.load.spritesheet('virtual_guy', './assets/virtualguy.png', { frameWidth: 32, frameHeight: 32 });
        this.scene.load.spritesheet('fuego', './assets/mapas/fire.png', { frameWidth: 16, frameHeight: 32 });
        this.scene.load.spritesheet('moneda', './assets/mapas/coin.png', { frameWidth: 32, frameHeight: 32 });
        this.scene.load.spritesheet('flecha', './assets/mapas/arrow.png', { frameWidth: 18, frameHeight: 18 });
        this.scene.load.spritesheet('portal', './assets/mapas/portal.png', { frameWidth: 16, frameHeight: 16 });
        this.scene.load.spritesheet('heart', './assets/mapas/heart.png', { frameWidth: 17, frameHeight: 17 });


        this.scene.load.tilemapTiledJSON(key, path);

        this.scene.load.audio('audio_jump', 'assets/audio/jump.mp3');
        this.scene.load.audio('audio_slide', 'assets/audio/dust.mp3');
        this.scene.load.audio('audio_hit', 'assets/audio/hit.mp3');
        this.scene.load.audio('audio_coin', 'assets/audio/coin.mp3');
        this.scene.load.audio('audio_portal', 'assets/audio/portal.mp3');
        this.scene.load.audio('audio_boing', 'assets/audio/boing.mp3');
        this.scene.load.audio('musica', 'assets/audio/YookaLaylee.mp3');
    }


    crear(keyMapa, keyMundo, keyNexMundo, numPinchos, numFuego, vida, puntos, xG, yG) {
        // Obtenemos la información del mundo
        this.nCorazones = vida;
        this.xGuy = xG;
        this.yGuy = yG;
        this.puntos = puntos;
        this.puntosInicio = puntos;
        this.keyMundo = keyMundo;
        this.keyNexMundo = keyNexMundo;

        // Añadimos e iniciamos la música
        this.musica = this.scene.sound.add('musica', { loop: true });
        this.musica.play();

        // Creación del mapa
        this.fondoJuego = this.scene.add.tileSprite(0, 0, 1056, 704, 'fondo' + keyMapa);

        this.mapa = this.scene.make.tilemap({ key: keyMapa });
        this.tiles = this.mapa.addTilesetImage('tiles');
        this.spikestiles = this.mapa.addTilesetImage('spikes');

        this.layer = this.mapa.createDynamicLayer('terreno', this.tiles, 0, 0);
        this.spikeslayer = this.mapa.createDynamicLayer('pinchos', this.spikestiles, 0, 0);

        this.layer.setCollisionByProperty({ colision: true });

        // Texto que nos indica nuestra puntuación
        this.scoreText = this.scene.add.text(830, 33, 'SCORE: ' + this.puntos, { font: '30px Consolas', fill: '#FFF' });

        // Creación del fuego y le añadimos animación
        this.fire = this.scene.physics.add.group({
            key: 'fuego',
            repeat: numFuego[0],
            setXY: {
                x: numFuego[1],
                y: numFuego[2],
                stepX: 16
            }
        });

        this.scene.anims.create({
            key: 'fire_on',
            frames: this.scene.anims.generateFrameNumbers('fuego', {
                start: 0,
                end: 2
            }),
            frameRate: 20,
            repeat: -1,
        });
        this.fire.playAnimation('fire_on', this.fire);

        // Creación mediante una capa de objetos del portal que nos lleva al siguiente nivel (junto con su animación)
        this.portal = this.mapa.createFromObjects('salida', 'portal', { key: 'portal' });
        this.portal.enableBody = true;
        this.scene.physics.world.enable(this.portal);
        this.scene.anims.create({
            key: 'portal_on',
            frames: this.scene.anims.generateFrameNumbers('portal', {
                start: 0,
                end: 2
            }),
            frameRate: 20,
            repeat: -1,
        });

        this.scene.anims.play('portal_on', this.portal);

        // Creación de las monedas por medio de una capa de objetos (junto con su animación)
        this.monedas = this.scene.physics.add.group();
        this.monedas.enableBody = true;
        this.monedas = this.mapa.createFromObjects('monedas', 'moneda', { key: 'moneda' });
        this.scene.physics.world.enable(this.monedas);
        this.scene.anims.create({
            key: 'spin',
            frames: this.scene.anims.generateFrameNumbers('moneda', {
                start: 0,
                end: 8
            }),
            frameRate: 20,
            repeat: -1
        });
        this.scene.anims.play('spin', this.monedas);

        // Si se impacta con los pinchos se llama al método touchobject
        this.spikeslayer.setTileIndexCallback(numPinchos, this.touchObject, this);

        // Redimensionamos el fondo del mapa para que abarque todo el juego
        this.fondoJuego.setScale(2);

        // Creación de la vida mediante la llamada al método createHealt
        this.myGruop = this.scene.add.group();
        this.createHealt(this.nCorazones);
    }

    virtualG(virtualg) {

        this.virtualguy = virtualg;
        this.virtualguy.setCollideWorldBounds(true);

        // Animaciones del personaje
        this.scene.anims.create({
            key: 'guy_idle',
            frames: this.scene.anims.generateFrameNumbers('virtual_guy', {
                start: 0,
                end: 10
            }),
            repeat: -1,
            frameRate: 20
        });

        this.scene.anims.create({
            key: 'guy_run',
            frames: this.scene.anims.generateFrameNumbers('virtual_guy', {
                start: 29,
                end: 40
            }),
            repeat: -1,
            frameRate: 20
        });

        this.scene.anims.create({
            key: 'guy_wall',
            frames: this.scene.anims.generateFrameNumbers('virtual_guy', {
                start: 24,
                end: 28
            }),
            repeat: -1,
            frameRate: 20
        });

        // Añadimos las colisiones que posee el personaje
        this.scene.physics.add.collider(this.virtualguy, this.layer);
        this.scene.physics.add.collider(this.virtualguy, this.spikeslayer);
        this.scene.physics.add.overlap(this.virtualguy, this.fire, this.touchObject, null, this);
        this.scene.physics.add.overlap(this.virtualguy, this.monedas, this.collectObject, null, this);
        this.scene.physics.add.overlap(this.virtualguy, this.portal, this.exit, null, this);

    }

    createArrowObjects() {
        // Creación de las flechas mediante una capa de objetos (junto a su animación)
        this.flechas = this.scene.physics.add.group();
        this.flechas.enableBody = true;
        this.flechas = this.mapa.createFromObjects('flechas', 'flecha', { key: 'flecha' });
        this.scene.physics.world.enable(this.flechas);
        this.scene.anims.create({
            key: 'arrow_on',
            frames: this.scene.anims.generateFrameNumbers('flecha', {
                start: 0,
                end: 9
            }),
            frameRate: 20,
            repeat: -1
        });
        this.scene.anims.play('arrow_on', this.flechas);

        // Añadimos la colisión entre el personaje y las flechas
        this.scene.physics.add.overlap(this.virtualguy, this.flechas, this.arrowEffect, null, this);
    }

    createSpringObjects() {
        // Creación de los trampolines mediante una capa de objetos (junto a su animación)
        this.trampolines = this.scene.physics.add.group();
        this.trampolines.enableBody = true;
        this.trampolines = this.mapa.createFromObjects('trampolines', 'trampolin', { key: 'trampolin' });
        this.scene.physics.world.enable(this.trampolines);

        // Añadimos la colisión entre el personaje y los trampolines
        this.scene.physics.add.overlap(this.virtualguy, this.trampolines, this.springBounce, null, this);
    }

    touchObject(player, tile) {
        this.virtualguy.x = this.xGuy;
        this.virtualguy.y = this.yGuy;

        if (this.death) {
            // Si hemos muerto restamos un corazón de vida
            this.restHealth(-1);
            this.death = false;
            if (this.nCorazones === 0) {
                // Si nos hemos quedado sin corazones volvemos al menú        
                this.scene.scene.start('Menu');
            }
            else{
                // Si aún conservamos un corazón volvemos a empezar el nivel
                this.scene.scene.start(this.keyMundo, {vida: this.nCorazones, puntos: this.puntosInicio});
            }
            this.scene.sound.stopAll();
            this.scene.sound.play('audio_hit');
        }
    }

    collectObject(player, moneda) {
        // Si el jugador colisiona con una moneda ésta se destruye y nos suma 10 a nuestra puntuación
        moneda.destroy();
        this.puntos += 10;
        this.scoreText.setText('SCORE: ' + this.puntos);
        this.scene.sound.play('audio_coin');
    }

    arrowEffect(player, flecha) {
        // Si el jugador colisiona con una flecha ésta se destruye y el jugador recibe un impulso hacia arriba
        flecha.destroy();
        player.setVelocityY(-200);
        this.scene.sound.play('audio_boing');
    }

    springBounce(player, tile) {
        // Si el jugador colisiona con un trampolín recibirá un gran impulso hacia arriba
        player.setVelocityY(-540);
    }

    moveBackground() {
        // Este método permite que el fondo del juego se desplace
        this.fondoJuego.tilePositionY -= 0.5;
    }

    exit(player, salida) {
            // Si el jugador colisiona con el portal será enviado al siguiente nivel
            // Nos llevamos la vida y puntos que tiene el personaje al terminar el nivel
            this.scene.scene.start(this.keyNexMundo, { vida: this.nCorazones, puntos: this.puntos});
            this.scene.sound.stopAll();
            this.scene.sound.play('audio_portal');
    }

    createHealt(n) {
        // Creación de la vida (corazones) y le añadimos su animación
        for (let i = 0; i < n; i++) {
            this.heart = this.scene.physics.add.sprite(620 + i * 40, 50, 'heart').setScale(1.5);
            this.myGruop.add(this.heart);
            this.scene.anims.create({
                key: 'heart-group',
                frames: this.scene.anims.generateFrameNumbers('heart', {
                    start: 0,
                    end: 1
                }),
                frameRate: 3,
                repeat: -1,
            });
            this.scene.anims.play('heart-group', this.heart);
        }
    }

    setControllMuerte(death) {
        // Método que nos ayuda a tener un control de si el personaje ha muerto
        this.death = death;
    }

    restHealth(n) {
        // Método que nos quita un corazón de vida
        this.myGruop.clear(true, true);
        this.nCorazones = this.nCorazones + n;
        this.myGruop = this.scene.add.group();
        this.createHealt(this.nCorazones);
    }
}