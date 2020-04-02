import * as Phaser from 'phaser';

export class Victoire extends Phaser.Scene {

  constructor() {
    super({key: 'Victoire'});
  }

  preload() {
    this.load.image('victoire', 'assets/images/transition/felicitations.png');


  }

  create() {
    this.add.image(400, 300, 'victoire');
    this.time.addEvent({
      delay: 4500,
      callback: () => this.scene.start('ChargementColored'),
    });

  }

  update() {

  }

}
