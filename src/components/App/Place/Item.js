import React from 'react';

import { Context } from "../../base/Context";
import { Request } from "../../utils/Request";
import * as Place from "../Api/Place";
import {CarItem, CarList, CarSearch} from "../index";


export class Item extends React.Component {

	static contextType = Context;

	constructor(props){
		super(props);

		this.state = {
			cars: null,
		};
	}

	componentDidMount = async () => {

	};

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return false;
		}
	}

	render(){
		return (

			<>
				<div className={"car w-100 overflow-hidden"}>
					<div className={"content-wrapper"}>
						<CarSearch
							template="widget"
							history={this.props.history}
							onClickItem={(e, car_id) => {
								Place.parking({
									ID: this.props.id,
									CAR_ID: car_id
								}).then(async () => {
									await this.props?.tableDidMount();
									await this.context.widget({
										header: `Парковочное место #${this.props.innerId}`,
										child: () => (
											<>
												<CarItem
													history={this.props.history}
													id={car_id}
													tableDidMount={this.props?.tableDidMount}
												/>
											</>
										)
									});
								});
							}}
						>

							<>
								<div className="bg-info p-3 mb-3 text-center">
									<h3>Парковочное место свободно.</h3>
									<div>Вы можете припарковать автомобиль, используя QR-код или поиск по каталогу</div>
								</div>
								<div className="row">
									<div className="col text-center">
										<button className={"btn btn-primary pl-5 pr-5 pt-2 pb-2"} onClick={async (e) => {
											e.persist();
											await this.context.confirm({
												header: "Парковка",
												content: "Вы действительно хотите припарковать здесь автомобиль?",
												success: "Да",
												cancel: "Нет",
												callback: async () => {
													await this.context.widget();
													this.context.camera(2);
													document.getElementsByTagName('body')[0].classList.add('SCANNED');
													await window.QRScanner.prepare(() => {
														window.QRScanner.show(() => {
															this.context.camera(3);
															window.QRScanner.scan((err, content) => {
																if(err){
																	console.log(err);
																}else if(content){
																	//alert(content);
																	//content = content.result;
																	let urlArray = content.split('/');
																	Request({
																		URL: 'car/?&NEED_SECTOR_ID=Y&REF_KEY=' + urlArray[urlArray.length - 1],
																	}).then(async (result) => {
																		document.getElementsByTagName('body')[0].classList.remove('SCANNED');
																		this.context.camera(0);
																		window.QRScanner.destroy();
																		if(result.success === true){
																			Place.parking({
																				ID: this.props.id,
																				CAR_ID: result.data[0].ID
																			}).then(async () => {
																				await this.props?.tableDidMount();
																				await this.context.widget({
																					header: `Парковочное место #${this.props.innerId}`,
																					child: () => (
																						<>
																							<CarItem
																								history={this.props.history}
																								id={result.data[0].ID}
																								tableDidMount={this.props?.tableDidMount}
																							/>
																						</>
																					)
																				});
																			});
																		}
																	});
																}
															});
														});
													});
													return true;
												},
											});
										}}>
											<h1 className={"mb-0"}>
												<i className="icon-qr_code d-inline-block mt-3 mb-3" />
											</h1>
											<h6 className="mb-3">Сканировать QR</h6>
										</button>
									</div>
								</div>
							</>

						</CarSearch>
					</div>
				</div>
			</>
		);
	}
}
