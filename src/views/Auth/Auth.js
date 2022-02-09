import React, { Component} from 'react';
import { Redirect } from "react-router-dom";

import { Form, Input, InputPassword, Button } from "../../components/ui";
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
            },
            toHome: false
        };
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // todo: монтирование компонента
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
                [e.target.name]: {
                    ...prevState.data[e.target.name],
                    value: e.target.value
                }
            }
        }));
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.loadingToggle(true);

        return AppSendForm({
            form: e.target,
            onError: () => {
                this.props.onAlert({
                    display: true,
                    header: "Не удалось авторизоваться",
                    content: "Логин или пароль не верны. Обратитесь в техническую поддержку",
                });
            },
            HEADERS: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                LOGIN: this.state.data.HTTP_LOGIN.value,
                PASSWORD: this.state.data.HTTP_PASSWORD.value,
            }
        }).then(result => {
            if(result === false){
                this.props.onAlert({
                    display: true,
                    header: "Не удалось авторизоваться",
                    content: "Логин или пароль не верны. Обратитесь в техническую поддержку",
                });
            }else if (result.status === 401 || result.status === 400) {
                this.props.onAlert({
                    display: true,
                    header: "Не удалось авторизоваться",
                    content: "Логин или пароль не верны. Обратитесь в техническую поддержку",
                });
            } else if (result?.data) {
                if (result.data?.USER) {
                    let userArray = result.data.USER;
                    if(userArray?.UF_TOKEN){
                        this.props.login(userArray);
                        this.setState((prevState) => ({
                            ...prevState,
                            toHome: true
                        }));
                    }
                }
            }

            this.loadingToggle(false);
        });
    }

    loadingToggle(loading){
        this.setState({
            button: {
                variant: (loading) ? 'loading' : 'primary'
            }
        });
    }

    render(){
        if (this.props.APP.auth !== false) {
            return (
                <>
                    <Redirect to={{pathname: "/"}} />
                </>
            );
        }
        return(
            <>
                <div id="AUTH" className="root-component">
                    <div className="logos-container container d-inline-block">
                        <div className="logotype position-relative">
                            <object type="image/svg+xml" data="img/parking-logo-auth.svg" className="parking-logo position-absolute" />
                            <object type="image/svg+xml" data="img/carmart-logo-auth.svg" className="carmart-logo" />
                        </div>
                    </div>
                    <Form method={"POST"} action="token" id="AUTH-FORM" className="container" onSubmit={this.handleSubmit}>
                        <Input autoComplete={"off"} min={1} placeholder="Введите логин" type={"text"} name={"HTTP_LOGIN"} value={this.state.data.HTTP_LOGIN.value || ''} onChange={this.handleChangeInput} />
                        <InputPassword autoComplete={"off"} min={1} placeholder="Введите пароль" name={"HTTP_PASSWORD"} value={this.state.data.HTTP_PASSWORD.value || ''} onChange={this.handleChangeInput} />
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
