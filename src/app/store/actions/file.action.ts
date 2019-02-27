import { Action } from '@ngrx/store';
import { importExpr } from '@angular/compiler/src/output/output_ast';
import { ErrorMessage,File } from '../../core/models';

export const enum FileActionTypes {
	LOAD_FILE = '[File] Load file',
	LOAD_FILE_SUCCESS = '[File] Load file success',
	LOAD_FILE_FAIL = '[File] Load file fail'
}

export class LoadFile implements Action {
	readonly type = FileActionTypes.LOAD_FILE;
}

export class LoadFileSuccess implements Action {
	readonly type = FileActionTypes.LOAD_FILE_SUCCESS;
	constructor(public file: File) {}
}

export class LoadFileFail implements Action {
	readonly type = FileActionTypes.LOAD_FILE_FAIL;
	constructor(public error: ErrorMessage) {}
}

export type FileActions = LoadFile | LoadFileSuccess | LoadFileFail;
