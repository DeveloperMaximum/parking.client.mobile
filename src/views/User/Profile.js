import React from 'react';

import { Root, Header } from "../../components/ui";
import { Storage } from "../../components/App";
import { Context } from "../../components/App/Context";


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
                            <img src={profile.PERSONAL_PHOTO} alt={""} />
                        </div>
                        <div className="fullname">
                            <div>{profile.LAST_NAME}</div>
                            <div>{profile.NAME}</div>
                            <div>{profile.SECOND_NAME}</div>
                            <span className="exit d-block" onClick={async () => {
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

	                <div className="content-wrapper">
		                <div className="blocks-wrapper">
			                <div className="block">
				                <div className="title">Mercedes-Benz E-Класс W213</div>
				                <div className="sub-title">VIN JN1WNYD21U0000001</div>
				                <div className="events">
					                <div className="event d-flex mb-3">
						                <div className="side pr-2">
							                <i className="icon icon-alarm"/>
						                </div>
						                <div>
							                <div className="title">24 янв 2021 в 15:45</div>
							                <div className="description">Здесь должно быть указано место, куда был перемещён автомобиль</div>
						                </div>
					                </div>
					                <div className="event d-flex">
						                <div className="side pr-2">
							                <i className="icon icon-alarm"/>
						                </div>
						                <div>
							                <div className="title">24 янв 2021 в 15:45</div>
							                <div className="description">Здесь должно быть указано место, куда был перемещён автомобиль</div>
						                </div>
					                </div>
				                </div>
				                <div className="link">
					                <a href="#">Еще 3 перемещения</a>
				                </div>
			                </div>
			                <div className="block">
				                <div className="title">Mercedes-Benz E-Класс W213</div>
				                <div className="sub-title">VIN JN1WNYD21U0000001</div>
				                <div className="events">
					                <div className="event d-flex mb-3">
						                <div className="side pr-2">
							                <i className="icon icon-alarm"/>
						                </div>
						                <div>
							                <div className="title">24 янв 2021 в 15:45</div>
							                <div className="description">Здесь должно быть указано место, куда был перемещён автомобиль</div>
						                </div>
					                </div>
					                <div className="event d-flex">
						                <div className="side pr-2">
							                <i className="icon icon-alarm"/>
						                </div>
						                <div>
							                <div className="title">24 янв 2021 в 15:45</div>
							                <div className="description">Здесь должно быть указано место, куда был перемещён автомобиль</div>
						                </div>
					                </div>
				                </div>
				                <div className="link">
					                <a href="#">Еще 3 перемещения</a>
				                </div>
			                </div>
		                </div>
	                </div>
                </main>
            </Root>
        );
    }
}
