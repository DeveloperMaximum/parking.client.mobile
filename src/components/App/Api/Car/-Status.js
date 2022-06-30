import { Request } from "../../../utils/Request";


export const Status = async (props) => {

	return await Request({
		METHOD: `PUT`,
		URL: `car/${props.ID}/status`,
		BODY: props
	});
};
