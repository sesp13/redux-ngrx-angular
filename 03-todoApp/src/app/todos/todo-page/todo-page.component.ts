import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { toggleAllTodos } from '../todo.actions';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss'],
})
export class TodoPageComponent implements OnInit {
  completeAllCheck: FormControl = new FormControl(false);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  toggleAll() {
    const completed = !this.completeAllCheck.value;
    this.completeAllCheck.setValue(completed);
    this.store.dispatch(toggleAllTodos({ completed }));
  }
}
