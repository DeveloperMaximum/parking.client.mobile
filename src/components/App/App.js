import React, { Component } from 'react';
import { HashRouter, Routes, Route, Link } from "react-router-dom"

import { AppContext, PrivateRoute, User } from './';
import { Auth, Home, Forbidden, NotFound } from "../../views";

import "./App.css";
import { Alert } from "../ui";

export class App extends Component {

    constructor(props){
        super(props);

        this.setUser = this.setUser.bind(this);
        this.onAlert = this.onAlert.bind(this);
        this.offAlert = this.offAlert.bind(this);

        this.state = {
            alert: {
                header: "Внимание",
                content: "",
                button: "Хорошо",
                onClose: this.offAlert,
                display: false
            },
            USER: new User()
        };
    }

    onAlert(params){
        this.setState((prevState) => ({
            ...prevState.alert,
            ...params,
        }));
    }

    offAlert(){
        this.setState((prevState) => ({
            ...prevState.alert,
            ...{display: false},
        }));
    }

    setUser(USER){
        let tmpUser = new User();
        tmpUser.login(USER);
        this.setState((prevState) => ({
            ...{ USER: tmpUser },
        }));
    }

    render(){

        // тут мы загрузили данные и вырубили заставку
        navigator.splashscreen.hide();

        return (
            <>
                <AppContext.Provider value={this.state}>
                    <Alert onClose={this.offAlert}/>
                </AppContext.Provider>
                <HashRouter>
                    <Routes>
                        <Route exact path='/' element={<PrivateRoute USER={this.state.USER} />}>
                            <Route exact path="/" element={<Home USER={this.state.USER} />} />
                        </Route>
                        <Route exact path="/auth" element={<Auth USER={this.state.USER} onAlert={this.onAlert} setUser={this.setUser} />} />
                        <Route exact path="/forbidden" element={<Forbidden />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </HashRouter>
            </>
        );
    }
}
