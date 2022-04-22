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
			name: `${this.props?.HISTORY_RESPONSIBLE_NAME}`,
			lastName: `${this.props?.HISTORY_RESPONSIBLE_LAST_NAME}`,
			time: `${this.props?.HISTORY_DATE_CREATE?.split(" ")[1]}`
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
			<div data-id={this.props.ID} className={`d-block item ${this.notice.type}`}>
				<div className={`position-absolute`}/>
				<div className="d-flex">
					<div className="notice">{this.notice.title}</div>
				</div>
				<div className="d-flex">
					<div className="name">{this.props.BRAND_NAME} {this.props.MODEL_NAME} {this.props.CATEGORY}-класс</div>
				</div>
				<div className="description">{this.description}</div>
				{(this.status_id === 6) ? (
					<div className={"bg-info p-2 pl-3 pr-3 mt-3 d-flex justify-content-between"}>
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
