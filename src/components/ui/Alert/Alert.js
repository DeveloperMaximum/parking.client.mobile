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
                {({ data, alert }) => (
                    <>
                        <div className={data.alert.display ? "modal-backdrop fade show" : 'modal-backdrop fade d-none'} />
                        <div className={data.alert.display ? "modal fade show d-block" : 'modal fade show'}>
                            <div className={"modal-dialog container"}>
                                <div className={"modal-content"}>
                                    <div className={"modal-header border-white"}>
                                        <h5 className={"modal-title"}>
                                            {data.alert.header}
                                        </h5>
                                    </div>
                                    {this.state.loading === true ? (
                                        <div className={"modal-body"}>
                                            <div className={"spinner"} />
                                        </div>
                                    ) : (
                                        <>
                                            <div className={"modal-body"}>
                                                {data.alert.content}
                                            </div>
                                            <div className={"modal-footer border-white"}>
                                                <button className={"btn btn-primary w-100 m-auto"} onClick={async () => {
                                                    if(data.alert.callback === false){
	                                                    alert();
                                                        return true;
                                                    }
                                                    this.callback(data.alert.callback).then((result) => {
	                                                    alert();
                                                        if(result !== true){
	                                                        data.alert.show({
                                                                header: data.alert.header,
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
