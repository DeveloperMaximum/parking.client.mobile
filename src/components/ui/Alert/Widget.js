import React from 'react';

import { Consumer } from "../../base/Context";
import {Header} from "../Header";


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
								<div className="d-flex justify-content-end widget-close" onClick={() => widget(false)}>
									<div className={"d-flex"}>
										<span className={"d-inline-block"}>Закрыть</span>
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
