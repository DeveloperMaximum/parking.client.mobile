import { Request } from "../../../utils/Request";
import { Storage } from "../../";


export const Get = async (id) => {

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
