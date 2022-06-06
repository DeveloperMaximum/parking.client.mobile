import React from 'react';

import { Context } from "../../App/Context";
import { Form } from "./Form";

export class Block extends React.Component {

	static contextType = Context;

	constructor(props) {
		super(props);
	}

	muted(string = '', type = false) {
		if(string === '') return '';
		const array = string.split(' ');

		const date = array[0];
		const dateArray = date.split('-');

		const year = dateArray[0];
		const month = dateArray[1];
		const day = dateArray[1];

		const time = array[1];
		const timeArray = time.split(':');

		const hours = timeArray[0];
		const minutes = timeArray[1];
		const seconds = timeArray[2];

		if(type !== false){
			if(type === 'DATE'){
				return `${day}.${month}.${year}г.`;
			}
		}

		return `${hours}:${minutes}, ${day}.${month}.${year}г.`;
	}

	render(){
		return (
			<button className="item pt-3 pb-3" onClick={ async () => {
				await this.context.dialog({
					buttons: false,
					header: `${this.props.name} ${this.props?.muted ? `(${this.muted(this.props.muted, 'DATE')})` : ''}`,
					child: () => {
						return (
							<Form
								car_id={this.props.car_id}
								handleDidMount={this.props.handleDidMount}
								tableDidMount={this.props.tableDidMount}
								necessitate_id={this.props.id}
								author_id={this.props.author_id}
								author={this.props.author}
								description={this.props.description}
							/>
						)
					}
				});
			}}>
				{this.props.name}
				<small className={"text-muted d-inline-block float-right"}>
					{this.props?.muted ? this.muted(this.props.muted, 'DATE') : ''}
				</small>
			</button>
		);
	};
}
