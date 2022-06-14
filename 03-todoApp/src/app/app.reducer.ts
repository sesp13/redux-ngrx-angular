import { ActionReducerMap } from '@ngrx/store';
import { ValidFilters } from './filter/filter.type';
import { filterReducer } from './filter/filter.reducer';
import { Todo } from './todos/models/todo.model';
import { todoReducer } from './todos/todo.reducer';

export interface AppState {
  todos: Todo[];
  // Should be ValidFilters but we hace many issues with the types
  filter: string;
}

export const appReducers: ActionReducerMap<AppState> = {
  todos: todoReducer,
  filter: filterReducer,
};
