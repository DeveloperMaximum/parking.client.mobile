import { Request } from "../../../utils/Request";
import * as Storage from "../../../utils/Storage";


const Logout = async () => {

    return await Request({
        METHOD: 'POST',
        URL: `user/${Storage.get('USER_ID')}/logout`
    });
};

export { Logout }
