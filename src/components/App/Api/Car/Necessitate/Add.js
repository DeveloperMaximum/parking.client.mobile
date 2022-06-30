import { Request } from "../../../../utils/Request";


export const Add = async (car_id, props) => {

	let url = `car/${car_id}/necessitate?`;

	return await Request({
		URL: url,
		METHOD: 'POST',
		BODY: props
	});
};
