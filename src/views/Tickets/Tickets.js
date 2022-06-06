import React from 'react';

import { Root, Header } from "../../components/ui";
import { Context } from "../../components/App/Context";
import * as Storage from "../../components/App/Storage";
import { Car, User } from "../../components/App/Api";
import { Car as CarItem } from "../../components/App";
import { Tech } from "../../components/App/Car/Necessitate/Tech";


export class Tickets extends React.Component {

	static contextType = Context;


	constructor(props){
		super(props);
		this.state = {
			type: null,
			tickets: false,
		};
	}

	componentDidMount(){
		this.getTickets(null);
	};

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return false;
		}
	}

	getTickets = (responsible_id = null) => {
		let tabs = document.querySelectorAll('.tabs .tab');
		for (let tab of tabs) {
			tab.classList.remove('active')
		}
		this.setState((prevState) => ({ ...prevState, tickets: false }));
		if(responsible_id === null){
			document.querySelector('#responsible-null').classList.add('active');
		}else if(responsible_id === true){
			document.querySelector('#responsible-not-null').classList.add('active');
		}else{
			document.querySelector('#responsible-user').classList.add('active');
		}
		User.Tickets({
			RESPONSIBLE_ID: responsible_id
		}).then((result) => {
			this.setState((prevState) => ({
				...prevState,
				type: responsible_id,
				tickets: result
			}));
		});
	};

	getNecessitates = async (e, item = false) => {
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
									<b>{item.CAR.BRAND_NAME} {item.CAR.MODEL_NAME}</b>
								</div>
								<div>{(item.CAR?.SECTOR_NAME) ? `${item.CAR.SECTOR_NAME}, место ${item.CAR.INNER_ID}` : '-'}</div>
							</div>
						</header>
						<main>
							<Tech
								car={{ID: item.CAR.ID}}
								back={() => this.context.sider()}
								tableDidMount={() => this.getTickets(Storage.get('USER').ID)}
							/>
						</main>
					</>
				)
			}
		});
	};

	handleStartTicket = async (e, item = false) => {
		await this.context.dialog({
			header: `${item.CAR.BRAND_NAME} ${item.CAR.MODEL_NAME}`,
			content: "Вы действительно хотите взять автомобиль в работу",
			buttons: {
				moved: {
					text: 'Да',
					callback: async () => {
						return await Car.Responsible({ID: item.CAR.ID}).then((result) => {
							this.componentDidMount();
						});
					},
				}
			}
		})
	};

	handleEndTicket = async (e, item = false) => {
		await this.context.dialog({
			header: `${item.CAR.BRAND_NAME} ${item.CAR.MODEL_NAME}`,
			content: "Вы действительно хотите завершить работу с автомобилем?",
			buttons: {
				moved: {
					text: 'Да',
					callback: async () => {
						return await Car.Responsible({ID: item.CAR.ID, RESPONSIBLE_ID: -1}).then((result) => {
							this.componentDidMount();
						});
					},
				}
			}
		})
	};

	handleMoved = async (e, item = false) => {
		await this.context.dialog({
			header: "Перемещение",
			content: "Вы действительно хотите освободить парковочное место и переместить автомобиль?",
			buttons: {
				moved: {
					text: 'Да',
					callback: async () => {
						return await Car.Moved({ID: item.CAR.ID}).then((result) => {
							if(result.success === true){
								this.props.history.push(`/home/car/${item.CAR.ID}`);
							}
							return result.message;
						});
					},
				}
			}
		});
	};

	handleParking = async (e, item = false) => {
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
									<CarItem.Parking
										car={item.CAR}
										callback={() => {
											this.componentDidMount();
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

    render() {
	    const user = Storage.get('USER');
	    const storage = Storage.get('NECESSITATE');

        return (
            <Root viewId={"TICKETS"}>
	            <Header
		            history={this.props.history}
		            title={`Заявки`}
		            back={false}
	            />

                <main>
	                <div className="tabs">
		                <div className="tab-list pl-2 pr-2">
			                <div className="tab-wrapper">
				                <div className="tab" id={"responsible-null"} onClick={() => this.getTickets(null)}>Общие</div>
				                <div className="tab" id={"responsible-not-null"} onClick={() => this.getTickets(true)}>В работе</div>
				                <div className="tab" id={"responsible-user"} onClick={() => this.getTickets(user.ID)}>Личные</div>
			                </div>
		                </div>
		                <div className="tab-content mt-5">
			                {this.state.tickets !== false ? (
				                <>
					                {this.state.tickets?.length && this.state.tickets.length > 0 ? ( this.state.tickets.map((item, index) => (
						                <div key={index} className={"ticket-item"}>
							                <div className={"title"} onClick={async () => {
								                await this.context.widget({
									                header: `Парковочное место #${item.CAR.INNER_ID}`,
									                child: () => (
										                <>
											                <CarItem.Item
												                id={item.CAR.ID}
												                history={this.props.history}
												                tableDidMount={this.componentDidMount }
											                />
										                </>
									                )
								                })
							                }}>{item.CAR.BRAND_NAME} {item.CAR.MODEL_NAME}</div>
							                <small className={"text-muted"}>VIN: {item.CAR.VIN}</small>
							                <div className={"necessitates pt-1"}>
								                {item.NECESSITATES?.length && item.NECESSITATES.length > 0 ? ( item.NECESSITATES.map((necessitate, i) => (
									                <div key={i} className={"mt-1"}>
										                {storage[necessitate.NECESSITATE_ID].NAME}
									                </div>
								                ))) : (null)}
							                </div>
							                {this.state.type === null ? (
							                    <button className={"btn btn-primary text-center w-100 mt-3"} onClick={ async (e) => this.handleStartTicket(e, item) }>Взять в работу</button>
							                ) : (
								                this.state.type === true ? (
									                <button className={"btn btn-primary text-center w-100 mt-3"} onClick={ async (e) => this.handleStartTicket(e, item) }>Взять себе</button>
								                ) : (
								                	<div className={"btn-wrapper d-flex flex-wrap justify-content-between"}>
										                <button className={"necessitates btn btn-primary text-center mt-2"} onClick={ async (e) => this.getNecessitates(e, item) }>
											                <i className={"icon icon-build"} />
										                </button>
										                {Number(item.CAR.STATUS_ID) === 2 || Number(item.CAR.STATUS_ID) === 5 ? (
											                <button className={"moved btn btn-primary text-center mt-2"} onClick={ async (e) => this.handleMoved(e, item) }>
												                <i className={"icon icon-sync_alt"} />
											                </button>
										                ) : (
											                Number(item.CAR.STATUS_ID) === 3 ? (
												                <button className={"moved btn btn-primary text-center mt-2"} onClick={ async (e) => this.handleMoved(e, item) }>
													                <i className={"icon icon-sync_alt"} />
												                </button>
											                ) : (null)
										                )}
										                <button className={"btn btn-secondary text-center w-100 mt-2"} onClick={ async (e) => this.handleEndTicket(e, item) }>Завершить</button>
									                </div>
								                )
							                )}
						                </div>
					                ))) : (
						                <div className={"content-wrapper"}>
							                <div className={"alert alert-info bg-info"}>Ничего не найдено</div>
						                </div>
					                )}
				                </>
			                ) : (
				                <div className={"content-wrapper"}>
					                <div className={"spinner"} />
				                </div>
			                )}
                        </div>
                    </div>
                </main>
            </Root>
        );
    }
}
