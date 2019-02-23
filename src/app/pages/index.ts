import { HomeComponent } from './home/home.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { OrgUnitsComponent } from './org-units/org-units.component';
import { MatcherComponent } from './matcher/matcher.component';
import { ResultsComponent } from './results/results.component';
import { FileContentComponent } from './file-content/file-content.component'

export const pages: any[] = [
	HomeComponent,
	FileUploaderComponent,
	OrgUnitsComponent,
	MatcherComponent,
	ResultsComponent,
	FileContentComponent
];

export * from './home/home.component';
export * from './file-uploader/file-uploader.component';
export * from './org-units/org-units.component';
export * from './matcher/matcher.component';
export * from './results/results.component';
export * from './file-content/file-content.component'
