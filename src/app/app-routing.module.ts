import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ListPersonnesComponent} from './personnes/list-personnes/list-personnes.component';
import {PersonnesDetailsComponent} from './personnes/personnes-details/personnes-details.component';
import {GameComponent} from './game/game.component';


const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'joueur', component: ListPersonnesComponent },
  { path: 'profil/:id', component: PersonnesDetailsComponent },
  { path: 'UncoloredWorld', component: GameComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
