import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service'

@Component({
  selector: 'app-file-contents',
  templateUrl: './file-contents.component.html',
  styleUrls: ['./file-contents.component.css']
})
export class FileContentsComponent implements OnInit {


  private show_map = false

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  updateShowMap() {
    if (this.show_map) {
      this.show_map = false
    } else {
      this.show_map = true
    }
  }

}
