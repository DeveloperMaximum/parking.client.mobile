import React from 'react';

import { Consumer } from "../../base/Context";
import { Header } from "../../ui/Header";
import { List } from "../../App/Sector/Parking"
import { Root } from "../../ui/Root";
import { Table } from "../Sector/Parking";

export class Parking extends React.Component {

	render() {

		return (
			<Consumer>
				{({ car }) => (
					<Root viewId={"PARKING"} active={car._data.parking}>
						<Header>
							<div className="d-flex">
								<h1 className="d-inline-block">Выберите сектор</h1>
							</div>
						</Header>
						<main>
							{car._data.parking === true && car._data.sectors ? (
								<div className={"content-wrapper"}>
									{car._data.sector_id > 0 ? (
										<Table id={car._data.sector_id} />
									) : (
										<List items={car._data.sectors}  car={car} />
									)}
								</div>
							) : (
								<div className={"spinner"} />
							)}
						</main>
					</Root>
				)}
			</Consumer>
		);
	}
}
