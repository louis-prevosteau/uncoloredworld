import * as Phaser from 'phaser';

export class Video extends Phaser.Scene {
  constructor() {
    super({key: 'video'});
  }

  preload() {
    this.load.video('uncolored', 'assets/video/UncoloredWorld.mp4', 'loadeddata');
  }

  // @ts-ignore
  create() {
    const video = document.createElement('video');

    video.src = 'assets/video/UncoloredWorld.mp4';
    video.width = 800;
    video.height = 500;
    video.autoplay = true;

    const element = this.add.dom(400, 300, video);

    video.addEventListener('ended', (event) => {
      this.scene.start('UncoloredGame');
    });
  }

  update() {

  }

}
