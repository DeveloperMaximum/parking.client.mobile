import { Request } from "../../../utils/Request";


export const Demo = async (props) => {
	return await Request({
		METHOD: `PUT`,
		URL: `car/${props.ID}/demo`
	});
};
