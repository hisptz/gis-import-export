import * as fromResultsAction from '../actions/results.action';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { OrganisationUnit, MatchScheme, MatchResults } from '../../core/models';

export interface ResultsState extends EntityState<any> {
	matching: boolean;
	matched: boolean;
	orgUnits: OrganisationUnit[];
	fileContents: any;
	matchScheme: MatchScheme;
	results: MatchResults;
}

export const adapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialState: ResultsState = adapter.getInitialState({
	matching: false,
	matched: false,
	orgUnits: [],
	fileContents: {},
	matchScheme: { schemeCode: 'name', displayName: 'Name' },
	results: {
		summary: {
			matched: 0,
			unmatched: 0,
			duplicate: 0,
			total: 0
		},
		results: []
	}
});

export function reducer(state = initialState, action: fromResultsAction.ResultsActions) {
	switch (action.type) {
		case fromResultsAction.ResultsActionTypes.LOAD_AVAILABLE_ORG_UNITS:
			return {
				...state,
				orgUnits: action.orgUnits
			};
		case fromResultsAction.ResultsActionTypes.LOAD_FILE_CONTENTS:
			return {
				...state,
				fileContents: action.fileContents
			};
		case fromResultsAction.ResultsActionTypes.UPDATE_MATCH_SCHEME:
			return {
				...state,
				matchScheme: action.matchScheme
			};
		case fromResultsAction.ResultsActionTypes.START_MATCH:
			return {
				...state,
				matching: true,
				matched: false
			};
		case fromResultsAction.ResultsActionTypes.END_MATCH:
			return {
				...state,
				matching: false,
				matched: true,
				results: action.matchResults
			};
		default:
			return state;
	}
}

export const { selectAll: getMatchResult } = adapter.getSelectors();

export const getMatching = (state: ResultsState) => state.matching;
export const getMatched = (state: ResultsState) => state.matched;
export const getMatchScheme = (state: ResultsState) => state.matchScheme;
export const getAvailableOrgUnits = (state: ResultsState) => state.orgUnits;
export const getFileContents = (state: ResultsState) => state.fileContents;
export const getResults = (state: ResultsState) => state.results;
export const getResultsSummary = (state: ResultsState) => state.results.summary;
export const getResultOnly = (state: ResultsState) => state.results.results;
