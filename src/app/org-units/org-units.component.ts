import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service'
@Component({
  selector: 'app-org-units',
  templateUrl: './org-units.component.html',
  styleUrls: ['./org-units.component.css']
})
export class OrgUnitsComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

}
