import { OrganisationUnit } from './org-unit.model';
import { Feature } from './feature.model';
import { ResultsSummary } from './results-summary.model';

export interface Result {
	feature: Feature;
	organisationUnits: OrganisationUnit[];
}

export interface MatchResults {
	summary: ResultsSummary;
	results: Result[];
}
