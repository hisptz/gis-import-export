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
  public dataCount = 0;
  //Stores Organisation Units
  public apiResult = []
  //Stores Geospatial file contents Object
  public featureCollection: any
  //Stores Match Result
  public count = 0
  //Organisation Unit api
  public organisationUnitsApi: string

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.organisationUnitsApi = ORG_UNIT_API
    this.dataCount = 0;

    this.apiResult = [];

    this.http.get(ORG_UNIT_API).subscribe((response: any) => {
      this.dataCount = response.pager.total;
      // tslint:disable-next-line:no-shadowed-variable
      response.organisationUnits.forEach(element => {
        this.apiResult.push(element);
        this.count++
      });
      const startAt = response.pager.page + 1;
      const pageCount = response.pager.pageCount;
      for (let i = startAt; i <= pageCount; i++) {
        this.http.get(ORG_UNIT_API + '&page=' + i).subscribe((response_2: any) => {
          // tslint:disable-next-line:no-shadowed-variable
          response_2.organisationUnits.forEach(element => {
            this.apiResult.push(element);
            this.count++
          });
        });
      }
    });
  }

  //Get All Organisation Units
  getOrganisationUnits() {
    return [...this.apiResult]
  }

  //Get load Progress
  getLoadProgress() {
    return (this.apiResult.length / this.dataCount).toFixed(2)
  }

  //Counts Organisation Units
  getOrganisationUnitsCount() {
    return this.apiResult.length
  }
}
