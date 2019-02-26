import { Action } from '@ngrx/store';
import { OrganisationUnit, MatchScheme,MatchResults } from 'src/app/core/models';

export const enum ResultsActionTypes {
	LOAD_AVAILABLE_ORG_UNITS = '[Results] Load available org units',
	LOAD_FILE_CONTENTS = '[Results] Load file contents',
	UPDATE_MATCH_SCHEME = '[Results] Update match scheme',
	START_MATCH = '[Results] Start Match',
	END_MATCH = '[Results] End Match'
}

export class LoadAvailableOrgUnits implements Action {
	readonly type = ResultsActionTypes.LOAD_AVAILABLE_ORG_UNITS;
	constructor(public orgUnits: OrganisationUnit[]) {}
}

export class LoadFileContents implements Action {
	readonly type = ResultsActionTypes.LOAD_FILE_CONTENTS;
	constructor(public fileContents: any) {}
}

export class UpdateMatchScheme {
	readonly type = ResultsActionTypes.UPDATE_MATCH_SCHEME;
	constructor(public matchScheme: MatchScheme) {}
}

export class StartMatch implements Action {
	readonly type = ResultsActionTypes.START_MATCH;
}

export class EndMatch implements Action {
	readonly type = ResultsActionTypes.END_MATCH;
	constructor(public matchResults: MatchResults){}
}

export type ResultsActions = LoadAvailableOrgUnits | LoadFileContents | UpdateMatchScheme | StartMatch | EndMatch;
