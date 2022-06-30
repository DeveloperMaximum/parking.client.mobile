import React from 'react';

import { Header } from "../../../ui/Header";
import { Context } from "../../Context";
import { History } from "../../../App/Car";


export class Item extends React.Component {

	static contextType = Context;


	constructor(props){
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount = () => {
		this.setState((prevState) => ({
			...prevState,
		}));
	};

	componentWillUnmount(){
		if(this.state.controller?.abort){
			this.state.controller.abort();
		}

		this.setState = (state, callback) => {
			return false;
		};
	}

	handleClick = async (e) => {
		e.persist();
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
									<b>{this.props.CAR?.BRAND_NAME} {this.props.CAR?.MODEL_NAME}</b>
								</div>
								<div>{(this.props.CAR?.INNER_ID) ? `${this.props.CAR?.SECTOR_NAME}, место ${this.props.CAR?.INNER_ID}` : this.props.CAR?.G_NUMBER}</div>
							</div>
						</header>
						<main>
							<History car_id={this.props.CAR.ID} car={this.props.CAR}/>
						</main>
					</>
				)
			}
		});
	};

	render() {

		return (
			<div className="d-block item col position-relative rounded p-3 shadow mb-3" onClick={this.handleClick}>
				<div className="d-flex">
					<h4 className="text-body mb-0">{this.props.CAR.BRAND_NAME} {this.props.CAR.MODEL_NAME}</h4>
				</div>

				<div className="text-muted mt-1 mb-2 small">VIN {this.props.CAR.VIN}</div>

				{this.props.EVENTS?.length && this.props.EVENTS.length > 0 ? (
					<div className="col p-0 mt-4">
						{this.props.EVENTS.map((event, i) => (
							<div className="d-flex mb-3 text-size-85" key={i}>
								<div className="pr-3 pt-1">
									<i className="icon icon-alarm text-size-200" />
								</div>
								<div>
									<div className="strong">{event.DATE_CREATE}</div>
									<div className="text-muted">Здесь должно быть указано
										место, куда был перемещён автомобиль
									</div>
								</div>
							</div>
						))}
					</div>
				) : (null)}
				<div className="link text-blue text-center mb-2" onClick={this.handleCarHistory}>
					{Number(this.props.COUNT) > 6 ? `Еще ${Number(this.props.COUNT) - 2} событий` : `Еще ${Number(this.props.COUNT) - 2} события`}
				</div>
			</div>
		);
	}
}
