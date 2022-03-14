import React from 'react';

import { ParkingConsumer } from "../../../base/Context/Parking";
import { List as BaseList } from "../../../base/Sector";


export class List extends BaseList {

	render() {
		return (
			<ParkingConsumer>
				{({ sector }) => (
					<div className="sectors">
						{this.props.items?.length && this.props.items.length > 0 ? ( this.props.items.map((item, index) => (
							<div onClick={() => sector(item.ID)} className={"d-block item " + this.typeNotice(item.CAR_NECESSITATE_TOTAL)} key={index}>
								<div className="d-flex">
									<div className="name ">{item.NAME}</div>
								</div>
								{this.placeTotal(item.PLACE_TOTAL, item.CAR_TOTAL)}
								<div className="cars">
									{this.carTotal(item.CAR_TOTAL)}
									{this.carNecessitateTotal(item.CAR_NECESSITATE_TOTAL)}
								</div>
							</div>
						))) : (
							(!this.props.items) ? (
								<div className={"spinner"} />
							) : (
								<div className={"alert alert-info bg-info"}>Ничего не найдено</div>
							)
						)}
					</div>
				)}
			</ParkingConsumer>
		);
	}
}
