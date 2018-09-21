import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxDhis2MenuModule } from '@hisptz/ngx-dhis2-menu';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { GlobalMenuComponent } from './global-menu/global-menu.component';
import { MatcherComponent } from './matcher/matcher.component';

@NgModule({
  declarations: [
    AppComponent,
    GlobalMenuComponent,
    MatcherComponent
  ],
  imports: [
    BrowserModule,
    NgxDhis2MenuModule,
    BrowserAnimationsModule,
    NgbModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
