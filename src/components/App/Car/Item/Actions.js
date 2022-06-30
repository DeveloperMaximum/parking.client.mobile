import React from 'react';

import * as Storage from "./../../../utils/Storage";
import { Context } from "./../../Context";
import { Car as Api, Car} from "../../Api";
import { Header } from "../../../ui/Header";
import { Necessitates } from "../Necessitates";
import { Dcard } from "../Dcard";


export class Actions extends React.Component {

	static contextType = Context;


	constructor(props){
		super(props);
	}

	handleMoved = async (e) => {
		window.dispatchEvent(new CustomEvent(`app.dialog`, { detail: {
			header: "Перемещение",
			content: "Вы действительно хотите освободить парковочное место и переместить автомобиль?",
			buttons: [{
				text: 'Да',
				onClick: async () => {
					return await Car.Moving(this.props.car.ID).then((result) => {
						if(result.success === true){
							if(this.context.data.widget.children !== false && this.props?.history){
								this.props.history.push(`/home/car/${this.props.car.ID}`);
								this.context.widget();
							}else{
								this.props.parentDidMount();
							}
						}else{
							if(result?.message){
								return result.message;
							}
							return 'Не удалось сменить статус у автомобиля'
						}
						return true;
					});
				}
			}]
		}}));
	};

	handleTDrive = async (e) => {
		window.dispatchEvent(new CustomEvent(`app.dialog`, { detail: {
			header: "Тест-драйв",
			content: "Вы действительно хотите начать тест-драйв авто?",
			buttons: [{
				text: 'Да',
				onClick: async () => {
					return await Car.TDrive({ID: this.props.car.ID}).then((result) => {
						if(result.success === true){
							if(this.context.data.widget.children !== false && this.props?.history){
								this.props.history.push(`/home/car/${this.props.car.ID}`);
								this.context.widget();
							}else{
								this.props.parentDidMount();
							}
						}else{
							if(result?.message){
								return result.message;
							}
							return 'Взять автомобиль в тест-драйв не удалось'
						}
						return true;
					});
				}
			}]
		}}));
	};

	handleNecessitates = async (e) => {
		await this.context.sider({
			template: false,
			child: () => {
				return (
					<>
						<Header title={`Потребности`} back={() => this.context.sider()} />
						<header className="d-flex align-items-center shadow" onClick={() => this.context.sider()}>
							<div className="thumb">
								<img src={"tiles/car.png"} alt={""} />
							</div>
							<div>
								<div>
									<b>{this.props.car?.BRAND_NAME} {this.props.car?.MODEL_NAME}</b>
								</div>
								<div>{(this.props.car?.INNER_ID) ? `${this.props.car.SECTOR_NAME}, место ${this.props.car.INNER_ID}` : this.props.car.G_NUMBER}</div>
							</div>
						</header>
						<main>
							<Necessitates
								car={this.props.car}
								back={() => this.context.sider()}
								parentDidMount={this.props.parentDidMount}
							/>
						</main>
					</>
				)
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

		if(user.ROLES?.ADMIN || user.ROLES?.MANAGER){
			return (
				<div className="btn-wrapper d-flex flex-wrap justify-content-between">
					<button className="btn btn-primary" onClick={this.handleMoved}><i className="icon icon-sync_alt" /> Перемещение</button>
					<div className="btn btn-primary" onClick={this.handleNecessitates}> <i className="icon icon-build" /> Потребности </div>

					<button className={`btn btn-primary`} onClick={this.handleTDrive}><i className="icon icon-multiple_stop" /> Тест-драйв</button>
					<button className={`btn btn-primary`}><i className="icon icon-electric_car" /> Выдача</button>

					<div className="btn btn-secondary w-100" onClick={this.handleDCard}>Диагностическая карта</div>
				</div>
			);
		}else if(user.ROLES?.SELLER){
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
		}else{
			return (
				<div className="btn-wrapper d-flex flex-wrap justify-content-between">
					<button className="btn btn-primary" onClick={this.handleMoved}><i className="icon icon-sync_alt" /> Перемещение</button>

					<div className="btn btn-primary" onClick={this.handleNecessitates}> <i className="icon icon-build" /> Потребности </div>
					<div className="btn btn-secondary w-100" onClick={this.handleDCard}>Диагностическая карта</div>
				</div>
			);
		}
	};
}
