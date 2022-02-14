import React from "react";
import {Alert} from "../ui/Alert";
import {Confirm} from "../ui/Alert";
import {Storage} from "./Storage";

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
                    header: "Внимание",
                    content: "",
                    display: false
                }
            },

            confirm: {
                show: this.toggleConfirm,
                hide: this.toggleConfirm,
                _data: {
                    header: "Внимание",
                    content: "",
                    display: false
                }
            },

            user: {
                login: this.login,
                logout: this.logout,
                isAuth: this.isAuth,
                profile: this.profile,
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

    logout = async () => {
        this.storage.remove('USER');
        await this.setState((prevState) => ({
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
