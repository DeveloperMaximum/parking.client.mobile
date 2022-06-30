import React from 'react';

import { Root, Header } from "../../components/ui";
import { Car as ComponentCar } from "../../components/App";


export class Car extends React.Component {


    render() {

        return (
            <Root viewId={"CAR"} active={true}>
                <Header
	                history={this.props.history}
	                title={`Карточка автомобиля`}
	                back={true}
                />

                <main>
                    <ComponentCar.Item
	                    id={this.props.match.params.id}
                    />
                </main>
            </Root>
        );
    }
}
