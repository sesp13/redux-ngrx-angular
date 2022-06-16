import { createAction, props } from '@ngrx/store';
import { IncomeExpense } from '../models/incomeExpense.model';

export const setItems = createAction(
  '[IcomeExpense Component] setItems',
  props<{ items: IncomeExpense[] }>()
);

export const unsetItems = createAction('[IcomeExpense Component] unSetItems');
