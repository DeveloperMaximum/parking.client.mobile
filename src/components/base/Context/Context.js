import React from "react";

import { DB } from "../../App/Api";
import * as Storage from "../Storage";
import { Camera } from "../../App/Camera";
import { Wmenu } from "../../ui/Alert/Wmenu";
import { Alert, Confirm, Widget } from "../../ui/Alert";

export const Context = React.createContext({});

export class Provider extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            app: {
                update: this.appUpdate,
            },

            camera: {
	            active: false,
	            loading: false,
	            scanned: false,
            },

	        widget: {
		        child: false,
		        header: false,
		        right: {
			        text: false,
			        callback: false
		        }
            },

	        wmenu: {
		        display: false
            },

            alert: {
	            callback: false,
	            header: "Внимание!",
	            content: "",
	            display: false
            },

            confirm: {
	            callback: false,
	            header: "Вы уверены?",
	            content: "",
	            display: false
            },

            user: {
                USER_ID: Storage.get('USER_ID'),
                UF_TOKEN: Storage.get('UF_TOKEN'),
                UF_LOCATION: Storage.get('UF_LOCATION'),
            },
        };
    }

    appUpdate = async () => {
        return DB.get().then((result) => {
            if(result !== false){
                Object.keys(result).forEach((key) => {
                    Storage.save(key, result[key]);
                });
            }
            return result;
        });
    };

    accessStatus(status){
    	let matrix = Storage.get('ACCESS_STATUSES');
    	let user = Storage.get('USER');
	    for (let role in user.ROLES){
	    	if(matrix[role] && matrix[role].includes(status)){
			    return true;
		    }
	    }
	    return false;
    }

    camera = (status = -1) => {
        if(status < 0) return this.state.camera;
        if(status === 1){
	        this.state.camera.active    = true;
	        this.state.camera.loading   = false;
	        this.state.camera.scanned   = false;
        }else if(status === 2){
	        this.state.camera.active    = true;
	        this.state.camera.loading   = true;
	        this.state.camera.scanned   = false;
        }else if(status === 3){
	        this.state.camera.active    = true;
	        this.state.camera.loading   = false;
	        this.state.camera.scanned   = true;
        }else{
	        this.state.camera.active    = false;
	        this.state.camera.loading   = false;
	        this.state.camera.scanned   = false;
        }
        this.setState((prevState) => ({
            ...prevState,
            camera: {
                ...prevState.camera
            }
        }));
    };

    login = async (user = {}) => {
        Storage.save('USER', user);
        Storage.save('USER_ID', user.ID);
        Storage.save('UF_TOKEN', user.UF_TOKEN);

        let uf_location = Storage.get('UF_LOCATION');
        if(!uf_location){
            await this.state.app.update().then((r) => {
                return true;
            });
        }
        await this.state.app.update().then((db) => {
            if(db.MAP.length > 0){
                Storage.save('UF_LOCATION', db.MAP[0].ID)
            }

            this.setState((prevState) => ({
                ...prevState,
                user: {
                    ...prevState.user,
                    USER_ID: Storage.get('USER_ID'),
                    UF_TOKEN: Storage.get('UF_TOKEN'),
                    UF_LOCATION: Storage.get('UF_LOCATION')
                }
            }));
        });
    };

    logout = () => {
        Storage.clear();
        this.setState((prevState) => ({
            ...prevState,
            user: {
                ...prevState.user,
                USER_ID: Storage.get('USER_ID'),
                UF_TOKEN: Storage.get('UF_TOKEN'),
                UF_LOCATION: Storage.get('UF_LOCATION')
            }
        }));
    };

    isAuth = () => (typeof this.state.user.UF_TOKEN === "string");

	location = (id) => {
        Storage.save('UF_LOCATION', id);
        this.setState((prevState) => ({
            ...prevState,
            user: {
                ...prevState.user,
                UF_LOCATION: Storage.get('UF_LOCATION')
            }
        }));
    };

	wmenu = async () => {
	    return this.setState((prevState) => ({
		    ...prevState,
		    wmenu: {
			    ...prevState.wmenu,
			    display: !(this.state.wmenu.display)
		    }
	    }));
    };

    widget = async (props = false) => {
	    if(props === false){
	    	props = {
			    child: false,
			    header: false,
			    right: {
				    text: false,
				    callback: false
			    }
		    };
	    }
	    await this.setState((prevState) => ({
		    ...prevState,
		    widget: {
			    ...prevState.widget,
			    display: !(this.state.widget.display),
			    ...props
		    }
	    }));
    };

    alert = async (props = false) => {
	    if(props === false) props = {};
        await this.setState((prevState) => ({
            ...prevState,
            alert: {
                ...prevState.alert,
                display: !(this.state.alert.display),
                ...props
            }
        }));
    };

    confirm = async (props = false) => {
	    if(props === false) props = {};
        await this.setState((prevState) => ({
            ...prevState,
            confirm: {
	            ...prevState.confirm,
	            display: !(this.state.confirm.display),
	            ...props
            }
        }));
    };

    render() {

        return (
            <Context.Provider value={{
            	    data: this.state,
	                appUpdate: this.appUpdate,
	                login: this.login,
		            logout: this.logout,
		            isAuth: this.isAuth,
	                camera: this.camera,
		            location: this.location,
		            wmenu: this.wmenu,
		            widget: this.widget,
		            alert: this.alert,
		            confirm: this.confirm,
	                accessStatus: this.accessStatus,
                }}>

                {this.props.children}

	            <Widget />

	            <Camera />
	            <Confirm />
                <Alert />
                <Wmenu />


            </Context.Provider>
        );
    }
}

export const Consumer = Context.Consumer;
