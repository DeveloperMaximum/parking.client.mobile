import React from 'react';


export function Request (props) {
    let method = (props?.METHOD) ? props.METHOD : 'POST';
    let domain = (props?.DOMAIN) ? props.DOMAIN : 'https://parking.mxmit.ru/api/';
    let headers = (props?.HEADERS) ? props.HEADERS : { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    let body = (props?.BODY) ? props.BODY : false;

    let url =  domain + props.URL;
    if(props.USER && props.USER.UF_TOKEN) body.HTTP_UF_TOKEN = props.USER.UF_TOKEN;

    fetch(url, {
        method: method,
        headers: new Headers(headers),
        body: (body) ? JSON.stringify(body) : false,
    }).then(function(result){
        if(result.status !== 200){
            return {
                status: result.status,
                success: false,
                data: result
            };
        }
        return result.json();
    }).then(function(result){
        return props.callback(result);
    });
}
