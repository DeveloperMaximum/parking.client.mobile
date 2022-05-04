import { Request } from "../../../utils/Request";
import { Storage } from "../../index";


export const Demo = async (props) => {
	return await Request({
		METHOD: `PUT`,
		URL: `car/${props.ID}/demo`,
		UF_TOKEN: Storage.get('UF_TOKEN')
	});
};
