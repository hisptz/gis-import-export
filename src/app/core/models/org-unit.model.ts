export interface OrganisationUnit {
	id: string;
	code: string;
	name: string;
	shortName: string;
	displayName?: string;
	level: number;
	featureType: string;
	coordinates: string;
	parent?: string;
	path?: string;
	leaf?: boolean;
}
