import {User} from './user.model';
import {Statistique} from './statistique.model';

export class Personne {
  id: number;
  nom: string;
  prenom: string;
  pseudo: string;
  actif: boolean;
  avatar?: string;
  user: User;
  statistique: Statistique;

  constructor(id: number, nom: string, prenom: string, pseudo: string, actif: boolean, avatar: string, user: User, statistique: Statistique ) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.pseudo = pseudo;
    this.actif = actif;
    this.avatar = avatar;
    this.user = user;
    this.statistique = statistique;
  }

  static parse(personne: any) {
    const user = User.parse(personne);
    console.log('User : ', user);
    const statistique = Statistique.parse(personne);
    console.log('Statistique : ', statistique);
    return new Personne(personne.id, personne.nom,
      personne.prenom, personne.pseudo,
      personne.actif,
      personne.avatar, user, statistique);
  }
}

