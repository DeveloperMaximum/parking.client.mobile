import React from 'react';

import * as Storage from "../../../utils/Storage";
import { Context } from "../../../App/Context";
import { Car as Api } from "../../../../components/App/Api";
import { Header } from "../../../../components/ui";
import { Car } from "../../../../components/App";
import { Necessitates } from "../../../../components/App/Car";


export class Item extends React.Component {

	static contextType = Context;

	necessitates = Object;


	constructor(props){
		super(props);
		this.necessitates = Storage.get('NECESSITATE');

		this.handleBack = this.handleBack.bind(this);
	}

	componentDidMount = () => {
		this.setState((prevState) => ({
			...prevState,
		}));
	};

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return false;
		};
	}

	handleBack() {
		this.context.sider();
		this.props.parentDidMount({tabId: this.props.type});
	}

	handleNecessitates = async (e, item = false) => {
		await this.context.sider({
			template: false,
			child: () => {
				return (
					<>
						<Header
							title={`Потребности`}
							back={true}
							onClick={this.handleBack}
						/>

						<header className="d-flex align-items-center shadow" onClick={this.handleBack}>
							<div className="thumb">
								<img src={"tiles/car.png"} />
							</div>
							<div>
								<div>
									<b>{this.props.CAR.BRAND_NAME} {this.props.CAR.MODEL_NAME}</b>
								</div>
								<div>{(this.props.CAR?.SECTOR_NAME) ? `${this.props.CAR.SECTOR_NAME}, место ${this.props.CAR.INNER_ID}` : '-'}</div>
							</div>
						</header>
						<main>
							<Necessitates
								car={{ID: this.props.CAR.ID}}
								parentDidMount={this.handleBack}
							/>
						</main>
					</>
				)
			}
		});
	};

	handleStartTicket = async (e, item = false) => {
		window.dispatchEvent(new CustomEvent(`app.dialog`, { detail: {
			header: `${this.props.CAR.BRAND_NAME} ${this.props.CAR.MODEL_NAME}`,
			content: "Вы действительно хотите взять автомобиль в работу",
			buttons: [{
				text: 'Да',
				onClick: async () => {
					return await Api.Responsible({ ID: this.props.CAR.ID}).then((result) => {
						if(result.success === false) return result.message;
						this.props.parentDidMount({ tabId: this.props.type });
					});
				}
			}]
		}}));
	};

	handleEndTicket = async (e, item = false) => {
		window.dispatchEvent(new CustomEvent(`app.dialog`, { detail: {
			header: `${this.props.CAR.BRAND_NAME} ${this.props.CAR.MODEL_NAME}`,
			content: "Вы действительно хотите завершить работу с автомобилем?",
			buttons: [{
				text: 'Да',
				onClick: async () => {
					return await Api.Responsible({ID: this.props.CAR.ID, RESPONSIBLE_ID: -1}).then((result) => {
						if(result.success === false) return result.message;
						this.props.parentDidMount({ tabId: this.props.type });
					});
				}
			}]
		}}));
	};

	handleMoved = async (e, item = false) => {
		window.dispatchEvent(new CustomEvent(`app.dialog`, { detail: {
			header: "Перемещение",
			content: "Вы действительно хотите освободить парковочное место и переместить автомобиль?",
			buttons: [{
				text: 'Да',
				onClick: async () => {
					return await Api.Moving(this.props.CAR.ID).then((result) => {
						if(result.success === true){
							this.props.parentDidMount({ tabId: this.props.type });
							if(result.message !== false){
								return true;
							}
						}
						return result.message;
					});
				}
			}]
		}}));
	};

	handleParking = async (e, item = false) => {
		window.dispatchEvent(new CustomEvent(`app.dialog`, { detail: {
			header: "Перемещение",
			content: "Вы действительно хотите припарковать автомобиль?",
			buttons: [{
				text: 'Да',
				onClick: async () => {
					this.context.sider({
						template: false,
						child: () => {
							return (
								<Car.Parking
									car={this.props.CAR}
									callback={() => {
										this.props.parentDidMount({ tabId: this.props.type });
										this.context.sider();
									}}
								/>
							)
						}
					});
				}
			}]
		}}));
	};

	render() {
		return (
			<div className={"ticket-item d-block item col position-relative rounded p-3 shadow mb-3"}>
				<div className="d-flex" onClick={async () => {
					await this.context.widget({
						header: `Карточка автомобиля`,
						child: () => (
							<Car.Item
								id={this.props.CAR.ID}
								history={this.props.history}
								parentDidMount={this.componentDidMount}
							/>
						)
					})
				}}>
					<h4 className="text-body mb-0">
						{this.props.CAR.BRAND_NAME} {this.props.CAR.MODEL_NAME}
					</h4>
				</div>

				<div className={"text-muted mt-1 mb-2 small"}>VIN: {this.props.CAR.VIN}</div>

				<div className={"container-fluid"}>
					<div className={"row"}>
						{this.props.NECESSITATES?.length && this.props.NECESSITATES.length > 0 ? ( this.props.NECESSITATES.map((necessitate, i) => (
							<div key={i} className={"col col-12 notice danger small"}>
								{this.necessitates[necessitate.NECESSITATE_ID].NAME}
							</div>
						))) : (null)}
					</div>
				</div>

				{this.props.type === 'null' ? (
					<button className={"btn btn-primary text-center w-100 mt-3"} onClick={ async (e) => this.handleStartTicket(e, this.props) }>Взять в работу</button>
				) : (
					this.props.type === 'true' ? (
						<button className={"btn btn-primary text-center w-100 mt-3"} onClick={ async (e) => this.handleStartTicket(e, this.props) }>Взять себе</button>
					) : (
						<div className={"btn-wrapper d-flex flex-wrap justify-content-between"}>
							<button className={"necessitates btn btn-primary text-center mt-3"} onClick={ async (e) => this.handleNecessitates(e, this.props) }>
								<i className={"icon icon-build"} />
							</button>
							{Number(this.props.CAR.STATUS_ID) === 2 || Number(this.props.CAR.STATUS_ID) === 5 || Number(this.props.CAR.STATUS_ID) === 1 ? (
								<button className={"moved btn btn-primary text-center mt-3"} onClick={ async (e) => this.handleMoved(e, this.props) }>
									<i className={"icon icon-sync_alt"} />
								</button>
							) : (
								Number(this.props.CAR.STATUS_ID) === 3 ? (
									<button className={"moved btn btn-primary text-center mt-3"} onClick={ async (e) => this.handleParking(e, this.props) }>
										<i className={"icon icon-directions_car"} />
									</button>
								) : (null)
							)}
							<button className={"btn btn-secondary text-center w-100 mt-2"} onClick={ async (e) => this.handleEndTicket(e, this.props) }>Завершить</button>
						</div>
					)
				)}
			</div>
		);
	}
}
