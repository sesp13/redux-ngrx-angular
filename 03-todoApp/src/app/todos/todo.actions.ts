import { createAction, props } from '@ngrx/store';

export const createTodo = createAction(
  '[TODO] Create Todo',
  props<{ text: string }>()
);

export const toggleTodo = createAction(
  '[TODO] Toggle Action',
  props<{ id: number }>()
);

export const editTodo = createAction(
  '[TODO] Edit Todo',
  props<{ id: number; text: string }>()
);

export const deleteTodo = createAction(
  '[TODO] Delete Todo',
  props<{ id: number }>()
);

export const toggleAllTodos = createAction(
  '[TODO Toggle All',
  props<{ completed: boolean }>()
);

export const clearCompletedTodos = createAction('[TODO Clear Completed]');