import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import * as fromOrgUnitReducers from '../reducers/org-units.reducer';

export const getOrgUnitState = createSelector(getRootState, (state: State) => state.orgUnits);

export const getLoaded = createSelector(getOrgUnitState, fromOrgUnitReducers.getLoaded);

export const getLoading = createSelector(getOrgUnitState, fromOrgUnitReducers.getLoading);

export const getFailed = createSelector(getOrgUnitState, fromOrgUnitReducers.getFailed);

export const getOrgUnits = createSelector(getOrgUnitState, fromOrgUnitReducers.getOrgUnits);

export const getError = createSelector(getOrgUnitState, fromOrgUnitReducers.getError);
