import React from 'react';

import { App } from "../../components/App/Context";
import { Root } from "../../components/ui/Root/Root";
import { Header } from "../../components/ui/Header/Header";
import { Footer } from "../../components/ui/Footer/Footer";
import {DB as ApiDB} from "../../components/App/Api/DB";

export class Manager extends React.Component {

    static contextType = App;

    constructor(props){
        super(props);
    }

    render() {
        const { confirm, alert } = this.context;

        return (
            <Root
                viewId={"MANAGER"}
            >
                <Header>
                    <div className="d-flex" onClick={() => this.props.history.push(`/settings`)}>
                        <i className="icon icon-chevron_left d-inline-block" />
                        <h1 className="d-inline-block d-inline-block">Интерфейс администратора</h1>
                    </div>
                </Header>

                <main>
                    <div className="content-wrapper">

                        <div className="card">
                            <div className="card-body" onClick={() => this.props.history.push(`/settings/manager/tech`)}>
                                <div className="card-title">Техническая информация</div>
                                <div className="card-text">Инструмент для отладки frontend'a</div>
                                <div className="card-link">Запустить</div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Обновить базу данных</div>
                                <div className="card-text">Обновление данных путем получения и замены (без удаления) актуальной версии БД. ПОтребуется перезагрузка прилоежния</div>
                                <div className="card-link">Обновить</div>
                            </div>
                        </div>

                    </div>
                </main>

                <Footer history={this.props.history} />
            </Root>
        );
    }
}
