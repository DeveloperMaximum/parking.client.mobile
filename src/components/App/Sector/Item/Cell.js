import React from 'react';

import { Car, Place } from "../../../App";
import { Context } from "../../../App/Context";


export class Cell extends React.Component {

	static contextType = Context;


	handleCell = async (e) => {
		if(this.props?.onClick){
			await this.props.onClick(this.props);
			return true;
		}
		if(this.props?.place?.CAR_ID){
			await this.context.widget({
				header: `Парковочное место #${this.props.place.INNER_ID}`,
				child: () => (
					<>
						<Car.Item
							id={this.props.place?.CAR_ID}
							tableDidMount={this.props?.tableDidMount ? this.props.tableDidMount : null}
						/>
					</>
				)
			})
		}else if(this.props?.place?.INNER_ID){
			await this.context.widget({
				header: `Парковочное место #${this.props.place.INNER_ID}`,
				child: () => (
					<>
						<Place.Item
							{...this.props.place}
							tableDidMount={this.props?.tableDidMount ? this.props.tableDidMount : null}
						/>
					</>
				)
			})
		}
	};

	render() {
		return (
			<>
				<div className={this.props.className} onClick={this.handleCell}>
					{this.props.icon ? (
						<div className={"status"}>
							<i className={`icon ${this.props.icon}`} />
						</div>
					) : ( <div />)}
				</div>
			</>
		);
	}
}
