import React from 'react';
import * as Storage from "../../Storage";
import {Parking} from "../Parking";
import { Context } from "../../Context";


export class Endbtn extends React.Component {

	static contextType = Context;


	timer(start){
		let out = '';

		let diff = ((new Date()).getTime() - (new Date(start)).getTime()) / 1000;
		let hours = Math.floor(diff / 60 / 60);
		let minutes = Math.floor(diff / 60) - (hours * 60);
		let seconds =  Math.floor(diff % 60);
		if(seconds > 0 && minutes === 0){
			hours = 0; minutes = 0;
		}

		if(hours > 0) out += `${hours} ч `;
		if(minutes > 0) out += `${minutes} мин `;
		if(out === '') out += (this.props.car?.STATUS_CODE === 'T_DRIVE') ? `только что начался` : `только что началось`;

		return (
			<div className="alert alert-info bg-info car-status-info">
				{(this.props.car.STATUS_ID === 6) ? ( <>Продолжительность тест-драйва</> ) : ( <>Время в движении</> )}
				<div>{out}</div>
			</div>
		);
	}

	handleParking = async (e) => {
		e.persist();
		await this.context.dialog({
			header: "Перемещение",
			content: "Вы действительно хотите припарковать автомобиль?",
			buttons: {
				tDrive: {
					text: 'Да',
					callback: async () => {
						this.context.sider({
							template: false,
							child: () => {
								return (
									<Parking
										car={this.props.car}
										callback={() => {
											this.props.componentDidMount();
											this.context.sider();
										}}
									/>
								)
							}
						});
					},
				}
			}
		});
	};

	handleEndTDrive = async (e) => {
		e.persist();
		await this.context.dialog({
			header: "Тест-драйв",
			content: "Вы действительно хотите завершить тест-драйв авто?",
			buttons: {
				parking: {
					text: 'Да',
					callback: async () => {
						this.context.sider({
							template: false,
							child: () => {
								return (
									<Parking
										car={this.props.car}
										callback={() => {
											this.props.componentDidMount();
											this.context.sider();
										}}
									/>
								)
							}
						});
					},
				}
			}
		});
	};

	render(){
		if(this.props.car?.STATUS_CODE === 'MOVING'){
			return (
				<>
					{ this.timer(this.props.car.HISTORY_DATE_CREATE) }

					<div className="btn-wrapper d-flex flex-wrap justify-content-between mb-3">
						<button className={"btn btn-primary w-100"} onClick={this.handleParking}>Припарковать автомобиль</button>
					</div>
				</>
			);
		}

		if(this.props.car?.STATUS_CODE === 'T_DRIVE'){
			return (
				<>
					{ this.timer(this.props.car.HISTORY_DATE_CREATE) }

					<div className="btn-wrapper d-flex flex-wrap justify-content-between mb-3">
						<button className={"btn btn-primary w-100"} onClick={this.handleEndTDrive}>Завершить тест-драйв</button>
					</div>
				</>
			);
		}

		return null;
	};
}
