import { Request } from "../../../utils/Request";
import { Storage } from "../../";


export const Responsible = async (props) => {

	let user = Storage.get('USER');
	let token = Storage.get('UF_TOKEN');

	let responsible_id = user.ID;
	if(props?.RESPONSIBLE_ID || props.RESPONSIBLE_ID === null){
		responsible_id = props.RESPONSIBLE_ID;
	}

	return await Request({
		METHOD: `PUT`,
		URL: `car/${props.ID}/responsible`,
		UF_TOKEN: token,
		BODY: {
			RESPONSIBLE_ID: responsible_id
		}
	});
};
