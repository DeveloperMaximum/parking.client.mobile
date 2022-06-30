import React from "react";

import { Context } from "../../../App/Context";
import { Car as Api } from "../../Api";
import { Header, Tabs } from "../../../ui";
import { Sector, Service} from "../../../App";


export class Parking extends React.Component {

	static contextType = Context;

	tabs = [];


	constructor(props) {
		super(props);
		this.state = {
			zones: null,
			zone_id: false,

			services: null,
			service_id: false,

			sectors: null,
			sector_id: false,
			place_id: false,

			tabId: this.props?.tabId ? this.props.tabId : 'sectors',
		};
	}

	componentDidMount = async () => {
		this.setState((prevState) => ({
			...prevState,
			tabId: this.props?.tabId ? this.props.tabId : 'sectors'
		}));
	};

	componentWillUnmount(){
		this.setState = (state, callback) => {
			return false;
		};
	}

	handleTab = async (tab) => {
		this.setState((prevState) => ({
			...prevState,
			tabId: tab.dataId
		}));
	};

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
			window.dispatchEvent(new CustomEvent(`app.dialog`, { detail: {
				header: "Парковка",
				content: `Это парковочное место занято`
			}}));
		}else if(!this.props?.place?.ID){
			window.dispatchEvent(new CustomEvent(`app.dialog`, { detail: {
				header: "Парковка",
				content: `Вы уверены, что хотите припарковать автомобиль на парковочном месте ${cell.place.INNER_ID}`,
				buttons: [{
					text: 'Да',
					onClick: async () => {
						return await Api.Parking({ ID: this.props.car.ID, PLACE_ID: cell.place.ID }).then((result) => {
							if(result.success !== true){
								if(result?.message) return result.message;
								return false;
							}
							this.props.callback();
							if(result?.message){
								return result.message;
							}else{
								return true;
							}
						})
					}
				}]
			}}));
		}
	};

	handleToService = async (service) => {
		window.dispatchEvent(new CustomEvent(`app.dialog`, { detail: {
			header: "Парковка",
			content: `Вы уверены, что хотите припарковать автомобиль в сервисном центре "${service.NAME}"?`,
			buttons: [{
				text: 'Да',
				onClick: async () => {
					return await Api.Service({
						ID: this.props.car.ID,
						SERVICE_ID: service.ID,
					}).then((result) => {
						if(result.success !== true){
							if(result?.message){
								return result.message;
							}else{
								return true;
							}
						}else{
							this.props.callback();
							if(result?.message){
								return result.message;
							}else{
								return true;
							}
						}
					})
				}
			}]
		}}));
	};

	render() {
		return (
			<>
				<Header title={"Парковка"} back={this.back} />

				<header className="d-flex align-items-center shadow" onClick={this.back}>
					<div className="thumb">
						<img src={"tiles/car.png"} alt={""} />
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
						<>
							<Tabs
								tabs={[
									{ name: 'Сектора', dataId: 'sectors', children: (
										<Sector.List
											filter={{
												DETAILED: 'Y'
											}}
											onClick={ async (sector) => await this.setState((prevState) => ({
												...prevState,
												sector_id: sector.ID
											}))}
										/>
									)},
									{ name: 'Сервисы', dataId: 'services', children: (
										<Service.List
											onClick={this.handleToService}
										/>
									)},
									{ name: 'Зоны', dataId: 'zones', children: (
										<div className={"p-3 overflow-hidden"}>
											<div className={"alert alert-info alert alert-info"}>В разработке</div>
										</div>
									)}
								]}
							/>
						</>
					)}
				</main>
			</>
		);
	}
}
