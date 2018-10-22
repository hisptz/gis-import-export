import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service'

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {

    this.appService.ngOnInit()

  }

}
