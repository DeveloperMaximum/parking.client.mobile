import React from "react";

import { Header } from "../../../ui/Header";
import { Request } from "../../../utils/Request";
import { Context, Sector, Service } from "../../../App";
import { Sector as ApiSector, Service as ApiService, User} from "../../Api";
import * as Storage from "../../Storage";


export class Parking extends React.Component {

	static contextType = Context;


	constructor(props) {
		super(props);
		this.state = {
			services: null,
			service_id: false,
			sectors: null,
			sector_id: false,
			place_id: false
		};
	}

	componentDidMount() {
		this.loadSectors().then(r => r);
	}

	loadSectors() {
		return ApiSector.List({DETAILED: 'Y'}).then(result => {
			this.setState((prevState) => ({
				...prevState,
				sectors: result,
				services: null
			}));
		});
	}

	loadServices() {
		return ApiService.List({DETAILED: 'Y'}).then(result => {
			this.setState((prevState) => ({
				...prevState,
				services: result,
				sectors: null
			}));
		});
	}

	back = async (e) => {
		e.persist();
		if(this.state.sector_id === false){
			await this.context.sider();
		}else{
			await this.setState((prevState) => ({
				...prevState,
				sector_id: false
			}))
		}
	};

	handleToParking = async (cell) => {
		if(cell?.place?.CAR_ID){
			await this.context.dialog({
				buttons: [],
				display: true,
				header: "Парковка",
				content: `Это парковочное место занято`,
			});
		}else if(!this.props?.place?.ID){
			await this.context.dialog({
				header: "Парковка",
				content: `Вы уверены, что хотите припарковать автомобиль на парковочном месте ${cell.place.INNER_ID}`,
				buttons: {
					parking: {
						text: 'Да',
						callback: async () => {
							return await Request({
								URL: `car/${this.props.car.ID}/parking`,
								METHOD: `PUT`,
								BODY: {
									PLACE_ID: cell.place.ID
								}
							}).then((result) => {
								if(result.success !== true){
									return result.message
								}else{
									this.props.callback();
									return `Автомобиль успешно припаркован на парковочном месте ${cell.place.INNER_ID}`;
								}
							})
						},
					}
				}
			});
		}
	};

	handleToService = async (service) => {
		await this.context.dialog({
			header: "Парковка",
			content: `Вы уверены, что хотите припарковать автомобиль в сервисном центре "${service.NAME}"?`,
			buttons: {
				parking: {
					text: 'Да',
					callback: async () => {
						return await Request({
							URL: `car/${this.props.car.ID}/status`,
							METHOD: `PUT`,
							BODY: {
								STATUS_ID: Storage.get('STATUS').SERVICE.ID,
								SERVICE_ID: service.ID,
							}
						}).then((result) => {
							if(result.success !== true){
								return result.message
							}else{
								this.props.callback();
								return `Автомобиль успешно припаркован в сервисном центре "${service.NAME}"`;
							}
						})
					},
				}
			}
		});
	};

	handleTabServices = (e) => {
		this.setState((prevState) => ({ ...prevState, services: null, sectors: null }));
		let tabs = document.querySelectorAll('.tabs .tab');
		for (let tab of tabs) tab.classList.remove('active');
		e.target.classList.add('active');
		this.loadServices().then(r => r);
	};

	handleTabParking = (e) => {
		this.setState((prevState) => ({ ...prevState, services: null, sectors: null }));
		let tabs = document.querySelectorAll('.tabs .tab');
		for (let tab of tabs) tab.classList.remove('active');
		e.target.classList.add('active');
		this.loadSectors().then(r => r);
	};

	render() {
		return (
			<>
				<Header
					title={"Парковка"}
					back={this.back}
				/>

				<header className="d-flex align-items-center" onClick={this.back}>
					<div className="thumb">
						<img src={"tiles/car.png"}/>
					</div>
					<div>
						<div>
							<b>{this.props.car?.BRAND_NAME} {this.props.car?.MODEL_NAME}</b>
						</div>
						<div>{(this.props.car?.INNER_ID) ? `${this.props.car.SECTOR_NAME}, место ${this.props.car.INNER_ID}` : `${this.props.car.G_NUMBER}`}</div>
					</div>
				</header>

				<main>
					{this.state.sector_id !== false ? (
						<Sector.Item.Table
							id={this.state.sector_id}
							onClick={this.handleToParking}
						/>
					) : (
						<div className="tabs">
							<div className="tab-list">
								<div className="tab-wrapper">
									<div className="tab active" id={"tab-parking"} onClick={this.handleTabParking}>Парковка</div>
									<div className="tab" id={"tab-service"} onClick={this.handleTabServices}>Сервис</div>
								</div>
							</div>
							<div className="tab-content">
								<div className={"content-wrapper"}>

									{this.state.sectors !== null ? (
										<Sector.List
											items={this.state.sectors}
											onClick={async (sector) => await this.setState((prevState) => ({
												...prevState,
												sector_id: sector.ID
											}))}
										/>
									) : (
										this.state.services !== null ? (
											<Service.List
												items={this.state.services}
												onClick={this.handleToService}
											/>
										) : (
											<div className="spinner mt-5" />
										)
									)}
								</div>
							</div>
						</div>
					)}
				</main>
			</>
		);
	}
}
