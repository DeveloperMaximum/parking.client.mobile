import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";

import { Request } from "../../components/utils/Request";
import {CarItem, Tapbar} from "../../components/App";

export class Profile extends React.Component {

    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout = () => {
        console.log(this.props)
        this.props.logout();
        this.props.history.push(`/auth`)
    };

    render() {

        return (
            <>
                <div id="PROFILE" className="root-component">
                    <header>
                        <div className="d-flex" onClick={() => this.props.history.push(`/`)}>
                            <i className="icon icon-chevron_left d-inline-block" />
                            <h1 className="d-inline-block d-inline-block">Ваш профиль</h1>
                        </div>
                    </header>

                    <main>
                        <div className="profile-info d-flex bg-info">
                            <div className="thumb">
                                <img src="img/avatar.png"/>
                            </div>
                            <div className="fullname">
                                <div>{this.props.APP.storage.get('USER').LAST_NAME}</div>
                                <div>{this.props.APP.storage.get('USER').NAME}</div>
                                <div>{this.props.APP.storage.get('USER').SECOND_NAME}</div>
                                <span className="exit d-block" onClick={() => this.logout()}>Выйти из приложения</span>
                            </div>
                        </div>
                    </main>
                </div>
                <Tapbar history={this.props.history} APP={this.props.APP}/>
            </>
        );
    }
}
