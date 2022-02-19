import React from 'react';

import { AppContext } from "../../components/App/AppContext";
import { Request } from "../../components/utils/Request";
import { Header } from "../../components/base/Header";
import { Footer } from "../../components/base/Footer";
import { View } from "../../components/base/View";

import { CarItem } from "../../components/App";


export class Car extends React.Component {

    static contextType = AppContext;

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
            USER: this.context.user.profile(),
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
            USER: this.context.user.profile(),
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
            <View
                viewId={"CAR"}
            >
                <Header>
                    <div className="d-flex">
                        <h1 className="d-inline-block">Карточка автомобиля</h1>
                    </div>
                </Header>

                <main>
                    {this.state.car === null ? (
                        <div>Готовим автомоибль к осмотру ...</div>
                    ) : (
                        <CarItem item={this.state.car}/>
                    )}
                </main>

                <Footer history={this.props.history} />
            </View>
        );
    }
}
