import { Request } from "../../../utils/Request";
import * as Storage from "../../../utils/Storage";


const Location = async (location_id) => {

	return await Request({
		URL: `user/${Storage.get('USER_ID')}/location/`,
		METHOD: `PUT`,
		BODY: {
			ID: location_id
		}
	}).then((result) => {
		if (result.success === true) {
			return true;
		}
		return (result?.message) ? result.message : false;
	});
};

export { Location }
