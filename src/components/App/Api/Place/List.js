import { Request } from "../../../utils/Request";


export const List = async (props, page = 1, controller = false) => {

	let url = `place/?nav=page-${page}`;
	for (let key in props) {
		url += `&${key}=${props[key]}`
	}

	return await Request({
		URL: url,
		CONTROLLER: controller
	}).then((result) => {
		if (result.success === true) {
			return result.data;
		}
		return false;
	});
};
