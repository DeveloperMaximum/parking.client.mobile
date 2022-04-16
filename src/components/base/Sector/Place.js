import React from 'react';

import { Context } from "../../base/Context";
import { CarItem } from "../../App";
import { PlaceItem } from "../../App";


export class Place extends React.Component {

	static contextType = Context;

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return false;
		}
	}

    handleCell = (e) => {
		if(this.props.data.place.info?.CAR_ID){
			this.context.widget({
				header: `Парковочное место #${this.props.data.place.info.INNER_ID}`,
				child: () => (
					<>
						<CarItem
							history={this.props.history}
							id={this.props.data.place.info?.CAR_ID ? this.props.data.place.info.CAR_ID : null}
							tableDidMount={this.props?.tableDidMount ? this.props.tableDidMount : null}
						/>
					</>
				)
			})
		}else if(this.props.data.place.info?.INNER_ID){
			this.context.widget({
				header: `Парковочное место #${this.props.data.place.info.INNER_ID}`,
				child: () => (
					<>
						<PlaceItem
							history={this.props.history}
							id={this.props.data.place.info.ID}
							innerId={this.props.data.place.info.INNER_ID}
							tableDidMount={this.props?.tableDidMount ? this.props.tableDidMount : null}
						/>
					</>
				)
			})
		}
    };
}
