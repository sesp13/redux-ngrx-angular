import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { setFilter, ValidFilters } from 'src/app/filter/filter.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.scss'],
})
export class TodoFooterComponent implements OnInit {
  currentFilter: ValidFilters = 'all';
  filters: ValidFilters[] = ['all', 'completed', 'pending'];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('filter').subscribe((filter) => {
      switch (filter) {
        case 'all':
        case 'completed':
        case 'pending':
          this.currentFilter = filter;
          break;
        default:
          this.currentFilter = 'all';
          break;
      }
    });
  }

  changeFilter(filter: ValidFilters) {
    this.store.dispatch(setFilter({ filter }));
  }
}
