import React, { Component } from 'react';
import { HashRouter, Switch, Route } from "react-router-dom"

import { Provider } from "../base/Context";
import { ParkingProvider } from "../base/Context/Parking";
import { PrivateRoute } from "../base/PrivateRoute";
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
                        <PrivateRoute exact path="/" component={View.Default} />
                        <PrivateRoute exact path="/home" component={View.Home} />
                        <PrivateRoute exact path="/filter" component={View.Filter} />
                        <PrivateRoute exact path="/profile" component={View.Profile} />

                        <PrivateRoute exact path="/settings" component={View.Settings} />
                        <PrivateRoute exact path="/settings/location" component={View.Location} />
                        <PrivateRoute exact path="/settings/manager" component={View.Manager} />
                        <PrivateRoute exact path="/settings/manager/tech" component={View.Tech} />

                        <PrivateRoute exact path="/pages/about" component={View.About} />

                        <Route exact path="/auth" component={View.Auth} />
                        <Route exact path="/forbidden" component={View.Forbidden} />

	                    <ParkingProvider>
		                    <PrivateRoute exact path="/map" component={View.Map} />
		                    <PrivateRoute exact path="/map/sector/:id" component={View.Sector} />
		                    <PrivateRoute exact path="/catalog/car/:id" component={View.Car} />
		                    <PrivateRoute exact path="/catalog/tdrive" component={View.Tdrive} />
	                    </ParkingProvider>

                        <Route exact path="*" component={View.NotFound} />
                    </Switch>

                </Provider>
            </HashRouter>
        );
    }
}
