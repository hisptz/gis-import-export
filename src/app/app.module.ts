import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { reducers, metaReducers } from './store/reducers';
import { effects } from './store/effects';

import {
  RouterStateSerializer,
  StoreRouterConnectingModule
} from '@ngrx/router-store';
import { RouteSerializer, CoreModule } from './core';
import { RoutingModule } from './app.routes';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { NgxDhis2MenuModule } from '@hisptz/ngx-dhis2-menu';
import * as fromPages from './pages';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FileUploaderComponent } from './pages/file-uploader/file-uploader.component';
import { MatcherComponent } from './pages/matcher/matcher.component';
import { OrgUnitsComponent } from './pages/org-units/org-units.component';
import { ResultsComponent } from './pages/results/results.component';
import { FileContentComponent } from './pages/file-content/file-content.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { MapComponent } from './pages/map/map.component'


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, ...fromPages.pages, FileUploaderComponent, MatcherComponent, OrgUnitsComponent, ResultsComponent, FileContentComponent, MapComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    CoreModule,
    NgbModule,
    NgJsonEditorModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    /**
     * Menu  module
     */
    NgxDhis2MenuModule,

    /**
     * Translation module
     */
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store
     */
    StoreRouterConnectingModule,

    !environment.production ? StoreDevtoolsModule.instrument() : [],

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [{ provide: RouterStateSerializer, useClass: RouteSerializer }],
  bootstrap: [AppComponent]
})
export class AppModule {}
