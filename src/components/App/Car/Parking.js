import React from 'react';

import { ParkingConsumer } from "../../base/Context/Parking";
import { Header } from "../../ui/Header";
import { List } from "../../App/Sector/Parking"
import { Root } from "../../ui/Root";
import { Table } from "../Sector/Parking";

export class Parking extends React.Component {

	render() {

		return (
			<ParkingConsumer>
				{({ data }) => (
					<Root viewId={"PARKING"} active={data.process}>
						<Header>
							<div className="d-flex">
								<h1 className="d-inline-block">
									{data.sector_id > 0 ? (
										<>Выберите место</>
									) : (
										<>Выберите сектор</>
									)}
								</h1>
							</div>
						</Header>
						<main>
							{data.process === true ? (
								<div className={"content-wrapper"}>
									{data.sector_id > 0 ? (
										<Table id={data.sector_id} />
									) : (
										<List items={data.sectors} />
									)}
								</div>
							) : (
								<div className={"spinner"} />
							)}
						</main>
					</Root>
				)}
			</ParkingConsumer>
		);
	}
}
