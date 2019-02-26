import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromOrgUnitActions from '../../store/actions/org-units.action';
import * as fromOrgUnitSelectors from '../../store/selectors/org-unit.selector';
import { State } from '../../store/reducers';
import { OrganisationUnit } from '../../core/models/org-unit.model';
import { ErrorMessage } from '../../core/models/error-message.model';
import { Observable } from 'rxjs';
import { orgUnitTableHeaders } from '../../core/constants';

@Component({
	selector: 'app-org-units',
	templateUrl: './org-units.component.html',
	styleUrls: [ './org-units.component.css' ]
})
export class OrgUnitsComponent implements OnInit {
	private loading$: Observable<boolean>;
	private loaded$: Observable<boolean>;
	private failed$: Observable<boolean>;
	private error$: Observable<ErrorMessage>;
	private orgUnits$: Observable<OrganisationUnit[]>;

	private pageSize =  6;
	private page = 1;
	private tableHeaders = orgUnitTableHeaders;

	constructor(private store$: Store<State>) {
		this.store$.dispatch(new fromOrgUnitActions.LoadOrgUnits());

		this.loading$ = this.store$.select(fromOrgUnitSelectors.getLoading);
		this.loaded$ = this.store$.select(fromOrgUnitSelectors.getLoaded);
		this.orgUnits$ = this.store$.select(fromOrgUnitSelectors.getOrgUnits);
	}

	ngOnInit() {}
}
