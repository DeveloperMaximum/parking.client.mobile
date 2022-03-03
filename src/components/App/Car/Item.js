import React from 'react';

import { Request } from "../../utils/Request";
import { Context } from "../../base/Context";
import * as Storage from "../../base/Storage";

import { Car, Sector } from "../Api";


export class Item extends React.Component {

	static contextType = Context;

    constructor(props){
        super(props);
        this.state = {
            id: props.id,
            car: null,
            loading: true,
            parking: {
	            loading: false,
            	sector_id: false,
	            place_id: false
            },
        };
    }

    componentDidMount = async () => {
        return Car.getById(this.props.id).then((result) => {
            this.setState((prevState) => ({
                ...prevState,
                car: result,
	            loading: false
            }));
        })
    };

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return false;
		}
	}

	onTestDrive = (e) => {
		this.context.confirm.show({
			header: "Взять авто на тест-драйв?",
			content: "Вы действительно хотите начать тест-драйв авто?",
			success: "Да, начать",
			cancel: "Нет",
			callback: async () => {
				return Request({
					METHOD: `PUT`,
					URL: `car/${this.state.car.ID}/tdrive`
				}).then((result) => {
					if(result.success === true){
						this.componentDidMount();
						return true;
					}else{
						return result.message;
					}
				});
			},
		});
	};

	onDemo = (e) => {
		this.context.confirm.show({
			header: "Взять авто на демонстрацию?",
			content: "Вы действительно хотите начать демонстрацию авто?",
			success: "Да, начать",
			cancel: "Нет",
			callback: async () => {
				return Request({
					METHOD: `PUT`,
					URL: `car/${this.state.car.ID}/demo`
				}).then((result) => {
					if(result.success === true){
						this.componentDidMount();
						return true;
					}else{
						return result.message;
					}
				});
			},
		});
	};

	onParking = (e) => {
		e.persist();
		Sector.get({DETAILED: 'Y'}).then(result => {
			this.context.car.parking({
				callback: async (place_id) => {
					return Request({
						URL: `car/${this.state.car.ID}/parking`,
						METHOD: `PUT`,
						BODY: {
							PLACE_ID: place_id
						}
					}).then((result) => {
						if(result.success === true){
							this.componentDidMount();
							return true;
						}else{
							return result.message;
						}
					});
				},
				car_id: this.state.car.ID,
				sectors: result,
			});
		});
	};

    render(){

	    let allowDemo = true;
	    let allowTdrive = true;
        let iconStatus = 'mood';
        let textStatus = 'Готов к просмотру';
	    let timeStatus = false;

        let statusId = this.state.car?.STATUS_ID;

        if(Number(statusId) === 6 || Number(statusId) === 9){
	        allowDemo = false;
	        allowTdrive = false;
	        iconStatus = 'alarm';
            textStatus = 'В тест-драйве';
            timeStatus = Number(((new Date()).getTime() - (new Date(this.state.car.HISTORY_DATE_CREATE)).getTime()) / 60000);
        }else if(this.state.car?.NECESSITATE_TOTAL > 0){
	        allowDemo = true;
	        allowTdrive = true;
            iconStatus = 'build';
            textStatus = 'Нуждается в обслуживании';
	        timeStatus = false;
        }


        return (

            <>
                <div className={"car"}>
                    {this.state.loading === true ? (
                        <div className={"spinner"} />
                    ) : (
                        <>
                            <div className={"car-props"}>
                                <div className="status-wrapper bg-info">
                                    <i className={`icon icon-${iconStatus}`} />
                                    <span>Статус</span>
                                    <div className="status-text">
                                        {textStatus}
                                    </div>
                                </div>

                                <h2 className="d-inline-block">{this.state.car.BRAND_NAME} {this.state.car.MODEL_NAME} {(this.state.car?.YEAR) ? '(' + this.state.car.YEAR + ')' : ''}</h2>

                                <div className="prop d-flex flex-column align-items-start">
                                    <span>VIN</span>
                                    <div>{this.state.car.VIN}{this.state.car.VIN2}</div>
                                </div>

                                <div className="prop d-flex flex-column align-items-start">
                                    <span>Парковочное место</span>
                                    <div>{(this.state.car?.PLACE_ID) ? `${this.state.car.SECTOR_ID}, место ${this.state.car.PLACE_ID}` : '-'}</div>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <div className="prop d-flex flex-column align-items-start ">
                                        <span>Пробег</span>
                                        <div>{(this.state.car?.MILEAGE) ? new Intl.NumberFormat('ru-RU').format(this.state.car.MILEAGE) + ' км' : '-'}</div>
                                    </div>

                                    <div className="prop d-flex flex-column align-items-start">
                                        <span>Гос. номер</span>
                                        <div>{(this.state.car?.G_NUMBER) ? this.state.car.G_NUMBER : '-'}</div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <div className="prop d-flex flex-column align-items-start">
                                        <span>Тип кузова</span>
                                        <div>{(this.state.car?.BODY_NAME) ? this.state.car.BODY_NAME : '-'}</div>
                                    </div>

                                    <div className="prop d-flex flex-column align-items-start">
                                        <span>Коробка передач</span>
                                        <div>{(this.state.car?.TRANSMISSION_NAME) ? this.state.car.TRANSMISSION_NAME : '-'}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="content-wrapper">
	                            {(Number(this.state.car.STATUS_ID) === 6 && Number(this.state.car.RESPONSIBLE_ID) === Number(Storage.get('USER_ID'))) ? (
		                                <>
			                                <div className="alert alert-info bg-info car-status-info">
				                                {(Number(this.state.car.STATUS_ID) === 6) ? ( <>Продолжительность тест-драйва</> ) : ( <>Продолжительность демонстрации</> )}
			                                    <div>{Math.trunc(timeStatus / 60)} час {Math.round(timeStatus % 60)} мин</div>
			                                </div>
				                            <div className="btn-wrapper d-flex flex-wrap justify-content-between">
				                                <button className={"btn btn-primary w-100"} onClick={this.onParking}>
					                                {(Number(this.state.car.STATUS_ID) === 6) ? ( <>Звершить тест-драйв</> ) : ( <>Звершить демонстрацию</> )}
				                                </button>
				                            </div>
			                            </>
		                            ) : (
			                            <div className="btn-wrapper d-flex flex-wrap justify-content-between">
				                            <div className="btn btn-primary">
					                            <i className="icon icon-sync_alt"/>
					                            Перемещение
				                            </div>
				                            <div className="btn btn-primary">
					                            <i className="icon icon-build"/>
					                            Потребности
				                            </div>
				                            <button className={`btn btn-primary`} onClick={this.onTestDrive} disabled={(!allowTdrive)}>
					                            Тест-драйв
				                            </button>
				                            <button className={"btn btn-primary"} onClick={this.onDemo} disabled={(!allowDemo)}>
					                            Демонстрация
				                            </button>
				                            <div className="btn btn-secondary">Выдача</div>
				                            <div className="btn btn-secondary">История</div>
			                            </div>
	                                )
	                            }
                            </div>
                        </>
                    )}

                </div>
            </>
        );
    }
};
