import React from "react";

import { Widget, Sider, Wmenu } from "../../ui/Widget";
import { Dialog } from "../../ui/Dialog";
import { DB, User} from "../Api";
import * as Storage from "../Storage";
import { Camera } from "../Camera";

export const App = React.createContext({});

export class Provider extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            app: {

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

	        sider: {
		        title: false,
		        child: false,
		        display: false,
		        template: true,
            },

	        wmenu: {
		        display: false
            },

	        dialog: {
		        buttons: {},
	            header: "Внимание!",
	            content: "",
		        child: false,
		        callback: false,
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

        let camera = { active: false, loading: false, scanned: false };
        if(status === 1){
	        camera.active    = true;
	        camera.loading   = false;
	        camera.scanned   = false;
        }else if(status === 2){
	        camera.active    = true;
	        camera.loading   = true;
	        camera.scanned   = false;
        }else if(status === 3){
	        camera.active    = true;
	        camera.loading   = false;
	        camera.scanned   = true;
        }
        this.setState((prevState) => ({
            ...prevState,
	        camera
        }));
    };

    login = async (user = {}) => {
	    Storage.save('UF_TOKEN', user.UF_TOKEN);

	    return DB.get().then((result) => {
		    if(result !== false){
			    Object.keys(result).forEach((key) => {
				    Storage.save(key, result[key]);
			    });
		    }

		    Storage.save('USER', user);
		    Storage.save('USER_ID', user.ID);
		    Storage.save('UF_LOCATION', user.UF_LOCATION);

		    this.setState((prevState) => ({
			    ...prevState,
			    user: {
				    ...prevState.user,
				    USER_ID: Storage.get('USER_ID'),
				    UF_TOKEN: Storage.get('UF_TOKEN'),
				    UF_LOCATION: Storage.get('UF_LOCATION')
			    }
		    }));
		    return result;
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

    isAuth = () => ((typeof this.state.user.UF_TOKEN === "string") && (typeof this.state.user.USER_ID === "string") && (typeof this.state.user.UF_LOCATION === "string"));

	location = async (id) => {
		return await User.location({ID: id}).then(async result => {
			Storage.save('UF_LOCATION', result.UF_LOCATION);
			await this.setState((prevState) => ({
				...prevState,
				user: {
					...prevState.user,
					UF_LOCATION: Storage.get('UF_LOCATION')
				}
			}));
		});
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

    dialog = async (props = false) => {
	    if(props === false){
		    props = {
			    buttons: {},
			    header: "Внимание!",
			    content: "",
			    child: false,
			    callback: false,
			    display: false
		    };
	    }
        await this.setState((prevState) => ({
            ...prevState,
	        dialog: {
                ...prevState.dialog,
                display: !(this.state.dialog.display),
                ...props
            }
        }));
    };

	sider = async (props = false) => {
		if(props === false){
			props = {
				title: false,
				child: false,
				display: false,
				template: true,
			};
		}
        await this.setState((prevState) => ({
            ...prevState,
	        sider: {
                ...prevState.sider,
		        display: true,
                ...props
            }
        }));
    };

    render() {

        return (
            <App.Provider value={{
                data: this.state,
                login: this.login,
	            logout: this.logout,
	            isAuth: this.isAuth,
                camera: this.camera,
	            location: this.location,
	            wmenu: this.wmenu,
	            sider: this.sider,
	            widget: this.widget,
	            dialog: this.dialog,
                accessStatus: this.accessStatus,
            }}>

	            <Sider />
                {this.props.children}

	            <Widget />
	            <Dialog />

	            <Camera />
                <Wmenu />


            </App.Provider>
        );
    }
}

export const Consumer = App.Consumer;
