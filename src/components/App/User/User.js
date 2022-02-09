import React from 'react';
//document.getElementsByClassName('scanner-opacity')[0].style('border-top-width', (document.getElementsByTagName('body')[0].clientHeight - 230) / 2)

export class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: localStorage.getItem('USER') || {}
        };
    }

    login = (user = {}) => {
        this.setState({data: user});
        localStorage.setItem('USER', JSON.stringify(user));
    };

    logout = () => {
        this.setState({data: {}});
        localStorage.setItem('USER', JSON.stringify({}));
    };

    render() {
        return {
            login: this.login,
            logout: this.logout,
            data: this.state.data,
        }
    }
}
