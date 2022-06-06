import React, { Component } from 'react';
import { HashRouter, Switch, Route as ReactRoute } from "react-router-dom"

import { Provider } from "./Context";
import { Route } from "./Route";
import * as View from "../../views";

import "./App.css";


export class App extends Component {


    render(){
        // тут мы загрузили данные и вырубили заставку
        navigator.splashscreen.hide();

        return (
            <HashRouter>
                <Provider>

                    <Switch>
                        <Route exact path="/" component={View.Default} />
                        <Route exact path="/home" component={View.Default} />
                        <Route exact path="/profile" component={View.Profile} />
                        <Route exact path="/tickets" component={View.Tickets} />

	                    <Route exact path="/home/filter" component={View.Filter} />
	                    <Route exact path="/home/parking" component={View.Parking} />
	                    <Route exact path="/home/sector/:id" component={View.Sector} />
	                    <Route exact path="/home/car/:id" component={View.Car} />

	                    <Route exact path="/more/about" component={View.About} />

	                    <Route exact path="/more/home" component={View.DefaultHome} />
	                    <Route exact path="/more/location" component={View.Location} />
                        <Route exact path="/more/settings" component={View.Settings} />
                        <Route exact path="/more/settings/manager" component={View.Manager} />
                        <Route exact path="/more/settings/tech" component={View.Tech} />

	                    <Route exact path="/more/car/tdrive" component={View.Tdrive} />
	                    <Route exact path="/more/car/demo" component={View.Demo} />
	                    <Route exact path="/more/car/moved" component={View.Moved} />
	                    <Route exact path="/more/car/service" component={View.Service} />

	                    <ReactRoute exact path="/auth" component={View.Auth} />
	                    <ReactRoute exact path="/forbidden" component={View.Forbidden} />

                        <ReactRoute exact path="*" component={View.NotFound} />
                    </Switch>

                </Provider>
            </HashRouter>
        );
    }
}
