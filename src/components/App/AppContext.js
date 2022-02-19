import React from "react";
import { Storage } from "./Storage";
import { Alert, Confirm } from "../ui/Alert";
import { Request } from "../utils/Request";

export const AppContext = React.createContext({});


export class AppProvider extends React.Component {

    storage;

    constructor(props) {
        super(props);

        this.storage = new Storage();

        this.state = {
            alert: {
                show: this.toggleAlert,
                hide: this.toggleAlert,
                _data: {
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
                login: this.login,
                logout: this.logout,
                isAuth: this.isAuth,
                profile: this.profile,
                setLocation: this.setLocation,
                _data: this.storage.get('USER')
            },
        };
    }

    _user = () => this.state.user._data;
    _alert = () => this.state.alert._data;
    _confirm = () => this.state.confirm._data;

    login = async (user = {}) => {
        this.storage.save('USER', user);
        await this.setState((prevState) => ({
            ...prevState,
            user: {
                ...prevState.user,
                _data: this.storage.get('USER')
            }
        }));
    };

    logout = () => {
        this.storage.remove('USER');
        this.setState((prevState) => ({
            ...prevState,
            user: {
                ...prevState.user,
                _data: this.storage.get('USER')
            }
        }));
    };

    isAuth = () => {
        return this.state.user._data?.UF_TOKEN;
    };

    profile = () => this.state.user._data;

    setLocation = async (location_id) => {
        return await Request({
            METHOD: 'PUT',
            URL: `user/${this.state.user._data.ID}/location`,
            USER: this.state.user._data,
            BODY: {
                UF_LOCATION: location_id
            }
        }).then((result) => {
            if(result.success === true){
                this.setState((prevState) => ({
                    ...prevState,
                    user: {
                        ...prevState.user,
                        _data: {
                            ...prevState.user._data,
                            UF_LOCATION: result.data.UF_LOCATION,
                        },
                    },
                }));
                let user = this.storage.get('USER');
                user.UF_LOCATION = result.data.UF_LOCATION;
                this.storage.save('USER', user);
                return true;
            }
        });
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

    render() {

        return (
            <AppContext.Provider value={this.state}>

                {this.props.children}

                <Alert />
                <Confirm />

            </AppContext.Provider>
        );
    }
}

export const AppConsumer = AppContext.Consumer;
