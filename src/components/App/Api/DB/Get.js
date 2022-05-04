import { Request } from "../../../utils/Request";
import { Storage } from "../../../App";


export const Get = async () => {
    return await Request({
        METHOD: 'GET',
        URL: 'db',
        UF_TOKEN: Storage.get('UF_TOKEN')
    }).then((result) => {
        if (result.success === true) {
            return result.data;
        }
        return false;
    });
};
