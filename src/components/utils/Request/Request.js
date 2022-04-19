import * as Storage from "../../App/Storage";
import { DB } from "../../App/Api";

export async function Request (props) {

    let settings, domain, method, headers;

    if(props?.DOMAIN) {
        domain = props.DOMAIN;
    }else{
        domain = 'https://parking.mxmit.ru/api/';
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'DB-VER': Storage.get('DB_VER'),
            'OPERATOR-VER': Storage.get('OPERATOR_VER'),
            'UF-TOKEN': Storage.get('UF_TOKEN')
        }
    }

    method = (props?.METHOD) ? props.METHOD : 'GET';

    if(props?.HEADERS) {
        headers = {
            ...headers,
            ...props.HEADERS,
        };
    }

    settings = {
        method: method,
        headers: new Headers(headers),
    };

    if(props?.CONTROLLER){
        settings.signal = props.CONTROLLER.signal;
    }

    if(props?.BODY){
        settings.body = JSON.stringify(props.BODY);
    }

    const response = async (result) => {
        if(result.status === 426){
            await DB.get().then((result) => {
                if(result !== false){
                    Object.keys(result).forEach((key) => {
                        Storage.save(key, result[key]);
                    });
                    alert('База данных сервиса была обновлена, приложение будет перезапущено!');
                    document.location.reload();
                }
                return result;
            });
            return false;
        }

        if(result.status === 204){
            return { status: result.status, success: true, data: [] };
        }

        if(result.status === 401 || result.status === 403){
            return { status: result.status, success: false, data: [] };
        }

        return result.json();
    };

    const request = async () => {
        return fetch(domain + props.URL, settings).then(function(result){
            return response(result);
        });
    };

    return request();
}
