import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { setFilter } from 'src/app/filter/filter.actions';
import { parseValidFilter, ValidFilters } from 'src/app/filter/filter.type';
import { clearCompletedTodos } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.scss'],
})
export class TodoFooterComponent implements OnInit {
  currentFilter: ValidFilters = 'all';
  filters: ValidFilters[] = ['all', 'completed', 'pending'];
  pendingTasks: number = 0;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.subscribe(({ filter, todos }) => {
      this.currentFilter = parseValidFilter(filter);
      this.pendingTasks = todos.filter((todo) => !todo.completed).length;
    });
  }
  
  changeFilter(filter: ValidFilters) {
    this.store.dispatch(setFilter({ filter }));
  }

  clearCompleted() {
    this.store.dispatch(clearCompletedTodos());
  }
}
