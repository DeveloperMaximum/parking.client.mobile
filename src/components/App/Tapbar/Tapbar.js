import React from 'react';
import {Redirect, NavLink, HashRouter} from 'react-router-dom';
import {Request} from "../../utils/Request";
import {AppContext} from "../AppContext";


export class Tapbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            scanned: false,
            wmenu: false,
            prev: false,
        };
    }

    onHandleScanned = async () => {
        if(this.state.wmenu === true){
            this.toggleWMenu();
        }
        await this.props.APP.scanner.toggle(this.onSearched);
    };

    toggleScanned = async () => {
        if(this.state.wmenu === true){
            this.toggleWMenu();
        }
    };

    toggleWMenu = async () => {
        await this.setState((prevState) => ({
            ...prevState,
            wmenu: (!this.state.wmenu),
        }));

        if(this.state.wmenu === true){
            let elements = document.querySelectorAll('footer menu .menu-item');
            for (let elem of elements) {
                let elem_id = elem.getAttribute('id');
                if(elem.classList.contains('active') && elem_id !== "more"){
                    await this.setState((prevState) => ({
                        ...prevState,
                        prev: elem_id,
                    }));
                    elem.classList.remove('active');
                }
            }
        }else{
            document.getElementById(this.state.prev).classList.add('active');
        }

        return this.state.wmenu;
    };

    onNavLink = async () => {
        if(this.state.wmenu === true){
            this.toggleWMenu();
        }
    };

    onSearched = async (ref_key) => {
        Request({
            METHOD: 'GET',
            URL: 'car/?REF_KEY=' + ref_key,
            USER: this.props.APP.storage.get('USER'),
        }).then((result) => {
            if(result.success === true){
                return this.props.history.push(`/car/${result.data[0].ID}`);
            }
        });
    };

    render() {

        return (
            <>
                <menu className={(this.state.wmenu === true) ? "widget display" : "widget"}>

                    <div className="modal-backdrop fade show footer-widget" onClick={this.toggleWMenu} />

                    <div className="menu-wrapper">
                        <div className="menu-list">
                            <a href="#" className="menu-item">
                                <span className="before">
                                    <i className="icon-directions_car" />
                                </span>
                                Автомобили в тест-драйве
                                <span className="after">74</span>
                            </a>
                            <a href="#" className="menu-item">
                                <span className="before">
                                    <i className="icon-build" />
                                </span>
                                Автомобили на обслуживании
                                <span className="after">65</span>
                            </a>
                            <a href="#" className="menu-item">
                                <span className="before">
                                    <i className="icon-low_priority" />
                                </span>
                                История перемещений
                                <span className="after">284</span>
                            </a>
                            <a href="#" className="menu-item">
                                <span className="before">
                                    <i className="icon-assignment" />
                                </span>
                                Заявки по автомобилям
                                <span className="after">2</span>
                            </a>
                            <a href="#" className="menu-item">
                                <span className="before">
                                    <i className="icon-settings" />
                                </span>
                                Настройки
                            </a>
                            <a href={"/pages/about"} className="menu-item">
                                <span className="before">
                                    <i className="icon-error_outline" />
                                </span>
                                О приложении
                            </a>
                        </div>
                    </div>
                </menu>

                <footer className="d-flex w-100 text-center">
                    <menu className="d-flex w-100 text-center static">
                        <NavLink onClick={this.onNavLink} activeclassname={'active'} to={"/home"} id={"home"} className={"menu-item flex-fill"}>
                            <i className={"icon-directions_car"} />
                            <div>Парковка</div>
                        </NavLink>
                        <span onClick={this.onHandleScanned} id={"qr"} className={"menu-item flex-fill"}>
                            <i className={"icon-qr_code"} />
                            <div>QR-код</div>
                        </span>
                        <NavLink onClick={this.onNavLink} activeclassname={'active'} to={"/map"} id={"map"} className={"menu-item flex-fill"}>
                            <i className={"icon-dashboard"} />
                            <div>Карта</div>
                        </NavLink>
                        <span onClick={this.toggleWMenu} id={"more"} className={(this.state.wmenu === true) ? "menu-item flex-fill active" : "menu-item flex-fill"}>
                            <i className={"icon-more_horiz"} />
                            <div>Ещё</div>
                        </span>
                    </menu>
                </footer>
            </>
        );
    }
}
