import React from "react";
import ReactDOM from "react-dom";
import "cordova_script";

import { App } from "./components/App";


// запуск через push-уведомление
window.onNotification = function(e){

};


// функция готовности устройства для запуска приложения
function onDeviceReady(e) {

	console.log(window.cordova.file)

	if(window.device.platform.toLowerCase() === 'android'){
		window.pushNotification
			.tapped((e) => {
				ReactDOM.render(
					<App
						push={e}
						file={window.cordova.file}
					/>,
					document.getElementById("APP")
				);
			});

		window.WebViewManager.setForceDarkAllowed(false)
			.then(console.info)
			.catch(console.error);
	}else{
		ReactDOM.render(
			<App
				push={false}
			/>,
			document.getElementById("APP")
		);
	}

}

document.addEventListener("deviceready", onDeviceReady, false);
