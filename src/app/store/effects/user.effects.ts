import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/internal/operators';
import { UserService, User } from '../../core';

import * as fromSystemInfoActions from '../actions/system-info.actions';
import * as fromUserActions from '../actions/user.actions';
import { Action } from '@ngrx/store';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  @Effect()
  systemInfoLoaded$: Observable<Action> = this.actions$.pipe(
    ofType(fromSystemInfoActions.SystemInfoActionTypes.AddSystemInfo),
    map(
      (action: fromSystemInfoActions.AddSystemInfo) =>
        new fromUserActions.LoadCurrentUser(action.systemInfo)
    )
  );

  @Effect()
  loadCurrentUser$: Observable<any> = this.actions$.pipe(
    ofType(fromUserActions.UserActionTypes.LoadCurrentUser),
    switchMap((action: fromUserActions.LoadCurrentUser) =>
      this.userService.loadCurrentUser().pipe(
        map(
          (user: User) =>
            new fromUserActions.AddCurrentUser(user, action.systemInfo)
        ),
        catchError((error: any) =>
          of(new fromUserActions.LoadCurrentUserFail(error))
        )
      )
    )
  );
}
