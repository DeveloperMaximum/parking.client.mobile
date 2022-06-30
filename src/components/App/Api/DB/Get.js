import { Request } from "../../../utils/Request";


export const Get = async () => {
    return await Request({
        METHOD: 'GET',
        URL: 'db',
    }).then((result) => {
        if (result.success === true) {
            return result.data;
        }
        return false;
    });
};
