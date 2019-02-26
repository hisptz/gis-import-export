import * as fromFileActions from '../actions/file.action';
import { ErrorMessage } from '../../core/models/error-message.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface FileState extends EntityState<any> {
	loading: boolean;
	loaded: boolean;
	failed: boolean;
	fileContents: any;
	error: ErrorMessage;
}

export const adapter = createEntityAdapter<any>();

export const initialState: FileState = adapter.getInitialState({
	loading: false,
	loaded: false,
	failed: false,
	fileContents: {},
	error: null
});

export function reducer(state = initialState, action: fromFileActions.FileActions) {
	switch (action.type) {
		case fromFileActions.FileActionTypes.LOAD_FILE:
			return {
				...state,
				loading: true,
				loaded: false
			};
		case fromFileActions.FileActionTypes.LOAD_FILE_SUCCESS:
			return {
				...state,
				loading: false,
				loaded: true,
				failed: false,
				fileContents: action.fileContents
			};
		case fromFileActions.FileActionTypes.LOAD_FILE_FAIL:
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

export const { selectAll: getFileState } = adapter.getSelectors();

export const getLoading = (state: FileState) => state.loading;
export const getLoaded = (state: FileState) => state.loaded;
export const getFailed = (state: FileState) => state.failed;
export const getError = (state: FileState) => state.error
export const getFileContents = (state: FileState) => state.fileContents;
