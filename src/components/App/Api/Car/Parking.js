import { Request } from "../../../utils/Request";


export const Parking = async (props) => {

	return await Request({
		METHOD: `PUT`,
		URL: `car/${props.ID}/parking`,
		BODY: props
	});
};
