import * as _ from 'lodash';

export function search(collection: any[], key: any, value: any, option = 'exact') {
	switch (option) {
		case 'exact':
			return _.filter(collection, (item) => item[key] == value);
		case 'include':
			return _.filter(collection, (item) => value in item[key]);
		case 'exclude':
			return _.filter(collection, (item) => !(value in item[key]));
		default:
			return collection;
	}
}
