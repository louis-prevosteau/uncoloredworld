import {Player} from './Player';
import {UncoloredGame} from './level/UncoloredGame';

export class Powerup {
  protected game: UncoloredGame;
  protected sprite: Phaser.Physics.Arcade.Image;
  protected type: number;
  protected access = true;
  protected acollisionPowerup: any;

  constructor(game: any, params: { type: number, posX: number, posY: number }) {
    this.game = game;
    this.type = params.type;
    // creation du sprite en fonction du type
    switch (this.type) {
      case 1:
        this.sprite = this.game.physics.add.image(params.posX, params.posY, 'invincible');
        this.sprite.setScale(0.08, 0.08);
        break;
      case 2:
        this.sprite = this.game.physics.add.image(params.posX, params.posY, 'meth');
        this.sprite.setScale(0.08, 0.08);
        break;
      case 3:
        this.sprite = this.game.physics.add.image(params.posX, params.posY, 'sprite');
        this.sprite.setScale(0.08, 0.08);
        break;
      case 4:
        this.sprite = this.game.physics.add.image(params.posX, params.posY, 'ventoline');
        this.sprite.setScale(0.08, 0.08);
        break;
      case 5:
        this.sprite = this.game.physics.add.image(params.posX, params.posY, 'zder');
        this.sprite.setScale(0.08, 0.08);
        break;


    }

  }
  get posPowerup() {
    return this.sprite;
  }
  get utilisable() {
    return this.access;
  }
  utiliser() {
    this.access = false;
  }
  get avatar() {
    return this.sprite;
  }
  get typeP() {
    return this.type;
  }
}
