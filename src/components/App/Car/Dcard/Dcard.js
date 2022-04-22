import React from 'react';

import { Header } from "../../../ui/Header";
import { Item as Card } from "../../../ui/Card";
import { Car } from "../../Api";

export class Dcard extends React.Component {


	constructor(props) {
		super(props);
		this.state = {
			dcard: null
		};
	}

	componentDidMount(){
		Car.dcard({ CAR_ID: this.props.car.ID }).then(dcard => {
			this.setState((prevState) => ({
				...prevState,
				dcard
			}));
		});
	}

	back = async (e) => {
		e.persist();
		this.props.back();
	};

	render() {

		return (
			<>
				<Header>
					<div className="d-flex" onClick={this.back}>
						<i className="icon icon-chevron_left d-inline-block" />
						<h1 className="d-inline-block d-inline-block">Диагностическая карта</h1>
					</div>
				</Header>

				<header className="d-flex align-items-center" onClick={this.back}>
					<div className="thumb">
						<img src="tiles/car.png"/>
					</div>
					<div>
						<div>
							<b>{this.props.car?.BRAND_NAME} {this.props.car?.MODEL_NAME}</b>
						</div>
						<div>{(this.props.car?.INNER_ID) ? `${this.props.car.SECTOR_NAME}, место ${this.props.car.INNER_ID}` : '-'}</div>
					</div>
				</header>

				<main>
					<div className={'content-wrapper'}>
						{this.state.dcard !== null ? (
							<>
								{this.state.dcard.map((card, index) =>
									card.blockList[0].answerValueList.length > 0 ? (
										<Card
											key={index}
											title={card.blockList[0].answerValueList.length > 0 ? card.name : ''}
											child={() => (
												<>
													{card.blockList.map((blocklist, i) =>
														Array.isArray(blocklist.answerValueList) && blocklist.answerValueList.length > 0 ? (
															<div className={'mb-2'} key={i}>
																<b className={"d-block"}>{blocklist.name}</b>
																<span>{blocklist.answerValueList.join(', ')}</span>
															</div>
														) : (<div key={i} />)
													)}
												</>
											)}
										/>
									) : (<div key={index} />)
								)}
							</>
						) : (
							<div className={"spinner"} />
						)}
					</div>
				</main>
			</>
		);
	}
}
