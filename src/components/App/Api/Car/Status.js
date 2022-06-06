import { Request } from "../../../utils/Request";
import { Storage } from "../../";


export const Status = async (props) => {

	return await Request({
		METHOD: `PUT`,
		URL: `car/${props.ID}/status`,
		UF_TOKEN: Storage.get('UF_TOKEN'),
		BODY: props
	});
};
