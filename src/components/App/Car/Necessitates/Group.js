import React from 'react';

import { Context } from "../../Context";
import { Card } from "../../../ui/Card";
import { ListGroup } from "../../../ui/ListGroup/List";


export class Group extends React.Component {

	static contextType = Context;


	constructor(props){
		super(props);
	}

	componentDidMount() {
		this.setState((prevState) => ({
			...prevState,
		}));
	}

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return false;
		}
	}

	render() {
		return (
			<div className={'mb-3'}>
				<Card title={this.props.title}>
					<ListGroup
						items={this.props.necessitates.length > 0 ? this.props.necessitates : []}
					/>
				</Card>
			</div>
		);
	}
}
