import { Request } from "../../../utils/Request";
import { Storage } from "../../";


export const Moved = async (props) => {
	return await Request({
		METHOD: `PUT`,
		URL: `car/${props.ID}/moving`,
		UF_TOKEN: Storage.get('UF_TOKEN'),
		BODY: {}
	});
};
