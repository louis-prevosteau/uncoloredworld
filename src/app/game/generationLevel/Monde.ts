import {UncoloredGame} from '../level/UncoloredGame';
import StaticTilemapLayer = Phaser.Tilemaps.StaticTilemapLayer;

export class Monde {
  private game: UncoloredGame;
  private tilemap;
  private tileset01;
  private buildatlas;
  private tux01;

  private HerbeCStileset01: StaticTilemapLayer;
  private CheminCStileset01: StaticTilemapLayer;
  private PoseVaisseauCStileset01: StaticTilemapLayer;
  private BatimentsCSbuildatlas: StaticTilemapLayer;
  private VaisseauxCStux01: StaticTilemapLayer;
  private ChemineeCSbuildatlas: StaticTilemapLayer;
  private DecoCStileset01: StaticTilemapLayer;
  private Deco2CStileset01: StaticTilemapLayer;
  private BassinCStileset01: StaticTilemapLayer;
  private PortesCSbuildatlas: StaticTilemapLayer;
  private EscaliersDePorteCSbuildatlas: StaticTilemapLayer;
  private ToitsCSbuildatlas: StaticTilemapLayer;

  constructor(game: any) {
    this.game = game;
    // Texture MAP
    this.tilemap = this.game.make.tilemap({key: 'level1'});
    this.tileset01 = this.tilemap.addTilesetImage('tileset01', 'tileset01');
    this.buildatlas = this.tilemap.addTilesetImage('build_atlas', 'build_atlas');
    this.tux01 = this.tilemap.addTilesetImage('tux01', 'tux01');

    // Calque
    this.HerbeCStileset01 = this.tilemap.createStaticLayer('Herbe-CStileset01', this.tileset01, 0, 0);
    this.CheminCStileset01 = this.tilemap.createStaticLayer('Chemin-CStileset01', this.tileset01, 0, 0);
    this.PoseVaisseauCStileset01 = this.tilemap.createStaticLayer('PoseVaisseauCS-tileset01', this.tileset01, 0, 0);
    this.VaisseauxCStux01 = this.tilemap.createStaticLayer('Vaisseaux-CStux01', this.tux01, 0, 0);
    this.DecoCStileset01 = this.tilemap.createStaticLayer('Deco-CStileset01', this.tileset01, 0, 0);
    this.Deco2CStileset01 = this.tilemap.createStaticLayer('Deco2-CStileset01', this.tileset01, 0, 0);
    this.BassinCStileset01 = this.tilemap.createStaticLayer('Bassin-CStileset01', this.tileset01, 0, 0);
    this.BatimentsCSbuildatlas = this.tilemap.createStaticLayer('Batiments-CSbuild_atlas', this.buildatlas, 0, 0);
    this.PortesCSbuildatlas = this.tilemap.createStaticLayer('Portes-CSbuild_atlas', this.buildatlas, 0, 0);
    this.EscaliersDePorteCSbuildatlas = this.tilemap.createStaticLayer('EscaliersDePorte-CSbuild_atlas', this.buildatlas, 0, 0);
    this.ToitsCSbuildatlas = this.tilemap.createStaticLayer('Toits-CSbuild_atlas', this.buildatlas, 0, 0);
    this.ChemineeCSbuildatlas = this.tilemap.createStaticLayer('Cheminee-CSbuild_atlas', this.buildatlas, 0, 0);
    // MAP2

    // génération collision
    this.HerbeCStileset01.setCollisionByProperty({collides: true});
    this.CheminCStileset01.setCollisionByProperty({collides: true});
    this.PoseVaisseauCStileset01.setCollisionByProperty({collides: true});
    this.VaisseauxCStux01.setCollisionByProperty({collides: true});
    this.DecoCStileset01.setCollisionByProperty({collides: true});
    this.Deco2CStileset01.setCollisionByProperty({collides: true});
    this.BassinCStileset01.setCollisionByProperty({collides: true});
    this.BatimentsCSbuildatlas.setCollisionByProperty({collides: true});
    this.PortesCSbuildatlas.setCollisionByProperty({collides: true});
    this.EscaliersDePorteCSbuildatlas.setCollisionByProperty({collides: true});
    this.ToitsCSbuildatlas.setCollisionByProperty({collides: true});
    this.ChemineeCSbuildatlas.setCollisionByProperty({collides: true});



    // this.game.physics.world.setBounds(0, 0, this.tilemap.widthInPixels, this.tilemap.heightInPixels);


  }

  get bounds() {
    return {x: 0, y: 0, w: this.tilemap.widthInPixels, h: this.tilemap.heightInPixels};
  }
  get calque1() {
    return this.HerbeCStileset01;
  }
  get calque2() {
    return this.CheminCStileset01;
  }
  get calque3() {
    return this.PoseVaisseauCStileset01;
  }
  get calque4() {
    return this.VaisseauxCStux01;
  }
  get calque5() {
    return this.DecoCStileset01;
  }
  get calque6() {
    return this.Deco2CStileset01;
  }
  get calque7() {
    return this.BassinCStileset01;
  }
  get calque8() {
    return this.BatimentsCSbuildatlas;
  }
  get calque9() {
    return this.PortesCSbuildatlas;
  }
  get calque10() {
    return this.EscaliersDePorteCSbuildatlas;
  }
  get calque11() {
    return this.ToitsCSbuildatlas;
  }
  get calque12() {
    return this.ChemineeCSbuildatlas;
  }
  get sizemap() {
    return this.tilemap;
  }
}
