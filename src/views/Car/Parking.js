import React from 'react';

import { Context } from "../../components/base/Context";
import { Root, Header, Footer } from "../../components/ui";
import { CarItem, SectorList } from "../../components/App";
import { Sector } from "../../components/App/Api";

export class Car extends React.Component {

	static contextType = Context;

	constructor(props) {
		super(props);
		this.state = {
			sectors: null
		};
	}

	componentWillUnmount() {

	}

	loadSectors() {
		return Sector.get({DETAILED: 'Y'}).then(result => {
			this.setState((prevState) => ({
				...prevState,
				sectors: result
			}));
		});
	}

	render() {

		return (
			<Root viewId={"HOME"}>
				<Header>
					<div className="d-flex">
						<i className="icon icon-chevron_left d-inline-block" onClick={() => this.props.history.push(`/`)} />
						<h1 className="d-inline-block">Выберите сектор</h1>
					</div>
				</Header>

				<main>
					<SectorList items={this.state.sectors} />
				</main>

				<Footer history={this.props.history} />
			</Root>
		);
	}
}
