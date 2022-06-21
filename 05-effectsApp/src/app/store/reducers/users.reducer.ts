import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { loadUsers, loadUsersError, loadUsersSuccess } from '../actions';

export interface UsersState {
  users: User[];
  loaded: boolean;
  loading: boolean;
  error: any;
}

const usersInitialState: UsersState = {
  users: [],
  loaded: false,
  loading: false,
  error: null,
};

const _usersReducer = createReducer(
  usersInitialState,

  on(loadUsers, (state) => ({ ...state, loading: true })),

  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    users: [...users],
    loading: false,
    loaded: true,
  })),

  on(loadUsersError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    error: payload,
  }))
);

export function usersReducer(state: any, action: any) {
  return _usersReducer(state, action);
}
