import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service'

@Component({
  selector: 'app-file-contents',
  templateUrl: './file-contents.component.html',
  styleUrls: ['./file-contents.component.css']
})
export class FileContentsComponent implements OnInit {


  public show_map = false

  constructor(public appService: AppService) { }

  ngOnInit() {
  }

  updateShowMap() {
    alert("Development is still in progress")
    return
    if (this.show_map) {
      this.show_map = false
    } else {
      this.show_map = true
    }
  }



}
