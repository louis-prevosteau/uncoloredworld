import * as Phaser from 'phaser';
import {Monde1} from '../generationLevel/Monde1';
import {Player} from '../Player';
import {Marchand} from '../Marchand';

export class ColoredLevel extends Phaser.Scene {
  private unMonde: Monde1;
  private aLevel = 1;
  private unPlayer: Player;
  private  unMarchand: Marchand;
  private key: any;

  constructor() {
    super({key: 'ColoredLevel'});
    this.aLevel = 3;
  }

  preload() {
    // TEXTURE MAP
    this.load.image('TileA2c', 'assets/images/mapTexture/TileA2.png');
    this.load.image('tileset01c', 'assets/images/mapTexture/tileset01.png');
    this.load.image('tux01c', 'assets/images/mapTexture/tux01.png');
    this.load.image('build_atlasc', 'assets/images/mapTexture/build_atlas.png');

    // MAP
    this.load.tilemapTiledJSON('level2', 'assets/images/map/CosmoNunki_Ville.json');

    // Player
    this.load.spritesheet('boy', 'assets/images/hero/hero.png', {frameWidth: 48, frameHeight: 72});
    this.load.image('bullet', 'assets/images/crab_bullet.png');
    this.load.image('reticle', 'assets/images/hero/viseur.png');

    this.load.image('blood', 'assets/images/blood.png');

    // Sounds
    this.load.audio('pew',  'assets/sounds/pew.mp3');
    this.load.audio('outch', 'assets/sounds/outch.mp3');
    this.load.audio('mort', 'assets/sounds/mort.mp3');

    // Vie
    this.load.image('lifeGreen', 'assets/images/lifeGreen.png');
    this.load.image('lifeRed', 'assets/images/lifeRed.png');

  }

  create() {
    // generation du monde avec et du joueur
    this.gererInput();
    this.unMonde = new Monde1(this);
    this.unPlayer = new Player(this, {name: 'player', key: 'boy', posX: 640, posY: 1940, pew: 'pew', bullet: 'bullet', life: 100, fireRate: 1000, vitesseB: 450, reticle: 'reticle', hit: 'outch', dead: 'mort'});
    this.gererCamera();
    this.creerAnimations();
    this.gererCollision();

  }

  update() {
    this.player.gererDeplacement();
    this.player.tirer();

  }


  gererInput() {
    this.key = this.input.keyboard.addKeys(
        {
          up: Phaser.Input.Keyboard.KeyCodes.Z,
          down: Phaser.Input.Keyboard.KeyCodes.S,
          left: Phaser.Input.Keyboard.KeyCodes.Q,
          right: Phaser.Input.Keyboard.KeyCodes.D,
          grab: Phaser.Input.Keyboard.KeyCodes.E
          // shift: Phaser.Input.Keyboard.KeyCodes.SHIFT
        });

  }
  // annimation de mort
  creerAnimations() {
    this.anims.create({
      key: 'destruction',
      frames: [
        {key: 'blood', frame: null},
        {key: 'blood', frame: null},
        {key: 'blood', frame: null}
      ],
      hideOnComplete: true,
      frameRate: 10,
      repeat: 0
    });
  }
  gererCamera() {
    this.cameras.main.startFollow(this.player.avatar);
    const bounds = this.monde.bounds;
    this.cameras.main.setBounds(bounds.x, bounds.y, bounds.w, bounds.h);
//    this.cameras.main.setZoom(0.5);
  }

  gererCollision() {
    // Ajout des collisions
    this.physics.add.collider(this.player.avatar, this.monde.calque1);
    this.physics.add.collider(this.player.avatar, this.monde.calque2);
    this.physics.add.collider(this.player.avatar, this.monde.calque3);
    this.physics.add.collider(this.player.avatar, this.monde.calque4);
    this.physics.add.collider(this.player.avatar, this.monde.calque5);
    this.physics.add.collider(this.player.avatar, this.monde.calque6);
    this.physics.add.collider(this.player.avatar, this.monde.calque7);
    this.physics.add.collider(this.player.avatar, this.monde.calque8);
    this.physics.add.collider(this.player.avatar, this.monde.calque9);
    this.physics.add.collider(this.player.avatar, this.monde.calque10);
    this.physics.add.collider(this.player.avatar, this.monde.calque11);
    this.physics.add.collider(this.player.avatar, this.monde.calque12);

  }

  get keys() {
    return this.key;
  }
  get player() {
    return this.unPlayer;
  }
  get monde() {
    return this.unMonde;
  }
  get level() {
    return this.aLevel;
  }


}
