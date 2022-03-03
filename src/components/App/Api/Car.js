import { Request } from "../../utils/Request";
import * as Storage from "../../base/Storage";

const search = async (props) => {

    let url = 'car/?LOGIC=SEARCH';
    let keys = ['VIN', 'VIN2', 'G_NUMBER', 'BRAND', 'MODEL'];
    for (let i = 0; i < keys.length; i++) {
        url += '&' + keys[i] + '=' + props.search;
    }
    url += '&MAP_ID=' + Storage.get('UF_LOCATION') + '&LAST_EVENT_HISTORY=Y';

    return await Request({
        URL: url,
        CONTROLLER: props.controller,
        UF_TOKEN: Storage.get('UF_TOKEN')
    }).then((result) => {
        if (result.status === 204) {
            return [];
        }
        if (result.success === true) {
            return result.data;
        }
        return false;
    });
};

const getById = async (id) => {

    return await Request({
        URL: `car/${id}?&LAST_EVENT_HISTORY=Y`,
        UF_TOKEN: Storage.get('UF_TOKEN')
    }).then((result) => {
        if (result.success === true) {
            return result.data;
        }
        return false;
    });
};

const get = async (props) => {
    let url = `car/?`;
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

export { search, getById, get }
