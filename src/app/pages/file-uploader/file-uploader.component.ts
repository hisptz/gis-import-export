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
	private loading$: Observable<boolean>;
	private loaded$: Observable<boolean>;
	private fileContents$: Observable<any>;
	private failed$: Observable<boolean>;
	private errorMessage: Observable<ErrorMessage>;

	//Json Editor options
	private jsonEditorOptions: JsonEditorOptions;

	constructor(private store: Store<State>) {
		this.loading$ = this.store.select(fromFileSelectors.getFileLoading);
		this.loaded$ = this.store.select(fromFileSelectors.getFileLoaded);
		this.fileContents$ = this.store.select(fromFileSelectors.getFileFileContents);
		this.failed$ = this.store.select(fromFileSelectors.getFileFailed);
		this.errorMessage = this.store.select(fromFileSelectors.getFileError);
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
					this.store.dispatch(new fromFileActions.LoadFileSuccess(JSON.parse(fileContents.toString())));
					break;
				default:
					let errorMessage: ErrorMessage = {
						statusCode: 404,
						statusText: 'File Not Supported',
						message: 'File Not Supported'
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
