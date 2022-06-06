import React from 'react';


export class Item extends React.Component {


	render() {
		return (
			<div className={"d-block item"}>
				<div className="d-flex">
					<div className="name ">{this.props.NAME}</div>
				</div>

				<div className="filled" />

				<div className="cars">
					{Number(this.props.CAR_TOTAL) > 0 ? (
						<div className="count">
							<span>Авто</span>
							<span>{this.props.CAR_TOTAL}</span>
						</div>
					) : (
						<div className="count">
							<span>Авто</span>
							<span> - </span>
						</div>
					)}
				</div>
			</div>
		);
	}
}
