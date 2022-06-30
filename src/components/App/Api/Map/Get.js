import { Request } from "../../../utils/Request";


export const Get = async (props) => {

    return await Request({
        URL: 'map?'
    }).then((result) => {
        if (result.success === true) {
            return result.data;
        }
        return false;
    });
};
