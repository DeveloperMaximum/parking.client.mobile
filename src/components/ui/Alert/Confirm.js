import React, { Component } from 'react';
import { AppContext } from '../../App/AppContext';


export class Confirm extends Component {

    render(){

        return (
            <AppContext.Consumer>
                {confirm => (
                    <>
                        <div className={confirm.display ? "modal-backdrop fade show" : 'modal-backdrop fade d-none'} />
                        <div className={confirm.display ? "modal fade show d-block" : 'modal fade show'}>
                            <div className={"modal-dialog container"}>
                                <div className={"modal-content"}>
                                    <div className={"modal-header border-white"}>
                                        <h5 className={"modal-title"}>
                                            {confirm.header}
                                        </h5>
                                    </div>
                                    <div className={"modal-body"}>
                                        {confirm.content}
                                    </div>
                                    <div className={"modal-footer border-white"}>
                                        <button className={"btn btn-primary w-100 m-auto"} onClick={this.props.onClose}>Хорошо</button>
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
