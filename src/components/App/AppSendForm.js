import { Request } from "../utils/Request";


async function AppSendForm(props) {
    let errors = false;
    let form = props.form;
    let fieldsValues = {};

    let textsFields = ['text', 'password'];

    for (let i = 0; i < form.elements.length; i++) {
        let field = form.elements[i];
        if(field.name === '') continue;
        if(field.min){
            let type = field.type;
            if(textsFields.indexOf(type) > -1){
                if(field.value.length < field.min){
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

    if(errors === true){
        return new Promise(resolve => {
            setTimeout(() => {
                // переведёт промис в состояние fulfilled с результатом "result"
                resolve(false);
            }, 0);
        })
    }

    return Request({
        URL: form.getAttribute('action'),
        BODY: fieldsValues,
        METHOD: (form?.method) ? form.method : 'GET',
        HEADERS: (!props?.HEADERS) ? null : props?.HEADERS
    });
}

export default AppSendForm;
