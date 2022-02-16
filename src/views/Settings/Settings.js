import React from 'react';

import { AppContext } from "../../components/App/AppContext";
import { Tapbar } from "../../components/App";
import {NavLink} from "react-router-dom";

export class Settings extends React.Component {

    static contextType = AppContext;

    constructor(props){
        super(props);
    }

    clearCache = async () => {
        const { confirm } = this.context;
        await confirm.show({
            header: "Сбросить кеш?",
            content: "Вы действительно хотите очистить кеш приложения?",
            success: "Сбросить",
            cancel: "Нет",
            callback: () => this.context.user.logout()
        });
    };

    render() {

        return (
            <>
                <div id="SETTINGS" className="root-component">
                    <header>
                        <div className="d-flex">
                            <h1 className="d-inline-block d-inline-block">Настройки</h1>
                        </div>
                    </header>

                    <main>

                        <div className="content-wrapper">
                            <div className="settings-wrapper">
                                <div className="item" onClick={this.clearCache}>
                                    <div className="name">Сбросить кеш</div>
                                    <div className="description">Очистка приложения от кешируемых данных. После очистки необходимо заново пройти авторизацию</div>
                                    <div className="link">Очистить кеш</div>
                                </div>
                                <div className="item" onClick={() => this.props.history.push(`/location`)}>
                                    <div className="name">Сменить локацию</div>
                                    <div className="description">Текст-подсказка о том, что это такое. Например, когда
                                        вы поменете локацию, то произойдет смена карты или авто
                                    </div>
                                    <div className="link">Сменить локацию</div>
                                </div>
                            </div>
                        </div>

                    </main>

                </div>
                <Tapbar history={this.props.history} />
            </>
        );
    }
}
