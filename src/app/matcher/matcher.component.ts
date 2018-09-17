import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-matcher',
  templateUrl: './matcher.component.html',
  styleUrls: ['./matcher.component.css']
})
export class MatcherComponent implements OnInit {

  /*For counting table pages*/
  p: number = 1;
  /*Stores Contents of API Result*/
  @Input() api_result;
  /*Stores Contents of the Uploaded file*/
  @Input() file_contents: any;
  /*Stores status of data fetching by API Call*/
  @Input() fetch_status: boolean;
  /*Stores matching scheme*/
  @Input() match_scheme: string;
  /*Stores matching results*/
  @Input() match_results:any


  title = 'GIS Import - Export';

  constructor(private app: AppComponent) { }

  ngOnInit() {

    if (sessionStorage.file_contents != null){
      //console.log(this.file_contents);
    }

  }

}
