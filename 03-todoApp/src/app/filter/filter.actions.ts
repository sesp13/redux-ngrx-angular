import { createAction, props } from '@ngrx/store';
import { ValidFilters } from './filter.type';

export const setFilter = createAction(
  '[Filter] Set Filter',
  props<{ filter: ValidFilters }>()
);
