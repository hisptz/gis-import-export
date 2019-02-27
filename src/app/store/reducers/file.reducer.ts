import * as fromFileActions from '../actions/file.action';
import {File, ErrorMessage } from '../../core/models';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface FileState extends EntityState<File> {
	loading: boolean;
	loaded: boolean;
	failed: boolean;
	file:File;
	error: ErrorMessage;
}

export const adapter = createEntityAdapter<File>();

export const initialState: FileState = adapter.getInitialState({
	loading: false,
	loaded: false,
	failed: false,
	file: {
		fileName: '',
		fileContents:{}
	},
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
				file: action.file
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
export const getFile = (state: FileState) => state.file;
export const getFileName = (state: FileState) => state.file.fileName
export const getFileContents = (state: FileState) => state.file.fileContents 
