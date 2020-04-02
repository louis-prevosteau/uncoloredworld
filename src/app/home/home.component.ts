import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  image = './assets/img/ventoline.png';
  imageIcon = './assets/img/ventoline.png';

  constructor() { }

  ngOnInit() {
  }

}
