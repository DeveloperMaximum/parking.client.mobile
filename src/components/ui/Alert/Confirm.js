import React from 'react';
import { AppConsumer } from "../../App/AppContext";


export class Confirm extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <AppConsumer>
                {({ confirm }) => (
                    <>
                        <div className={confirm._data.display ? "modal-backdrop fade show" : 'modal-backdrop fade d-none'} />
                        <div className={confirm._data.display ? "modal fade show d-block" : 'modal fade show'}>
                            <div className={"modal-dialog container"}>
                                <div className={"modal-content"}>
                                    <div className={"modal-header border-white"}>
                                        <h5 className={"modal-title"}>
                                            {confirm._data.header}
                                        </h5>
                                    </div>
                                    <div className={"modal-body"}>
                                        {confirm._data.content}
                                    </div>
                                    <div className={"modal-footer border-white"}>
                                        <button className={"btn btn-primary w-50 m-auto"} onClick={() => confirm.hide()}>Хорошо</button>
                                        <button className={"btn btn-blue w-50 m-auto"} onClick={() => confirm.hide()}>Отменить</button>
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
