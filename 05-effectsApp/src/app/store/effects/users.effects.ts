import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { loadUsers, loadUsersError, loadUsersSuccess } from '../actions';

@Injectable()
export class UsersEffects {
  constructor(private action$: Actions, private userService: UserService) {}

  loadUsers$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadUsers),
      switchMap(() =>
        this.userService
          .getUsers()
          // An effect must return an action
          .pipe(
            map((users) => loadUsersSuccess({ users })),
            catchError((error) => of(loadUsersError({ payload: error })))
          )
      )
    )
  );
}
