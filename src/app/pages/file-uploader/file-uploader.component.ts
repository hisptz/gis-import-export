import { Component, OnInit } from '@angular/core';
import * as fromFileActions from '../../store/actions/file.action';
import * as fromFileSelectors from '../../store/selectors/file.selector';
import { State } from '../../store/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ErrorMessage, File } from '../../core/models';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';

@Component({
	selector: 'app-file-uploader',
	templateUrl: './file-uploader.component.html',
	styleUrls: [ './file-uploader.component.css' ]
})
export class FileUploaderComponent implements OnInit {
	public loading$: Observable<boolean>;
	public loaded$: Observable<boolean>;
	public file$: Observable<any>;
	public failed$: Observable<boolean>;
	public errorMessage$: Observable<ErrorMessage>;

	//Json Editor options
	public jsonEditorOptions: JsonEditorOptions;

	constructor(private store: Store<State>) {
		this.loading$ = this.store.select(fromFileSelectors.getFileLoading);
		this.loaded$ = this.store.select(fromFileSelectors.getFileLoaded);
		this.file$ = this.store.select(fromFileSelectors.getFile);
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
		let fileType = event.target.files[0].name.split('.')[1];
		let fileReader = new FileReader();
		this.store.dispatch(new fromFileActions.LoadFile());
		fileReader.onload = () => {
			switch (fileType) {
				case 'json':
					try {
						//Prepare file object
						let file: File = {
							fileName: event.target.files[0].name,
							fileContents: JSON.parse(fileReader.result.toString())
						};
						//Validate file
						if (!('type' in file.fileContents) || !('features' in file.fileContents)) {
							let errorMessage: ErrorMessage = {
								statusCode: 406,
								statusText: 'File not acceptable',
								message:
									'This file seems to be not a valid geospatial file, please choose another file!'
							};
							this.store.dispatch(new fromFileActions.LoadFileFail(errorMessage));
							return;
						}
						//Validation ok
						this.store.dispatch(new fromFileActions.LoadFileSuccess(file));
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
		fileReader.readAsText(event.target.files[0]);
	}

	showDesc() {
		document.getElementById('supported-formats-prompt').hidden = false;
		document.getElementById('selected-file-name')
			? (document.getElementById('selected-file-name').hidden = true)
			: '';
	}

	hideDesc() {
		document.getElementById('supported-formats-prompt').hidden = true;
		document.getElementById('selected-file-name')
			? (document.getElementById('selected-file-name').hidden = false)
			: '';
	}
}
