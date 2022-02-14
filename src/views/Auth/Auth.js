import React from 'react';
import { Redirect } from "react-router-dom";

import AppSendForm from "../../components/App/AppSendForm";
import { AppContext } from "../../components/App/AppContext";

import { Form, Input, InputPassword, Button } from "../../components/ui";


export class Auth extends React.Component {

    static contextType = AppContext;

    constructor(props){
        super(props);
        this.state = {
            data: {
                LOGIN: {
                    value: '',
                    required: true,
                },
                PASSWORD: {
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
    }

    componentDidMount() {
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

        const { alert, user } = this.context;

        this.loadingToggle(true);

        return AppSendForm({
            form: e.target
        }).then(result => {
            if(result === false){
                alert.show({display: true, header: "Ошибка", content: "Проверьте правильность заполнения формы"});
            }else if (result.status === 401 || result.status === 400) {
                alert.show({display: true, header: "Не удалось авторизоваться", content: "Логин или пароль не верны. Обратитесь в техническую поддержку"});
            } else if (result?.data) {
                if (result.data?.USER) {
                    if(result.data.USER?.UF_TOKEN){
                        user.login(result.data.USER);
                    }
                }
            }

            this.loadingToggle(false);
        });
    };

    loadingToggle(loading){
        this.setState({
            button: {
                variant: (loading) ? 'loading' : 'primary'
            }
        });
    }

    render(){

        const { confirm } = this.context;

        if (this.context.user.isAuth()) {
            return (
                <>
                    <Redirect to={{pathname: "/home"}} />
                </>
            );
        }else{
            return(
                <div id="AUTH" className="root-component">
                    <div className="logos-container container d-inline-block">
                        <div className="logotype position-relative">
                            <object type="image/svg+xml" data="img/parking-logo-auth.svg" className="parking-logo position-absolute" />
                            <object type="image/svg+xml" data="img/carmart-logo-auth.svg" className="carmart-logo" />
                        </div>
                    </div>
                    <Form method={"POST"} action="token" id="AUTH-FORM" className="container" onSubmit={this.handleSubmit}>
                        <Input autoComplete={"off"} min={1} placeholder="Введите логин" type={"text"} name={"LOGIN"} value={this.state.data.LOGIN.value || ''} onChange={this.handleChangeInput} />
                        <InputPassword autoComplete={"off"} min={1} placeholder="Введите пароль" name={"PASSWORD"} value={this.state.data.PASSWORD.value || ''} onChange={this.handleChangeInput} />
                        <Button type={"submit"} text={"Войдите в систему"} form={"AUTH-FORM"} variant={this.state.button.variant}/>
                    </Form>
                    <div className="contact-info">
                        <div>При возникновении ошибок свяжитесь с нами по номеру телефона</div>
                        <div onClick={() =>confirm.show({display: true})}>06053</div>
                    </div>
                </div>
            );
        }
    }
}
