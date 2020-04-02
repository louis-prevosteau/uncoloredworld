import Phaser from 'phaser';

export interface GameInstance extends Phaser.Types.Core.GameConfig {
  instance: Phaser.Game;

}

