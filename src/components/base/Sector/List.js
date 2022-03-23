import React from 'react';


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

    placeTotal = (place_total, car_total) => {
        place_total = Number(place_total);
        car_total = Number(car_total);
        if(car_total === 0){
            return ( <div className="filled">Сектор свободен</div> );
        }
        if(place_total === car_total){
            return ( <div className="filled">Сектор заполнен</div> );
        }
        return ( <div className="filled">{car_total} занято из {place_total}</div> );
    };

    carTotal = (car_total) => {
        car_total = Number(car_total);
        if(car_total === 0) return;
        return (
            <div className="count">
                <span>Авто</span>
                <span>{car_total}</span>
            </div>
        );
    };

    carNecessitateTotal = (car_necessitate_total) => {
        if(Number(car_necessitate_total) === 0) return;
        return (
            <div className="count">
                <span>Из них с потребностями</span>
                <span>{car_necessitate_total}</span>
            </div>
        );
    };

    typeNotice = (car_necessitate_total) => {
        car_necessitate_total = Number(car_necessitate_total);
        if(car_necessitate_total === 0) return 'success';
        if(car_necessitate_total > 5) return 'danger';
        return 'warning';
    };
}
