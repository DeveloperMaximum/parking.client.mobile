import { Request } from "../../../utils/Request";
import * as Storage from "../../../utils/Storage";


const History = async (props, page = 1, controller = false) => {

	return await Request({
		CONTROLLER: controller,
		URL: `user/${Storage.get('USER_ID')}/history/?nav=page-${page}`
	});
};

export { History }
