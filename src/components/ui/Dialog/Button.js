import React from 'react';


export class Button extends React.Component {


	constructor(props){
		super(props);
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

	handleCallback = async (e) => {
		e.persist();
		await this.props.callback(e, this.props?.onClick)
	};

	render(){
		return (
			<button className={this.props.className} onClick={this.handleCallback} >
				{this.props?.text}
			</button>
		)
	}
}
