import React from 'react';

import { ListItem } from "./ListItem";


export class ListGroup extends React.Component {

	constructor(props) {
		super(props);
	}

	render(){
		return (
			<div className={'list-group'}>
				{this.props.items.map((item, index) =>
					<ListItem {...item} key={index} />
				)}
			</div>
		);
	};
}
