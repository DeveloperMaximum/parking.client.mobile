import React from 'react';

import { Consumer } from "../../base/Context";


export class Confirm extends React.Component {

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

    loading = (loading) => {
        this.setState((prevState) => ({
            ...prevState,
            loading: loading
        }));
    };

    callback = async (callback) => {
        this.loading(true);
        return new Promise((resolve, reject) => {
            callback().then((result) => {
                this.loading(false);
                resolve(result);
            });
        });
    };

    render(){
        return (
            <Consumer>
                {({ data, confirm, alert }) => (
                    <>
                        <div className={data.confirm.display ? "modal-backdrop fade show" : 'modal-backdrop fade d-none'} />
                        <div className={data.confirm.display ? "modal fade show d-block" : 'modal fade show'}>
                            <div className={"modal-dialog container"}>
                                <div className={"modal-content"}>
                                    <div className={"modal-header border-white"}>
                                        <h5 className={"modal-title"}>
                                            {data.confirm.header}
                                        </h5>
                                    </div>
                                    {this.state.loading === true ? (
                                        <div className={"modal-body"}>
                                            <div className={"spinner"} />
                                        </div>
                                    ) : (
                                        <>
                                            <div className={"modal-body"}>
                                                {data.confirm.content}
                                            </div>
                                            <div className={"modal-footer border-white"}>
                                                <button className={"btn btn-primary"} onClick={async () => {
                                                    this.callback(data.confirm.callback).then((result) => {
                                                        confirm();
                                                        if(result !== true){
	                                                        alert({
                                                                header: data.confirm.header,
                                                                content: result,
                                                                display: true
                                                            });
                                                        }
                                                    });
                                                }}>{data.confirm.success}</button>
                                                <button className={"btn btn-secondary"} onClick={() => confirm()}>{data.confirm.cancel}</button>
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
