import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as fromOrgUnitActions from '../actions/org-units.action';
import { OrganisationUnit, ErrorMessage } from '../../core/models';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { OrgUnitService } from '../../core/services';
import { Observable } from 'rxjs';
import { switchMap, map, catchError,tap } from 'rxjs/operators';

@Injectable()
export class OrgUnitsEffects {
    constructor(private actions$: Actions, private store: Store<State>, private orgUnitService: OrgUnitService) { }
    
    @Effect({ dispatch: true })
    orgUnits$: Observable<any> = this.actions$.pipe(
        ofType(fromOrgUnitActions.OrgUnitActionTypes.LOAD_ORG_UNITS),
        switchMap(() => this.orgUnitService.getOrganisationUnits().pipe(
            map((orgUnitsDetails:any) => new fromOrgUnitActions.LoadOrgUnitsSuccess(orgUnitsDetails.organisationUnits))
        ))
    )

}
