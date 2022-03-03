import React from 'react';

import { Consumer } from "../../base/Context";


export class Alert extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loading: false,
        };

        this.callback = this.callback.bind(this);
    }

    componentDidMount() {
        this.setState((prevState) => ({
            ...prevState,
        }));
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return false;
        }
    }

    callback = async (callback) => {
        if(!callback) return true;
	    this.setState((prevState) => ({
		    ...prevState,
		    loading: true
	    }));
        return new Promise((resolve, reject) => {
            callback().then((result) => {
	            this.setState((prevState) => ({
		            ...prevState,
		            loading: false
	            }));
                resolve(result);
            });
        });
    };

    render(){
        return (
            <Consumer>
                {({ alert }) => (
                    <>
                        <div className={alert._data.display ? "modal-backdrop fade show" : 'modal-backdrop fade d-none'} />
                        <div className={alert._data.display ? "modal fade show d-block" : 'modal fade show'}>
                            <div className={"modal-dialog container"}>
                                <div className={"modal-content"}>
                                    <div className={"modal-header border-white"}>
                                        <h5 className={"modal-title"}>
                                            {alert._data.header}
                                        </h5>
                                    </div>
                                    {this.state.loading === true ? (
                                        <div className={"modal-body"}>
                                            <div className={"spinner"} />
                                        </div>
                                    ) : (
                                        <>
                                            <div className={"modal-body"}>
                                                {alert._data.content}
                                            </div>
                                            <div className={"modal-footer border-white"}>
                                                <button className={"btn btn-primary w-100 m-auto"} onClick={async () => {
                                                    if(alert._data.callback === false){
                                                        alert.hide();
                                                        return true;
                                                    }
                                                    this.callback(alert._data.callback).then((result) => {
                                                        alert.hide();
                                                        if(result !== true){
                                                            alert.show({
                                                                header: alert._data.header,
                                                                content: result,
                                                                display: true
                                                            });
                                                        }
                                                    });
                                                }}>Хорошо</button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </Consumer>
        );
    }
}
