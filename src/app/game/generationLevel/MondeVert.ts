import {UncoloredGame} from '../level/UncoloredGame';
import StaticTilemapLayer = Phaser.Tilemaps.StaticTilemapLayer;
import {MapVerte} from '../level/MapVerte';

export class MondeVert {
  private game: MapVerte;
  private tilemap;
  private tileset01v;
  private RPGNatureTilesetv;

  private Arbrestileset01: StaticTilemapLayer;
  private Pierrestileset01: StaticTilemapLayer;
  private CheminArenetileset01: StaticTilemapLayer;
  private HerbeRPGNatureTileset: StaticTilemapLayer;

  constructor(game: any) {
    this.game = game;
    // Texture MAP
    this.tilemap = this.game.make.tilemap({key: 'MapVerte'});
    this.tileset01v = this.tilemap.addTilesetImage('tileset01', 'tileset01v');
    this.RPGNatureTilesetv = this.tilemap.addTilesetImage('RPG_Nature_Tileset', 'RPGNatureTilesetv');

    // Calque
    this.HerbeRPGNatureTileset = this.tilemap.createStaticLayer('Herbe', this.RPGNatureTilesetv, 0, 0);
    this.Arbrestileset01 = this.tilemap.createStaticLayer('Arbres-tileset01', this.tileset01v, 0, 0);
    this.Pierrestileset01 = this.tilemap.createStaticLayer('Pierres-tileset01', this.tileset01v, 0, 0);
    this.CheminArenetileset01 = this.tilemap.createStaticLayer('Chemin+Arene-tileset01', this.tileset01v, 0, 0);
    // collision
    this.HerbeRPGNatureTileset.setCollisionByProperty({collides: true});
    this.Arbrestileset01.setCollisionByProperty({collides: true});
    this.Pierrestileset01.setCollisionByProperty({collides: true});
    this.CheminArenetileset01.setCollisionByProperty({collides: true});

    this.game.physics.world.setBounds(0, 0, this.tilemap.widthInPixels, this.tilemap.heightInPixels);


  }

  get bounds() {
    return {x: 0, y: 0, w: this.tilemap.widthInPixels, h: this.tilemap.heightInPixels};
  }
  get calque1() {
    return this.HerbeRPGNatureTileset;
  }
  get calque2() {
    return this.Arbrestileset01;
  }
  get calque3() {
    return this.Pierrestileset01;
  }
  get calque4() {
    return this.CheminArenetileset01;
  }
  get sizemap() {
    return this.tilemap;
  }
}
