import * as fromOrgUnitsActions from '../actions/org-units.action';
import { ErrorMessage } from '../../core/models/error-message.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { OrganisationUnit } from '../../core/models/org-unit.model';
import { state } from '@angular/animations';

export interface OrgUnitsState extends EntityState<OrganisationUnit> {
	loading: boolean;
	loaded: boolean;
	orgUnits: OrganisationUnit[];
	failed: boolean;
	error: ErrorMessage;
}

export const adapter = createEntityAdapter<OrganisationUnit>();

export const initialState: OrgUnitsState = adapter.getInitialState({
	loading: false,
	loaded: false,
	orgUnits: [],
	failed: false,
	error: null
});

export function reducer(state = initialState, action: fromOrgUnitsActions.OrgUnitActions) {
	switch (action.type) {
		case fromOrgUnitsActions.OrgUnitActionTypes.LOAD_ORG_UNITS:
			return {
				...state,
				loading: true,
				loaded: false,
				failed: false
			};
		case fromOrgUnitsActions.OrgUnitActionTypes.LOAD_ORG_UNITS_SUCCESS:
			return {
				...state,
				loading: false,
				loaded: true,
				orgUnits: action.orgUnits,
				failed: false
			};
		case fromOrgUnitsActions.OrgUnitActionTypes.LOAD_ORG_UNITS_FAIL:
			return {
				...state,
				loading: false,
				loaded: false,
				failed: true,
				error: action.error
			};
		default:
			return state;
	}
}

export const getLoading = (state: OrgUnitsState) => state.loading;
export const getLoaded = (state: OrgUnitsState) => state.loaded;
export const getFailed = (state: OrgUnitsState) => state.failed;
export const getError = (state: OrgUnitsState) => state.error;
export const getOrgUnits = (state: OrgUnitsState) => state.orgUnits

export const { selectAll: getOrgUnitsState } = adapter.getSelectors();