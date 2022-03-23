import { Request } from "../../utils/Request";
import * as Storage from "../../base/Storage";

const search = async (props) => {

    let url = 'car/?LOGIC=SEARCH';
    let keys = ['VIN', 'VIN2', 'G_NUMBER', 'BRAND', 'MODEL'];
    for (let i = 0; i < keys.length; i++) {
        url += '&' + keys[i] + '=' + props.search;
    }
    url += '&MAP_ID=' + Storage.get('UF_LOCATION') + '&LAST_EVENT_HISTORY=Y&NEED_NECESSITATE_TOTAL=Y';

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

const filter = async (props) => {

    let url = 'car/?LOGIC=SEARCH';

    if(props?.BRAND_ID){
	    url += '&BRAND_ID=' + props.BRAND_ID;
    }
    if(props?.MODEL_ID){
	    url += '&MODEL_ID=' + props.MODEL_ID;
    }
    if(props?.BODY_ID){
	    url += '&BODY_ID=' + props.BODY_ID;
    }
    if(props?.TRANSMISSION_ID){
	    url += '&TRANSMISSION_ID=' + props.TRANSMISSION_ID;
    }
    if(props?.MIN_PRICE){
	    url += '&MIN_PRICE=' + props.MIN_PRICE;
    }
    if(props?.MAX_PRICE){
	    url += '&MAX_PRICE=' + props.MAX_PRICE;
    }
    if(props?.MIN_YEAR){
	    url += '&MIN_YEAR=' + props.MIN_YEAR;
    }
    if(props?.MAX_YEAR){
	    url += '&MAX_YEAR=' + props.MAX_YEAR;
    }

    url += '&MAP_ID=' + Storage.get('UF_LOCATION') + '&LAST_EVENT_HISTORY=Y';

    return await Request({
        URL: url,
        //CONTROLLER: props.controller,
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
        URL: `car/${id}?&LAST_EVENT_HISTORY=Y&NEED_NECESSITATE_TOTAL=Y`,
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

const necessitates = async (props) => {
    let url = `car/${props.CAR_ID}/necessitate?`;
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

const addNecessitates = async (props) => {
	console.log(props)
    let url = `car/${props.CAR_ID}/necessitate?`;
    return await Request({
        URL: url,
        METHOD: 'POST',
        BODY: {
        	NECESSITATES: props.NECESSITATES
        },
        UF_TOKEN: Storage.get('UF_TOKEN')
    }).then((result) => {
        if (result.success === true) {
            return result.data;
        }
        return false;
    });
};

export { search, getById, get, filter, necessitates, addNecessitates }
