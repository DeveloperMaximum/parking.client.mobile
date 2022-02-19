import React from 'react';

import { AppContext } from "../../components/App/AppContext";
import { View } from "../../components/base/View";
import { Header } from "../../components/base/Header";
import { Footer } from "../../components/base/Footer";

export class Settings extends React.Component {

    static contextType = AppContext;

    constructor(props){
        super(props);
    }

    clearCache = () => {
        const { confirm } = this.context;
        confirm.show({
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
            <View
                viewId={"SETTINGS"}
            >
                <Header>
                    <div className="d-flex" onClick={() => this.props.history.push(`/`)}>
                        <i className="icon icon-chevron_left d-inline-block" />
                        <h1 className="d-inline-block d-inline-block">Настройки</h1>
                    </div>
                </Header>

                <main>
                    <div className="content-wrapper">
                        <div className="settings-wrapper">

                            <div className="item" onClick={this.clearCache}>
                                <div className="name">Сбросить кеш</div>
                                <div className="description">Очистка приложения от кешируемых данных. После очистки необходимо заново пройти авторизацию</div>
                                <div className="link">Очистить кеш</div>
                            </div>

                            <div className="item" onClick={() => this.props.history.push(`/settings/location`)}>
                                <div className="name">Сменить локацию</div>
                                <div className="description">Текст-подсказка о том, что это такое. Например, когда
                                    вы поменете локацию, то произойдет смена карты или авто
                                </div>
                                <div className="link">Сменить локацию</div>
                            </div>

                            <div className="item" onClick={() => this.props.history.push(`/settings/manager`)}>
                                <div className="name">Интерфейс администратора</div>
                                <div className="description">
                                    интерфейс для управления сущностями системы
                                </div>
                                <div className="link">Перейти</div>
                            </div>

                        </div>
                    </div>
                </main>

                <Footer history={this.props.history} />
            </View>
        );
    }
}
