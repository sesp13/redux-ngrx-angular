import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { loadUser, loadUserError, loadUserSuccess } from '../actions';

@Injectable()
export class UserEffects {
  constructor(private action$: Actions, private userService: UserService) {}

  loadUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadUser),
      switchMap((action) =>
        this.userService
          .getUser(action.id ?? '')
          // An effect must return an action
          .pipe(
            map((user) => loadUserSuccess({ user })),
            catchError((error) => of(loadUserError({ payload: error })))
          )
      )
    )
  );
}
