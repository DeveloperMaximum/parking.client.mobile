import React from 'react';

import { Root, Header } from "../../components/ui";
import { Car as ComponentCar } from "../../components/App";


export class Car extends React.Component {


    render() {

        return (
            <Root viewId={"CAR"}>
                <Header>
                    <div className="d-flex">
	                    <i className="icon icon-chevron_left d-inline-block" onClick={() => this.props.history.push(`/`)} />
                        <h1 className="d-inline-block">Карточка автомобиля</h1>
                    </div>
                </Header>

                <main>
                    <ComponentCar.Item id={this.props.match.params.id} />
                </main>
            </Root>
        );
    }
}
