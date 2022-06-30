import { Request } from "../../../utils/Request";


export const Service = async (props) => {

	return await Request({
		METHOD: `PUT`,
		URL: `car/${props.ID}/service`,
		BODY: props
	});
};
