import React from 'react';
import { AppConsumer } from "../../App/AppContext";


export class Confirm extends React.Component {

    constructor(props){
        super(props);

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

    callback = async (callback = false) => {
        if(callback !== false){
            await callback();
        }
        this.context.confirm.hide();
    };

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
                                        <button className={"btn btn-primary"} onClick={async () => {
                                            await confirm._data.callback();
                                            confirm.hide();
                                        }}>{confirm._data.success}</button>
                                        <button className={"btn btn-info"} onClick={() => confirm.hide()}>{confirm._data.cancel}</button>
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
