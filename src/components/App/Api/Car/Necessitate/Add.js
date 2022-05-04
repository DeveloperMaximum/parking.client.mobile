import { Request } from "../../../../utils/Request";
import { Storage } from "../../../";


export const Add = async (props) => {
	let url = `car/${props.CAR_ID}/necessitate?`;
	return await Request({
		URL: url,
		METHOD: 'POST',
		BODY: {
			NECESSITATES: props.NECESSITATES
		},
		UF_TOKEN: Storage.get('UF_TOKEN')
	}).then((result) => {
		if (result.success === true) {
			return result.data;
		}
		return false;
	});
};
