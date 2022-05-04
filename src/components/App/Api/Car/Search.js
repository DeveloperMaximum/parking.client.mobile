import { Request } from "../../../utils/Request";
import { Storage } from "../../";


export const Search = async (query, controller, page = 1) => {

	let user = Storage.get('USER');

	let url = `operator/${user.OPERATOR.ID}/car/?LOGIC=SEARCH&nav=page-${page}`;
	let keys = ['VIN', 'VIN2', 'G_NUMBER'];
	for (let i = 0; i < keys.length; i++) {
		url += '&' + keys[i] + '=' + query;
	}
	url += '&LAST_EVENT_HISTORY=Y&NEED_NECESSITATE_TOTAL=Y&NEED_SECTOR_ID=Y';

	return await Request({
		URL: url,
		CONTROLLER: controller,
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
