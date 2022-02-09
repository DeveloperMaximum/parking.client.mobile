import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";

import { Request } from "../../components/utils/Request";
import {CarItem, Tapbar} from "../../components/App";

export class Car extends React.Component {

    APP;

    constructor(props){
        super(props);
        this.state = {
            car: null,
        };
        this.onSetCar = this.onSetCar.bind(this);
    }

    componentDidMount() {
        return Request({
            METHOD: 'GET',
            URL: 'car/' + this.props.match.params.id,
            USER: this.props.APP.storage.get('USER'),
        }).then((result) => {
            if(result.success === true){
                this.onSetCar(result.data)
            }
        })
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return false;
        }
    }

    load = () => {
        return Request({
            METHOD: 'GET',
            URL: 'car/' + this.props.match.params.id,
            USER: this.props.APP.storage.get('USER'),
        }).then((result) => {
            if(result.success === true){
                this.onSetCar(result.data)
            }
        })
    };

    onSetCar(car) {
        this.setState((prevState) => ({
            ...prevState,
            car: car
        }));
    }

    render() {

        return (
            <>
                <div id="CAR" className="root-component">
                    <header>
                        <div className="d-flex">
                            <h1 className="d-inline-block">Карточка автомобиля</h1>
                        </div>
                    </header>

                    <main>
                        {this.state.car === null ? (
                            <div>Готовим автомоибль к осмотру ...</div>
                        ) : (
                            <CarItem item={this.state.car}/>
                        )}
                    </main>
                </div>
                <Tapbar history={this.props.history} APP={this.props.APP}/>
            </>
        );
    }
}
