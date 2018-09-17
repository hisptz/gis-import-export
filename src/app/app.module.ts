import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppComponent } from './app.component';
import { MatcherComponent } from './matcher/matcher.component';

@NgModule({
  declarations: [
    AppComponent,
    MatcherComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AngularFileUploaderModule,
    NgxPaginationModule,
    RouterModule.forRoot([{
      path: '',
      component: MatcherComponent
    }])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
