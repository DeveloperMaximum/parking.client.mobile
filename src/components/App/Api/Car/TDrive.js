import { Request } from "../../../utils/Request";


export const TDrive = async (id) => {

	return await Request({
		METHOD: `PUT`,
		URL: `car/${id}/tdrive`
	});
};
