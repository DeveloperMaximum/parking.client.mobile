import { Request } from "../../../utils/Request";
import { Storage } from "../../index";


export const TDrive = async (props) => {
	return await Request({
		METHOD: `PUT`,
		URL: `car/${props.ID}/tdrive`,
		UF_TOKEN: Storage.get('UF_TOKEN')
	});
};
