import React, { useState } from 'react';

import AppSendForm from "../../components/App/AppSendForm";
import Form from "../../components/Utils/Form";
import Input from "../../components/Utils/Input";
import InputPassword from "../../components/Utils/InputPassword";
import Button from "../../components/Utils/Button";
import Alert from "../../components/Utils/Alert";


function Auth(props) {

    const [alert, setAlert] = useState({
        header: "", content: "", button: "", display: false, afterClose: false
    });

    const [loading, setLoading] = useState({
        button: "primary", disabled: ''
    });

    const handleLoading = (status) => {
        if(status === false){
            setLoading({
                button: 'primary',
                disabled: ''
            });
        }else{
            setLoading({
                button: 'loading',
                disabled: 'disabled'
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleLoading(true);
        await AppSendForm({
            form: e.target.form,
            callback: function (result) {
                if (result.status === 401) {
                    setAlert({
                        display: true,
                        header: "Не удалось авторизоваться",
                        content: "Логин или пароль не верны. Обратитесь в техническую поддержку",
                        button: "Хорошо"
                    });
                } else if (result?.data) {
                    if (result.data?.USER) {
                        //props.USER.login(result.data.USER);
                    }
                    setAlert({
                        display: true,
                        header: "Авторизация прошла успешно",
                        content: "К сожалению, работа системы приостановлена в связи с техническими работами, пожалуйста, зайдите позже",
                        button: "Хорошо"
                    });
                }
                handleLoading(false);
            }
        });
    };

    return(
        <>
            <Alert display={alert.display} header={alert.header} content={alert.content} button={alert.button} afterClose={e => setAlert({display: false})} />
            <div id="AUTH" className="root-component">
                <Form name="AUTH" method={"POST"} action="" id="auth-form" className="container">
                    <Input placeholder="Введите логин" type={"text"} name={"HTTP_LOGIN"} required />
                    <InputPassword placeholder="Введите пароль" name={"HTTP_PASSWORD"} required />
                    <Button type={"submit"} onClick={handleSubmit} text={"Войдите в систему"} variant={loading.button} disabled={loading.disabled} form={"auth-form"} />
                </Form>
                <div className="contact-info">
                    <div>При возникновении ошибок свяжитесь с нами по номеру телефона</div>
                    <div>06053</div>
                </div>
            </div>
        </>
    );
}

export default Auth;
