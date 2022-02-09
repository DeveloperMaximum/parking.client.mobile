import React from 'react';
import { Request } from "../../utils/Request";


export class Scanner extends React.Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            rect: {

            }
        };
    }

    toggleShutter = (close = true) => {
        let classLIst = document.getElementsByTagName('body')[0].classList;
        if(close === true){
            classLIst.remove('SCANNED');
        }else{
            classLIst.add('SCANNED');
        }
    };

    search = async (query, history) => {
        if(!query) return false;
        let urlArray = query.split('/');
        return Request({
            METHOD: 'GET',
            URL: 'car/?REF_KEY=' + urlArray[urlArray.length - 1],
            USER: this.props.APP.storage.get('USER'),
        });
    };

    close = () => {
        this.toggleShutter(true);
        window.QRScanner.cancelScan(function(status){
            window.QRScanner.destroy();
        });
    };

    toggle = async (callback) => {
        window.QRScanner.getStatus(status => {
            if(status.scanning === false){
                this.toggleShutter(false);
                window.QRScanner.prepare(() => {
                    window.QRScanner.show();
                    window.QRScanner.scan( (err, content) => {
                        if(err && err.code !== 6){
                            window.QRScanner.destroy();
                        }else{
                            if(!content) return false;
                            let urlArray = content.split('/');
                            this.close();
                            return callback(urlArray[urlArray.length - 1]);
                        }
                        this.close();
                    });
                });
            }else{
                this.close();
            }
        });
        return false;
    };

    render() {

        return {
            open: this.open,
            scanned: this.scanned,
            close: this.close,
        }
    }
}

