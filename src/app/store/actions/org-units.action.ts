import { Action } from '@ngrx/store';
import { OrganisationUnit } from '../../core/models/org-unit.model';
import { ErrorMessage } from '../../core/models/error-message.model';

export const enum OrgUnitActionTypes {
	LOAD_ORG_UNITS = '[OrgUnits] Load Organisation Units',
	LOAD_ORG_UNITS_SUCCESS = '[OrgUnits] Load Organisation Units Success',
	LOAD_ORG_UNITS_FAIL = '[OrgUnits] Load Organisation Units Fail'
}

export class LoadOrgUnits implements Action {
	readonly type = OrgUnitActionTypes.LOAD_ORG_UNITS;
}

export class LoadOrgUnitsSuccess implements Action {
	readonly type = OrgUnitActionTypes.LOAD_ORG_UNITS_SUCCESS;

	constructor(public orgUnits: OrganisationUnit[]) {
		
	}
}

export class LoadOrgUnitsFail implements Action {
	readonly type = OrgUnitActionTypes.LOAD_ORG_UNITS_FAIL;

	constructor(public error: ErrorMessage) {}
}

export type OrgUnitActions = LoadOrgUnits | LoadOrgUnitsSuccess | LoadOrgUnitsFail;
