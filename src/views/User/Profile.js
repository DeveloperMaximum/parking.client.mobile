import React from 'react';

import * as Storage from "../../components/utils/Storage";
import { Context } from "../../components/App/Context";
import { Root, Header } from "../../components/ui";
import * as History from "../../components/App/History";
import {Car, User} from "../../components/App/Api";


export class Profile extends React.Component {

    static contextType = Context;


	constructor(props){
		super(props);
		this.state = {

		};
	}

	componentDidMount() {
		this.setState((prevState) => ({
			...prevState,
		}));
	}

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return false;
		}
	}

	handleExit = async (e) => {
		window.dispatchEvent(new CustomEvent(`app.dialog`, { detail: {
			header: "Выйти из приложения",
			content: "Вы действительно хотите покинуть приложение?",
			onClose: navigator.splashscreen.hide,
			buttons: [{
				text: 'Да',
				onClick: async () => {
					window.dispatchEvent(new CustomEvent(`app.logout`));
				}
			}]
		}}));
	};

    render() {

	    let roles = [];
	    const role = Storage.get('ROLE');
	    const profile = Storage.get('USER');

	    if(profile){
		    Object.keys(profile.ROLES).forEach(function(key) {
			    if(role[key]){
				    roles.push(role[key].NAME);
			    }
		    });
	    }

        return (
            <Root viewId={"PROFILE"} active={true}>
                <Header title={`Профиль`} back={() => this.props.history.push(`/`)} />

                <main>

	                <div className="profile-info d-flex alert alert-info position-relative w-100 mb-0 shadow">
		                <div className="thumb">
			                <img src={profile.PERSONAL_PHOTO} alt={""} />
		                </div>
		                <div className="fullname">
			                <div className={'appeal font-weight-700'}>
				                <div className={'pr-2 text-body'}>{profile.LAST_NAME}</div>
				                <div className={"pr-2 text-body"}>{profile.NAME}</div>
				                {profile?.SECOND_NAME && profile.SECOND_NAME !== '' ? (<div className={"text-body"}>{profile.SECOND_NAME}</div>) : (null)}
			                </div>

			                <div className="text-muted small">
				                {roles.join(" / ")}
			                </div>

			                <div>
				                <span className="exit d-block text-blue" onClick={this.handleExit}>Выйти из приложения</span>
			                </div>
		                </div>
	                </div>

	                <History.List
	                    filter={{
		                    LOGIC: 'FILTER',
		                    CREATE_RESPONSIBLE_ID: 4,
		                    END_RESPONSIBLE_ID: 4
	                    }}
	                >

	                </History.List>
                </main>
            </Root>
        );
    }
}
