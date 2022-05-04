import React from 'react';


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
		await this.setState((prevState) => ({
			...prevState,
			loading: true
		}));
		return new Promise((resolve, reject) => {
			return callback().then((result) => {
				this.setState((prevState) => ({
					...prevState,
					loading: false
				}));
				if(typeof result === 'string'){
					this.props.dialog({
						buttons: [],
						content: result
					});
				}else{
					this.props.close(false);
				}
			});
		});
	};

    render(){
	    let buttons = [];
	    let cancelBtn = {
		    text: 'Хорошо',
		    className: 'btn btn-primary w-100',
		    callback: async () => this.props.dialog()
	    };

	    if(this.props.buttons !== false){
	    	let _buttons = this.props.buttons
		    Object.keys(this.props.buttons).forEach(function(key) {
			    let button = _buttons[key];
			    if(!button?.className){
				    button.className = 'btn btn-primary';
			    }
			    if(!button?.callback){
				    button.callback = false;
			    }
			    buttons.push(button);
		    });

		    if(buttons.length > 1){
			    cancelBtn.text = 'Отмена';
			    cancelBtn.className = 'btn btn-secondary w-100';
		    }else if(buttons.length === 1){
			    cancelBtn.text = 'Отмена';
			    cancelBtn.className = 'btn btn-secondary';
		    }
	    }else{
		    buttons = false;
	    }

        return (
            <>
                <div className={this.props.display ? "modal-backdrop fade show" : 'modal-backdrop fade d-none'} />
                <div className={this.props.display ? "modal fade show d-block" : 'modal fade show'}>
                    <div className={"modal-dialog container"}>
                        <div className={"modal-content"}>
                            <div className={"modal-header border-white"}>
                                <h5 className={"modal-title"}>
                                    {this.props.header}
                                </h5>
                            </div>
                            {this.state.loading === true ? (
                                <div className={"modal-body"}>
                                    <div className={"spinner"} />
                                </div>
                            ) : (
                                <>
                                    <div className={"modal-body"}>
                                        {this.props.content}
                                        {this.props.child && this.props.child()}
                                    </div>
	                                <>
		                                {buttons === false ? (<></>) : (
			                                <div className={"modal-footer border-white"}>
				                                {buttons.length > 0 ? (
					                                <>
						                                {buttons.map((button, index) => (
							                                <button className={button.className} key={index} onClick={async (e) => {
								                                this.callback(button.callback);
							                                }}>{button.text}</button>
						                                ))}
						                                <button className={cancelBtn.className} onClick={this.props.close}>{cancelBtn.text}</button>
					                                </>
				                                ) : (
					                                <button className={cancelBtn.className} onClick={this.props.close}>{cancelBtn.text}</button>
				                                )}
			                                </div>
		                                )}
	                                </>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
