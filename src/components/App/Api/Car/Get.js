import { Request } from "../../../utils/Request";


export const Get = async (id) => {


    return await Request({
        URL: `car/${id}`
    }).then((result) => {
        if (result.success === true) {
            return result.data;
        }
        return false;
    });
};
