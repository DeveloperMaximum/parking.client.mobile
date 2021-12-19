import React from 'react';


async function AppRequest(props) {
    const domain = 'https://parking.mxmit.ru/api/';
    let headers = {
        'Content-Type': 'application/json', 'Accept': 'application/json'
    };
    let URL = domain;
    let method = 'POST';
    let BODY = {};

    if(props.METHOD) method = props.METHOD;
    if(props.URL) URL += props.URL;
    if(props.BODY) BODY = props.BODY;
    if(props.USER && props.USER.UF_TOKEN) BODY.HTTP_UF_TOKEN = props.USER.UF_TOKEN;

    await fetch(URL, {
        method: method,
        body: JSON.stringify(BODY),
        headers: new Headers(headers),
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

export default AppRequest;
