import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {

  private extensions = ['.json', '.gml', '.kml']

  private accept = '.json,.gml,.kml'

  private btnFileUploadTitle = 'Allowed extensions are ' + this.accept

  constructor() { }

  ngOnInit() {
  }

  getBtnOldFileUpload() {
    return document.getElementById("btn-file-upload-old")
  }

  getSpanChosenFileName() {
    return document.getElementById("chosen-file-name")
  }

  tranferFileUploadClickEvent(event) {


    this.getBtnOldFileUpload().click()
  }

  setChosenFileName(event) {
    this.getSpanChosenFileName().innerHTML = '&nbsp;&nbsp;' + event.target.files[0].name
    //Read File contents
    let reader = new FileReader();
    reader.onload = () => {
      let fileObject = reader.result.toString()
      console.log('File Object: ',fileObject)
    }
  }

}
