import React from 'react';

import { Root, Header } from "../../../components/ui";
import { Context } from "../../../components/App/Context";
import {NavLink} from "react-router-dom";


export class Settings extends React.Component {

    static contextType = Context;


    constructor(props){
        super(props);
    }

    clearCache = () => {
        this.context.confirm.show({
            header: "Сбросить кеш?",
            content: "Вы действительно хотите очистить кеш приложения?",
            success: "Сбросить",
            cancel: "Нет",
            callback: async () => {
                return new Promise((resolve, reject) => {
                    this.context.user.logout();
                    resolve(true);
                });
            }
        });
    };

    render() {

        return (
            <Root viewId={"SETTINGS"}>
	            <Header
		            history={this.props.history}
		            title={`Настройки`}
		            back={true}
	            />

                <main>
                    <div className="content-wrapper">

                        <div className="card" onClick={this.clearCache}>
                            <div className="card-body">
                                <div className="card-title">Сбросить кеш</div>
                                <div className="card-text">Очистка приложения от кешируемых данных. После очистки необходимо заново пройти авторизацию</div>
                                <div className="card-link">Очистить кеш</div>
                            </div>
                        </div>

                        <div className="card" onClick={() => this.props.history.push(`/more/settings/manager`)}>
                            <div className="card-body">
                                <div className="card-title">Для разработчиков</div>
                                <div className="card-text">Подробная информация об устройсвте</div>
                                <div className="card-link">Перейти</div>
                            </div>
                        </div>

	                    <br />
	                    <div className="d-flex border-bottom border-gray mb-3">
		                    <h4 className="pb-0 mb-2">
			                    Выборка автомобилей
		                    </h4>
	                    </div>

                        <div className="card" onClick={() => this.props.history.push(`/more/car/tdrive`)}>
                            <div className="card-body">
                                <div className="card-title">Тест-драйв</div>
                                <div className="card-text">Автомобили в статусе тест-драйв</div>
                                <div className="card-link">Перейти</div>
                            </div>
                        </div>

                        <div className="card" onClick={() => this.props.history.push(`/more/car/moved`)}>
                            <div className="card-body">
                                <div className="card-title">В движении</div>
                                <div className="card-text">Автомобили в статусе передвижения</div>
                                <div className="card-link">Перейти</div>
                            </div>
                        </div>

                        <div className="card" onClick={() => this.props.history.push(`/more/car/service`)}>
                            <div className="card-body">
                                <div className="card-title">В сервисе</div>
                                <div className="card-text">Автомобили в сервисе</div>
                                <div className="card-link">Перейти</div>
                            </div>
                        </div>

                    </div>
                </main>
            </Root>
        );
    }
}
