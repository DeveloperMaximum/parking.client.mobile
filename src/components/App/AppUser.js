import React from 'react';


export default class AppUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.get()
        };
    }

    get = () => {
        return JSON.parse(localStorage.getItem('USER'));
    };

    save = (userArray) => {
        localStorage.setItem('USER', JSON.stringify(userArray));
    };

    delete = () => {
        localStorage.removeItem('USER');
    };

    login = (userArray) => {
        this.save(userArray);
        window.location.hash = '/';
    };

    logout = () => {
        this.delete();
        window.location.hash = '/auth';
    };

    componentDidMount() {
        this.setState({
            data: this.get()
        });
    }

    render() {
        return {
            get: this.get,
            save: this.save,
            delete: this.delete,
            login: this.login,
            logout: this.logout,
            data: this.state.data,
        }
    }
}
