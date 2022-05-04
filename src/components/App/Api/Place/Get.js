import { Request } from "../../../utils/Request";
import { Storage } from "../../index";


export const Get = async (props) => {

	let url = `place/?`;
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
