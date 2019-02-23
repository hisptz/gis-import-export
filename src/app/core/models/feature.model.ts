import { Point } from './point.model';

export interface Feature {
	id: string;
	name: string;
	type: string;
	coordinates: Point[];
}
