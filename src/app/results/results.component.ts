import { Component, OnInit, Injectable } from '@angular/core';
import { AppService } from '../app.service'
import { FileUploaderComponent } from '../file-uploader/file-uploader.component'
import * as Fuse from 'fuse.js';
import { HttpClient } from '@angular/common/http'

export interface MatchResultsSummary {
  total: number,
  matched: number,
  duplicates: number,
  unmatched: number
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})



export class ResultsComponent implements OnInit {

  public matchResults = []
  public fileFeatureCollection: any
  public organisationUnits: any[]
  public matchResultsSummary: MatchResultsSummary



  constructor(public appService: AppService, public http: HttpClient) { }

  ngOnInit() {
    this.matchResultsSummary = {
      total: 0,
      matched: 0,
      duplicates: 0,
      unmatched: 0
    }
    this.fileFeatureCollection = this.appService.featureCollection
    this.organisationUnits = []

    this.http.get(this.appService.organisationUnitsApi + '&paging=true').subscribe((response: any) => {
      response.organisationUnits.forEach(organisationUnit => {
        this.organisationUnits.push(organisationUnit)
      })
    })

    if (this.fileFeatureCollection != null) {

      this.fileFeatureCollection.features.forEach(feature => {
        let results = this.match(this.appService.apiResult, feature.properties.name, 'name')
        switch (results.length) {
          case 0:
            this.matchResultsSummary = {
              ...this.matchResultsSummary,
              unmatched: this.matchResultsSummary.unmatched + 1
            }
            break
          case 1:
            this.matchResultsSummary = {
              ...this.matchResultsSummary,
              matched: this.matchResultsSummary.matched + 1
            }
            break
          default:
            this.matchResultsSummary = {
              ...this.matchResultsSummary,
              duplicates: this.matchResultsSummary.duplicates + 1
            }

        }

      

        this.matchResults.push({
          'feature': feature,
          'results': results
        })

        //console.log('RESULTS: ',results)

      })

      this.matchResultsSummary.total = this.matchResults.length

    }
  }

  match(contents, target, scheme) {

    var options = {
      shouldSort: true,
      includeScore: true,
      threshold: 0.2,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 3,
      keys: [
        scheme
      ]
    };
    var fuse = new Fuse(contents, options);
    return fuse.search(target).length == 0 ? null : fuse.search(target);
  }

  findMatch(organisationUnitName: string) {
    let result = this.match(this.appService.getOrganisationUnits(), organisationUnitName, 'name')
    return result
  }

  getMatchDescription(matches: any[]) {
    switch (matches.length) {
      case 0:
        return 'UNMATCHED'
      case 1:
        return 'MATCHED'
      default:
        return 'POSSIBLE (' + matches.length + ')'
    }
  }

  getMatchClass(matches: any[]) {
    switch (matches.length) {
      case 0:
        return 'badge badge-danger'
      case 1:
        return 'badge badge-success'
      default:
        return 'badge badge-warning'
    }
  }

  getMoreOptions() {
    alert('Implementation is still on Progress')
  }

  //Expands and Collapses Result Details Row
  viewDetails(resultsId: string) {
    let detailsRow = document.getElementById(resultsId)
    if (detailsRow.hasAttribute('hidden')) {
      detailsRow.removeAttribute('hidden')
    } else {
      detailsRow.setAttribute('hidden', '')
    }
  }

  //Reads selected Match out of listed possibilities
  readMatch(event){
    let selectedChekBotton = event.target
    let possibleList = selectedChekBotton.parentElement.parentElement.parentElement
    let checkBoxCollection = possibleList.getElementsByTagName('input')

    for (let count = 0; count<checkBoxCollection.length; count++){
      let currentCheckBox = checkBoxCollection[count]
      if (currentCheckBox.checked == true && currentCheckBox != selectedChekBotton){
        currentCheckBox.checked = false
      }
    }
    console.log(selectedChekBotton.id)
  }

}