import React, { Component } from 'react';
import {Tapbar} from "../../components/App/Tapbar";


export class More extends Component {

    constructor(props){
        super(props);
    }

    render(){

        return (
            <>
                <div id="MENU" className="root-component">
                    <header>
                        <div className="d-flex">
                            <h1 className="d-inline-block">Меню</h1>
                        </div>
                    </header>

                    <main>

                        <div className="menu-wrapper">
                            <div className="menu-list">
                                <a href="#" className="menu-item">
                                    <span className="before">
                                        <i className="icon-directions_car" />
                                    </span>
                                    Автомобили в тест-драйве
                                    <span className="after">
                                    74
                                    </span>
                                </a>
                                <a href="#" className="menu-item">
                                    <span className="before">
                                        <i className="icon-build" />
                                    </span>
                                        Автомобили на обслуживании
                                        <span className="after">
                                        65
                                    </span>
                                </a>
                                <a href="#" className="menu-item">
                                    <span className="before">
                                        <i className="icon-low_priority" />
                                    </span>
                                        История перемещений
                                        <span className="after">
                                        284
                                    </span>
                                </a>
                                <a href="#" className="menu-item">
                                    <span className="before">
                                        <i className="icon-assignment" />
                                    </span>
                                        Заявки по автомобилям
                                        <span className="after">
                                        2
                                    </span>
                                </a>
                                <a href="#" className="menu-item">
                                    <span className="before">
                                        <i className="icon-settings" />
                                    </span>
                                        Настройки
                                        <span className="after">
                                        562
                                    </span>
                                </a>
                                <a href="#" className="menu-item">
                                    <span className="before">
                                        <i className="icon-error_outline" />
                                    </span>
                                        О приложении
                                        <span className="after">
                                        8264
                                    </span>
                                </a>
                            </div>
                        </div>

                    </main>
                </div>
                <Tapbar history={this.props.history} APP={this.props.APP}/>
            </>
        );
    }
}
