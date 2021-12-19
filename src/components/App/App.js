import React from 'react';
import { HashRouter, Switch, Route } from "react-router-dom";

import AppRoute from './AppRoute';
import AppUser from './AppUser';
import Home from "../../pages/Home/Home";
import Auth from "../../pages/Auth/Auth";
import Forbidden from "../../pages/Forbidden/Forbidden";
import NotFound from "../../pages/NotFound/NotFound";

import "./App.css";

function App(){

    const USER = new AppUser();

    // тут мы загрузили данные и вырубили заставку
    navigator.splashscreen.hide();

    return (
        <HashRouter>
            <Switch>
                <AppRoute exact path="/" component={Home} USER={USER} />
                <Route exact path="/auth" render={ props => <Auth {...props} USER={USER} /> } />
                <Route exact path="/forbidden" component={Forbidden} />
                <Route path="*" component={NotFound} />
            </Switch>
        </HashRouter>
    );
}

export default App;
