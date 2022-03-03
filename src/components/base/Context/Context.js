import React from "react";

import { DB } from "../../App/Api";
import * as Storage from "../Storage";
import { Camera } from "../../App/Camera";
import { Wmenu } from "../../ui/Alert/Wmenu";
import { Alert, Confirm, Widget } from "../../ui/Alert";
import { Parking } from "../../App/Car/Parking";

export const Context = React.createContext({});

export class Provider extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            app: {
                update: this.appUpdate,
            },

            car: {
	            parking: this.toggleParking,
	            sector: this.setSectorParking,
	            place: this.setPlaceParking,
                _data: {
	                parking: false,
	                sectors: [],
                    car_id: 0,
                    sector_id: 0,
                    place_id: 0,
                }
            },

            camera: {
                status: this.statusCamera,
                _data: {
                    active: false,
                    loading: false,
                    scanned: false,
                }
            },

	        widget: {
		        show: this.toggleWidget,
		        hide: this.toggleWidget,
                _data: {
                    child: false
                }
            },

	        wmenu: {
		        show: this.toggleWmenu,
		        hide: this.toggleWmenu,
                _data: {
	                display: false
                }
            },

            alert: {
                show: this.toggleAlert,
                hide: this.toggleAlert,
                _data: {
                    callback: false,
                    header: "Внимание!",
                    content: "",
                    display: false
                }
            },

            confirm: {
                show: this.toggleConfirm,
                hide: this.toggleConfirm,
                _data: {
                    callback: false,
                    header: "Вы уверены?",
                    content: "",
                    display: false
                }
            },

            user: {
                USER_ID: Storage.get('USER_ID'),
                UF_TOKEN: Storage.get('UF_TOKEN'),
                UF_LOCATION: Storage.get('UF_LOCATION'),

                login: this.login,
                logout: this.logout,
                isAuth: this.isAuth,
                setLocation: this.setLocation
            },
        };
    }

    _user = () => this.state.user._data;
    _alert = () => this.state.alert._data;
    _confirm = () => this.state.confirm._data;

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

    statusCamera = (status = -1) => {
        let _data = this.state.camera._data;
        if(status < 0) return _data;
        if(status === 1){
            _data.active    = true;
            _data.loading   = false;
            _data.scanned   = false;
        }else if(status === 2){
            _data.active    = true;
            _data.loading   = true;
            _data.scanned   = false;
        }else if(status === 3){
            _data.active    = true;
            _data.loading   = false;
            _data.scanned   = true;
        }else{
            _data.active    = false;
            _data.loading   = false;
            _data.scanned   = false;
        }
        this.setState((prevState) => ({
            ...prevState,
            camera: {
                ...prevState.camera,
                _data: _data,
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

    setLocation = (id) => {
        Storage.save('UF_LOCATION', id);
        this.setState((prevState) => ({
            ...prevState,
            user: {
                ...prevState.user,
                UF_LOCATION: Storage.get('UF_LOCATION')
            }
        }));
    };

	toggleWmenu = async (props) => {
	    await this.setState((prevState) => ({
		    ...prevState,
		    wmenu: {
			    ...prevState.wmenu,
			    _data: {
				    ...prevState._data,
				    display: !(this.state.wmenu._data.display),
				    ...props,
			    },
		    },
	    }));
    };

    toggleWidget = async (props) => {
	    await this.setState((prevState) => ({
		    ...prevState,
		    widget: {
			    ...prevState.widget,
			    _data: {
				    ...prevState._data,
				    display: !(this.state.widget._data.display),
				    ...props,
			    },
		    },
	    }));
    };

    toggleAlert = async (props) => {
        await this.setState((prevState) => ({
            ...prevState,
            alert: {
                ...prevState.alert,
                _data: {
                    ...prevState._data,
                    display: !(this.state.alert._data.display),
                    ...props,
                },
            },
        }));
    };

    toggleConfirm = async (props) => {
        await this.setState((prevState) => ({
            ...prevState,
            confirm: {
                ...prevState.confirm,
                _data: {
                    ...prevState._data,
                    display: !(this.state.confirm._data.display),
                    ...props,
                },
            },
        }));
    };

	toggleParking = async (props) => {
        return this.setState((prevState) => ({
            ...prevState,
            car: {
                ...prevState.car,
                _data: {
                    ...prevState._data,
	                sectors: props?.sectors,
                    parking: !(this.state.car._data.parking),
                    ...props,
                },
            },
        }));
    };

	setSectorParking = async (sector_id) => {
        await this.setState((prevState) => ({
            ...prevState,
            car: {
                ...prevState.car,
                _data: {
                    ...prevState.car._data,
	                sector_id: sector_id,
	                car_id: null,
	                place_id: null,
                },
            },
        }));
    };

	setPlaceParking = async (place_id) => {
        await this.setState((prevState) => ({
            ...prevState,
            car: {
                ...prevState.car,
                _data: {
                    ...prevState.car._data,
	                parking: !(this.state.car._data.parking),
	                place_id: place_id
                },
            },
        }));
        return this.state.car._data.place_id
    };

    render() {

        return (
            <Context.Provider value={this.state}>

                {this.props.children}

	            <Widget child={ this.state.widget._data.child } />

	            <Parking items={ this.state.car._data.sectors }  />

	            <Camera />
	            <Confirm />
                <Alert />
                <Wmenu />


            </Context.Provider>
        );
    }
}

export const Consumer = Context.Consumer;
