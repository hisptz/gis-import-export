import { Component, OnInit, Output, Testability } from '@angular/core';
import { AppService } from '../app.service'

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {

  private extensions = ['.json', '.gml', '.kml']

  private accept = '.json,.gml,.kml'

  private fileNamePlaceHolder = 'No GeoSpatial File Chosen!'

  public fileContentsObject: any

  private btnFileUploadTitle = 'Allowed extensions are ' + this.accept


  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.ngOnInit()
    // window.location.reload()
  }

  getBtnOldFileUpload() {
    return document.getElementById("btn-file-upload-old")
  }

  getSpanChosenFileName() {
    return document.getElementById("chosen-file-name")
  }

  tranferFileUploadClickEvent(event) {
    this.getBtnOldFileUpload().click()
    //Read File contents
    let reader = new FileReader();
    reader.onload = () => {
      let fileObject = reader.result.toString()
      //console.log('File Object: ', fileObject)
    }
  }

  setChosenFileName($event) {
    this.getSpanChosenFileName().innerHTML = '&nbsp;&nbsp;' + $event.target.files[0].name
  }

  resetChosenFileName() {
    this.getSpanChosenFileName().innerHTML = '&nbsp;&nbsp; ' + this.fileNamePlaceHolder
  }

  onFileUpload(event) {
    let file = event.target.files[0];
    let fileType = file.name.split('.')[1]
    let reader = new FileReader();
    reader.onload = () => {
      switch (fileType) {
        //For GeoJson Files only
        case 'json':
          this.fileContentsObject = JSON.parse(reader.result.toString())
          //console.log(this.fileContentsObject)
          this.appService.featureCollection = this.fileContentsObject

          this.appService.getOrganisationUnits().forEach(organisationUnit => {
            console.log(organisationUnit.name)
          })

          //this.fileContentsObject.features.forEach(feature => {
          //  this.appService.getOrganisationUnits().forEach(organisationUnit => {
          //    if (feature.properties.name == organisationUnit.name) {
          //      console.log('--NAME--', feature.properties.name, ' GOT A MATCH ')
          //    }
          //  })
          //})

          break;
        //Implementation will come later
        case 'gml':
        case 'kml':
          alert('Sorry, the Only supported format is .json!')
          this.resetChosenFileName()
      }
    }
    reader.readAsText(file)
  }


}
