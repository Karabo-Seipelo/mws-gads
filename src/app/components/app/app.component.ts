import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent  implements OnInit {
  title = 'mws-gads';
  isOpen = false;

  constructor(
  ) {}

  toggleMenu = (toggle) => {
    //this.isOpen = !this.isOpen;
    this.isOpen = !toggle;
  }

  ngOnInit() {
  }
}
