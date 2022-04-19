import React, { Component } from 'react';
import { HashRouter, Switch, Route as ReactRoute } from "react-router-dom"

import * as Route from "./Route";
import * as Context from "./Context";
import * as View from "../../views";

import "./App.css";


export class App extends Component {


    render(){
        // тут мы загрузили данные и вырубили заставку
        navigator.splashscreen.hide();

        return (
            <HashRouter>
                <Context.Provider>

                    <Switch>
                        <Route.Private exact path="/" component={View.Default} />
                        <Route.Private exact path="/home" component={View.Home} />
                        <Route.Private exact path="/filter" component={View.Filter} />
                        <Route.Private exact path="/profile" component={View.Profile} />

	                    <Route.Private exact path="/home/parking" component={View.Home} />
	                    <Route.Private exact path="/home/sector/:id" component={View.Sector} />
	                    <Route.Private exact path="/home/sector/:sector/place/:place" component={View.Place} />
	                    <Route.Private exact path="/home/car/:id" component={View.Car} />

                        <Route.Private exact path="/settings" component={View.Settings} />
                        <Route.Private exact path="/settings/location" component={View.Location} />
                        <Route.Private exact path="/settings/manager" component={View.Manager} />
                        <Route.Private exact path="/settings/manager/tech" component={View.Tech} />

                        <Route.Private exact path="/pages/about" component={View.About} />

                        <ReactRoute exact path="/auth" component={View.Auth} />
                        <ReactRoute exact path="/forbidden" component={View.Forbidden} />

	                    <Route.Private exact path="/map" component={View.Map} />
	                    <Route.Private exact path="/catalog/tdrive" component={View.Tdrive} />
	                    <Route.Private exact path="/catalog/Demo" component={View.Demo} />

                        <ReactRoute exact path="*" component={View.NotFound} />
                    </Switch>

                </Context.Provider>
            </HashRouter>
        );
    }
}
