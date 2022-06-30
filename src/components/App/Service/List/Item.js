import React from 'react';


export class Item extends React.Component {


	render() {
		let className = `d-block item col position-relative rounded p-3 shadow mb-3`;
		const necessitatesTotal = Number(this.props.CAR_NECESSITATE_TOTAL);
		if(necessitatesTotal === 0){
			className = `${className} success`;
		}else if(necessitatesTotal > 5){
			className = `${className} danger`;
		}else{
			className = `${className} warning`;
		}

		return (
			<div className={className}>
				<div className="d-flex">
					<h4 className="text-body mb-0">{this.props.NAME}</h4>
				</div>

				<div className="text-muted mt-1 mb-2 small" />

				<div className="d-flex flex-row justify-content-between small font-weight-bold">
					{Number(this.props.CAR_TOTAL) > 0 ? (
						<div>
							<span className="text-muted mr-2">Авто</span>
							<span className="text-body">{this.props.CAR_TOTAL}</span>
						</div>
					) : (
						<div>
							<span className="text-muted mr-2">Авто</span>
							<span className="text-body"> - </span>
						</div>
					)}

					{Number(this.props.CAR_NECESSITATE_TOTAL) <= 0 ? (null) : (
						<div>
							<span className="text-muted mr-2">Из них с потребностями</span>
							<span className="text-body">{this.props.CAR_NECESSITATE_TOTAL}</span>
						</div>
					)}
				</div>
			</div>
		);
	}
}
