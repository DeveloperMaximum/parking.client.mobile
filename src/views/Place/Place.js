import React from 'react';

import { App } from "../../components/App/Context";
import { Root, Header, Footer } from "../../components/ui";
import { Place as ComponentPlace } from "../../components/App";

export class Place extends React.Component {

	static contextType = App;

	render() {

		return (
			<Root viewId={"PLACE"}>
				<Header>
					<div className="d-flex">
						<i className="icon icon-chevron_left d-inline-block" onClick={() => this.props.history.push(`/`)} />
						<h1 className="d-inline-block">Парковочное место</h1>
					</div>
				</Header>

				<main>
					<ComponentPlace.Item sector_id={this.props.match.params.id} id={this.props.match.params.id} />
				</main>

				<Footer history={this.props.history} />
			</Root>
		);
	}
}