import { Component, OnInit } from '@angular/core';
import * as fromFileActions from '../../store/actions/file.action';
import * as fromFileSelectors from '../../store/selectors/file.selector';
import { State } from '../../store/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ErrorMessage } from '../../core/models';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';

@Component({
	selector: 'app-file-uploader',
	templateUrl: './file-uploader.component.html',
	styleUrls: [ './file-uploader.component.css' ]
})
export class FileUploaderComponent implements OnInit {
	public loading$: Observable<boolean>;
	public loaded$: Observable<boolean>;
	public fileContents$: Observable<any>;
	public failed$: Observable<boolean>;
	public errorMessage$: Observable<ErrorMessage>;

	//Json Editor options
	public jsonEditorOptions: JsonEditorOptions;

	constructor(private store: Store<State>) {
		this.loading$ = this.store.select(fromFileSelectors.getFileLoading);
		this.loaded$ = this.store.select(fromFileSelectors.getFileLoaded);
		this.fileContents$ = this.store.select(fromFileSelectors.getFileFileContents);
		this.failed$ = this.store.select(fromFileSelectors.getFileFailed);
		this.errorMessage$ = this.store.select(fromFileSelectors.getFileError);
		//Set Json editor options
		this.jsonEditorOptions = new JsonEditorOptions();
		this.jsonEditorOptions.modes = [ 'code', 'text', 'tree', 'view' ];
	}

	ngOnInit() {}

	getInputFileUpload() {
		return document.getElementById('input-file-upload');
	}

	openFileChooser(event: any) {
		this.getInputFileUpload().click();
	}

	uploadFile(event) {
		let file = event.target.files[0];
		let fileType = file.name.split('.')[1];
		let fileReader = new FileReader();
		this.store.dispatch(new fromFileActions.LoadFile());
		fileReader.onload = () => {
			let fileContents = fileReader.result;
			switch (fileType) {
				case 'json':
					try {
						this.store.dispatch(new fromFileActions.LoadFileSuccess(JSON.parse(fileContents.toString())));
					} catch (excpetion) {
						let errorMessage: ErrorMessage = {
							statusCode: 406,
							statusText: 'File not acceptable',
							message: 'This file seems to be broken, please choose another file!'
						};
						this.store.dispatch(new fromFileActions.LoadFileFail(errorMessage));
					}
					break;
				default:
					let errorMessage: ErrorMessage = {
						statusCode: 505,
						statusText: 'File not supported',
						message: 'File not supported'
					};
					this.store.dispatch(new fromFileActions.LoadFileFail(errorMessage));
					return;
			}
		};
		fileReader.readAsText(file);
	}

	showDesc() {
		document.getElementById('supported-formats-prompt').hidden = false;
	}

	hideDesc() {
		document.getElementById('supported-formats-prompt').hidden = true;
	}
}
