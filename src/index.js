import React from "react";
import ReactDOM from "react-dom";
import "cordova_script";

import { App } from "./components/App";

function onBackKeyDown(e) {
    e.preventDefault();
}

document.addEventListener(
    "deviceready",
    () => {

        document.addEventListener("backbutton", onBackKeyDown, false);
        ReactDOM.render(<App />,  document.getElementById("APP"));
    },
    false
);
