import React from 'react';

import { Consumer } from "../../base/Context";
import { NavLink } from "react-router-dom";


export class Wmenu extends React.Component {

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
				{({ wmenu }) => (
					<>
						<div className={wmenu._data.display ? "widget display" : "widget"}>

							<div className="modal-backdrop fade show footer-widget" onClick={() => wmenu.hide()} />

							<div className="content">
								<menu onClick={() => wmenu.hide()}>
									<NavLink activeclassname={'active'} to={"/catalog/tdrive"} className={"item flex-fill"}>
		                                <span className="before">
		                                    <i className="icon-directions_car" />
		                                </span>
										Автомобили в тест-драйве
										<span className="badge badge-primary">3</span>
									</NavLink>
									<a href="#" className="item">
		                                <span className="before">
		                                    <i className="icon-build" />
		                                </span>
										Автомобили на обслуживании
										<span className="badge badge-primary">14</span>
									</a>
									<a href="#" className="item">
		                                <span className="before">
		                                    <i className="icon-low_priority" />
		                                </span>
										История перемещений
									</a>
									<a href="#" className="item">
		                                <span className="before">
		                                    <i className="icon-assignment" />
		                                </span>
										Заявки по автомобилям
										<span className="badge badge-primary">8</span>
									</a>
									<NavLink activeclassname={'active'} to={"/settings"} className={"item flex-fill"}>
		                                <span className="before">
		                                    <i className="icon-settings" />
		                                </span>
										Настройки
									</NavLink>
									<NavLink activeclassname={'active'} to={"/pages/about"} className={"item flex-fill"}>
		                                <span className="before">
		                                    <i className="icon-error_outline" />
		                                </span>
										О приложении
									</NavLink>
								</menu>
							</div>
						</div>
					</>
				)}
			</Consumer>
		);
	}
}
