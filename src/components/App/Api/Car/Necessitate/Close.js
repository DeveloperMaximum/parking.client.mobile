import { Request } from "../../../../utils/Request";
import { Storage } from "../../../";


export const Close = async (props) => {
	let url = `car/${props.CAR_ID}/necessitate?`;
	return await Request({
		URL: url,
		METHOD: 'PUT',
		BODY: props,
		UF_TOKEN: Storage.get('UF_TOKEN')
	}).then((result) => {
		if (result.success === true) {
			return result.data;
		}
		return false;
	});
};
