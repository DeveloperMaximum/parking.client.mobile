import React from 'react';
import { NavLink } from "react-router-dom";

import { Request } from "../../utils/Request";
import { Context } from "../../base/Context";

export class Footer extends React.Component {

    static contextType = Context;

    constructor(props) {
        super(props);
        this.state = {
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
        if(this.context.wmenu._data.display === true){
	        await this.closeWMenu();
        }

        if(this.context.widget._data.display === true){
            await this.context.widget.hide();
        }

        if(this.context.camera._data.active === true || this.context.camera._data.scanned === true){
            this.toggleLinkActive(true);
            await this.closeShutter();
        }
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
        this.toggleLinkActive();
        this.context.camera.status(2);
        document.getElementsByTagName('body')[0].classList.add('SCANNED');
    };

    closeShutter = async () => {
        this.context.camera.status(1);
        await window.QRScanner.getStatus(status => {
            if(status.scanned === true) window.QRScanner.cancelScan();
            if(status.showing === true) window.QRScanner.hide();
            window.QRScanner.destroy();

            this.context.camera.status(0);
            document.getElementsByTagName('body')[0].classList.remove('SCANNED');
        });
    };

    toggleScanned = async (e) => {
        if(this.context.wmenu._data.display === true) await this.closeWMenu();
	    if(this.context.widget._data.display === true) await this.context.widget.hide();

        if(this.context.camera._data.active === false && this.context.camera._data.scanned === false){
            await this.openShutter();
            await window.QRScanner.prepare(() => {
                window.QRScanner.show(() => {
                    this.context.camera.status(3);
                    window.QRScanner.scan((err, content) => {
                        if(err){
                            this.toggleLinkActive(true);
                            this.closeShutter();
                        }else if(content){
                            let urlArray = content.split('/');
                            this.onSearched(urlArray[urlArray.length - 1]);
                        }
                    });
                });
            });
        }else if(this.context.camera._data.active === true || this.context.camera._data.scanned === true){
            this.toggleLinkActive(true);
            await this.closeShutter();
        }
    };

    openWMenu = async () => {
        await this.toggleLinkActive();
	    await this.context.wmenu.show();
    };

    closeWMenu = async () => {
	    await this.context.wmenu.hide();
        await this.toggleLinkActive(true);
    };

    toggleWMenu = async () => {
        if(this.context.camera._data.active === true) await this.closeShutter();
        (this.context.wmenu._data.display === true) ? await this.closeWMenu() : await this.openWMenu();
    };

    onSearched = async (ref_key) => {
        Request({
            URL: 'car/?REF_KEY=' + ref_key,
        }).then((result) => {
            if(result.success === true){
                this.toggleLinkActive(true);
                this.closeShutter();
                return this.props.history.push(`/car/${result.data[0].ID}`);
            }
        });
    };

    render() {

        return (
            <>
                <footer className="d-flex w-100 text-center">
                    <menu className="d-flex w-100 text-center static">
                        <NavLink onClick={this.onNavLink} activeclassname={'active'} to={"/home"} id={"home"} className={"menu-item flex-fill"}>
                            <i className={"icon-directions_car"} />
                            <div>Парковка</div>
                        </NavLink>
                        <span onClick={this.toggleScanned} id={"qr"} className={(this.context.camera._data.active === true) ? "menu-item flex-fill active" : "menu-item flex-fill"}>
                            <i className={"icon-qr_code"} />
                            <div>QR-код</div>
                        </span>
                        <NavLink onClick={this.onNavLink} activeclassname={'active'} to={"/map"} id={"map"} className={"menu-item flex-fill"}>
                            <i className={"icon-dashboard"} />
                            <div>Карта</div>
                        </NavLink>
                        <span onClick={this.toggleWMenu} id={"more"} className={(this.context.wmenu._data.display === true) ? "menu-item flex-fill active" : "menu-item flex-fill"}>
                            <i className={"icon-more_horiz"} />
                            <div>Ещё</div>
                        </span>
                    </menu>
                </footer>
            </>
        );
    }
}
