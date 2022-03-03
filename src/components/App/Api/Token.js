import { Request } from "../../utils/Request";

const get = async (props) => {

    return await Request({
        METHOD: 'POST',
        URL: 'token',
        BODY: props.body
    }).then((result) => {
        if (result.success === true) {
            return result.data;
        }
        return false;
    });
};

export { get }
