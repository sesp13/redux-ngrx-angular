import { createAction, props } from '@ngrx/store';

export type ValidFilters = 'all' | 'completed' | 'pending';

export const setFilter = createAction(
  '[Filter] Set Filter',
  props<{ filter: ValidFilters }>()
);
