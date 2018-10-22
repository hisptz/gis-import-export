import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

//Organisation Units API
const ORGANISATION_UNITS_API_FIELDS = ['id', 'code', 'name', 'shortName', 'level', 'children[name]']
const ORG_UNIT_API = '../../../api/organisationUnits.json?fields=' + ORGANISATION_UNITS_API_FIELDS.join(',')

@Injectable({
  providedIn: 'root'
})
export class AppService implements OnInit {
  //Counts Total Organisation Units
  private data_count = 0;
  //Stores Organisation Units
  private api_result = []

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(ORG_UNIT_API).subscribe((response: any) => {
      this.data_count = response.pager.total;
      // tslint:disable-next-line:no-shadowed-variable
      response.organisationUnits.forEach(element => {
        this.api_result.push(element);
      });
      const startAt = response.pager.page + 1;
      const pageCount = response.pager.pageCount;
      for (let i = startAt; i <= pageCount; i++) {
        this.http.get(ORG_UNIT_API + '?page=' + i).subscribe((response_2: any) => {
          // tslint:disable-next-line:no-shadowed-variable
          response_2.organisationUnits.forEach(element => {
            this.api_result.push(element);

            //console.log('ELEMENT: ',element);

          });
        });
      }
    });
  }

  //Get All Organisation Units
  getOrganisationUnits() {
    return this.api_result
  }

  //Get load Progress
  getLoadProgress() {
    return (this.api_result.length / this.data_count).toFixed(2)
  }

  //Counts Organisation Units
  getOrganisationUnitsCount(){
    return this.api_result.length
  }

}
