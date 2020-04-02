import * as Phaser from 'phaser';

export class Chargement extends Phaser.Scene {

  constructor() {
    super({key: 'Chargement'});
  }

  preload() {
    /*
    * Chargement fictif pour éviter le changement brutal entre les scènes
    */
    this.load.image('chargement', 'assets/images/transition/chargementgris.png');
  }

  create() {
    this.add.image(400, 300, 'chargement');
    // delay avant de passer à la scène suivante
    this.time.addEvent({
      delay: 2500,
      callback: () => this.scene.start('MapVerte'),
    });

  }

  update() {

  }

}
