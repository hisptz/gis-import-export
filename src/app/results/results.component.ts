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

  private matchResults = []
  private fileFeatureCollection: any
  private organisationUnits: any[]
  private matchResultsSummary: MatchResultsSummary



  constructor(private appService: AppService, private http: HttpClient) { }

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

      console.log('ORGANISATION-UNITS: ', this.organisationUnits)

      this.fileFeatureCollection.features.forEach(feature => {
        this.matchResults.push({
          'feature': feature,
          'results': this.match(this.appService.apiResult, feature.properties.name, 'name')
        })
      })

      this.matchResultsSummary.total = this.matchResults.length

    }
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) == index
  }

  /*match(contents: any[], target: string, key: string) {
    let results = []
    contents.forEach(content => {
      if (content[key] == target) {
        results.push({ 'message': 'Found' })
      }
    });

    return results
  }*/

  getOrganisationUnitNames() {
    let names = []
    this.organisationUnits.forEach(organisationUnit => {
      names.push(organisationUnit.name)
    })
    return names
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
        this.matchResultsSummary = {
          ...this.matchResultsSummary,
          matched: this.matchResultsSummary.unmatched + 1
        }
        return 'UNMATCHED'
      case 1:
        this.matchResultsSummary = {
          ...this.matchResultsSummary,
          matched: this.matchResultsSummary.matched = this.matchResultsSummary.matched + 1
        }
        return 'MATCHED'
      default:
        this.matchResultsSummary = {
          ...this.matchResultsSummary,
          duplicates: this.matchResultsSummary.duplicates + 1
        }
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



  getResultsSummary(target: string) {
    switch (target) {
      case 'TOTAL':
        return this.matchResults.length
      case 'MATCHED':
        let matchCount = 0
        this.matchResults.forEach(macthResult => {
          if (macthResult.length == 1) {
            matchCount++
          }
        })
        return matchCount
      case 'DUPLICATES':
        let duplicateCount = 0
        this.matchResults.forEach(macthResult => {
          if (macthResult.length > 1) {
            duplicateCount++
          }
        })
        return duplicateCount
      case 'UNMATCHED':
        let unMatchedCount = 0
        this.matchResults.forEach(macthResult => {
          if (macthResult.length == 0) {
            unMatchedCount++
          }
        })
        return unMatchedCount
    }
  }

  getMoreOptions() {
    alert('Implementation is still on Progress')
  }
}