import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import * as fromPages from './pages';

export const routes: Routes = [
	{
		path: '',
		component: fromPages.HomeComponent
	},
	{
		path: 'organisationUnits',
		component: fromPages.OrgUnitsComponent
	},
	{
		path: 'match',
		component: fromPages.MatcherComponent
	},
	{
		path: 'results',
		component: fromPages.ResultsComponent
	},
	{
		path: 'Upload',
		component: fromPages.FileUploaderComponent
  },
  {
    path: 'fileContents',
    component: fromPages.FileContentComponent
  }
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			useHash: true,
			preloadingStrategy: PreloadAllModules
		})
	],
	exports: [ RouterModule ]
})
export class RoutingModule {}
