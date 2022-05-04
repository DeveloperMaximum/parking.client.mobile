import { Storage } from "../../index";
import { Request } from "../../../utils/Request";


export const Get = async (props) => {

	return await Request({
		URL: `sector/${props.id}`,
		UF_TOKEN: Storage.get('UF_TOKEN')
	}).then((result) => {
		if (result.success === true) {
			return result.data;
		}
		return false;
	});
};
