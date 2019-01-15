import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-org-units',
  templateUrl: './org-units.component.html',
  styleUrls: ['./org-units.component.css']
})
export class OrgUnitsComponent implements OnInit {

  public _search_keyword_code = ''
  public _search_keyword_name = ''
  public _search_keyword_short_name = ''
  public _search_keyword_level = 'All'

  private _row_count = 0
  public p:any


  constructor(public appService: AppService, public modalServie:NgbModal) { }

  ngOnInit() {
  }

  getChildrenString(organisationUnit: any) {
    let count = 0
    let childrenString = ''
    organisationUnit.children.forEach(child => {
      if (count < 5) {
        childrenString += child.name
        childrenString += ','
      }
      count++
    })
    if (count >= 5) {
      childrenString = childrenString.substr(0, childrenString.length - 1) + '...'
    } else {
      childrenString = childrenString.substr(0, childrenString.length - 1)
    }
    return childrenString
  }

  search(pattern: string, organisationUnits: any[]) {
    switch (pattern) {
      case 'CODE':
        return organisationUnits.filter(organisationUnit =>
          organisationUnit.code.toLowerCase().
            includes(this._search_keyword_code.toLowerCase()))
      case 'NAME':
        return organisationUnits.filter(organisationUnit =>
          organisationUnit.name.toLowerCase().
            includes(this._search_keyword_name.toLowerCase()))
      case 'SHORT_NAME':
        return organisationUnits.filter(organisationUnit =>
          organisationUnit.shortName.toLowerCase().
            includes(this._search_keyword_short_name.toLocaleLowerCase())
        )
      case 'LEVEL':
        if (this._search_keyword_level == 'All') {
          return organisationUnits
        }
        return organisationUnits.filter(organisationUnit =>
          organisationUnit.level == this.appService.
            getOrganisationUnitLevelCode(this._search_keyword_level))
      default:
        return organisationUnits
    }
  }

  updateCodeInput(event) {
    this._search_keyword_code = event.target.value
    this.resetRowCount()
  }
  updateNameInput(event) {
    this._search_keyword_name = event.target.value
    this.resetRowCount()
  }
  updateShortNameInput(event) {
    this._search_keyword_short_name = event.target.value
    this.resetRowCount()
  }
  updateLevelInput(level: string) {
    this._search_keyword_level = level
    this.resetRowCount()
  }

  createExtraRow(colspan = 5, organisationUnit: any) {

    let index = this._row_count
    let tableBody = document.getElementById("table-body")
    if (index < tableBody.children.length) {
      let extraRow = document.createElement('tr')
      let extraRowContents = '<td colspan="' + colspan + '" id="' + organisationUnit.id + '" style="height: 300px; background-color: lavender;" hidden="true"></td>'
      extraRow.innerHTML = extraRowContents

      if (index % 2 != 0) {
        let replacedRowContents = tableBody.children[index].innerHTML
        tableBody.children[index].innerHTML = extraRowContents

        // tableBody.insertBefore(extraRow, tableBody.children[index])
      }
    }

  }

  incrementRowCount() {
    this._row_count += 1
  }
  resetRowCount() {
    this._row_count = 0
  }

  viewChildren(extraRowId) {
    let extraRow = document.getElementById(extraRowId)
    if (extraRow.hidden == false) {
      extraRow.hidden = true
    } else {
      extraRow.hidden = false
    }
  }

  show(show = false){
    return !show
  }
}
