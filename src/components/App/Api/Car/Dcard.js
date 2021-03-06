import { Request } from "../../../utils/Request";
import * as Storage from "../../../utils/Storage";


export const Dcard = async (props) => {
	let url = `car/${props.CAR_ID}/dcard?`;
	return await Request({
		URL: url,
		UF_TOKEN: Storage.get('UF_TOKEN')
	}).then((result) => {
		if (result.success === true) {
			return result.data;
		}
		return false;
	});
};
