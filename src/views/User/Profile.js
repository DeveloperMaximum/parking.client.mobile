import React from 'react';

import { Root, Header } from "../../components/ui";
import { Storage } from "../../components/App";
import { User } from "../../components/App/Api";
import { Context } from "../../components/App/Context";


export class Profile extends React.Component {

    static contextType = Context;


	constructor(props){
		super(props);
		this.state = {
			loading: true,
			history: false,
			page: 1
		};
	}

	componentDidMount() {
		return User.History({page: this.state.page}).then((result) => {
			this.setState((prevState) => ({
				...prevState,
				loading: false,
				history: result,
				page: (this.state.page + 1)
			}));
		})
	}

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return false;
		}
	}

	handleMore = async () => {
		this.setState((prevState) => ({ ...prevState, loading: true }));
		User.History({page: this.state.page}).then((result) => {
			this.setState((prevState) => ({
				...prevState,
				loading: false,
				history: this.state.history.concat(result),
				page: (result.length > 0) ? (this.state.page + 1) : false,
			}));
		});
	};

	onScroll = async (e) => {
		if(this.state.page !== false && this.state.loading === false){
			if(e.target.scrollTop > (e.target.scrollHeight / 1.75)){
				return await this.handleMore();
			}
		}
	};

	handleExit = async (e) => {
		await this.context.dialog({
			header: "Выйти из приложения",
			content: "Вы действительно хотите покинуть приложение?",
			buttons: {
				exit: {
					text: 'Да, выйти',
					callback: async () => {
						return new Promise((resolve, reject) => {
							this.context.logout();
							resolve(true);
						});
					}
				},
			},
		})
	};

    render() {

	    let roles = [];
	    const role = Storage.get('ROLE');
        const profile = Storage.get('USER');
	    Object.keys(profile.ROLES).forEach(function(key) {
	    	if(role[key]){
			    roles.push(role[key].NAME);
		    }
	    });

        return (
            <Root viewId={"PROFILE"}>
                <Header
	                title={`Профиль`}
                    back={() => this.props.history.push(`/`)}
                 />

                <main onScroll={this.onScroll}>
                    <div className="profile-info d-flex bg-info">
                        <div className="thumb">
                            <img src={profile.PERSONAL_PHOTO} alt={""} />
                        </div>
                        <div className="fullname">
                            <div>{profile.LAST_NAME}</div>
                            <div>{profile.NAME}</div>
                            <div>{profile.SECOND_NAME}</div>

	                        <div className="text-muted">
		                        <small>{roles.join(" / ")}</small>
	                        </div>

                            <span className="exit d-block" onClick={this.handleExit}>Выйти из приложения</span>
                        </div>
                    </div>

	                <div className="content-wrapper">
		                {this.state.history === false ? (
			                <div className={"spinner"} />
		                ) : (
			                <div className="blocks-wrapper">
				                {this.state.history.map((item, index) => (
					                <div className="block" key={index}>
						                <div className="title">{item.CAR?.BRAND} {item.CAR?.MODEL}</div>
						                <div className="sub-title">VIN {item.CAR?.VIN}</div>
						                <div className="events">
							                {item.EVENTS.map((event, i) => (
								                <div className="event d-flex mb-3" key={i}>
									                <div className="side pr-2">
										                <i className="icon icon-alarm"/>
									                </div>
									                <div>
										                <div className="title">{event.DATE_CREATE}</div>
										                <div className="description">STATUS_{event.STATUS_ID}</div>
									                </div>
								                </div>
							                ))}
						                </div>
					                </div>
				                ))}
			                </div>
		                )}
		                {this.state.loading === true && this.state.history !== false ? (
			                <div className={"spinner"} />
		                ) : (<></>)}
	                </div>
                </main>
            </Root>
        );
    }
}
