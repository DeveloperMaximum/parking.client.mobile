import React from 'react';

import { Button } from './Button';
import {Scroller} from "../Scroller";


export class Dialog extends React.Component {


    constructor(props){
        super(props);
        this.state = {
	        show: false,
	        onClose: false,
	        loading: false,
	        buttons: false
        };

	    this.ref = React.createRef();
    }

    componentDidMount() {
	    window.addEventListener('app.dialog', this.handleShow);
	    window.addEventListener('app.dialog.close', this.handleClose);
	    window.addEventListener('app.dialog.loading', this.handleLoading);
        this.setState((prevState) => ({
            ...prevState,
        }));
    }

    componentWillUnmount() {
	    window.removeEventListener('app.dialog', this.handleShow);
	    window.removeEventListener('app.dialog.close', this.handleClose);
	    window.removeEventListener('app.dialog.loading', this.handleLoading);
        this.setState = (state, callback) => {
            return false;
        }
    }

	handleShow = async (e) => {
		const cancel = {
			text: 'Хорошо',
			onClick: this.handleClose
		};

		if(e?.detail === null){
			return this.handleClose(e);
		}

		if(e?.detail?.onClose !== false){
			cancel.onClick = e?.detail?.onClose;
		}

		await this.setState((prevState) => ({
			...prevState,
			show: true,
			loading: true
		}), () => this.ref.current.classList.add('show'));

		if(e.detail.buttons === null && e.detail.children !== false){
			return this.setState((prevState) => ({
				...prevState,
				loading: false,
				header: e.detail?.header,
				content: e.detail?.children
			}), () => this.ref.current.classList.add('show'));
		}else{
			if(!e?.detail?.buttons){
				e.detail.buttons = [];
			}

			await this.setState((prevState) => ({
				...prevState,
				show: true,
				loading: true,
				header: e.detail?.header,
				content: e.detail?.content
			}), () => this.ref.current.classList.add('show'));

			e.detail.buttons.push(cancel);
			e.detail.buttons.forEach(function(button, i, arr) {
				arr[i].className = `btn d-block btn-primary w-50`;
				if(arr.length - 1 === i){
					if(e.detail.buttons.length > 1){
						arr[i].text = 'Отмена';
						arr[i].className = (e.detail.buttons.length > 2) ? 'btn d-block btn-primary w-100' : 'btn d-block btn-secondary w-50';
					}else{
						arr[i].className = `btn d-block btn-primary w-100`;
					}
				}
			});

			return this.setState((prevState) => ({
				...prevState,
				loading: false,
				buttons: e.detail.buttons
			}));
		}

	};

	handleCallback = async (e, callback) => {
		if(!callback){
			return await this.handleClose(e);
		}

		window.dispatchEvent(new CustomEvent("app.dialog.loading"));

		const result = await callback(e);
		if(typeof result === 'string'){
			window.dispatchEvent(new CustomEvent("app.dialog", { detail: {
				header: this.state.header,
				content: result,
			}}));
		}else{
			await this.handleClose(e);
		}
	};

	handleLoading = async (e) => {
		return this.setState((prevState) => ({
			...prevState,
			loading: true
		}));
	};

	handleClose = async (e) => {
    	e.preventDefault();

		await this.setState((prevState) => ({
			...prevState,
			loading: true
		}));

		this.ref.current.classList.remove('show');
		await this.setState((prevState) => ({
			...prevState,
			show: false,
			loading: false,
			onClose: false,
			header: false,
			content: false,
			buttons: false
		}));
	};

    render(){
        return (
            <div ref={this.ref} className={'modal fade p-3'}>
                <div className={"modal-backdrop fade show"} />
                <div className={"modal-dialog container"}>
                    <div className={"modal-content"}>
                        <div className={"modal-header border-white"}>
                            <h5 className={"modal-title"}>
                                {this.state.header}
                            </h5>
                        </div>
                        <div className={"modal-body"}>
                            {this.state.loading === true ? (
	                            <div className={"spinner"} />
                            ) : (
                                <Scroller>
                                    {this.state.content}
                                </Scroller>
                            )}
                        </div>
                        {!this.state?.buttons || this.state.buttons === false || !this.state.buttons?.length || this.state.loading === true ? (null) : (
	                        <div className={"d-flex p-2"}>
		                        {this.state.buttons.map((button, index) => (
			                        <Button
				                        {...button}
				                        key={index}
				                        className={button.className}
				                        callback={this.handleCallback}
			                        />
		                        ))}
	                        </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}
