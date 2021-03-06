import React from 'react';
import { Redirect } from "react-router-dom";

import { Context } from "../../components/App/Context";
import { Form, Input, InputPassword } from "../../components/ui";
import { Token as Login } from "../../components/App/Api/User";


export class Auth extends React.Component {

    static contextType = Context;

    constructor(props){
        super(props);
        this.state = {
            data: {
                UF_PUSH_TOKEN: '',
                LOGIN: '',
                PASSWORD: ''
            },
            button: {
                variant: 'primary'
            }
        };
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
	    window.pushNotification.registration((token) => {
		    this.setState((prevState) => ({
			    data: { ...prevState.data, UF_PUSH_TOKEN: token }
		    }));
	    }, () => {
		    this.setState((prevState) => ({
			    data: { ...prevState.data, UF_PUSH_TOKEN: false }
		    }));
	    });
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return false;
        }
    }

    handleChangeInput(e) {
        e.persist();
        this.setState((prevState) => ({
            data: {
                ...prevState.data,
                [e.target.name]: e.target.value
            }
        }));
    }

    handleSubmit = async (validate) => {
        if(validate === false) return false;

	    return await Login(this.state.data).then(result => {
		    if (result !== false && result?.UF_TOKEN) {
			    this.context.login(result);
			    return true;
		    }
		    window.dispatchEvent(new CustomEvent(`app.dialog`, { detail: {
			    header: "Не удалось авторизоваться",
			    content: "Логин или пароль не верны. Обратитесь в техническую поддержку"
		    }}));
		    return false;
	    });
    };

    render(){

        if (this.context.isAuth()) {
            return (
                <>
                    <Redirect to={{pathname: "/home"}} />
                </>
            );
        }else{
            return(
                <div id="AUTH" className="root-component w-100 vh-100 vw-100 active">
                    <div className="container d-inline-block mb-4 text-center">
                        <img src={"img/auth-logo.png"} className="d-block m-auto"/>
                    </div>
                    <Form method={"POST"} action="token" id={"AUTH-FORM"} className={"container"} onSubmit={this.handleSubmit} textSubmit={"Войдите в систему"}>
                        <Input autoComplete={"off"} min={1} placeholder="Введите логин" type={"text"} name={"LOGIN"} value={this.state.data.LOGIN || ''} onChange={this.handleChangeInput} />
                        <InputPassword autoComplete={"off"} min={1} placeholder="Введите пароль" name={"PASSWORD"} value={this.state.data.PASSWORD || ''} onChange={this.handleChangeInput} />
                    </Form>
                    <div className="contact-info">
                        <div>При возникновении ошибок свяжитесь с нами по номеру телефона</div>
                        <div>06053</div>
                    </div>
                </div>
            );
        }
    }
}
