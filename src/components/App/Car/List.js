import React from 'react';
import { Link } from "react-router-dom";


export class List extends React.Component {

    constructor(props) {
        super(props);
    }

    titleNotice = (necessitate_total) => {
        necessitate_total = Number(necessitate_total);
        if(necessitate_total === 0) return  "Действия не требуются";
        else if(necessitate_total > 3) return  "Срочно обслужить";
        else return "Обратить внимание";
    };

    typeNotice = (necessitate_total) => {
        necessitate_total = Number(necessitate_total);
        if(necessitate_total === 0) return  "success";
        else if(necessitate_total > 3) return  "danger";
        else return "warning";
    };

    render() {
        return (
            <div className="cars">
                {this.props.items.map((item, index) => (
                    <Link to={"/catalog/car/" + item.ID} className={"d-block item " + this.typeNotice(item.NECESSITATE_TOTAL)} key={index}>
                        <div className="d-flex">
                            <div className="notice">{this.titleNotice(item.NECESSITATE_TOTAL)}</div>
                        </div>
                        <div className="d-flex">
                            <div className="name">{item.BRAND_NAME} {item.MODEL_NAME} {item.CATEGORY}-класс</div>
                        </div>
                        <div className="description">
                            {(item?.MILEAGE) ? new Intl.NumberFormat('ru-RU').format(item.MILEAGE) + ' км ' : ' '}
                            {(item?.BODY_NAME) ? item.BODY_NAME + ' ' : ' '}
                            {(item?.TRANSMISSION_NAME) ? item.TRANSMISSION_NAME + ' ' : ' '}
                        </div>
	                    {(Number(item.STATUS_ID) === 6) ? (
		                    <div className={"bg-info p-2 pl-3 pr-3 mt-3 d-flex justify-content-between"}>
			                    <span>
			                        <i className={"icon icon-alarm"} /> {item.HISTORY_DATE_CREATE.split(" ")[1]}
			                    </span>
			                    <span>
			                        <i className={"icon icon-person"} /> {item.HISTORY_RESPONSIBLE_LAST_NAME} {item.HISTORY_RESPONSIBLE_NAME[0]}.
			                    </span>
		                    </div>
	                    ) : (<></>)}
                    </Link>
                ))}
            </div>
        );
    }
}
