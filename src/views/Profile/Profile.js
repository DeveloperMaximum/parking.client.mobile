import React from 'react';

import { AppContext } from "../../components/App/AppContext";
import { Tapbar } from "../../components/App";

export class Profile extends React.Component {

    static contextType = AppContext;

    constructor(props){
        super(props);
    }

    logout = async () => {
        const { confirm } = this.context;
        await confirm.show({
            header: "Выйти из приложения",
            content: "Вы действительно хотите покинуть приложение?",
            success: "Да, выйти",
            cancel: "Нет",
            callback: () => this.context.user.logout()
        });
    };

    render() {
        const profile = this.context.user.profile();

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
                                <img src={profile.PERSONAL_PHOTO}/>
                            </div>
                            <div className="fullname">
                                <div>{profile.LAST_NAME}</div>
                                <div>{profile.NAME}</div>
                                <div>{profile.SECOND_NAME}</div>
                                <span className="exit d-block" onClick={this.logout}>Выйти из приложения</span>
                            </div>
                        </div>
                    </main>
                </div>
                <Tapbar history={this.props.history} APP={this.props.APP} />
            </>
        );
    }
}
