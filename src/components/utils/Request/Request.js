

export function Request (props) {
    let method = (props?.METHOD) ? props.METHOD : 'PUT';
    let domain = (props?.DOMAIN) ? props.DOMAIN : 'https://parking.mxmit.ru/api/';

    let headers = {};
    if(props.USER && props.USER?.UF_TOKEN){
        headers = (props?.HEADERS) ? props.HEADERS : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'UF-TOKEN': props.USER.UF_TOKEN
        };
    }else{
        headers = (props?.HEADERS) ? props.HEADERS : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
    }

    let url =  domain + props.URL;

    let settings = {
        method: method,
        headers: new Headers(headers),
    };

    if(props?.CONTROLLER){
        settings.signal = props.CONTROLLER.signal;
    }

    if(props?.BODY){
        settings.body = JSON.stringify(props.BODY);
    }

    return fetch(url, settings).then(function(result){
        if(result.status !== 200){
            return {
                status: result.status,
                success: false,
                data: result.data
            };
        }
        return result.json();
    });
}
