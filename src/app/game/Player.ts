import {Acteur} from './Acteur';
export class Player extends Acteur {
  protected reticle: Phaser.Physics.Arcade.Image; // reticule de visée
  private distX: any;
  private distY: any;
  protected cible: { x: number, y: number };
  protected coin: number; // Argent qui lui permet d'acheter des améliorations

  constructor(game: any, params: { name: string; key: string; posX: number; posY: number; pew: any; bullet: string; life: number; fireRate: number; vitesseB: number; reticle: string, hit: any, dead: any }) {
    super(game, params);

    this.aBullets = this.game.physics.add.group({defaultKey: params.bullet});
    this.reticle = this.game.physics.add.image(params.posX + 300, params.posY + 300, params.reticle);
    this.reticle.setScale(0.25, 0.25);
    this.reticle.setCollideWorldBounds(false);
    this.coin = 0;

    this.game.input.on('pointerdown', function() {
      this.game.input.mouse.requestPointerLock(); // Permet de blocker le curseur dans la fenêtre du jeu -> échap pour sortir
      this.shooting = true; // gestion du click pour les tirs
    }, this);

    this.game.input.on('pointermove', function(pointer) {
      if (this.game.input.mouse.locked) {
        this.reticle.x += pointer.movementX; // Le viseur prend la position de la souris dans la scene
        this.reticle.y += pointer.movementY;
      }
    }, this);

    this.game.input.on('pointerup', function() {
      this.shooting = false; // Quand le clic est relaché
    }, this);
  }

  gererDeplacement() {
    if (this.isAlive) {
      this.gererMouvement();
      this.reticuleViseur();
      // this.echanger();
      // this.ventoline();
      // this.zder();
      // this.invincible();
      // this.meth(); NE MARCHE PAS
      // this.sprite(); PAS IMPLEMENTE
      // PB : quand 2 methodes sont appelées sur 2 powerups diff, ne marche que sur le premier ???
    }
  }
  gererMouvement() {
    this.sprite.setVelocity(0, 0);
    // création annimation de déplacement de notre joueur
    this.game.anims.create({
      key: 'down',
      repeat: -1,
      frameRate: 6,
      frames: this.game.anims.generateFrameNames('boy', {start: 0, end: 2})
    });
    this.game.anims.create({
      key: 'top',
      repeat: -1,
      frameRate: 6,
      frames: this.game.anims.generateFrameNames('boy', {start: 36, end: 38})
    });
    this.game.anims.create({
      key: 'right',
      repeat: -1,
      frameRate: 6,
      frames: this.game.anims.generateFrameNames('boy', {start: 24, end: 26})
    });
    this.game.anims.create({
      key: 'left',
      repeat: -1,
      frameRate: 6,
      frames: this.game.anims.generateFrameNames('boy', {start: 12, end: 14})
    });

    // Mouvement diagonal droite
    if (this.game.keys.right.isDown && this.game.keys.up.isDown) {
      this.sprite.anims.play('right', true); // lancement de l'animation
      this.sprite.setVelocity(this.speed, -this.speed); // Mouvement du sprite

    } else if (this.game.keys.left.isDown && this.game.keys.up.isDown) {
      this.sprite.anims.play('left', true);

      this.sprite.setVelocity(-this.speed, -this.speed);

    } else if (this.game.keys.right.isDown && this.game.keys.down.isDown) {
      this.sprite.anims.play('right', true);

      this.sprite.setVelocity(this.speed, this.speed);

    } else if (this.game.keys.left.isDown && this.game.keys.down.isDown) {
      this.sprite.anims.play('left', true);
      this.sprite.setVelocity(-this.speed, this.speed);

    } else {
      // Mouvement 'simple'
      if (this.game.keys.up.isDown) {
        this.sprite.anims.play('top', true);
        this.sprite.setVelocity(0, -this.speed);

      }
      if (this.game.keys.down.isDown) {
        this.sprite.anims.play('down', true);
        this.sprite.setVelocity(0, this.speed);

      }
      if (this.game.keys.left.isDown) {
        this.sprite.anims.play('left', true);
        this.sprite.setVelocity(-this.speed, 0);
        // this.gun.setVelocity(-this.speed, 0);

      }
      if (this.game.keys.right.isDown) {
        this.sprite.anims.play('right', true);
        this.sprite.setVelocity(this.speed, 0);
        // this.gun.setVelocity(this.speed, 0);

      }
      if (this.game.keys.grab.isDown) {
        // à implementer -> permet l'échange avec le marchand
      }
    }
    if (!this.game.keys.right.isDown && !this.game.keys.left.isDown && !this.game.keys.up.isDown && !this.game.keys.down.isDown) {
      this.sprite.anims.stop(); // stop l'annimation quand aucune touche de déplacement et pressé
    }

    this.barreRouge.x = this.sprite.x - this.barreRouge.width / 2;
    this.barreRouge.y = this.sprite.y;
    this.barreVerte.x = this.sprite.x - this.barreVerte.width / 2;
    this.barreVerte.y = this.sprite.y;
    // this.afficherCoin();

  }
  afficherCoin() {
    const policeTitre = {
      fontSize: '52px',
      color: '#FFFFFF',
      fontFamily: 'Montserrat'
    };
    this.game.add.text(200, 100,
        'COIN : ' + this.coin, policeTitre);
  }

  /*echanger() {
    if (this.game.level === 1) {
      if (((this.game.player.avatar.x <= this.game.marchand.avatar.x + 100 || this.game.player.avatar.x <= this.game.marchand.avatar.x - 100) && (this.game.player.avatar.x <= this.game.marchand.avatar.x + 100 || this.game.player.avatar.y <= this.game.marchand.avatar.y - 100)) && this.game.marchand.isAlive) {
        if (this.game.keys.grab.isDown) {
          // this.aBullets = this.game.physics.add.group({defaultKey: 'gun'});
    }
      }
    }
  }*/
  /* invincible() {
    if ((this.game.player.avatar.x >= this.game.powerup.posPowerup.x  && this.game.player.avatar.x <= this.game.powerup.posPowerup.x + 10) && this.game.powerup.utilisable === true) {
      this.life = 1000000000;
      this.game.powerup.utiliser();
      this.game.powerup.posPowerup.destroy();
      setTimeout( () => this.life = 100, 10000);
    }
  }
  meth() {
    if ((this.game.player.avatar.x >= this.game.powerup.posPowerup.x  && this.game.player.avatar.x <= this.game.powerup.posPowerup.x + 10) && this.game.powerup.utilisable === true) {
      this.gererMouvementMeth();
      this.game.powerup.utiliser();
      this.game.powerup.posPowerup.destroy();
      setTimeout( () => this.gererMouvement(), 5000);
    }
  }
  gererMouvementMeth() {
    this.sprite.setVelocity(0, 0);
    this.gun.setVelocity(0, 0);
    if (this.game.keys.right.isDown && this.game.keys.up.isDown) {
      console.log('D press and Z');
      this.sprite.setVelocity(-this.speed, this.speed);
      this.gun.setVelocity(-this.speed, this.speed);


    } else if (this.game.keys.left.isDown && this.game.keys.up.isDown) {
      console.log('Q press and Z');
      this.sprite.setVelocity(this.speed, this.speed);
      this.gun.setVelocity(this.speed, this.speed);

    } else if (this.game.keys.right.isDown && this.game.keys.down.isDown) {
      console.log('D press and S');
      this.sprite.setVelocity(-this.speed, -this.speed);
      this.gun.setVelocity(-this.speed, -this.speed);


    } else if (this.game.keys.left.isDown && this.game.keys.down.isDown) {
      console.log('Q press and S');
      this.sprite.setVelocity(this.speed, -this.speed);
      this.gun.setVelocity(this.speed, -this.speed);

    } else {
      if (this.game.keys.up.isDown) {
        console.log('Z press');
        this.sprite.setVelocity(0, this.speed);
        this.gun.setVelocity(0, this.speed);

      }
      if (this.game.keys.down.isDown) {
        console.log('S press');
        this.sprite.setVelocity(0, -this.speed);
        this.gun.setVelocity(0, -this.speed);
      }
      if (this.game.keys.left.isDown) {
        console.log('Q press');
        this.sprite.setVelocity(this.speed, 0);
        this.gun.setVelocity(this.speed, 0);
      }
      if (this.game.keys.right.isDown) {
        console.log('D press');
        this.sprite.setVelocity(-this.speed, 0);
        this.gun.setVelocity(-this.speed, 0);
      }
      if (this.game.keys.grab.isDown) {
        console.log('E press');
      }
    }
  } */

  reticuleViseur() {
    // Permet un réticule de suivre le joueur, et de resté tjrs à une porté max du joueur
    this.distX = this.reticle.x - this.sprite.x; // Distance du réticule en fonction du joueur
    this.distY = this.reticle.y - this.sprite.y;
    if (this.distX > 250) {
      this.reticle.x = this.sprite.x + 250;
    } else if (this.distX < -250) {
      this.reticle.x = this.sprite.x - 250;
    }
    if (this.distY > 250) {
      this.reticle.y = this.sprite.y + 250;
    } else if (this.distY < -250) {
      this.reticle.y = this.sprite.y - 250;
    }
    this.reticle.body.velocity.x = this.sprite.body.velocity.x;
    this.reticle.body.velocity.y = this.sprite.body.velocity.y;

  }
  /*ventoline() {
     if ((this.game.player.avatar.x >= this.game.powerup.posPowerup.x  && this.game.player.avatar.x <= this.game.powerup.posPowerup.x + 10) && this.game.powerup.utilisable === true) {
       this.speed = 400;
       this.game.powerup.utiliser();
       this.game.powerup.posPowerup.destroy();
       setTimeout( () => this.speed = 125, 5000);
     }
  }
  zder() {
    if ((this.game.player.avatar.x >= this.game.powerup.posPowerup.x  && this.game.player.avatar.x <= this.game.powerup.posPowerup.x + 10) && this.game.powerup.utilisable === true) {
      this.speed = 25;
      this.game.powerup.utiliser();
      this.game.powerup.posPowerup.destroy();
      setTimeout( () => this.speed = 125, 5000);
    }
  }*/

  /*
  Redéfiniton de la fonction tirer
  car les améliorations du personnage lui offrira de nouvelle fonctionalité
  */
  tirer() {
    // Si le joueur est vivant et si il est entrain de tirer
    if (this.isShooting && this.isAlive) {
      // Permet de réguler les tirs en fonction du temps
      if (this.game.time.now > this.nextFire) {
        // nextFire prend la valeur du temps actuel + le temps d'un tir
        // Pour séparer les tirs d'un même espace de temps
        this.nextFire = this.game.time.now + this.fireRate;
        const shoot = this.aBullets.get(this.sprite.x, this.sprite.y);
        // Direction du tir en fonction de la postion du curseur
        this.game.physics.moveTo(shoot, this.reticle.x, this.reticle.y, 750);
        // Jouer le son de tir
        this.aSoundFire.play();
        // colision de la balle
        shoot.checkWorldBounds = true;
        shoot.outOfBoundsKill = true;
        this.game.time.addEvent({
          delay: 2500,
          callback: () => shoot.destroy(),
        });
      }
    }
  }
  get mycoin() {
    return this.coin;
  }
}
