import { Request } from "../../../utils/Request";


const Token = async (props) => {

    return await Request({
        METHOD: 'POST',
        URL: 'token',
        BODY: props
    }).then((result) => {
	    if (result.success === true) {
		    return result.data;
	    }
        return false;
    });
};

export { Token }
