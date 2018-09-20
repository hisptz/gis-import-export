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
  @Input() match_results: any


  title = 'GIS Import - Export';

  constructor(private app: AppComponent) { }

  ngOnInit() {

    if (sessionStorage.file_contents != null) {
      //console.log(this.file_contents);
    }

  }

  //Returns results details
  getResultsSummary(results: any[]) {
    var found = 0;
    var not_found = 0;
    if (results !== null) {
      results.forEach(result => {
        if (result.match_result == null) {
          not_found++;
        } else {
          found++;
        }
      });
      return {
        'found': found,
        'not_found': not_found
      };
    }
    return null;
  }

  //Approximates @num to 2 decimal places
  to2Dp(num: number){
    return num.toFixed(2);
  }

}
