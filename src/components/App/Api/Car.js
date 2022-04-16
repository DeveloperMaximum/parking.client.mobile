import { Request } from "../../utils/Request";
import * as Storage from "../../base/Storage";

const search = async (query, controller, page = 1) => {

	let user = Storage.get('USER');

	let url = `operator/${user.OPERATOR.ID}/car/?LOGIC=SEARCH&nav=page-${page}`;
    let keys = ['VIN', 'VIN2', 'G_NUMBER'];
    for (let i = 0; i < keys.length; i++) {
        url += '&' + keys[i] + '=' + query;
    }
    url += '&LAST_EVENT_HISTORY=Y&NEED_NECESSITATE_TOTAL=Y&NEED_SECTOR_ID=Y';

    return await Request({
        URL: url,
        CONTROLLER: controller,
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

	let user = Storage.get('USER');

	let url = `operator/${user.OPERATOR.ID}/car/?LOGIC=SEARCH`;
	let keys = ['BRAND_ID', 'MODEL_ID', 'BODY_ID', 'TRANSMISSION_ID', 'MIN_PRICE', 'MAX_PRICE', 'MIN_YEAR', 'MAX_YEAR'];
	for (let i = 0; i < keys.length; i++) {
		if(props[keys[i]]){
			url += '&' + keys[i] + '=' + props[keys[i]];
		}
	}
	url += '&LAST_EVENT_HISTORY=Y&NEED_NECESSITATE_TOTAL=Y&NEED_SECTOR_ID=Y';

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
        URL: `car/${id}?LAST_EVENT_HISTORY=Y&NEED_NECESSITATE_TOTAL=Y&NEED_SECTOR_ID=Y`,
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

const toTDrive = async (props) => {
	return await Request({
		METHOD: `PUT`,
		URL: `car/${props.ID}/tdrive`,
		UF_TOKEN: Storage.get('UF_TOKEN')
	});
};

const toDemo = async (props) => {
	return await Request({
		METHOD: `PUT`,
		URL: `car/${props.ID}/demo`,
		UF_TOKEN: Storage.get('UF_TOKEN')
	});
};

const toParking = async (props) => {
	return await Request({
		METHOD: `PUT`,
		URL: `car/${props.ID}/parking`,
		UF_TOKEN: Storage.get('UF_TOKEN'),
		BODY: {
			PLACE_ID: props.PLACE_ID
		}
	});
};

const toMoved = async (props) => {
	return await Request({
		METHOD: `PUT`,
		URL: `car/${props.ID}/moving`,
		UF_TOKEN: Storage.get('UF_TOKEN'),
		BODY: {}
	});
};

const dcard = async (props) => {
	let url = `car/${props.CAR_ID}/dcard?`;
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

export { search, getById, get, filter, toTDrive, toDemo, toParking, toMoved, necessitates, addNecessitates, dcard }
