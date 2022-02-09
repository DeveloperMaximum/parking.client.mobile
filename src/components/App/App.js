import React, { Component } from 'react';
import { HashRouter, Switch, Route } from "react-router-dom"

import {AppContext, PrivateRoute, User} from './';
import { Auth, Home, Profile, Map, Car, About, Default, Forbidden, NotFound } from "../../views";

import "./App.css";
import { Alert } from "../ui";
import { Scanner } from "./Scanner";
import { Storage } from "./Storage";
import {Redirect} from "react-router";

export class App extends Component {

    constructor(props){
        super(props);

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
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
            storage: new Storage(),
            scanner: new Scanner(),
            auth: !!((new Storage()).get('USER')?.UF_TOKEN),
        };
    }

    componentDidMount() {
        let user = this.state.storage.get('USER');
        this.setState((prevState) => ({
            ...prevState,
            auth: !!(user?.UF_TOKEN)
        }));
    }

    componentWillUnmount() {
        // todo: закрытие компонента
        this.setState = (state, callback) => {
            return false;
        }
    }

    onAlert(params){
        this.setState((prevState) => ({
            ...prevState,
            alert: params,
        }));
    }

    offAlert(){
        this.setState((prevState) => ({
            ...prevState,
            alert: {
                display: false
            },
        }));
    }

    login = (user) => {
        this.state.storage.set('USER', user);
        this.setState((prevState) => ({
            ...prevState,
            auth: !!(user?.UF_TOKEN)
        }));
    };

    logout = () => {
        this.state.storage.set('USER', {});
        this.setState((prevState) => ({
            ...prevState,
            auth: false
        }));
    };

    render(){
        // тут мы загрузили данные и вырубили заставку
        navigator.splashscreen.hide();

        return (

            <HashRouter>
                <AppContext.Provider value={this.state.alert}>
                    <Alert onClose={this.offAlert} />
                </AppContext.Provider>

                <Switch>
                    <PrivateRoute exact path="/" APP={this.state} component={Default} />
                    <PrivateRoute exact path="/home" APP={this.state} component={Home} />

                    <PrivateRoute exact path="/profile" APP={this.state} logout={this.logout} component={Profile} />

                    <PrivateRoute exact path="/map" APP={this.state} component={Map} />

                    <PrivateRoute path="/car/:id" APP={this.state} component={Car} />

                    <Route exact path="/auth" render={ () => <Auth login={this.login} onAlert={this.onAlert} offAlert={this.offAlert} APP={this.state} />} />
                    <Route exact path="/forbidden" component={Forbidden} />

                    <Route exact path="/pages/about" APP={this.state} component={About} />

                    <Route exact path="*" component={NotFound}/>
                </Switch>

                <div id={"scanner-opacity"} className={"scanner-opacity"} />
            </HashRouter>
        );
    }
}
