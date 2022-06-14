import { createReducer, on } from '@ngrx/store';
import { Action } from 'rxjs/internal/scheduler/Action';
import { setFilter } from './filter.actions';

export const initialState = 'all';

const _filterReducer = createReducer(
  initialState,
  on(setFilter, (state, { filter }) => filter)
);

export function filterReducer(state: any, action: any) {
  return _filterReducer(state, action);
}

