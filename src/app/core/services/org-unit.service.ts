import { Injectable, OnInit } from '@angular/core';
import { NgxDhis2HttpClientService } from '@hisptz/ngx-dhis2-http-client';
import { OrganisationUnit } from '../models';
import { queryParams } from '../constants';

@Injectable({
	providedIn: 'root'
})
export class OrgUnitService implements OnInit {
	constructor(private httpClient: NgxDhis2HttpClientService) {}

	ngOnInit() {}

	getOrganisationUnits() {
		let api = 'organisationUnits.json?fields=' + queryParams + '&paging=false';
		return this.httpClient.get(api);
	}
}
