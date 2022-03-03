import React from 'react';

import { Consumer } from "../../base/Context";


export class Widget extends React.Component {

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

	render(){
		return (
			<Consumer>
				{({ widget }) => (
					<>
						<div className={widget._data.display ? "widget widget-high display" : "widget widget-high"}>

							<div className="modal-backdrop fade show footer-widget" onClick={() => widget.hide()} />

							<div className="content">
								{ widget._data.child && widget._data.child() }
							</div>
						</div>
					</>
				)}
			</Consumer>
		);
	}
}
