import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import * as fromFileReducer from '../reducers/file.reducer';

export const getFileState = createSelector(getRootState, (state: State) => state.file);

export const getFileLoading = createSelector(getFileState, fromFileReducer.getLoading);
export const getFileLoaded = createSelector(getFileState, fromFileReducer.getLoaded);
export const getFileFailed = createSelector(getFileState, fromFileReducer.getFailed);
export const getFileError = createSelector(getFileState, fromFileReducer.getError);
export const getFile = createSelector(getFileState, fromFileReducer.getFile);
export const getFileName = createSelector(getFileState, fromFileReducer.getFileName);
export const getFileFileContents = createSelector(getFileState, fromFileReducer.getFileContents);
