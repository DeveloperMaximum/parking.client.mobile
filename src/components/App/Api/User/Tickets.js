import { Request } from "../../../utils/Request";
import { Storage } from "../../../App";


const Tickets = async (props) => {

	let user = Storage.get('USER');
	let token = Storage.get('UF_TOKEN');

	return await Request({
		URL: `user/${user.ID}/tickets/?RESPONSIBLE_ID=${props.RESPONSIBLE_ID}`,
		METHOD: `GET`,
		UF_TOKEN: token
	}).then((result) => {
		if (result.success === true) {
			return result.data;
		}
		return false;
	});
};

export { Tickets }
