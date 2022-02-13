import React, { Component } from 'react';
import { HashRouter, Switch, Route } from "react-router-dom"

import { AppProvider } from "./AppContext";
import { PrivateRoute } from "./PrivateRoute";
import { Auth, Home, Profile, Map, Car, About, Settings, Location, Default, NotFound } from "../../views";

import "./App.css";

export class App extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.setState((prevState) => ({
            ...prevState,
        }));
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return false;
        }
    }

    render(){
        // тут мы загрузили данные и вырубили заставку
        navigator.splashscreen.hide();

        return (

            <HashRouter>
                <AppProvider>

                    <Switch>

                        <PrivateRoute exact path="/" component={Default} />
                        <PrivateRoute exact path="/home" component={Home} />
                        <PrivateRoute exact path="/profile" component={Profile} />
                        <PrivateRoute exact path="/map" component={Map} />
                        <PrivateRoute exact path="/settings" component={Settings} />
                        <PrivateRoute exact path="/location" component={Location} />
                        <PrivateRoute exact path="/pages/about" component={About} />

                        <PrivateRoute path="/car/:id" component={Car} />

                        <Route exact path="/auth" component={Auth} />
                        <Route exact path="*" component={NotFound} />
                    </Switch>

                </AppProvider>
            </HashRouter>
        );
    }
}
