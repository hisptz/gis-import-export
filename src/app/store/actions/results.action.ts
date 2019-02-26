import { Action } from '@ngrx/store';
import { OrganisationUnit } from 'src/app/core';

export const enum ResultsActionTypes {
	LOAD_AVAILABLE_ORG_UNITS = '[Results] Load available org units',
	LOAD_FILE_CONTENTS = '[Results] Load file contents',
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

export class StartMatch implements Action {
	readonly type = ResultsActionTypes.START_MATCH;
}

export class EndMatch implements Action {
	readonly type = ResultsActionTypes.END_MATCH;
}

export type ResultsActions = LoadAvailableOrgUnits | LoadFileContents | StartMatch | EndMatch;
