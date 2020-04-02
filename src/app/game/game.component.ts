import {Component} from '@angular/core';
import * as Phaser from 'phaser';
import {UncoloredGame} from './level/UncoloredGame';
import {ColoredLevel} from './level/ColoredLevel';
import {Chargement} from './level/Chargement';
import {GameInstance} from './GameInterface';
import {Video} from './level/Video';
import {MapVerte} from './level/MapVerte';
import {ChargementColored} from './level/ChargementColored';
import {Victoire} from './level/Victoire';

@Component({
  selector: 'app-root',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']

})
export class GameComponent {
  initialize = false;

  game: GameInstance = {
    width: 800,
    height: 600,
    dom: {
      createContainer: true
    },
    type: Phaser.AUTO,
    scene:  [Video, MapVerte, UncoloredGame, Chargement, ColoredLevel, ChargementColored, Victoire],
    instance: null,
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
        gravity: {y: 0}
      }
    }
  };

  getInstance() {
    return this.game.instance;
  }

  initializeGame() {
    this.initialize = true;
  }

  loadGame() {
    // tslint:disable-next-line:max-line-length
    this.initialize = true; // avec le profil du joueur, charger sa partie en cours. JSP comment faire, faut faire avec la base de donnée comme au marathon avec les séries suivis et tt.
  }

}


