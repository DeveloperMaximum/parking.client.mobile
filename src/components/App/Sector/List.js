import React from 'react';
import {Link} from "react-router-dom";


export class List extends React.Component {

    constructor(props) {
        super(props);
    }

    handleFilter(e) {
        console.log(e.target)
    }

    titleNotice = (necessitate_total) => {
        necessitate_total = Number(necessitate_total);
        if(necessitate_total === 0) return  "Действия не требуются";
        else if(necessitate_total > 3) return  "Срочно обслужить";
        else return "Обратить внимание";
    };

    placeTotal = (place_total, car_total) => {
        place_total = Number(place_total);
        car_total = Number(car_total);
        if(car_total === 0){
            return ( <div className="sector-filled">Сектор свободен</div> );
        }
        if(place_total === car_total){
            return ( <div className="sector-filled">Сектор заполнен</div> );
        }
        return ( <div className="sector-filled">{car_total} занято из {place_total}</div> );
    };

    carTotal = (car_total) => {
        car_total = Number(car_total);
        if(car_total === 0) return;
        return (
            <div className="sector-count-cars">
                <span>Авто</span>
                <span>{car_total}</span>
            </div>
        );
    };

    carNecessitateTotal = (car_necessitate_total) => {
        if(Number(car_necessitate_total) === 0) return;
        return (
            <div className="sector-count-cars">
                <span>Из них с потребностями</span>
                <span>{car_necessitate_total}</span>
            </div>
        );
    };

    typeNotice = (car_necessitate_total) => {
        car_necessitate_total = Number(car_necessitate_total);
        if(car_necessitate_total === 0) return 'success';
        if(car_necessitate_total > 3) return 'danger';
        return 'warning';
    };

    render() {

        const items = this.props.items;

        return (
            <div className="sectors-wrapper">
                <div className="sectors-list">
                    {items.map((item, index) => (
                        <Link to={"/sector/" + item.ID} className={"d-block sector-item " + this.typeNotice(item.CAR_NECESSITATE_TOTAL)} key={index}>
                            <div className="d-flex">
                                <div className="sector-name ">{item.NAME}</div>
                            </div>
                            {this.placeTotal(item.PLACE_TOTAL, item.CAR_TOTAL)}
                            <div className="sector-cars">
                                {this.carTotal(item.CAR_TOTAL)}
                                {this.carNecessitateTotal(item.CAR_NECESSITATE_TOTAL)}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    }
}
