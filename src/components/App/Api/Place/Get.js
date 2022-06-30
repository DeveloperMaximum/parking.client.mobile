import { Request } from "../../../utils/Request";


export const Get = async (props) => {

	let url = `place/?`;
	for (let key in props) {
		url += `&${key}=${props[key]}`
	}

	return await Request({
		URL: url
	}).then((result) => {
		if (result.success === true) {
			return result.data;
		}
		return false;
	});
};
