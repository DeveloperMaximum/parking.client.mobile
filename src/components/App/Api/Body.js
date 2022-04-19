import { Request } from "../../utils/Request";
import * as Storage from "../Storage";

const search = async (props) => {

	let user = Storage.get('USER');

	let url = `operator/${user.OPERATOR.ID}/body/?LOGIC=FILTER`;
	let keys = ['NAME', 'BRAND_ID', 'MODEL_ID', 'TRANSMISSION_ID'];
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
