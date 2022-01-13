import React from 'react';


export class User extends React.Component {

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
    };

    logout = () => {
        this.delete();
        window.location.replace = '#/auth';
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
