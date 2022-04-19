import { Request } from "../../utils/Request";
import * as Storage from "../Storage";

const location = async (props) => {

	let user = Storage.get('USER');

	return await Request({
		URL: `user/${user.ID}/location/`,
		METHOD: `PUT`,
		BODY: {
			ID: props.ID
		},
		CONTROLLER: props.controller,
		UF_TOKEN: Storage.get('UF_TOKEN')
	}).then((result) => {
		if (result.status === 204) {
			return [];
		}
		if (result.success === true) {
			return result.data;
		}
		return false;
	});
};

export { location }
