import * as Phaser from 'phaser';

export class ChargementColored extends Phaser.Scene {

  constructor() {
    super({key: 'ChargementColored'});
  }

  preload() {
    /*
    * Chargement fictif pour éviter le changement brutal entre les scènes
    */
    this.load.image('chargement', 'assets/images/transition/chargement.png');


  }

  create() {
    this.add.image(400, 300, 'chargement');
    this.time.addEvent({
      delay: 2500,
      callback: () => this.scene.start('ColoredLevel'),
    });

  }

  update() {

  }

}
