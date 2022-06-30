import { Request } from "../../../utils/Request";
import * as Storage from "../../../utils/Storage";


const Tickets = async (props, page = 1, controller = false) => {

	return await Request({
		URL: `user/${Storage.get('USER_ID')}/tickets/?RESPONSIBLE_ID=${props.RESPONSIBLE_ID}&nav=page-${page}`,
		CONTROLLER: controller,
	}).then((result) => {
		if (result.success === true) {
			return result.data;
		}
		return false;
	});
};

export { Tickets }
