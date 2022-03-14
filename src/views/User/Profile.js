import React from 'react';

import { Context } from "../../components/base/Context";
import { Root } from "../../components/ui/Root/Root";
import { Header } from "../../components/ui/Header/Header";
import { Footer } from "../../components/ui/Footer/Footer";
import * as Storage from "../../components/base/Storage";

export class Profile extends React.Component {

    static contextType = Context;

    render() {

        const profile = Storage.get('USER');

        return (
            <Root viewId={"PROFILE"}>
                <Header>
                    <div className="d-flex" onClick={() => this.props.history.push(`/`)}>
                        <i className="icon icon-chevron_left d-inline-block" />
                        <h1 className="d-inline-block d-inline-block">Профиль</h1>
                    </div>
                </Header>

                <main>
                    <div className="profile-info d-flex bg-info">
                        <div className="thumb">
                            <img src={profile.PERSONAL_PHOTO}/>
                        </div>
                        <div className="fullname">
                            <div>{profile.LAST_NAME}</div>
                            <div>{profile.NAME}</div>
                            <div>{profile.SECOND_NAME}</div>
                            <span className="exit d-block" onClick={async () => {
	                            await this.context.confirm({
		                            header: "Выйти из приложения",
		                            content: "Вы действительно хотите покинуть приложение?",
		                            success: "Да, выйти",
		                            cancel: "Нет",
		                            callback: async () => {
			                            return new Promise((resolve, reject) => {
				                            this.context.logout();
				                            resolve(true);
			                            });
		                            },
	                            });
                            }}>Выйти из приложения</span>
                        </div>
                    </div>
                </main>

                <Footer history={this.props.history} />
            </Root>
        );
    }
}
