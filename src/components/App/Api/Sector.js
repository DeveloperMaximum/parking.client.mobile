import { Request } from "../../utils/Request";
import { Storage } from "../../App";

const get = async (props) => {

    let url = `sector/?`;
    url += `MAP_ID=${Storage.get('UF_LOCATION')}`;
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

const getById = async (props) => {

    return await Request({
        URL: `sector/${props.id}`,
        UF_TOKEN: Storage.get('UF_TOKEN')
    }).then((result) => {
        if (result.success === true) {
            return result.data;
        }
        return false;
    });
};

const getFullById = async (props) => {

    return await getById(props).then((result) => {
        if (result.success === true) {
            return result.data[0];
        }
        return false;
    });
};

export { get, getById, getFullById }
