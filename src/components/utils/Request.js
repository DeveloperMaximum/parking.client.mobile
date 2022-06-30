import * as Storage from "./Storage";


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
	        window.dispatchEvent(new CustomEvent("app.update"));
        }

	    if(result.status === 401){
		    window.dispatchEvent(new CustomEvent("app.stick", {
			    detail: {
				    icon: `do_disturb_on`,
				    text: `Необходима авторизация`
			    }
		    }));
		    localStorage.clear();
		    window.location.reload(true);
	    }

	    if(result.status === 403){
		    window.dispatchEvent(new CustomEvent("app.stick", {
			    detail: {
				    icon: `do_disturb_on`,
				    text: `Нет доступа`
			    }
		    }));
		    return { status: result.status, success: false, data: [] };
	    }

        if(result.status === 204){
            return { status: result.status, success: true, data: [] };
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
