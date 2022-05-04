import { Request } from "../../../utils/Request";
import { Storage } from "../../";


export const Filter = async (props) => {

	let user = Storage.get('USER');

	let url = `operator/${user.OPERATOR.ID}/car/?LOGIC=SEARCH`;
	let keys = ['BRAND_ID', 'MODEL_ID', 'BODY_ID', 'TRANSMISSION_ID', 'MIN_PRICE', 'MAX_PRICE', 'MIN_YEAR', 'MAX_YEAR'];
	for (let i = 0; i < keys.length; i++) {
		if(props[keys[i]]){
			url += '&' + keys[i] + '=' + props[keys[i]];
		}
	}
	url += '&LAST_EVENT_HISTORY=Y&NEED_NECESSITATE_TOTAL=Y&NEED_SECTOR_ID=Y';

	return await Request({
		URL: url,
		//CONTROLLER: props.controller,
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
