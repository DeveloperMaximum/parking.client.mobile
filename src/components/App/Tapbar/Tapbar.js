import React from 'react';
import {NavLink} from 'react-router-dom';
import {Request} from "../../utils/Request";


export class Tapbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            scanned: false,
            wmenu: false,
            prev: false,
        };
    }

    setPrevActiveLink = async (elem = false) => {
        if(elem && elem.classList.contains('active')){
            elem.classList.remove('active');
            let elem_id = elem.getAttribute('id');
            await this.setState((prevState) => ({
                ...prevState,
                prev: elem_id,
            }));
        }else{
            document.getElementById(this.state.prev).classList.add('active');
            await this.setState((prevState) => ({
                ...prevState,
                prev: false,
            }));
        }

        return this.state.prev;
    };

    openShutter = async () => {
        await this.setState((prevState) => ({...prevState, scanned: true}));
        await this.setPrevActiveLink(document.querySelector('footer menu .active'));
        document.getElementsByTagName('body')[0].classList.add('SCANNED');
        await window.QRScanner.prepare(() => {
            return window.QRScanner.show();
        });
    };

    closeShutter = async () => {
        await window.QRScanner.getStatus(status => {
            if(status.scanned === true){
                window.QRScanner.cancelScan();
            }

            if(status.showing === true){
                window.QRScanner.hide();
            }

            window.QRScanner.destroy();

            this.setPrevActiveLink();
            this.setState((prevState) => ({...prevState, scanned: false}));
            document.getElementsByTagName('body')[0].classList.remove('SCANNED');
        });
    };

    onNavLink = async () => {
        if(this.state.wmenu === true){
            await this.toggleWMenu();
        }

        if(this.state.scanned === true){
            await this.toggleScanned();
        }
    };

    toggleScanned = async (e) => {
        if(this.state.wmenu === true){
            await this.toggleWMenu();
        }

        if(this.state.scanned === false){
            this.openShutter();
            window.QRScanner.scan((err, content) => {
                if(err && err.code !== 6){
                    this.closeShutter();
                }else if(content){
                    let urlArray = content.split('/');
                    return this.onSearched(urlArray[urlArray.length - 1]);
                }
            });
        }else{
            await this.closeShutter();
        }

        return this.state.scanned;
    };

    toggleWMenu = async () => {
        if(this.state.scanned === true){
            await this.toggleScanned();
        }

        await this.setState((prevState) => ({
            ...prevState,
            wmenu: (!this.state.wmenu),
        }));

        if(this.state.wmenu === true){
            await this.setPrevActiveLink(document.querySelector('footer menu .active'));
        }else{
            await this.setPrevActiveLink();
        }

        return this.state.wmenu;
    };

    onSearched = async (ref_key) => {
        Request({
            METHOD: 'GET',
            URL: 'car/?REF_KEY=' + ref_key,
            USER: this.props.APP.storage.get('USER'),
        }).then((result) => {
            if(result.success === true){
                this.closeShutter();
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
                        <span onClick={this.toggleScanned} id={"qr"} className={(this.state.scanned === true) ? "menu-item flex-fill active" : "menu-item flex-fill"}>
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
