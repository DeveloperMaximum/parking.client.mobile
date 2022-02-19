import React from 'react';

import { AppConsumer } from "../../App/AppContext";


export class Alert extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <AppConsumer>
                {({ confirm, alert }) => (
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
                                    <div className={"modal-body"}>
                                        {alert._data.content}
                                    </div>
                                    <div className={"modal-footer border-white"}>
                                        <button className={"btn btn-primary w-100 m-auto"} onClick={() => alert.hide()}>Хорошо</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </AppConsumer>
        );
    }
}
