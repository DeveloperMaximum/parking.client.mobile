import { Request } from "../../../utils/Request";


export const Search = async (query, controller, page = 1) => {

	let url = `car/?LOGIC=SEARCH&nav=page-${page}`;
	let keys = ['VIN', 'VIN2', 'G_NUMBER'];
	for (let i = 0; i < keys.length; i++) {
		url += '&' + keys[i] + '=' + query;
	}

	return await Request({
		URL: url,
		CONTROLLER: controller
	}).then((result) => {
		if (result.status === 204) {
			return [];
		}
		if (result.success === true) {
			return result.data;
		}
		return false;
	});
};
