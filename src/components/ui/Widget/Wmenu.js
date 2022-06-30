import React from 'react';
import { NavLink } from "react-router-dom";


export class Wmenu extends React.Component {


	constructor(props){
		super(props);

		this.handleTheme = this.handleTheme.bind(this);
	}

	handleTheme(){
		window.dispatchEvent(new CustomEvent(`app.theme`, { detail: {
			theme: this.props.data.themes[this.props.data.themes.current]?.next,
		}}));
	}

	render(){
		return (
			<>
				<div className={this.props.display ? "widget display" : "widget"}>

					<div className="modal-backdrop fade show footer-widget" onClick={this.props.close} />

					<div className="content pt-0">
						<menu onClick={this.props.close} className={"mb-3"}>
							<NavLink activeclassname={'active'} to={"/home/filter"} className={"item flex-fill"}>
                                <span className="before alert alert-info p-0 mb-0 mr-3">
                                    <i className="icon-search" />
                                </span>
								Поиск автомобилей
							</NavLink>
							<NavLink activeclassname={'active'} to={"/more/location"} className={"item flex-fill"}>
                                <span className="before alert alert-info p-0 mb-0 mr-3">
                                    <i className="icon-pin_drop" />
                                </span>
								Сменить локацию
							</NavLink>
							<NavLink activeclassname={'active'} to={"/more/home"} className={"item flex-fill"}>
                                <span className="before alert alert-info p-0 mb-0 mr-3">
                                    <i className="icon-phonelink_setup" />
                                </span>
								Главный экран
							</NavLink>
							<div className={"item flex-fill"} onClick={this.handleTheme}>
                                <span className="before alert alert-info p-0 mb-0 mr-3">
                                    <i className="icon-tonality" />
                                </span>
								{this.props.data.themes[this.props.data.themes.current]?.display}
							</div>
							<NavLink activeclassname={'active'} to={"/more/settings"} className={"item flex-fill"}>
                                <span className="before alert alert-info p-0 mb-0 mr-3">
                                    <i className="icon-settings" />
                                </span>
								Настройки
							</NavLink>
							<NavLink activeclassname={'active'} to={"/more/about"} className={"item flex-fill"}>
                                <span className="before alert alert-info p-0 mb-0 mr-3">
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
