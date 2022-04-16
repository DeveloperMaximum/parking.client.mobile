import React from 'react';
import { Consumer } from "../../base/Context/Context";

export class Camera extends React.Component {

	canEnableLight;
	canChangeCamera;

	constructor(props){
		super(props);
		window.QRScanner.getStatus((status) => {
			this.canEnableLight = status.canEnableLight;
			this.canChangeCamera = status.canChangeCamera;
		});
	}

	onLightHandle = async (e) => {
		window.QRScanner.getStatus(function(status){
			if(status?.canEnableLight === true){
				if(status?.lightEnabled){
					window.QRScanner.disableLight(function (err, status) {
						document.querySelector('#light').classList.remove('active');
					});
				}else{
					window.QRScanner.enableLight(function (err, status) {
						document.querySelector('#light').classList.add('active');
					});
				}
			}
		});
	};

	onChangeCameraHandle = async (e) => {
		window.QRScanner.getStatus(function(status){
			if(status.currentCamera === 0){
				window.QRScanner.useFrontCamera(function(err, status){
					document.querySelector('#front').classList.add('active');
					document.querySelector('#light').classList.add('d-none');
				});
			}else{
				window.QRScanner.useBackCamera(function(err, status){
					document.querySelector('#front').classList.remove('active');
					document.querySelector('#light').classList.remove('active');
					document.querySelector('#light').classList.remove('d-none');
				});
			}
		});
	};

    render() {
        return (
            <>
                <Consumer>
                    {({ data }) => (
                        <div className={ data.camera.scanned === true ? "camera active scanned" : "camera"}>
                            <div className="opacity" />
                            { data.camera.loading === true ? (
                                <>
                                    <div className="spinner" />
                                </>
                            ) : (
                                <>
                                    <div className="tools">
	                                    { this.canChangeCamera === true ? (
		                                    <span className={"front"} id={"front"} onClick={this.onChangeCameraHandle}>
			                                    <i className={"icon icon-party_mode"} />
		                                    </span>
	                                    ) : (<></>) }
	                                    { this.canEnableLight === true ? (
		                                    <span className={"light"} id={"light"} onClick={this.onLightHandle}>
		                                        <i className={"icon icon-emoji_objects"} />
		                                    </span>
	                                    ) : (<></>) }
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </Consumer>
            </>
        );
    }
}
