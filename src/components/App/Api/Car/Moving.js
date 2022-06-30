import { Request } from "../../../utils/Request";


export const Moving = async (id) => {

	return await Request({
		METHOD: `PUT`,
		URL: `car/${id}/moving`
	});
};
