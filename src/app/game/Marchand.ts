import {Acteur} from './Acteur';
import {UncoloredGame} from './level/UncoloredGame';
import {Player} from './Player';

export class Marchand extends Acteur {
  protected name: string;
  constructor(game: any, params: { name: string; key: string; posX: number; posY: number; pew: any; hit: any, bullet: any, dead: any, life: number, fireRate: number, vitesseB: number}) {
    super(game, params);
  }

}
