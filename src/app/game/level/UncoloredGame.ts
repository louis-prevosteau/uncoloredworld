import * as Phaser from 'phaser';
import {Monde} from '../generationLevel/Monde';
import {Player} from '../Player';
import {Marchand} from '../Marchand';

export class UncoloredGame extends Phaser.Scene {
  private unMonde: Monde;
  private aLevel = 1;
  private unPlayer: Player;
  private  unMarchand: Marchand;
  private key: any;

  constructor() {
    super({key: 'UncoloredGame'});
    this.aLevel = 1;
  }

  preload() {
    // MAP
    this.load.image('tileset01', 'assets/images/mapTexture/gris/tileset01.png');
    this.load.image('tux01', 'assets/images/mapTexture/gris/tux01.png');
    this.load.image('build_atlas', 'assets/images/mapTexture/gris/build_atlas.png');
    this.load.tilemapTiledJSON('level1', 'assets/images/map/CosmoNunki_Ville.json');

    // Player
    this.load.spritesheet('boy', 'assets/images/hero/hero.png', {frameWidth: 48, frameHeight: 72});
    this.load.image('bullet', 'assets/images/crab_bullet.png');
    this.load.image('reticle', 'assets/images/hero/viseur.png');
    // Sounds
    this.load.audio('pew',  'assets/sounds/pew.mp3');
    this.load.audio('outch',  'assets/sounds/outch.mp3');
    this.load.audio('mort',  'assets/sounds/mort.mp3');

    // vie
    this.load.image('lifeGreen', 'assets/images/lifeGreen.png');
    this.load.image('lifeRed', 'assets/images/lifeRed.png');

  }

  create() {
    this.gererInput();
    this.unMonde = new Monde(this);
    this.unPlayer = new Player(this, {name: 'player', key: 'boy', posX: 300, posY: 700, pew: 'pew', bullet: 'bullet', life: 100, fireRate: 1000, vitesseB: 450, reticle: 'reticle', hit: 'outch', dead: 'mort'});
    this.gererCamera();
    this.gererCollision();
  }

  update() {
    this.player.gererDeplacement();
    this.player.tirer();
    this.finLevel1();
  }


  gererInput() {
    // Gestion de pression des touches
    this.key = this.input.keyboard.addKeys(
        {
          up: Phaser.Input.Keyboard.KeyCodes.Z,
          down: Phaser.Input.Keyboard.KeyCodes.S,
          left: Phaser.Input.Keyboard.KeyCodes.Q,
          right: Phaser.Input.Keyboard.KeyCodes.D,
          grab: Phaser.Input.Keyboard.KeyCodes.E
        });

  }
  // Follow le joueur
  gererCamera() {
    this.cameras.main.startFollow(this.player.avatar);
    const bounds = this.monde.bounds;
    this.cameras.main.setBounds(bounds.x, bounds.y, bounds.w, bounds.h);
  }
  // ajout des collisions
  gererCollision() {
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
  }
  finLevel1() {
    // Condition permettant de passer au niveau suivant
    if ((this.player.avatar.x > 600 && this.player.avatar.x < 660) && this.player.avatar.y > 1945) {
      this.scene.start('Chargement');
    }
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
  get marchand() {
    return this.unMarchand;
  }
  get level() {
    return this.aLevel;
  }


}
