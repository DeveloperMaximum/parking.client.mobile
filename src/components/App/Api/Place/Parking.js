import { Request } from "../../../utils/Request";


export const Parking = async (props) => {

	return await Request({
		METHOD: 'PUT',
		URL: `place/${props.ID}/parking`,
		BODY: {
			CAR_ID: props.CAR_ID
		}
	}).then((result) => {
		return result;
	});
};
