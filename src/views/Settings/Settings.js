import React from 'react';

import { Root, Header } from "../../components/ui";
import { Context } from "../../components/App/Context";


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
                <Header>
                    <div className="d-flex" onClick={() => this.props.history.push(`/`)}>
                        <i className="icon icon-chevron_left d-inline-block" />
                        <h1 className="d-inline-block d-inline-block">Настройки</h1>
                    </div>
                </Header>

                <main>
                    <div className="content-wrapper">

                        <div className="card" onClick={this.clearCache}>
                            <div className="card-body">
                                <div className="card-title">Сбросить кеш</div>
                                <div className="card-text">Очистка приложения от кешируемых данных. После очистки необходимо заново пройти авторизацию</div>
                                <div className="card-link">Очистить кеш</div>
                            </div>
                        </div>

                        <div className="card" onClick={() => this.props.history.push(`/settings/location`)}>
                            <div className="card-body">
                                <div className="card-title">Сменить локацию</div>
                                <div className="card-text">Смена текущей локации.</div>
                                <div className="card-link">Сменить</div>
                            </div>
                        </div>

                        <div className="card" onClick={() => this.props.history.push(`/settings/manager`)}>
                            <div className="card-body">
                                <div className="card-title">Интерфейс менеджера</div>
                                <div className="card-text">Административный интерфейс</div>
                                <div className="card-link">Перейти</div>
                            </div>
                        </div>

                    </div>
                </main>
            </Root>
        );
    }
}
