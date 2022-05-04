import { Request } from "../../../utils/Request";
import { Storage } from "../../../App";


const Location = async (location_id) => {

	let user = Storage.get('USER');
	let token = Storage.get('UF_TOKEN');

	return await Request({
		URL: `user/${user.ID}/location/`,
		METHOD: `PUT`,
		BODY: {
			ID: location_id
		},
		UF_TOKEN: token
	}).then((result) => {
		if (result.success === true) {
			return true;
		}
		return (result?.message) ? result.message : false;
	});
};

export { Location }
