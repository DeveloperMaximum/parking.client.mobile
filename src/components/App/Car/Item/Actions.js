import React from 'react';

import { Context } from "../../Context";
import { Header } from "../../../ui/Header";
import { Car } from "../../Api";
import { Tech } from "../Necessitate/Tech";
import { Seller } from "../Necessitate/Seller";
import { Dcard } from "../Dcard";
import {Storage} from "../../index";


export class Actions extends React.Component {

	static contextType = Context;


	constructor(props){
		super(props);
	}

	handleMoved = async (e) => {
		await this.context.dialog({
			header: "Перемещение",
			content: "Вы действительно хотите освободить парковочное место и переместить автомобиль?",
			buttons: {
				moved: {
					text: 'Да',
					callback: async () => {
						return await Car.Moved({ID: this.props.car.ID}).then((result) => {
							if(result.success === true){
								if(this.context.data.widget.children !== false && this.props?.history){
									this.props.history.push(`/home/car/${this.props.car.ID}`);
									this.context.widget();
									return `Автомобиль приобрел статус "В движении"`;
								}
								this.props.componentDidMount();
								return `Автомобиль приобрел статус "В движении"`;
							}
							return result.message;
						});
					},
				}
			}
		});
	};

	handleNecessitates = async (e) => {
		await this.context.sider({
			template: false,
			child: () => {
				return (
					<>
						<Header
							title={`Потребности`}
							back={() => this.context.sider()}
						/>

						<header className="d-flex align-items-center" onClick={() => this.context.sider()}>
							<div className="thumb">
								<img src={"tiles/car.png"} />
							</div>
							<div>
								<div>
									<b>{this.props.car?.BRAND_NAME} {this.props.car?.MODEL_NAME}</b>
								</div>
								<div>{(this.props.car?.INNER_ID) ? `${this.props.car.SECTOR_NAME}, место ${this.props.car.INNER_ID}` : this.props.car.G_NUMBER}</div>
							</div>
						</header>
						<main>
							{!this.context.accessStatus('MOVING') ? (
								<div className={"content-wrapper"}>
									<Seller
										car={this.props.car}
										back={async () => this.context.sider()}
										tableDidMount={this.props.tableDidMount}
										handleDidMount={this.props.componentDidMount}
									/>
								</div>
							) : (
								<Tech
									car={this.props.car}
									back={() => this.context.sider()}
									tableDidMount={this.props.tableDidMount}
								/>
							)}
						</main>
					</>
				)
			}
		});
	};

	handleTDrive = async (e) => {
		this.context.dialog({
			header: "Тест-драйв",
			content: "Вы действительно хотите начать тест-драйв авто?",
			buttons: {
				tDrive: {
					text: 'Да',
					callback: async () => {
						return await Car.TDrive({ID: this.props.car.ID}).then((result) => {
							if(result.success !== true){
								return result.message;
							}
							if(result.success === true){
								if(this.context.data.widget.children !== false && this.props?.history){
									this.props.history.push(`/home/car/${this.props.car.ID}`);
									this.context.widget();
									return true;
								}
								this.props.componentDidMount();
								return true;
							}
						});
					}
				}
			}
		});
	};

	handleDCard = async (e) => {
		await this.context.sider({
			template: false,
			child: () => {
				return (
					<Dcard
						car={this.props.car}
						back={async () => this.context.sider()}
					/>
				)
			}
		})
	};

	render(){
		const user = Storage.get('USER');

		if(user.ROLES?.ADMIN){
			return (
				<div className="btn-wrapper d-flex flex-wrap justify-content-between">
					<button className="btn btn-primary" onClick={this.handleMoved}><i className="icon icon-sync_alt" /> Перемещение</button>
					<div className="btn btn-primary" onClick={this.handleNecessitates}> <i className="icon icon-build" /> Потребности </div>

					<button className={`btn btn-primary`} onClick={this.handleTDrive}><i className="icon icon-multiple_stop" /> Тест-драйв</button>
					<button className={`btn btn-primary`}><i className="icon icon-electric_car" /> Выдача</button>

					<div className="btn btn-secondary w-100" onClick={this.handleDCard}>Диагностическая карта</div>
				</div>
			);
		}

		if(user.ROLES?.MASTER_SMC || user.ROLES?.MASTER_MKC || user.ROLES?.TECH){
			return (
				<div className="btn-wrapper d-flex flex-wrap justify-content-between">
					<button className="btn btn-primary" onClick={this.handleMoved}><i className="icon icon-sync_alt" /> Перемещение</button>

					<div className="btn btn-primary" onClick={this.handleNecessitates}> <i className="icon icon-build" /> Потребности </div>
					<div className="btn btn-secondary w-100" onClick={this.handleDCard}>Диагностическая карта</div>
				</div>
			);
		}

		if(user.ROLES?.SELLER){
			return (
				<div className="btn-wrapper d-flex flex-wrap justify-content-between">
					<button className={`btn btn-primary`} onClick={this.handleTDrive}><i className="icon icon-multiple_stop" /> Тест-драйв</button>
					<div className="btn btn-primary" onClick={this.handleNecessitates}> <i className="icon icon-build" /> Потребности </div>
					<button className={`btn btn-primary w-100`}>
						<span>Выдача</span>
					</button>
					<div className="btn btn-secondary w-100" onClick={this.handleDCard}>Диагностическая карта</div>
				</div>
			);
		}
	};
}
