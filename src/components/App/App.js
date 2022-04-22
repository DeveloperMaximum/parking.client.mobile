import React, { Component } from 'react';
import { HashRouter, Switch, Route as ReactRoute } from "react-router-dom"

import { Provider } from "./Context";
import { Route } from "./Route";
import * as View from "../../views";

import "./App.css";
import {Footer} from "../ui/Footer";


export class App extends Component {


    render(){
        // тут мы загрузили данные и вырубили заставку
        navigator.splashscreen.hide();

        return (
            <HashRouter>
                <Provider>

                    <Switch>
                        <Route exact path="/" component={View.Default} />
                        <Route exact path="/home" component={View.Home} />
                        <Route exact path="/filter" component={View.Filter} />
                        <Route exact path="/profile" component={View.Profile} />

	                    <Route exact path="/home/parking" component={View.Home} />
	                    <Route exact path="/home/sector/:id" component={View.Sector} />
	                    <Route exact path="/home/sector/:sector/place/:place" component={View.Place} />
	                    <Route exact path="/home/car/:id" component={View.Car} />

                        <Route exact path="/settings" component={View.Settings} />
                        <Route exact path="/settings/location" component={View.Location} />
                        <Route exact path="/settings/manager" component={View.Manager} />
                        <Route exact path="/settings/manager/tech" component={View.Tech} />

                        <Route exact path="/pages/about" component={View.About} />

                        <ReactRoute exact path="/auth" component={View.Auth} />
                        <ReactRoute exact path="/forbidden" component={View.Forbidden} />

	                    <Route exact path="/map" component={View.Map} />
	                    <Route exact path="/catalog/tdrive" component={View.Tdrive} />
	                    <Route exact path="/catalog/Demo" component={View.Demo} />

                        <ReactRoute exact path="*" component={View.NotFound} />
                    </Switch>

                </Provider>
            </HashRouter>
        );
    }
}
