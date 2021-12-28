import React from "react";
import ReactDOM from "react-dom";
import "cordova_script";

import { App } from "./components/App";


document.addEventListener(
    "deviceready",
    () => {
        ReactDOM.render(
            <App />,
            document.getElementById("APP")
        );
    },
    false
);
