import { createReducer, on } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { IncomeExpense } from '../models/incomeExpense.model';
import { setItems, unsetItems } from './income-expense.actions';

export interface IncomeExpenseState {
  items: IncomeExpense[];
}

export const initialState: IncomeExpenseState = {
  items: [],
};

// This is the AppState used by IncomeExpenses components
export interface AppStateIncomeExpense extends AppState {
  incomeExpense: IncomeExpenseState;
}

const _incomeExpenseReducer = createReducer(
  initialState,
  on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
  on(unsetItems, (state) => ({ ...state, items: [] }))
);

export function incomeExpenseReducer(state: any, action: any) {
  return _incomeExpenseReducer(state, action);
}
