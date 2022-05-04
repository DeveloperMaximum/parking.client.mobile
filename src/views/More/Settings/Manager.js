import React from 'react';

import { Root, Header } from "../../../components/ui";
import { Context } from "../../../components/App/Context";


export class Manager extends React.Component {

    static contextType = Context;


    constructor(props){
        super(props);
    }

    render() {
        const { confirm, alert } = this.context;

        return (
            <Root
                viewId={"MANAGER"}
            >
	            <Header
		            history={this.props.history}
		            title={`Интерфейс администратора`}
		            back={() => this.props.history.push(`/more/settings`)}
	            />

                <main>
                    <div className="content-wrapper">

                        <div className="card">
                            <div className="card-body" onClick={() => this.props.history.push(`/more/settings/tech`)}>
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
            </Root>
        );
    }
}
