import { Component, OnInit } from '@angular/core';
import {Personne} from '../../models/personne.model';
import {Router} from '@angular/router';
import {PersonnesService} from '../personnes.service';

@Component({
  selector: 'app-list-personnes',
  templateUrl: './list-personnes.component.html',
  styleUrls: ['./list-personnes.component.css']
})
export class ListPersonnesComponent implements OnInit {
  loading = false;
  lesPersonnes: Personne[];
  selectedPersonne: Personne;
  displayedColumns: string[] = ['position', 'nom', 'prenom', 'pseudo', 'high_score'];

  constructor(private router: Router, private service: PersonnesService) { }

  ngOnInit() {
    this.loading = true;
    this.service.getPersonnes().subscribe(personnes => {
      this.lesPersonnes = personnes;
      this.sortedByHighScore();
      console.log(personnes);
      this.loading = false;
    });  }

  selectedRow(personne: Personne) {
    if (this.isSelected(personne)) {
      this.selectedPersonne = null;
    } else {
      this.selectedPersonne = personne;
      console.log('Personne sélectionnée : ', personne.user.name);
      this.router.navigate(['./profil', this.selectedPersonne.id]);
    }
  }

  isSelected(personne: Personne) {
    return this.selectedPersonne != null && this.selectedPersonne.id === personne.id;
  }

  sortedByHighScore() {
    return this.lesPersonnes.sort((x: Personne, y: Personne) => {
      if (x.statistique.high_score >= y.statistique.high_score) {
        return -1;
      }
      return 1;
    });
  }

}
