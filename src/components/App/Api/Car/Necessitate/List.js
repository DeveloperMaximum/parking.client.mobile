import { Request } from "../../../../utils/Request";


export const List = async (props) => {
	let url = `car/${props.CAR_ID}/necessitate?`;
	return await Request({
		URL: url
	}).then((result) => {
		if (result.success === true) {
			return result.data;
		}
		return false;
	});
};
