import React from "react";

import {Header} from "../../../ui/Header";
import { App } from "../../Context";
import { Sector as ApiSector } from "../../Api";
import { Sector } from "../../../App";
import {Request} from "../../../utils/Request";


export class Parking extends React.Component {

	static contextType = App;


	constructor(props) {
		super(props);
		this.state = {
			sectors: null,
			sector_id: false,
			place_id: false
		};
	}

	componentDidMount() {
		this.loadSectors().then(r => r);
	}

	loadSectors() {
		return ApiSector.get({DETAILED: 'Y'}).then(result => {
			this.setState((prevState) => ({
				...prevState,
				sectors: result
			}));
		});
	}

	back = async (e) => {
		e.persist();
		if(this.state.sector_id === false){
			this.context.sider();
		}else{
			await this.setState((prevState) => ({
				...prevState,
				sector_id: false
			}))
		}
	};

	render() {
		return (
			<>
				<Header>
					<div className="d-flex" onClick={this.back}>
						<i className="icon icon-chevron_left d-inline-block" />
						<h1 className="d-inline-block d-inline-block">Парковка</h1>
					</div>
				</Header>

				<header className="d-flex align-items-center" onClick={this.back}>
					<div className="thumb">
						<img src="tiles/car.png"/>
					</div>
					<div>
						<div>
							<b>{this.props.car?.BRAND_NAME} {this.props.car?.MODEL_NAME}</b>
						</div>
						<div>{(this.props.car?.INNER_ID) ? `${this.props.car.SECTOR_NAME}, место ${this.props.car.INNER_ID}` : `${this.props.car.G_NUMBER}`}</div>
					</div>
				</header>

				<main>
					<div className={"content-wrapper"}>
						{this.state.sector_id !== false ? (
							<Sector.Item.Table
								id={this.state.sector_id}
								onClick={async (cell) => await Request({
									URL: `car/${this.props.car.ID}/parking`,
									METHOD: `PUT`,
									BODY: {
										PLACE_ID: cell.place.info.ID
									}
								}).then((result) => {
									let place_id = this.state.place_id;
									if(result.success !== true){
										this.context.dialog({
											header: "Парковка",
											content: result.message,
										});
									}
									this.context.sider();
									this.context.dialog({
										header: "Парковка",
										callback: async () => {
											await this.props.callback();
											return true;
										},
										content: `Автомобиль успешно припаркован на парковочном месте ${cell.place.info.INNER_ID}`,
									});
								})}
							/>
						) : (
							<Sector.List
								items={this.state.sectors}
								onClick={async (sector) => await this.setState((prevState) => ({
									...prevState,
									sector_id: sector.ID
								}))}
							/>
						)}
					</div>
				</main>
			</>
		);
	}
}
