import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { reset } from '../counter.actions';

@Component({
  selector: 'app-grand-child',
  templateUrl: './grand-child.component.html',
  styles: [],
})
export class GrandChildComponent implements OnInit {
  counter: number = 0;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select('counter')
      .subscribe((counter) => (this.counter = counter));
  }

  reset() {
    this.store.dispatch(reset());
  }
}
