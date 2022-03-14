import React from "react";
import ReactDOM from "react-dom";
import "cordova_script";

import { App } from "./components/App";

function onBackKeyDown(e) {
    e.preventDefault();
}

function onDeviceReady(e) {

    ReactDOM.render(
        <App />,  document.getElementById("APP")
    );
    document.addEventListener("backbutton", onBackKeyDown, false);
}

document.addEventListener("deviceready", onDeviceReady, false);
