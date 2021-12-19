import React from 'react';
import AppRequest from "./AppRequest";


async function AppSendForm(props) {
    let errors = false;
    let form = props.form;
    let fieldsValues = {};

    let textsFields = ['text', 'password'];

    for (let i = 0; i < form.elements.length; i++) {
        let field = form.elements[i];
        if(field.name === '') continue;
        if(field.required === true){
            let type = field.type;
            if(textsFields.indexOf(type) !== -1){
                if(field.value === ''){
                    errors = true;
                    field.classList.add('is-invalid');
                    field.classList.remove('border-primary');
                }else{
                    field.classList.add('border-primary');
                    field.classList.remove('is-invalid');
                }
            }
        }
        fieldsValues[field.name] = field.value;
    }

    if(errors === true) return props.callback(false);

    await AppRequest({
        URL: form.getAttribute('action'),
        BODY: fieldsValues,
        callback: (result) => props.callback(result)
    });
}

export default AppSendForm;
