import * as _ from 'lodash';

export function search(collection: any[], key: any, value: any, option = 'includes') {
	if (value == '') {
		return collection;
	}
	switch (option) {
		case 'exact':
			return _.filter(collection, (item) => item[key].toString().toLowerCase() == value.toString().toLowerCase());
		case 'includes':
			return _.filter(collection, (item) =>
				item[key].toString().toLowerCase().includes(value.toString().toLowerCase())
			);
		case 'exclude':
			return _.filter(
				collection,
				(item) => !item[key].toString().toLowerCase().includes(value.toString().toLowerCase())
			);
		default:
			return collection;
	}
}
