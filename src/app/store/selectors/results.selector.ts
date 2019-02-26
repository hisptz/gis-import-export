import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import * as fromResultsReducer from '../reducers/results.reducer'

export const getResultsState = createSelector(getRootState, (state: State) => state.results);

export const getMatching = createSelector(getResultsState, fromResultsReducer.getMatching)
export const getMatched = createSelector(getResultsState, fromResultsReducer.getMatched)
export const getResults = createSelector(getResultsState, fromResultsReducer.getResults)
export const getResultsOnly = createSelector(getResultsState, fromResultsReducer.getResultOnly)
export const getResultsSummary = createSelector(getResultsState, fromResultsReducer.getResultsSummary)
export const getMatchScheme = createSelector(getResultsState,fromResultsReducer.getMatchScheme)
