import { Request } from "../../../utils/Request";


const History = async (props, page = 1, controller = false) => {

	return await Request({
		CONTROLLER: controller,
		URL: `car/${props.id}/history/?nav=page-${page}`
	});
};

export { History }
