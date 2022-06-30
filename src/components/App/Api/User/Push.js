import { Request } from "../../../utils/Request";
import * as Storage from "../../../utils/Storage";


const Push = async (props) => {

	return await Request({
		METHOD: `POST`,
		URL: `user/${Storage.get('USER_ID')}/push/`,
		BODY: {
			PAYLOAD: props.payload,
			TITLE: props.title,
			BODY: props.body
		},
	}).then((result) => {
		if (result.success === true) {
			return true;
		}
		return (result?.message) ? result.message : false;
	});
};

export { Push }
