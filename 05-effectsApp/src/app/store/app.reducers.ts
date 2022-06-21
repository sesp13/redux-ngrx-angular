import { ActionReducerMap } from '@ngrx/store';
import { userReducer, usersReducer, UsersState, UserState } from './reducers';

export interface AppState {
  users: UsersState;
  user: UserState;
}

export const appReducers: ActionReducerMap<AppState> = {
  users: usersReducer,
  user: userReducer,
};
