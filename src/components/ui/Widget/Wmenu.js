import React from 'react';
import { NavLink } from "react-router-dom";


export class Wmenu extends React.Component {


	constructor(props){
		super(props);
	}

	render(){
		return (
			<>
				<div className={this.props.display ? "widget display" : "widget"}>

					<div className="modal-backdrop fade show footer-widget" onClick={this.props.close} />

					<div className="content">
						<menu onClick={this.props.close}>
							<NavLink activeclassname={'active'} to={"/home/filter"} className={"item flex-fill"}>
                                <span className="before">
                                    <i className="icon-search" />
                                </span>
								Поиск автомобилей
							</NavLink>
							<NavLink activeclassname={'active'} to={"/more/location"} className={"item flex-fill"}>
                                <span className="before">
                                    <i className="icon-pin_drop" />
                                </span>
								Сменить локацию
							</NavLink>
							<NavLink activeclassname={'active'} to={"/more/home"} className={"item flex-fill"}>
                                <span className="before">
                                    <i className="icon-phonelink_setup" />
                                </span>
								Главный экран
							</NavLink>
							<NavLink activeclassname={'active'} to={"/more/settings"} className={"item flex-fill"}>
                                <span className="before">
                                    <i className="icon-settings" />
                                </span>
								Настройки
							</NavLink>
							<NavLink activeclassname={'active'} to={"/more/pages/about"} className={"item flex-fill"}>
                                <span className="before">
                                    <i className="icon-error_outline" />
                                </span>
								О приложении
							</NavLink>
						</menu>
					</div>
				</div>
			</>
		);
	}
}
