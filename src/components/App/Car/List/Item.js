import React from 'react';

let props = {
	item: {
		HISTORY_DATE_CREATE: null,
		HISTORY_RESPONSIBLE_NAME: null,
		HISTORY_RESPONSIBLE_LAST_NAME: null
	}
};

export class Item extends React.Component {

	notice;
	status_id;
	description;
	responsible;


	constructor(props) {
		super(props);

		this.notice = this.getNotice();
		this.description = this.getDescription();
		this.status_id = Number(this.props.STATUS_ID);
		this.responsible = {
			name: `${this.props?.RESPONSIBLE_NAME}`,
			lastName: `${this.props?.RESPONSIBLE_LAST_NAME}`,
			time: `${this.props?.HISTORY_STATUS_DATE_CREATE?.split(" ")[1]}`
		};
	}

	getNotice = () => {
		let total = Number(this.props.NECESSITATE_TOTAL);
		if(total === 0){
			return  { type: "success", title: "Действия не требуются" };
		}else if(total > 3){
			return  { type: "danger", title: "Срочно обслужить" };
		}else{
			return  { type: "warning", title: "Обратить внимание" };
		}
	};

	getDescription = () => {
		let items = [];
		if(this.props?.MILEAGE){
			items.push(new Intl.NumberFormat('ru-RU').format(this.props.MILEAGE) + ' км ');
		}
		if(this.props?.BODY_NAME){
			items.push(this.props.BODY_NAME);
		}
		if(this.props?.TRANSMISSION_NAME){
			items.push(this.props.TRANSMISSION_NAME);
		}
		return items.join(', ')
	};

	onClickHandle = (e) => {
		let element = e.target;
		let car_id = element.getAttribute('data-id');
		if(car_id === null){
			while(car_id === null){
				element = element?.parentElement ? element.parentElement : null;
				if(element.classList.contains('item')){
					car_id = element.getAttribute('data-id');
					if(this.props?.onClick){
						this.props.onClick(e, car_id);
					}
				}
			}
		}
	};

	render() {
		return (
			<div data-id={this.props.ID} className={`d-block item col position-relative rounded p-3 shadow mb-3`}>
				<div className={`notice text-body mb-0 small position-relative pl-3 ${this.notice.type}`}>{this.notice.title}</div>
				<div className="d-flex">
					<h4 className="text-body mb-0">{this.props.BRAND_NAME} {this.props.MODEL_NAME} {this.props.CATEGORY}-класс</h4>
				</div>
				<div className="text-muted small mt-1">{this.description}</div>
				{(this.props?.HISTORY_STATUS_DATE_CREATE && this.props.STATUS_ID !== '2') ? (
					<div className={"alert alert-info mb-0 mt-2 d-flex justify-content-between text-muted small"}>
	                    <span>
	                        <i className={"icon icon-alarm"} /> {this.responsible.time}
	                    </span>
						<span>
	                        <i className={"icon icon-person"} /> {this.responsible.lastName} {this.responsible.name}
	                    </span>
					</div>
				) : (<></>)}
			</div>
		);
	}
}
