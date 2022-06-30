import { Request } from "../../../../utils/Request";


export const Close = async (car_id, props) => {

	let url = `car/${car_id}/necessitate?`;

	return await Request({
		URL: url,
		METHOD: 'PUT',
		BODY: props
	});
};
