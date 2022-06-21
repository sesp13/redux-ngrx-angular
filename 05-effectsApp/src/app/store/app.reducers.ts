import { ActionReducerMap } from '@ngrx/store';
import { usersReducer, UsersState } from './reducers';

export interface AppState {
  users: UsersState;
}

export const appReducers: ActionReducerMap<AppState> = {
  users: usersReducer,
};
