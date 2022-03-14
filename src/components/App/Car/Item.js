import React from 'react';

import { Request } from "../../utils/Request";
import { Context } from "../../base/Context";
import { ParkingConsumer } from "../../base/Context/Parking";
import * as Storage from "../../base/Storage";

import { Car } from "../Api";


export class Item extends React.Component {

	static contextType = Context;

	statuses;

    constructor(props){
        super(props);

	    this.statuses = Storage.get('STATUS');

        this.state = {
	        loading: true,
            id: Number(props.id),
            car: null
        };
    }

    componentDidMount = async () => {
        return Car.getById(this.props.id).then((result) => {
            this.setState((prevState) => ({
                ...prevState,
                car: {
	                ID: result.ID,
	                BRAND_NAME: result.BRAND_NAME,
	                MODEL_NAME: result.MODEL_NAME,
	                YEAR: Number(result.YEAR),
	                VIN: result.VIN,
	                VIN2: result.VIN2,
	                G_NUMBER: result.G_NUMBER,
	                MILEAGE: Number(result.MILEAGE),
	                BODY_NAME: result.BODY_NAME,
	                TRANSMISSION_NAME: result.TRANSMISSION_NAME,
	                RESPONSIBLE_ID: Number(result.RESPONSIBLE_ID),
	                PLACE_ID: Number(result.PLACE_ID),
	                STATUS_ID: Number(result.STATUS_ID),
	                STATUS_CODE: result.STATUS_CODE,
	                NECESSITATE_TOTAL: Number(result.NECESSITATE_TOTAL),
	                HISTORY_DATE_CREATE: result.HISTORY_DATE_CREATE,
                },
	            loading: false
            }));
        })
    };

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return false;
		}
	}

	onTDrive = (e) => {
		this.context.confirm({
			header: "Тест-драйв",
			content: "Вы действительно хотите начать тест-драйв авто?",
			success: "Да",
			cancel: "Нет",
			callback: async () => {
				return Request({
					METHOD: `PUT`,
					URL: `car/${this.state.id}/tdrive`
				}).then((result) => {
					if(result.success === true){
						if(this.context.data.widget.children !== false && this.props?.history){
							this.props.history.push(`/catalog/car/${this.state.id}`);
							this.context.widget();
						}
						this.componentDidMount();
						return true;
					}
					return result.message;
				});
			},
		});
	};

	onDemo = (e) => {
		this.context.confirm({
			header: "Демонстрация",
			content: "Вы действительно хотите начать демонстрацию авто?",
			success: "Да",
			cancel: "Нет",
			callback: async () => {
				return Request({
					METHOD: `PUT`,
					URL: `car/${this.state.id}/demo`
				}).then((result) => {
					if(result.success === true){
						if(this.context.data.widget.children !== false && this.props?.history){
							this.props.history.push(`/catalog/car/${this.state.id}`);
							this.context.widget();
						}
						this.componentDidMount();
						return true;
					}
					return result.message;
				});
			},
		});
	};

	renderCarProps(){
    	return (
		    <>
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
					    <div>{(this.state.car.MILEAGE > 0) ? new Intl.NumberFormat('ru-RU').format(this.state.car.MILEAGE) + ' км' : '-'}</div>
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
		    </>
	    );
    }

    renderTimer(start){
		let out = '';
	    let status = this.statuses[this.state.car?.STATUS_CODE];

	    let diff = ((new Date()).getTime() - (new Date(start)).getTime()) / 1000;
	    let hours = Math.floor(diff / 60 / 60);
	    let minutes = Math.floor(diff / 60) - (hours * 60);
	    let seconds =  Math.floor(diff % 60);

	    if(hours > 0) out += `${hours} ч `;
	    if(minutes > 0) out += `${minutes} мин `;
	    // if(seconds > 0) out += `${seconds} сек `;
	    if(out === '') out += (status?.CODE === 'T_DRIVE') ? `только что начался` : `только что началась`;
	    return (
		    <div className="alert alert-info bg-info car-status-info">
			    {(this.state.car.STATUS_ID === 6) ? ( <>Продолжительность тест-драйва</> ) : ( <>Продолжительность демонстрации</> )}
			    <div>{out}</div>
		    </div>
	    );
    }

    renderEndButton(){
		if(this.state.car.RESPONSIBLE_ID !== Number(Storage.get('USER_ID'))){
			return null;
		}

	    let status = this.statuses[this.state.car?.STATUS_CODE];
	    if(status?.CODE === 'MOVING'){
		    return (
			    <div className="btn-wrapper d-flex flex-wrap justify-content-between mb-3">
				    <ParkingConsumer>
					    {({ start }) => (
						    <button className={"btn btn-primary w-100"} onClick={async (e) => {
							    e.persist();
							    await this.context.confirm({
								    header: "Перемещение",
								    content: "Вы действительно хотите припарковать автомобиль?",
								    success: "Да",
								    cancel: "Нет",
								    callback: async () => {
									    start({
										    callback: async () => {
											    this.componentDidMount();
										    },
										    car_id: this.state.id
									    });
									    return true;
								    },
							    });
						    }}>
							    <>Припарковать автомобиль</>
						    </button>
					    )}
				    </ParkingConsumer>
			    </div>
		    );
	    }

	    if(status?.CODE === 'T_DRIVE'){
		    return (
			    <>
				    { this.renderTimer(this.state.car.HISTORY_DATE_CREATE) }
				    <div className="btn-wrapper d-flex flex-wrap justify-content-between mb-3">
					    <ParkingConsumer>
						    {({ start }) => (
							    <button className={"btn btn-primary w-100"} onClick={async (e) => {
								    e.persist();
								    await this.context.confirm({
									    header: "Демонстрация",
									    content: "Вы действительно хотите завершить тест-драйв авто?",
									    success: "Да",
									    cancel: "Нет",
									    callback: async () => {
										    start({
											    callback: async () => {
												    this.componentDidMount();
											    },
											    car_id: this.state.id
										    });
										    return true;
									    },
								    });
							    }}>
								    <>Звершить тест-драйв</>
							    </button>
						    )}
					    </ParkingConsumer>
				    </div>
			    </>
		    );
	    }

	    if(status?.CODE === 'DEMO'){
		    return (
			    <>
				    { this.renderTimer(this.state.car.HISTORY_DATE_CREATE) }
				    <div className="btn-wrapper d-flex flex-wrap justify-content-between mb-3">
					    <button className={"btn btn-primary w-100"} onClick={async (e) => {
						    await this.context.confirm({
							    header: "Демонстрация",
							    content: "Вы действительно хотите завершить демонстрацию автомобиля?",
							    success: "Да",
							    cancel: "Нет",
							    callback: async () => {
								    return await Request({
									    URL: `car/${this.state.car.ID}/parking`,
									    METHOD: `PUT`,
									    BODY: {
										    PLACE_ID: this.state.car.PLACE_ID
									    }
								    }).then((result) => {
									    if(result.success === true){
										    this.componentDidMount();
										    return `Демонстрация автомобиля успешно завершена`;
									    }
									    return result.message;
								    });
							    },
						    });
					    }}>
						    <>Звершить демонстрацию</>
					    </button>
				    </div>
			    </>
		    );
	    }
    }

    render(){

	    let allowDemo = false;
	    let allowTdrive = false;
	    let allowMoving = false;
        let iconStatus = 'mood';

        let status = this.statuses[this.state.car?.STATUS_CODE];
	    let textStatus = status?.NAME;

	    if(this.state.car?.NECESSITATE_TOTAL > 0){
		    iconStatus = 'build';
		    textStatus = 'Нуждается в обслуживании';
	    }

        if(this.state.car?.STATUS_CODE !== 'PARKING'){
	        allowDemo = false;
	        allowTdrive = false;
	        allowMoving = false;
	        iconStatus = 'alarm';
	        textStatus = status?.NAME;
        }else{
	        allowDemo = this.context.accessStatus('DEMO');
	        allowTdrive = this.context.accessStatus('T_DRIVE');
	        allowMoving = this.context.accessStatus('MOVING');
        }

        return (

            <>
                <div className={"car w-100 overflow-hidden"}>
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

                                { this.renderCarProps() }
                            </div>

                            <div className="content-wrapper">
	                            { this.renderEndButton() }

	                            <>
		                            <div className="btn-wrapper d-flex flex-wrap justify-content-between">
			                            <button className="btn btn-primary" onClick={async (e) => {
				                            await this.context.confirm({
					                            header: "Перемещение",
					                            content: "Вы действительно хотите освободить парковочное место и переместить автомобиль?",
					                            success: "Да",
					                            cancel: "Нет",
					                            callback: async () => {
						                            return await Request({
							                            URL: `car/${this.state.car.ID}/moving`,
							                            METHOD: `PUT`,
							                            BODY: {}
						                            }).then((result) => {
							                            if(result.success === true){
								                            if(this.context.data.widget.children !== false && this.props?.history){
									                            this.props.history.push(`/catalog/car/${this.state.id}`);
									                            this.context.widget();
								                            }
								                            this.componentDidMount();
								                            return `Автомобиль приобрел статус "В движении"`;
							                            }
							                            return result.message;
						                            });
					                            },
				                            });
			                            }} disabled={(!allowMoving)}>
				                            <i className="icon icon-sync_alt" />
				                            Перемещение
			                            </button>
			                            <div className="btn btn-primary">
				                            <i className="icon icon-build" />
				                            Потребности
			                            </div>
			                            <button className={`btn btn-primary`} onClick={this.onTDrive} disabled={(!allowTdrive)}>
				                            Тест-драйв
			                            </button>
			                            <button className={"btn btn-primary"} onClick={this.onDemo} disabled={(!allowDemo)}>
				                            Демонстрация
			                            </button>
			                            <div className="btn btn-secondary">Выдача</div>
			                            <div className="btn btn-secondary">История</div>
		                            </div>
	                            </>
                            </div>
                        </>
                    )}

                </div>
            </>
        );
    }
};
