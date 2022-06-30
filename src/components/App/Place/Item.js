import React from 'react';

import { Context } from "../../App";
import { Place } from "../Api";
import { Car } from "../../App";


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

	onParking = async (car) => {
		window.dispatchEvent(new CustomEvent(`app.dialog`, { detail: {
			header: "Парковка",
			content: `Вы действительно хотите припарковать здесь ${car.BRAND_NAME} ${car.MODEL_NAME} (${car.G_NUMBER})`,
			buttons: [{
				text: 'Да',
				onClick: async () => {
					return await Place.Parking({
						ID: this.props.ID,
						CAR_ID: car.ID
					}).then(async (result) => {
						if(result.success === false){
							if(result.message !== false){
								return result.message;
							}
							return 'Не удалось припарковать здесь автомобиль'
						}
						if(this.props?.parentDidMount){
							await this.props?.parentDidMount();
						}
						await this.context.widget(false);
						return true;
					});
				}
			}]
		}}));
	};

	render(){
		return (
			<Car.Search
				onClick={this.onParking}
				header={{
					back: true,
					title: `Парковочное место #${this.props?.INNER_ID ? this.props.INNER_ID : this.props.ID}`,
					onClick: () => this.context.widget()
				}}
			>

				<main>
					<div className={"overflow-hidden overflow-y-scroll h-100 p-3"}>
						<div className="alert alert-info mb-3 mt-5 p-3 text-center">
							<h3 className={'text-body mb-2'}>Парковочное место свободно.</h3>
							<div className={'text-muted'}>Вы можете припарковать автомобиль, используя QR-код или поиск по каталогу</div>
						</div>
						<div className="row">
							<div className="col text-center">
								<button className={"btn btn-primary pl-5 pr-5 pt-3 pb-3"} onClick={async (e) => {
									e.persist();
									await this.context.widget();
									this.context.camera(false, this.onParking);
								}}>
									<h1 className={"mb-0"}>
										<i className="icon-qr_code d-inline-block mt-3 mb-3" />
									</h1>
								</button>
							</div>
						</div>
					</div>
				</main>
			</Car.Search>
		);
	}
}
