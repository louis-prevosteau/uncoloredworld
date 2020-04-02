import {Acteur} from './Acteur';

export class Ennemi extends Acteur {
  private range: number;
  private aller = true;
  private posDebut: { x: number, y: number };
  private posFin: { x: number, y: number };
  private typeAttack: number; // Corps à corps | moyenne porté | sniper | boss

  constructor(game: any, params: { name: string, key: string, posX: number, posY: number, pew: any, hit: any, bullet: any, life: number, fireRate: number, vitesseB: number, posFinX: number, posFinY: number, typeAtt: number, dead: any }) {
    super(game, params);
    this.range = 500; // Distance de vue d'un ennemi
    this.posDebut = {x: params.posX, y: params.posY};
    this.posFin = {x: params.posFinX, y: params.posFinY};
    this.typeAttack = params.typeAtt;
  }

  gererDeplacement() {
    // this.gererMouvement();
    setTimeout(() => { this.gererMouvement(); }, 3000); // Pour ne pas se faire attaquer directe :/
    // this.gererMouvement()
    this.cible = {x: this.game.player.avatar.x, y: this.game.player.avatar.y};

  }
  gererMouvement() {
    switch (this.typeAttack) {
      case 1:
        // console.log('corps à corps');
        /*
        ennemi si dirige sur les coordonnées du joueur
        On fait des animations que pour les boss les gars car ça surcharge la page et sa lag en MAUDIT
        */
        if (this.alive) {
          if (this.aller && Acteur.distanceCoordonnees({x: this.game.player.avatar.x, y: this.game.player.avatar.y}, this.avatar) > 50) {
            this.game.physics.moveTo(this.avatar, this.game.player.avatar.x, this.game.player.avatar.y, 100);
          } else {
            if (this.aller) {
              this.aller = false;
            }
          }
          this.gererTir();
        }
        break;
      case 2:
        // console.log('Tir à distance');
        // reste à une certaine distance choisis du joueur
        if (this.alive) {
          if (this.aller && Acteur.distanceCoordonnees({x: this.game.player.avatar.x, y: this.game.player.avatar.y}, this.avatar) > 50) {
            this.game.physics.moveTo(this.avatar, this.game.player.avatar.x - 150, this.game.player.avatar.y - 150, 150);
          } else {
            if (this.aller) {
              this.aller = false;
            }
          }
          this.gererTir();
        }
        break;
      case 3:
        // console.log('Sniper'); -> sniper ne se déplace pas
        this.gererTir();
        break;
      case 4:
        // création des animations du boss
        this.game.anims.create({
          key: 'rightboss',
          repeat: -1,
          frameRate: 6,
          frames: this.game.anims.generateFrameNames('boss', {start: 6, end: 8})
        });
        this.game.anims.create({
          key: 'leftboss',
          repeat: -1,
          frameRate: 6,
          frames: this.game.anims.generateFrameNames('boss', {start: 3, end: 5})
        });
        this.game.anims.create({
          key: 'top',
          repeat: -1,
          frameRate: 6,
          frames: this.game.anims.generateFrameNames('boss', {start: 9, end: 10})
        });
        if (this.alive) {
          if (this.aller && Acteur.distanceCoordonnees({x: this.game.player.avatar.x, y: this.game.player.avatar.y}, this.avatar) < 2000) {
            console.log('bordeeeeel');
            if ( this.game.player.avatar.x > this.avatar.x) {
              this.sprite.anims.play('rightboss', true);
            } else {
              this.sprite.anims.play('leftboss', true);
            }
            this.game.physics.moveTo(this.avatar, this.game.player.avatar.x, this.game.player.avatar.y, 25);
          } else {
            if (this.aller) {
              this.aller = false;
            }
          }
          this.gererTir();
        }
        break;
    }
    this.barreRouge.x = this.avatar.x - this.barreRouge.width / 2;
    this.barreRouge.y = this.avatar.y;
    this.barreVerte.x = this.avatar.x - this.barreVerte.width / 2;
    this.barreVerte.y = this.avatar.y;

  }

  gererTir() {
    if (this.alive && this.life <= 0) {
      this.alive = false;
    }
    if (this.game.player.isAlive && this.alive && Ennemi.distance(this.game.player, this) < this.range) {
      // console.log('shooting true');
      this.shooting = true;
    } else {
      this.shooting = false;
    }
  }

}
