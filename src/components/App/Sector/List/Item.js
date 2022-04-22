import React from 'react';


export class Item extends React.Component {


	render() {
		let className = `d-block item`;
		const necessitatesTotal = Number(this.props.CAR_NECESSITATE_TOTAL);
		if(necessitatesTotal === 0){
			className = `${className} success`;
		}else if(necessitatesTotal > 5){
			className = `${className} danger`;
		}else{
			className = `${className} warning`;
		}

		let filled = ``;
		const carTotal = Number(this.props.CAR_TOTAL);
		const placeTotal = Number(this.props.PLACE_TOTAL);
		if(necessitatesTotal === 0){
			filled = `Сектор свободен`;
		}else if(carTotal === placeTotal){
			filled = `Сектор заполнен`;
		}else{
			filled = `${carTotal} занято из ${placeTotal}`;
		}

		return (
			<div className={className}>
				<div className="d-flex">
					<div className="name ">{this.props.NAME}</div>
				</div>

				<div className="filled">{filled}</div>

				<div className="cars">
					{Number(this.props.CAR_TOTAL) > 0 ? (
						<div className="count">
							<span>Авто</span>
							<span>{this.props.CAR_TOTAL}</span>
						</div>
					) : (
						<></>
					)}

					{Number(this.props.CAR_NECESSITATE_TOTAL) > 0 ? (
						<div className="count">
							<span>Из них с потребностями</span>
							<span>{this.props.CAR_NECESSITATE_TOTAL}</span>
						</div>
					) : (
						<></>
					)}
				</div>
			</div>
		);
	}
}
