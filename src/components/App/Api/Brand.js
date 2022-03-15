import { Request } from "../../utils/Request";
import * as Storage from "../../base/Storage";

const search = async (props) => {

	let url = 'brand/?LOGIC=SEARCH';
	let keys = ['NAME'];
	for (let i = 0; i < keys.length; i++) {
		url += '&' + keys[i] + '=' + props.search;
	}

	return await Request({
		URL: url,
		CONTROLLER: props.controller,
		UF_TOKEN: Storage.get('UF_TOKEN')
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

export { search }
