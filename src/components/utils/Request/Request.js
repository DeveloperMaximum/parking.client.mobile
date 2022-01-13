

export function Request (props) {
    let method = (props?.METHOD) ? props.METHOD : 'PUT';
    let domain = (props?.DOMAIN) ? props.DOMAIN : 'https://parking.mxmit.ru/api/';
    let headers = (props?.HEADERS) ? props.HEADERS : { 'Accept': 'application/json', 'Content-Type': 'application/json' , 'LOGIN': '123' };
    let body = (props?.BODY) ? props.BODY : false;

    let url =  domain + props.URL;
    if(props.USER && props.USER.UF_TOKEN) body.HTTP_UF_TOKEN = props.USER.UF_TOKEN;

    return fetch(url, {
        method: method,
        headers: new Headers(headers),
        body: (body) ? JSON.stringify(body) : null,
    }).then(function(result){
        if(result.status !== 200){
            return {
                status: result.status,
                success: false,
                data: result
            };
        }
        return result.json();
    });
}
