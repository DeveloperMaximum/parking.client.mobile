import React from 'react';

export class Props extends React.Component {


	render(){

		return (

			<>
				<div className="prop d-flex flex-column align-items-start">
					<span className="d-block w-100 text-left">Цена</span>
					<div className="w-100 text-left">
						{(this.props.car.PRICE > 0)
							? new Intl.NumberFormat('ru-RU', {
								style: 'currency',
								currency: 'RUB',
								//notation: "compact",
								//compactDisplay: "short"
							}).format(this.props.car.PRICE).replace(/,00/g, '')
							:  '-'}
					</div>
				</div>

				<div className="d-flex justify-content-between">
					<div className="prop d-flex flex-column align-items-start">
						<span className="d-block w-100 text-left">VIN</span>
						<div className="w-100 text-left">{this.props.car.VIN}{this.props.car.VIN2}</div>
					</div>

					<div className="prop d-flex flex-column align-items-start">
						<span className="d-block w-100 text-right">Гос. номер</span>
						<div className="w-100 text-right">{(this.props.car?.G_NUMBER) ? this.props.car.G_NUMBER : '-'}</div>
					</div>
				</div>

				<div className="d-flex justify-content-between">
					<div className="prop d-flex flex-column align-items-start">
						<span className="d-block w-100 text-left">Парковочное место</span>
						<div className="w-100 text-left">{(this.props.car?.INNER_ID) ? `${this.props.car.SECTOR_NAME}, место ${this.props.car.INNER_ID}` : '-'}</div>
					</div>

					<div className="prop d-flex flex-column align-items-start ">
						<span className="d-block w-100 text-right">Пробег</span>
						<div className="w-100 text-right">{(this.props.car.MILEAGE > 0) ? new Intl.NumberFormat('ru-RU').format(this.props.car.MILEAGE) + ' км' : '-'}</div>
					</div>
				</div>

				<div className="d-flex justify-content-between">
					<div className="prop d-flex flex-column align-items-start">
						<span className="d-block w-100 text-left">Тип кузова</span>
						<div className="w-100 text-left">{(this.props.car?.BODY_NAME) ? this.props.car.BODY_NAME : '-'}</div>
					</div>

					<div className="prop d-flex flex-column align-items-start">
						<span className="d-block w-100 text-right">Коробка передач</span>
						<div className="w-100 text-right">{(this.props.car?.TRANSMISSION_NAME) ? this.props.car.TRANSMISSION_NAME : '-'}</div>
					</div>
				</div>
			</>
		);
	};
}
