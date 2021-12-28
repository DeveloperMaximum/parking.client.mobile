import React, { Component } from 'react';
import { AppContext } from '../../App/AppContext';


export class Alert extends Component {

    render(){

        return (
            <AppContext.Consumer>
                {alert => (
                    <>
                        <div className={alert.display ? "modal-backdrop fade show" : 'modal-backdrop fade d-none'} />
                        <div className={alert.display ? "modal fade show d-block" : 'modal fade show'}>
                            <div className={"modal-dialog container"}>
                                <div className={"modal-content"}>
                                    <div className={"modal-header border-white"}>
                                        <h5 className={"modal-title"}>
                                            {alert.header}
                                        </h5>
                                    </div>
                                    <div className={"modal-body"}>
                                        {alert.content}
                                    </div>
                                    <div className={"modal-footer border-white"}>
                                        <button className={"btn btn-primary w-100 m-auto"} onClick={alert.onClose}>{alert.button}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </AppContext.Consumer>
        );
    }
}
