import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service'

@Component({
  selector: 'app-file-contents',
  templateUrl: './file-contents.component.html',
  styleUrls: ['./file-contents.component.css']
})
export class FileContentsComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

}
