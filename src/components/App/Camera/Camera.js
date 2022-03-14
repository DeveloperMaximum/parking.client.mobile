import React from 'react';
import { Consumer } from "../../base/Context/Context";

export class Camera extends React.Component {

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
	                                    <span className={"front"} id={"front"} onClick={() => {
		                                    window.QRScanner.getStatus(function(status){
			                                    if(status.currentCamera === 0){
				                                    window.QRScanner.useFrontCamera(function(err, status){
					                                    document.querySelector('#front').classList.add('active');
				                                    });
			                                    }else{
				                                    window.QRScanner.useBackCamera(function(err, status){
					                                    document.querySelector('#front').classList.remove('active');
				                                    });
			                                    }
		                                    });
	                                    }}>
		                                    <i className={"icon icon-party_mode"} />
	                                    </span>
	                                    <span className={"light"} id={"light"} onClick={async () => {
		                                    window.QRScanner.getStatus(function(status){
			                                    if(status?.lightEnabled){
				                                    window.QRScanner.disableLight(function (err, status) {
					                                    document.querySelector('#light').classList.remove('active');
				                                    });
			                                    }else{
				                                    window.QRScanner.enableLight(function (err, status) {
					                                    document.querySelector('#light').classList.add('active');
				                                    });
			                                    }
		                                    });
		                                    window.QRScanner.enableLight(function (err, status) {

		                                    });
	                                    }}>
		                                    <i className={"icon icon-emoji_objects"} />
	                                    </span>
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
