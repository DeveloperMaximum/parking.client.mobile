import React from 'react';
import {Link} from "react-router-dom";
import {CarItem} from "../index";


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
            <div className="cars-wrapper">
                <div className="cars-list">
                    {this.props.items.map((item, index) => (
                        <Link to={"/car/" + item.ID} className={"d-block car-item " + this.typeNotice(item.NECESSITATE_TOTAL)} key={index}>
                            <div className="d-flex">
                                <div className="car-notice">{this.titleNotice(item.NECESSITATE_TOTAL)}</div>
                            </div>
                            <div className="d-flex">
                                <div className="car-name">{item.BRAND} {item.MODEL} {item.CATEGORY}-класс</div>
                            </div>
                            <div className="car-description">230 000 км, 1.6 AMT (122 л.с.), хетчбэк, передний...</div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    }
}
