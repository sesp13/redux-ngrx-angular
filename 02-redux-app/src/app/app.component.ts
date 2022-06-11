import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'redux-app';
  counter: number;

  constructor() {
    this.counter = 10;
  }

  increment() {
    this.counter += 1;
  }

  decrement() {
    this.counter -= 1;
  }
}
