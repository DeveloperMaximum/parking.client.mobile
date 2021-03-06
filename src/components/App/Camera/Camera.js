import React from 'react';
import { Redirect } from "react-router";


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

	lightHandle = async (e) => {
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

	changeCameraHandle = async (e) => {
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
	            {this.props?.result !== false ? (
	            	<>
			            <Redirect to={{
				            pathname: `/home/car/${this.props.result.ID}`
			            }} />
		            </>
	            ) : (
		            <div className={ this.props.scanned === true ? "camera active scanned" : "camera"}>
			            <div className="opacity" />
			            <>
				            { this.props.active !== true ? (<></>) : (
					            <>
						            { this.props.loading === true ? (
							            <>
								            <div className="spinner" />
							            </>
						            ) : (
							            <>
								            <div className="stick top">
									            <div className={`text-muted`}>
										            <i className="icon-qr_code" /> {this.props?.text ? this.props.text : `???????????????? ???????????? ???? QR-??????`}
									            </div>
								            </div>
								            <div className="tools">
									            { this.canChangeCamera !== true ? (null) : (
										            <span className={"front"} id={"front"} onClick={this.changeCameraHandle}>
				                                    <i className={"icon icon-party_mode"} />
			                                    </span>
									            ) }
									            { this.canEnableLight !== true ? (null) : (
										            <span className={"light"} id={"light"} onClick={this.lightHandle}>
			                                        <i className={"icon icon-emoji_objects"} />
			                                    </span>
									            ) }
								            </div>
							            </>
						            )}
					            </>
				            )}
			            </>
		            </div>
	            )}
            </>
        );
    }
}
