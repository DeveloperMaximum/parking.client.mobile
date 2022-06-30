import { Request } from "../../../utils/Request";


export const List = async (props, page = 1, controller = false) => {

	let url = `model/?LOGIC=SEARCH&nav=page-${page}`;
	let keys = ['NAME', 'BRAND_ID', 'BODY_ID', 'TRANSMISSION_ID'];
	for (let i = 0; i < keys.length; i++) {
		if(props[keys[i]] && props[keys[i]] !== ''){
			if(Array.isArray(props[keys[i]]) && props[keys[i]].length === 0){
				if(props[keys[i]].length > 0){
					url += '&' + keys[i] + '=' + props[keys[i]];
				}
			}else{
				url += '&' + keys[i] + '=' + props[keys[i]];
			}
		}
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
