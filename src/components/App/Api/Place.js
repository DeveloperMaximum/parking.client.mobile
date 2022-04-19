import { Request } from "../../utils/Request";
import * as Storage from "../Storage";

const get = async (props) => {

    let url = `place/?`;
    for (let key in props) {
        url += `&${key}=${props[key]}`
    }

    return await Request({
        URL: url,
        UF_TOKEN: Storage.get('UF_TOKEN')
    }).then((result) => {
        if (result.success === true) {
            return result.data;
        }
        return false;
    });
};

const parking = async (props) => {

    return await Request({
        URL: `place/${props.ID}/parking`,
	    METHOD: 'PUT',
	    BODY: {
            CAR_ID: props.CAR_ID
	    },
        UF_TOKEN: Storage.get('UF_TOKEN')
    }).then((result) => {
	    return (result.success !== true) ? false : result;
    });
};

export { get, parking }
