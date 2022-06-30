import React from 'react';

import { Car } from "../../Api";
import { Header, Card } from "../../../ui";

export class Dcard extends React.Component {


	constructor(props) {
		super(props);
		this.state = {
			dcard: null
		};
	}

	componentDidMount(){
		Car.Dcard({ CAR_ID: this.props.car.ID }).then(dcard => {
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
				<Header
					title={`Диагностическая карта`}
					back={this.back}
				/>

				<header className="d-flex align-items-center shadow" onClick={this.back}>
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
					<div className={'overflow-y-scroll h-100 p-3'}>
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
