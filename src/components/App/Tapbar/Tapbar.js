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

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return false;
        }
    }

    onNavLink = async () => {
        if(this.state.wmenu === true){
            await this.closeWMenu();
        }

        if(this.state.scanned === true){
            await this.closeShutter();
        }

        await this.setState((prevState) => ({...prevState, scanned: false}));
        await this.setState((prevState) => ({...prevState, wmenu: false}));
        await this.setState((prevState) => ({...prevState, prev: false}));
    };

    toggleLinkActive = async (restore = false) => {
        let elem = document.querySelector('footer menu .active');
        if(elem && elem.nodeName === 'A'){
            await this.setState((prevState) => ({...prevState, prev: elem}));
            this.state.prev.classList.remove('active');
        }else if(restore === true && this.state.prev !== false){
            this.state.prev.classList.add('active');
            await this.setState((prevState) => ({...prevState, prev: false}));
        }
        return elem;
    };

    openShutter = async () => {
        await this.toggleLinkActive();
        await this.setState((prevState) => ({...prevState, scanned: true}));
        document.getElementsByTagName('body')[0].classList.add('SCANNED');
    };

    closeShutter = async () => {
        await this.toggleLinkActive(true);
        await window.QRScanner.getStatus(status => {
            if(status.scanned === true) window.QRScanner.cancelScan();
            if(status.showing === true) window.QRScanner.hide();
            window.QRScanner.destroy();

            this.setState((prevState) => ({...prevState, scanned: false}));
            document.getElementsByTagName('body')[0].classList.remove('SCANNED');
        });
    };

    toggleScanned = async (e) => {
        if(this.state.wmenu === true) await this.closeWMenu();

        if(this.state.scanned === false){
            await this.openShutter();
            await window.QRScanner.prepare(() => {
                window.QRScanner.show();
                window.QRScanner.scan((err, content) => {
                    if(err){
                        this.closeShutter();
                        return false;
                    }else if(content){
                        let urlArray = content.split('/');
                        return this.onSearched(urlArray[urlArray.length - 1]);
                    }
                });
            });
        }else{
            await this.closeShutter();
        }

        return this.state.scanned;
    };

    openWMenu = async () => {
        await this.toggleLinkActive();
        this.setState((prevState) => ({...prevState, wmenu: true}));
    };

    closeWMenu = async () => {
        await this.toggleLinkActive(true);
        this.setState((prevState) => ({...prevState, wmenu: false}));
    };

    toggleWMenu = async () => {
        if(this.state.scanned === true) await this.closeShutter();
        (this.state.wmenu === false) ? await this.openWMenu() : await this.closeWMenu();
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
                            <NavLink activeclassname={'active'} to={"/settings"} className={"menu-item flex-fill"}>
                                <span className="before">
                                    <i className="icon-settings" />
                                </span>
                                Настройки
                            </NavLink>
                            <NavLink activeclassname={'active'} to={"/pages/about"} className={"menu-item flex-fill"}>
                                <span className="before">
                                    <i className="icon-error_outline" />
                                </span>
                                О приложении
                            </NavLink>
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
