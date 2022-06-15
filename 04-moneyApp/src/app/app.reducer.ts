import { ActionReducerMap } from '@ngrx/store';
import { UiState, uiReducer } from './shared/ui.reducer';

export interface AppState {
  ui: UiState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: uiReducer,
};
