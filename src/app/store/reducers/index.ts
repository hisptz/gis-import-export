import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';

import * as fromUserReducer from '../reducers/user.reducer';
import * as fromSystemInfoReducer from '../reducers/system-info.reducer';
import * as fromOrgUnitsReducer from '../reducers/org-units.reducer';
import * as fromFileReducer from '../reducers/file.reducer';
import * as fromResultsReducer from '../reducers/results.reducer';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';

export interface State {
	/**
   * User state
   */
	user: fromUserReducer.State;

	/**
   * System info state
   */
	systemInfo: fromSystemInfoReducer.State;

	/**
   * Router state
   */
	route: RouterReducerState;
	//Org Units state
	orgUnits: fromOrgUnitsReducer.OrgUnitsState;
	//File State
	file: fromFileReducer.FileState;
	//Match Results
	results: fromResultsReducer.ResultsState;
}

export const reducers: ActionReducerMap<State> = {
	user: fromUserReducer.reducer,
	systemInfo: fromSystemInfoReducer.reducer,
	route: routerReducer,
	orgUnits: fromOrgUnitsReducer.reducer,
	file: fromFileReducer.reducer,
	results: fromResultsReducer.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

/**
 * Root state selector
 */
export const getRootState = (state: State) => state;
