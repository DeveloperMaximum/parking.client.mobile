import React from 'react';

import { Item } from "./Item";

export class List extends React.Component {

	constructor(props) {
		super(props);
	}

    render() {
		if(this.props.items === true){
			return (
				<div className="spinner" />
			);
		}else if(this.props.items?.length && this.props.items.length > 0){
			return (
				<div className="cars">
					{this.props.items.map((item, index) => (
						<Item
							history={this.props.history}
							onClick={this.props?.onClick}
							key={index}
							item={item}
						/>
					))}
					<button className={"btn btn-primary w-100"} onClick={this.props.onHandleMore}>Еще</button>
				</div>
			);
		}else{
			return (
				<div className={"alert alert-info bg-info"}>Ничего не найдено</div>
			);
		}
    }
}
