import React from 'react';

import { Context } from "../../../Context";


export class Item extends React.Component {

	static contextType = Context;


	constructor(props){
		super(props);
	}

	componentDidMount = () => {
		this.setState((prevState) => ({
			...prevState,
		}));
	};

	componentWillUnmount(){
		if(this.state.controller?.abort){
			this.state.controller.abort();
		}

		this.setState = (state, callback) => {
			return false;
		};
	}

	render() {

		return (
			<div className="d-block item col position-relative rounded p-3 shadow mb-3">
				<div className="d-flex">
					<h4 className="text-body mb-0">{this.props.DATE_CREATE}</h4>
				</div>

				<div className="text-muted mt-1 mb-2 small">описание</div>
			</div>
		);
	}
}
