import { Request } from "../../../utils/Request";


export const Filter = async (props, page = 1, controller) => {

	let url = `car/?LOGIC=SEARCH&nav=page-${page}`;

	for(let key in props) {
		url += '&' + key + '=' + props[`${key}`];
	}

	return await Request({
		URL: url,
		CONTROLLER: controller,
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
