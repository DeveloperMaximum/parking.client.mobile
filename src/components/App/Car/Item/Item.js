import React from 'react';

import * as Storage from "../../../App/Storage/Storage";
import { App } from "../../Context";
import { Car } from "../../Api";
import { Dcard } from "../../Car/Dcard";
import { Parking } from "../../Car/Parking";
import { Seller } from "../../Car/Necessitate/Seller";
import { Status } from "./Status";
import { Props } from "./Props";


export class Item extends React.Component {

	static contextType = App;

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
    	if(this.props.id === null){
		    return this.setState((prevState) => ({
			    ...prevState,
			    loading: null
		    }));
	    }
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
	                PRICE: Number(result.PRICE),
	                PLACE_ID: Number(result.PLACE_ID),
	                INNER_ID: Number(result.INNER_ID),
	                STATUS_ID: Number(result.STATUS_ID),
	                STATUS_CODE: result.STATUS_CODE,
	                STATUS_NAME: this.statuses[result.STATUS_CODE].NAME,
	                SECTOR_ID: Number(result.SECTOR_ID),
	                SECTOR_NAME: result?.SECTOR_ID && result.SECTOR_ID > 0 ? Storage.get('SECTOR')[result.SECTOR_ID].NAME : null,
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

    renderTimer(start){
		let out = '';
	    let status = this.statuses[this.state.car?.STATUS_CODE];

	    let diff = ((new Date()).getTime() - (new Date(start)).getTime()) / 1000;
	    let hours = Math.floor(diff / 60 / 60);
	    let minutes = Math.floor(diff / 60) - (hours * 60);
	    let seconds =  Math.floor(diff % 60);
	    if(seconds > 0 && minutes === 0){
		    hours = 0; minutes = 0;
	    }

	    if(hours > 0) out += `${hours} ч `;
	    if(minutes > 0) out += `${minutes} мин `;
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

	    if(this.state.car?.STATUS_CODE === 'MOVING'){
		    return (
			    <div className="btn-wrapper d-flex flex-wrap justify-content-between mb-3">
				    <button className={"btn btn-primary w-100"} onClick={async (e) => {
					    e.persist();
					    await this.context.dialog({
						    header: "Перемещение",
						    content: "Вы действительно хотите припарковать автомобиль?",
						    buttons: {
							    tDrive: {
								    text: 'Да',
								    callback: async () => {
									    return true;
								    },
							    }
						    }
					    });
				    }}>Припарковать автомобиль</button>
			    </div>
		    );
	    }

	    if(this.state.car?.STATUS_CODE === 'T_DRIVE'){
		    return (
			    <>
				    { this.renderTimer(this.state.car.HISTORY_DATE_CREATE) }
				    <div className="btn-wrapper d-flex flex-wrap justify-content-between mb-3">
					    <button className={"btn btn-primary w-100"} onClick={async (e) => {
						    e.persist();
						    await this.context.dialog({
							    header: "Тест-драйв",
							    content: "Вы действительно хотите завершить тест-драйв авто?",
							    buttons: {
								    parking: {
									    text: 'Да',
									    callback: async () => {
										    await this.context.sider({
											    template: false,
											    child: () => {
												    return (
													    <Parking
													        car={this.state.car}
													        callback={this.componentDidMount}
													    />
												    )
											    }
										    });
										    return true;
									    },
								    }
							    }
						    });
					    }}>Звершить тест-драйв</button>
				    </div>
			    </>
		    );
	    }

	    if(this.state.car?.STATUS_CODE === 'DEMO'){
		    return (
			    <>
				    { this.renderTimer(this.state.car.HISTORY_DATE_CREATE) }
				    <div className="btn-wrapper d-flex flex-wrap justify-content-between mb-3">
					    <button className={"btn btn-primary w-100"} onClick={async (e) => {
						    await this.context.dialog({
							    header: "Демонстрация",
							    content: "Вы действительно хотите завершить демонстрацию автомобиля?",
							    buttons: {
								    demo: {
									    text: 'Да',
									    callback: async () => {
										    return await Car.toParking({ID: this.state.id, PLACE_ID: this.state.car.PLACE_ID}).then((result) => {
											    if(result.success === true){
												    this.componentDidMount();
												    return `Демонстрация автомобиля успешно завершена`;
											    }
											    return result.message;
										    });
									    },
								    }
							    }
						    });
					    }}>Звершить демонстрацию</button>
				    </div>
			    </>
		    );
	    }
    }

    render(){

	    let allowDemo = false;
	    let allowTdrive = false;
	    let allowMoving = false;

        if(this.state.car?.STATUS_CODE !== 'PARKING'){
	        allowDemo = false;
	        allowTdrive = false;
	        allowMoving = false;
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

	                            <Status car={this.state.car}/>

	                            <>
		                            <h2 className="d-inline-block">{this.state.car.BRAND_NAME} {this.state.car.MODEL_NAME} {(this.state.car?.YEAR) ? '(' + this.state.car.YEAR + ')' : ''}</h2>

		                            <Props car={this.state.car} />
	                            </>
                            </div>

                            <div className="content-wrapper">
	                            { this.renderEndButton() }

	                            <>
		                            <div className="btn-wrapper d-flex flex-wrap justify-content-between">
			                            <button className="btn btn-primary" onClick={async (e) => {
				                            await this.context.dialog({
					                            header: "Перемещение",
					                            content: "Вы действительно хотите освободить парковочное место и переместить автомобиль?",
					                            buttons: {
						                            moved: {
							                            text: 'Да',
							                            callback: async () => {
								                            return await Car.toMoved({ID: this.state.car.ID}).then((result) => {
									                            if(result.success === true){
										                            if(this.context.data.widget.children !== false && this.props?.history){
											                            this.props.history.push(`/home/car/${this.state.id}`);
											                            this.context.widget();
										                            }
										                            this.componentDidMount();
										                            return `Автомобиль приобрел статус "В движении"`;
									                            }
									                            return result.message;
								                            });
							                            },
						                            }
					                            }
				                            });
			                            }} disabled={(!allowMoving)}><i className="icon icon-sync_alt" /> Перемещение</button>

			                            <div className="btn btn-primary" onClick={async (e) => {
				                            await this.context.sider({
					                            template: false,
					                            child: () => {
						                            return (
							                            <Seller
								                            car={this.state.car}
								                            onSuccess={this.componentDidMount}
								                            back={async () => this.context.sider()}
							                            />
						                            )
					                            }
				                            });
			                            }}> <i className="icon icon-build" /> Потребности </div>

			                            <button className={`btn btn-primary`} onClick={async (e) => {
				                            this.context.dialog({
					                            header: "Тест-драйв",
					                            content: "Вы действительно хотите начать тест-драйв авто?",
					                            buttons: {
						                            tDrive: {
							                            text: 'Да',
							                            callback: async () => {
								                            return await Car.toTDrive({ID: this.state.id}).then((result) => {
									                            if(result.success === true){
										                            if(this.context.data.widget.children !== false && this.props?.history){
											                            this.props.history.push(`/home/car/${this.state.id}`);
											                            this.context.widget();
										                            }
										                            this.componentDidMount();
										                            return true;
									                            }
									                            return result.message;
								                            });
							                            }
						                            }
					                            }
				                            });
			                            }} disabled={(!allowTdrive)}>Тест-драйв</button>
			                            <button className={`btn btn-primary`} onClick={async (e) => {
				                            this.context.dialog({
					                            header: "Демонстрация",
					                            content: "Вы действительно хотите начать демонстрацию авто?",
					                            buttons: {
						                            demo: {
							                            text: 'Да',
							                            callback: async () => {
								                            return await Car.toDemo({ID: this.state.id}).then((result) => {
									                            if(result.success === true){
										                            if(this.context.data.widget.children !== false && this.props?.history){
											                            this.props.history.push(`/home/car/${this.state.id}`);
											                            this.context.widget();
										                            }
										                            this.componentDidMount();
										                            return true;
									                            }
									                            return result.message;
								                            });
							                            }
						                            }
					                            }
				                            });
			                            }} disabled={(!allowDemo)}>Демонстрация</button>

			                            <div className="btn btn-secondary">Выдача</div>
			                            <div className="btn btn-secondary">История</div>

	                                    <div className="btn btn-secondary w-100" onClick={async (e) => {
	                                        if(this.state.car.STATUS_CODE === 'T_DRIVE' ||  this.state.car.STATUS_CODE === 'DEMO'){
		                                        await this.context.sider({
			                                        template: false,
			                                        child: () => {
				                                        return (
					                                        <Dcard
						                                        car={this.state.car}
						                                        back={async () => this.context.sider()}
					                                        />
				                                        )
			                                        }
		                                        });
		                                    }else{
			                                    await this.context.dialog({
				                                    header: "Диагностическая карта",
				                                    content: "Для доступа к диагностической карте необходимо перевести автомобиль в статус демонстрации или тест-драйва",
				                                    buttons: {
					                                    demo: {
				                                            text: 'Демонстрация',
						                                    callback: async () => {
							                                    return await Car.toDemo({ID: this.state.id}).then((result) => {
								                                    if(result.success === true){
									                                    this.componentDidMount();
									                                    this.context.sider({
										                                    template: false,
										                                    child: () => {
											                                    return (
												                                    <Dcard
													                                    car={this.state.car}
													                                    back={async () => this.context.sider()}
												                                    />
											                                    )
										                                    }
									                                    });
									                                    return true;
								                                    }
								                                    return String(result.message)
							                                    });
						                                    }
					                                    },
					                                    tDrive: {
				                                            text: 'Тест-драйв',
						                                    callback: async () => {
							                                    return await Car.toTDrive({ID: this.state.id}).then((result) => {
								                                    if(result.success === true){
									                                    this.componentDidMount();
									                                    this.context.sider({
										                                    template: false,
										                                    child: () => {
											                                    return (
												                                    <Dcard
													                                    car={this.state.car}
													                                    back={async () => this.context.sider()}
												                                    />
											                                    )
										                                    }
									                                    });
									                                    return true;
								                                    }
								                                    return String(result.message)
							                                    });
						                                    }
					                                    }
				                                    }
			                                    });
		                                    }
	                                    }}>Диагностическая карта</div>
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
