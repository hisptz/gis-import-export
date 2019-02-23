import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, defer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';

import { SystemInfoService } from '@hisptz/ngx-dhis2-http-client';

import * as fromSystemInfoActions from '../actions/system-info.actions';

import { getSanitizedSystemInfo } from '../../core';

@Injectable()
export class SystemInfoEffects {
  constructor(
    private actions$: Actions,
    private systemInfoService: SystemInfoService
  ) {}

  @Effect()
  loadSystemInfo$: Observable<any> = this.actions$.pipe(
    ofType(fromSystemInfoActions.SystemInfoActionTypes.LoadSystemInfo),
    switchMap(() => this.systemInfoService.getSystemInfo()),
    map(
      (systemInfo: any) =>
        new fromSystemInfoActions.AddSystemInfo(
          getSanitizedSystemInfo(systemInfo)
        )
    ),
    catchError((error: any) =>
      of(new fromSystemInfoActions.LoadSystemInfoFail(error))
    )
  );

  @Effect()
  init$: Observable<Action> = defer(() =>
    of(new fromSystemInfoActions.LoadSystemInfo())
  );
}
