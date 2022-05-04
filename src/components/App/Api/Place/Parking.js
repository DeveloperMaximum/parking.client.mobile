import { Request } from "../../../utils/Request";
import { Storage } from "../../index";


export const Parking = async (props) => {

	return await Request({
		URL: `place/${props.ID}/parking`,
		METHOD: 'PUT',
		BODY: {
			CAR_ID: props.CAR_ID
		},
		UF_TOKEN: Storage.get('UF_TOKEN')
	}).then((result) => {
		return (result.success !== true) ? false : result;
	});
};
