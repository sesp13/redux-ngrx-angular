import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { loadUser, loadUserError, loadUserSuccess } from '../actions';

export interface UserState {
  id: string | null;
  user: User | null;
  loaded: boolean;
  loading: boolean;
  error: any;
}

const userInitialState: UserState = {
  id: null,
  user: null,
  loaded: false,
  loading: false,
  error: null,
};

const _userReducer = createReducer(
  userInitialState,

  on(loadUser, (state, { id }) => ({ ...state, id })),

  on(loadUserSuccess, (state, { user }) => ({
    ...state,
    user: {...user},
    id: user.id ?? null,
    loading: false,
    loaded: true,
  })),

  on(loadUserError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    error: { url: payload.url, name: payload.name, message: payload.message },
  }))
);

export function userReducer(state: any, action: any) {
  return _userReducer(state, action);
}
