import React from 'react';

import { Consumer } from "../../base/Context";


export class Dialog extends React.Component {

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

	callback = async (callback = false) => {
		if(callback === false) return true;
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
                {({ data, dialog }) => {
                	let cancelBtn = {
                		text: 'Хорошо',
		                className: 'btn btn-primary w-100',
		                callback: async () => dialog()
                	};

                	let buttons = [];
	                Object.keys(data.dialog.buttons).forEach(function(key) {
	                	let btn = data.dialog.buttons[key];
	                	if(!btn?.className){
			                btn.className = 'btn btn-primary';
		                }
	                	if(!btn?.callback){
			                btn.callback = async () => dialog();
		                }
		                buttons.push(data.dialog.buttons[key]);
	                });

	                if(buttons.length > 1){
		                cancelBtn.text = 'Отмена';
		                cancelBtn.className = 'btn btn-secondary w-100';
	                }else if(buttons.length === 1){
		                cancelBtn.text = 'Отмена';
		                cancelBtn.className = 'btn btn-secondary';
	                }

                	return (
	                    <>
	                        <div className={data.dialog.display ? "modal-backdrop fade show" : 'modal-backdrop fade d-none'} />
	                        <div className={data.dialog.display ? "modal fade show d-block" : 'modal fade show'}>
	                            <div className={"modal-dialog container"}>
	                                <div className={"modal-content"}>
	                                    <div className={"modal-header border-white"}>
	                                        <h5 className={"modal-title"}>
	                                            {data.dialog.header}
	                                        </h5>
	                                    </div>
	                                    {this.state.loading === true ? (
	                                        <div className={"modal-body"}>
	                                            <div className={"spinner"} />
	                                        </div>
	                                    ) : (
	                                        <>
	                                            <div className={"modal-body"}>
	                                                {data.dialog.content}
	                                            </div>
	                                            <div className={"modal-footer border-white"}>
		                                            {buttons.map((btn, index) => (
			                                            <button className={btn.className} key={index} onClick={async () => {
				                                            this.callback(btn.callback).then((result) => {
					                                            dialog(false);
					                                            if(result !== true){
						                                            dialog({
							                                            header: data.dialog.header,
							                                            content: result,
							                                            buttons: [],
						                                            });
					                                            }
				                                            });
			                                            }}>{btn.text}</button>
		                                            ))}
		                                            <button className={cancelBtn.className} onClick={async () => {
			                                            dialog(false);
			                                            return true;
		                                            }}>{cancelBtn.text}</button>
	                                            </div>
	                                        </>
	                                    )}
	                                </div>
	                            </div>
	                        </div>
	                    </>
                    )
                }}
            </Consumer>
        );
    }
}
