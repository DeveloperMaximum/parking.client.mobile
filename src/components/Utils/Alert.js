import React, {useState} from 'react';


const Alert = (props) => {

    return (
        <>
            <div className={props.display ? "modal-backdrop fade show" : 'modal-backdrop fade d-none'} />
            <div className={props.display ? "modal fade show d-block" : 'modal fade show'}>
                <div className={"modal-dialog container"}>
                    <div className={"modal-content"}>
                        <div className={"modal-header border-white"}>
                            <h5 className={"modal-title"}>
                                {props.header}
                            </h5>
                        </div>
                        <div className={"modal-body"}>
                            {props.content}
                        </div>
                        <div className={"modal-footer border-white"}>
                            <button className={"btn btn-primary w-100 m-auto"} onClick={props.afterClose}>{props.button}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Alert;
