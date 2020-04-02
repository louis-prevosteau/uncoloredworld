import * as Phaser from 'phaser';
import {Player} from '../Player';
import {Ennemi} from '../Ennemi';
import {Powerup} from '../Powerup';
import {MondeVert} from '../generationLevel/MondeVert';

export class MapVerte extends Phaser.Scene {
  private unMonde: MondeVert;
  private aLevel = 1;
  private unPlayer: Player;
  private unEnnemi: Ennemi;
  private ennemis: Ennemi[] = [];   // posX posY et type d'attaque
  private powerups: Powerup[] = [];
  private key: any;

  constructor() {
    super({key: 'MapVerte'});
    this.aLevel = 2;
  }

  preload() {
    // MAP
    this.load.image('tileset01v', 'assets/images/mapTexture/tileset01.png');
    this.load.image('RPGNatureTilesetv', 'assets/images/mapTexture/RPG_Nature_Tileset.png');
    this.load.tilemapTiledJSON('MapVerte', 'assets/images/map/mondeVert.json');
    // Player
    this.load.spritesheet('boy', 'assets/images/hero/hero.png', {frameWidth: 48, frameHeight: 72});
    this.load.image('bullet', 'assets/images/crab_bullet.png');
    this.load.image('reticle', 'assets/images/hero/viseur.png');
    // Ennemies
    this.load.spritesheet('ennemi1', 'assets/images/ennemies/monster-spider-recolors.png', {frameWidth: 80, frameHeight: 64});
    this.load.spritesheet('boss', 'assets/images/ennemies/booss.png', {frameWidth: 99, frameHeight: 96});

    // All
    this.load.image('blood', 'assets/images/blood.png');
    // Sounds
    this.load.audio('pew',  'assets/sounds/pew.mp3');
    this.load.audio('outch', 'assets/sounds/outch.mp3');
    this.load.audio('mort', 'assets/sounds/mort.mp3');
    this.load.audio('degatsennemis',  'assets/sounds/degatsennemis.mp3');
    this.load.audio('mortBoss', 'assets/sounds/mortBoss.mp3');
    this.load.audio('mortennemi', 'assets/sounds/Mortennemi.mp3');
    this.load.audio('tirE', 'assets/sounds/tirE.mp3');
    // PowerUp
    this.load.image('invincible', 'assets/images/powerups/86extreme.png');
    this.load.image('meth', 'assets/images/powerups/meth.png');
    this.load.image('sprite', 'assets/images/powerups/sprite.png');
    this.load.image('ventoline', 'assets/images/powerups/ventoline.png');
    this.load.image('zder', 'assets/images/powerups/zder.png');
    // Barre de vie
    this.load.image('lifeGreen', 'assets/images/lifeGreen.png');
    this.load.image('lifeRed', 'assets/images/lifeRed.png');
    this.load.image('mort', 'assets/images/transition/mortimage.png');

  }

  create() {
    this.gererInput();
    this.unMonde = new MondeVert(this);
    this.creerAnimations();

    this.creerEnnemis();
    this.unPlayer = new Player(this, {name: 'player', key: 'boy', posX: 300, posY: 700, pew: 'pew', bullet: 'bullet', life: 200, fireRate: 1000, vitesseB: 450, reticle: 'reticle', hit: 'outch', dead: 'mort'});
    this.gererCamera();
    this.creerPowerup();

    // this.creerEnnemis();
    // this.gererCollision();
    // this.animationHero();
  }

  update() {
    this.player.gererDeplacement();
    this.player.tirer();
    this.gererCollision();
    for (let i = 0; i < 4; i++) {
      // ajoute les deplacements et la fonction tir à chaque ennemie
      this.ennemis[i].gererDeplacement();
      this.ennemis[i].tirer();

    }
    this.gererCollisionBalles();
    this.gererCollisionPowerupsVitesse();
    this.gererCollisionPowerupsCadence();

    this.conditionDeFin();

  }

  get player() {
    return this.unPlayer;
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
  gererCamera() {
    this.cameras.main.startFollow(this.player.avatar);
    const bounds = this.monde.bounds;
    this.cameras.main.setBounds(bounds.x, bounds.y, bounds.w, bounds.h);
//    this.cameras.main.setZoom(0.5);
  }

  gererCollision() {
    this.physics.add.collider(this.player.avatar, this.monde.calque1);
    this.physics.add.collider(this.player.avatar, this.monde.calque2);
    this.physics.add.collider(this.player.avatar, this.monde.calque3);
    this.physics.add.collider(this.player.avatar, this.monde.calque4);
  }
  // création des ennemis
  creerEnnemis() {
    const e = 'ennemi1';
    const boss = 'boss';

    const posEnnemis = [[1000, 1000, 1], [2240, 1184, 2], [2240, 1184, 3], [2368, 3200, 4]];

    for (let i = 0; i < 3; i++) {
      this.ennemis[i] = new Ennemi(this, {name: 'ennemi' + i, key: e, posX: posEnnemis[i][0], posY: posEnnemis[i][1], pew: 'tirE', hit: 'degatsennemis', bullet: 'bullet', life: 100, fireRate: 1000, vitesseB: 400, posFinX: 100, posFinY: 100, typeAtt: posEnnemis[i][2], dead: 'mortennemi'});
    }
    this.ennemis[3] = new Ennemi(this, {name: 'ennemi' + 3, key: boss, posX: posEnnemis[3][0], posY: posEnnemis[3][1], pew: 'tirE', hit: 'mortBoss', bullet: 'bullet', life: 200, fireRate: 750, vitesseB: 300, posFinX: 2368, posFinY: 3100, typeAtt: posEnnemis[3][2], dead: 'mortBoss'});
  }

  creerPowerup() {
    const posPowerups = [[400, 800, 3], [2368, 3000, 4]]
    for (let i = 0; i < 2; i++) {
      this.powerups[i] = new Powerup(this, {type: posPowerups[i][2], posX: posPowerups[i][0], posY: posPowerups[i][1]});

    }
  }
  gererCollisionBalles() {
    for (let i = 0; i < 4; i++) {
      // Cible touche | par quel balle | on appele la fonction takeDammage sur la cible touché
      this.ennemis[i].collisionBullets = this.physics.add.overlap(this.ennemis[i].avatar, this.player.bullets, this.ennemis[i].takeDamage);
      this.player.collisionBullets = this.physics.add.overlap(this.player.avatar, this.ennemis[i].bullets, this.unPlayer.takeDamageP);
    }
  }
  gererCollisionPowerupsCadence() {
    this.player.collisionSprite = this.physics.add.overlap(this.player.avatar, this.powerups[0].avatar, this.player.powerupCadence);
  }
  gererCollisionPowerupsVitesse() {
    this.player.collisionSprite = this.physics.add.overlap(this.player.avatar, this.powerups[1].avatar, this.player.powerupVitesse);
  }
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

  conditionDeFin() {
    // Mort
    if (!this.player.isAlive) {
      this.add.image(this.player.avatar.x, this.player.avatar.y, 'mort');
      this.time.addEvent({
        delay: 3000,
        callback: () => this.scene.restart()
      });
    }
    // Victoire
    if (! this.ennemis[3].isAlive) {
      this.time.addEvent({
        delay: 2500,
        callback: () => this.scene.start('Victoire'),
      });
    }
  }

  get keys() {
    return this.key;
  }
  get monde() {
    return this.unMonde;
  }
  get level() {
    return this.aLevel;
  }


}
