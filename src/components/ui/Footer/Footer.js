import React from 'react';
import { NavLink } from "react-router-dom";

import { Request } from "../../utils/Request";
import { Consumer } from "../../base/Context";
import { ParkingConsumer } from "../../base/Context/Parking";

export class Footer extends React.Component {

    static ParkingConsumer = ParkingConsumer;

    constructor(props) {
        super(props);
        this.state = {
            prev: false,
        };
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return false;
        }
    }

    onNavLink = async (data, camera, wmenu, widget) => {
        if(data.wmenu.display === true){
	        await wmenu();
	        await this.toggleLinkActive(true);
        }

        if(data.widget.display === true){
            await widget();
        }

        if(data.camera.active === true || data.camera.scanned === true){
            this.toggleLinkActive(true);
            await this.closeShutter(camera);
        }
    };

    toggleLinkActive = async (restore = false) => {
        let elem = document.querySelector('footer menu .active');
        if(elem && elem.nodeName === 'A'){
            await this.setState((prevState) => ({...prevState, prev: elem}));
            this.state.prev.classList?.remove('active');
        }else if(restore === true && this.state.prev !== false){
            this.state.prev.classList.add('active');
            await this.setState((prevState) => ({...prevState, prev: false}));
        }
        return elem;
    };

    closeShutter = async (camera) => {
        camera(1);
        await window.QRScanner.getStatus(status => {
	        window.QRScanner.disableLight();
            if(status.scanned === true) window.QRScanner.cancelScan();
            if(status.showing === true) window.QRScanner.hide();
            window.QRScanner.destroy();

            camera(0);
            document.getElementsByTagName('body')[0].classList.remove('SCANNED');
        });
    };

    toggleScanned = async (data, camera, wmenu, widget) => {
        if(data.wmenu.display === true){
	        await wmenu();
	        await this.toggleLinkActive(true);
        }

	    if(data.widget.display === true){
		    widget();
	    }

        if(data.camera.active === false && data.camera.scanned === false){
	        camera(2);
	        this.toggleLinkActive();
	        document.getElementsByTagName('body')[0].classList.add('SCANNED');
            await window.QRScanner.prepare(() => {
                window.QRScanner.show(() => {
                    camera(3);
                    window.QRScanner.scan((err, content) => {
                        if(err){
                            this.toggleLinkActive(true);
                            this.closeShutter(camera);
                        }else if(content){
                            let urlArray = content.split('/');
	                        Request({
		                        URL: 'car/?REF_KEY=' + urlArray[urlArray.length - 1],
	                        }).then((result) => {
		                        if(result.success === true){
			                        this.toggleLinkActive(true);
			                        this.closeShutter(camera);
			                        return this.props.history.push(`/catalog/car/${result.data[0].ID}`);
		                        }
	                        });
                        }
                    });
                });
            });
        }else if(data.camera.active === true || data.camera.scanned === true){
	        await this.closeShutter(camera);
            this.toggleLinkActive(true);
        }
    };

    wmenu = async (data, camera, wmenu) => {
        if(data.camera.active === true){
        	await this.closeShutter(camera);
        }

        if(data.wmenu.display === true){
	        await wmenu();
	        await this.toggleLinkActive(true);
        }else{
	        await this.toggleLinkActive();
	        await wmenu();
        }
    };

    render() {

        return (
            <>
                <Consumer>
	                {({ data, camera, wmenu, widget }) => (
		                <footer className="d-flex w-100 text-center">
		                    <menu className="d-flex w-100 text-center static">
		                        <NavLink onClick={() => this.onNavLink(data, camera, wmenu, widget)} activeclassname={'active'} to={"/home"} id={"home"} className={"menu-item flex-fill"}>
		                            <i className={"icon-directions_car"} />
		                            <div>Парковка</div>
		                        </NavLink>
		                        <span onClick={() => this.toggleScanned(data, camera, wmenu, widget)} id={"qr"} className={(data.camera.active === true) ? "menu-item flex-fill active" : "menu-item flex-fill"}>
		                            <i className={"icon-qr_code"} />
		                            <div>QR-код</div>
		                        </span>
		                        <NavLink onClick={() => this.onNavLink(data, camera, wmenu, widget)} activeclassname={'active'} to={"/map"} id={"map"} className={"menu-item flex-fill"}>
		                            <i className={"icon-dashboard"} />
		                            <div>Карта</div>
		                        </NavLink>
		                        <span onClick={() => this.wmenu(data, camera, wmenu, widget)} id={"more"} className={(data.wmenu.display === true) ? "menu-item flex-fill active" : "menu-item flex-fill"}>
		                            <i className={"icon-more_horiz"} />
		                            <div>Ещё</div>
		                        </span>
		                    </menu>
		                </footer>
	                )}
                </Consumer>
            </>
        );
    }
}
