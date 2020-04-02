import {Monde} from './generationLevel/Monde';
import {UncoloredGame} from './level/UncoloredGame';
/*
* N'oubliez pas de rajouter les valeurs dans la BDD
*/
export class Acteur {
  private static acteurs: Acteur[] = [];

  private monde: Monde;
  protected game: UncoloredGame;
  protected sprite: any; // sprite du joueur/ennemi/marchand
  protected alive: boolean;
  protected life: number; // point de vie
  protected speed: number; // vitesse de déplacement
  protected barreRouge: Phaser.Physics.Arcade.Sprite; // barre de vie Rouge
  protected barreVerte: Phaser.Physics.Arcade.Sprite; // barre de vie verte
  protected shooting = false;
  protected nextFire = 0; // prochain tire autorisé (calculé en fonction du temps écoulé dans la scene)
  protected vitesseBullet: number; // Vitesse de la balle
  protected fireRate: number; // Délai de rechargement (temps entre les balles)
  protected aBullets: any;
  protected aCollisionBullets: any;
  protected  aCollisionSprite: any;
  protected aSoundFire: any; // Son de tire
  protected aSoundHit: any; // Son lorsque on touche un pnj
  protected aSoundDead: any; // Son de mort d'un pnj
  protected cible: { x: number, y: number };

  constructor(game: any, params: {name: string; key: string, posX: number, posY: number, pew: any, hit: any, dead: any, bullet: any, life: number, fireRate: number, vitesseB: number}) {
    this.game = game;

    this.alive = true;
    this.monde = this.game.monde;

    // recuparation des valeurs en parametre
    this.sprite = this.game.physics.add.sprite(params.posX, params.posY, params.key, 0);
    this.sprite.setCollideWorldBounds(false);
    this.life = params.life;
    this.speed = 125;
    this.fireRate = params.fireRate;
    this.vitesseBullet = params.vitesseB;
    this.sprite.name = params.name;
    this.aBullets = this.game.physics.add.group({defaultKey: params.bullet});
    this.aSoundFire = this.game.sound.add(params.pew);
    this.aSoundHit = this.game.sound.add(params.hit);
    this.aSoundDead = this.game.sound.add(params.dead);

    this.barreRouge = this.game.physics.add.sprite(this.sprite.x, this.sprite.y, 'lifeRed').setOrigin(0, -5);
    this.barreRouge.setPosition(this.barreRouge.x - this.barreRouge.width / 2, this.barreRouge.y);
    this.barreVerte = this.game.physics.add.sprite(this.sprite.x, this.sprite.y, 'lifeGreen').setOrigin(0, -5);
    this.barreVerte.setPosition(this.barreVerte.x - this.barreVerte.width / 2, this.barreVerte.y);

    Acteur.acteurs[params.name] = this; // ajout du nouvel acteur dans le tableau
  }
  // calcule de la distance entre deux acteur
  static distance(acteur1: Acteur, acteur2: Acteur) {
    return Acteur.distanceCoordonnees({x: acteur1.avatar.x, y: acteur1.avatar.y}, {x: acteur2.avatar.x, y: acteur2.avatar.y});
  }
  static distanceCoordonnees(c1: { x: number, y: number }, c2: { x: number, y: number }) {
    return Math.sqrt(Math.pow(c1.x - c2.x, 2) + Math.pow(c1.y - c2.y, 2));
  }

  takeDamage(cible, bullets) {
    const acteur = Acteur.acteurs[cible.name]; // Récupération de l'ennemi touché par la balle
    const player = Acteur.acteurs['player']; // Récupération du joueur pour l'attribution de point
    player.coin += 10; // Ajout de 10 point/coin au joueur à chaque fois que le joueur touche un ennemi
    console.log(player.coin);
    bullets.destroy();
    acteur.life -= 25;
    if (acteur.life  >= 10) {
      acteur.aSoundHit.play();
    }
    if (acteur.life <= 0) {
      acteur.aSoundDead.play();
      acteur.detruiteAvatar(acteur);
      acteur.mourir();
    }
    acteur.barreVerte.setScale(acteur.pv / 100, 1); // réduction de la barre de vie verte qui fait apparaître les dégats subi en rouge
  }

  // Dégat sur le joueur
  takeDamageP(cible, bullets) {
    // tu appel ton personne.statistique.score pour ajouter du score dans la bdd
    // Après tu ajoute dans les fonction en fonction de ta bdd
    const acteur = Acteur.acteurs['player'];
    bullets.destroy();
    acteur.life -= 25;
    if (acteur.life  >= 25) {
      acteur.aSoundHit.play();
    }
    if (acteur.life <= 0) {
      acteur.aSoundDead.play();
      acteur.detruiteAvatar(acteur);
      acteur.mourir();
    }
    acteur.barreVerte.setScale(acteur.pv / 100, 1);
  }
  powerupVitesse(cible, powerup) {
    powerup.destroy();
    const acteur = Acteur.acteurs['player'];
    acteur.speed = 300;
    console.log(acteur.speed);
    setTimeout( () => acteur.speed = 125, 5000);
  }
  powerupCadence(cible, powerup) {
    powerup.destroy();
    const acteur = Acteur.acteurs['player'];
    const x = acteur.fireRate;
    acteur.fireRate = 1;
    setTimeout( () => acteur.fireRate = x, 5000);
  }
  tirer() {
    if (this.isShooting && this.isAlive) {
      // Condition pour la régulation des tirs -> tempsActuel de la scene > au temps du tir précédent + fireRate
      if (this.game.time.now > this.nextFire) {
        this.nextFire = this.game.time.now + this.fireRate;
        const shoot = this.aBullets.get(this.sprite.x, this.sprite.y);
        this.game.physics.moveTo(shoot, this.cible.x, this.cible.y, this.vitesseBullet); // Direction de la balle
        this.aSoundFire.play();
        shoot.checkWorldBounds = true;
        shoot.outOfBoundsKill = true;
        // Destruction de la balle si elle touche rien -> pour ne pas surcharger et ralentire le jeu
        this.game.time.addEvent({
          delay: 2500,
          callback: () => shoot.destroy(),
        });
      }
    }
  }

  detruiteAvatar(acteur: Acteur) {
    // animation des taches de sang et destroy d'un acteur
    let explo = [];
    explo.push(acteur.game.physics.add.sprite(acteur.avatar.x, acteur.avatar.y, '').play('destruction'));
    this.game.time.delayedCall(200, () => {
      explo.push(acteur.game.physics.add.sprite(acteur.avatar.x - 20, acteur.avatar.y - 20, '').play('destruction').setScale(0.5));
      explo.push(acteur.game.physics.add.sprite(acteur.avatar.x + 20, acteur.avatar.y + 20, '').play('destruction').setScale(0.5));
    }, null, this);
    acteur.game.time.delayedCall(400, () => {
      explo.push(acteur.game.physics.add.sprite(acteur.avatar.x + 20, acteur.avatar.y - 20, '').play('destruction').setScale(0.8));
    }, null, this);
    acteur.game.time.delayedCall(600, () => {
      explo.push(acteur.game.physics.add.sprite(acteur.avatar.x, acteur.avatar.y, '').play('destruction').setScale(2));
    }, null, this);
    acteur.game.time.delayedCall(900, () => {
      acteur.barreRouge.destroy();
      acteur.barreVerte.destroy();
      acteur.avatar.destroy();
      for (let i = 0; i < explo.length; i++) {
        explo[i].destroy();
      }
    }, null, this);
  }

  set collisionBullets(collision: any) {
    this.aCollisionBullets = collision;
  }
  set collisionSprite(collision: any) {
    this.aCollisionSprite = collision;
  }

  get avatar() {
    return this.sprite;
  }
  get isShooting() {
    return this.shooting;
  }
  get bullets() {
    return this.aBullets;
  }
  get pv() {
    return this.life;
  }
  get isAlive() {
    return this.alive;
  }
  mourir() {
    this.alive = false;
  }
}
