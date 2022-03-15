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
				{({ data, widget }) => (
					<>
						<div className={data.widget.child !== false ? "widget widget-high display" : "widget widget-high"}>

							<div className="modal-backdrop fade show footer-widget" onClick={() => widget(false)} />

							<div className="content">

								<div className="d-flex justify-content-between widget-meta">
									<div className="d-flex" onClick={() => widget(false)}>
										<i className="icon icon-chevron_left d-inline-block" />
									</div>

									<div className="d-flex">
										<h1 className="d-inline-block d-inline-block">{data.widget.header}</h1>
									</div>

									<div className="d-flex" onClick={ async () => {
										if(data.widget.right.callback){
											await data.widget.right.callback();
										}
									}}>
										<span className="d-inline-block">{data.widget.right.text}</span>
									</div>
								</div>

								{ data.widget.child && data.widget.child() }
							</div>
						</div>
					</>
				)}
			</Consumer>
		);
	}
}
