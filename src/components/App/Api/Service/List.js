import { Storage } from "../../index";
import { Request } from "../../../utils/Request";


export const List = async (props) => {
	let user = Storage.get('USER');

	let url = `operator/${user.OPERATOR.ID}/service/?`;
	url += `MAP_ID=${Storage.get('UF_LOCATION')}`;
	for (let key in props) {
		url += `&${key}=${props[key]}`
	}

	return await Request({
		URL: url,
		UF_TOKEN: Storage.get('UF_TOKEN')
	}).then((result) => {
		if (result.success === true) {
			return result.data;
		}
		return false;
	});
};
