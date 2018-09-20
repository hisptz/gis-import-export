import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDhis2MenuModule } from '@hisptz/ngx-dhis2-menu';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AppComponent } from './app.component';
import { MatcherComponent } from './matcher/matcher.component';
import { GlobalMenuComponent } from './global-menu/global-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    MatcherComponent,
    GlobalMenuComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFileUploaderModule,
    NgxPaginationModule,
    NgbModule,
    NgxDhis2MenuModule,
    RouterModule.forRoot([{
      path: '',
      component: MatcherComponent
    }])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
