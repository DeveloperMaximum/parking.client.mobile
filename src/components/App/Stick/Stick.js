import React from 'react';


export class Stick extends React.Component {


	constructor(props){
		super(props);
		this.state = {
			show: false,
			text: false,
			icon: false,
			timerId: false
		};

		this.ref = React.createRef();
	}

	componentDidMount() {
		window.addEventListener('app.stick', this.handleShow);
		this.setState((prevState) => ({
			...prevState,
		}));
	}

	componentWillUnmount() {
		window.removeEventListener('app.stick', this.handleShow);
		this.setState = (state, callback) => {
			return false;
		}
	}

	handleShow = async (e) => {
		if(this.state.timerId !== false){
			clearTimeout(this.state.timerId);
		}

		this.ref.current.classList.add('show');

		await this.setState((prevState) => ({
			...prevState,
			text: e.detail?.text,
			icon: e.detail?.icon
		}));

		let timerId = setTimeout(async () => {
			this.ref.current.classList.remove('show');
		}, 2500);

		await this.setState((prevState) => ({
			...prevState,
			timerId: timerId
		}));
	};

    render() {
        return (
            <div ref={this.ref} className={`stick text-body fade bg-body`}>
	            {this.state.icon === false ? (null) : (
		            <div className={'col'}>
			            <h3  className={'mb-0'}>
				            <i className={`icon icon-${this.state.icon}`} />
			            </h3>
		            </div>
	            )}
	            <div className={'col'}>
		            {this.state.text}
	            </div>
            </div>
        );
    }
}
