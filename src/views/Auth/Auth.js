import React, { Component } from 'react';

import { Form, Input, InputPassword, Button} from "../../components/ui";
import AppSendForm from "../../components/App/AppSendForm";


export class Auth extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: {
                HTTP_LOGIN: {
                    value: '',
                    required: true,
                },
                HTTP_PASSWORD: {
                    value: '',
                    required: true,
                }
            },
            button: {
                variant: 'primary'
            }
        };
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.afterSubmit = this.afterSubmit.bind(this);
    }

    handleChangeInput(e) {
        e.persist()
        this.setState((prevState) => ({
            data: {
                ...prevState.data,
                [e.target.name]: {
                    ...prevState.data[e.target.name],
                    value: e.target.value
                }
            }
        }));
    }

    handleSubmit(e){
        e.preventDefault();
        this.loadingToggle(true);
        return AppSendForm({
            form: e.target,
            callback: this.afterSubmit
        });
    }

    loadingToggle(loading){
        this.setState((prevState) => ({
            button: {
                ...prevState.button,
                variant: (loading) ? 'loading' : 'primary'
            }
        }));
    }

    afterSubmit(result){
        if(result === false){
            // todo: Ошибки в форме
        }else if (result.status === 401) {
            this.props.onAlert({
                display: true,
                header: "Не удалось авторизоваться",
                content: "Логин или пароль не верны. Обратитесь в техническую поддержку",
            });
        } else if (result?.data) {
            if (result.data?.USER) {
                this.props.USER.login(result.data.USER);
            }
        }
        this.loadingToggle(false);
    }

    render(){
        return(
            <>
                <div id="AUTH" className="root-component">
                    <Form method={"POST"} action="" id="AUTH-FORM" className="container" onSubmit={this.handleSubmit}>
                        <Input min={1} placeholder="Введите логин" type={"text"} name={"HTTP_LOGIN"} value={this.state.data.HTTP_LOGIN.value || ''} onChange={this.handleChangeInput} />
                        <InputPassword min={1} placeholder="Введите пароль" name={"HTTP_PASSWORD"} value={this.state.data.HTTP_PASSWORD.value || ''} onChange={this.handleChangeInput} />
                        <Button type={"submit"} text={"Войдите в систему"} form={"AUTH-FORM"} variant={this.state.button.variant}/>
                    </Form>
                    <div className="contact-info">
                        <div>При возникновении ошибок свяжитесь с нами по номеру телефона</div>
                        <div>06053</div>
                    </div>
                </div>
            </>
        );
    }
}
