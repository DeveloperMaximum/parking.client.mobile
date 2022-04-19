import { Request } from "../../utils/Request";
import * as Storage from "../Storage";

const get = async () => {
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

export { get }
