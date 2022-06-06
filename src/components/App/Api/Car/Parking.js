import { Request } from "../../../utils/Request";
import { Storage } from "../../";


export const Parking = async (props) => {

	return await Request({
		METHOD: `PUT`,
		URL: `car/${props.ID}/parking`,
		UF_TOKEN: Storage.get('UF_TOKEN'),
		BODY: props
	});
};
