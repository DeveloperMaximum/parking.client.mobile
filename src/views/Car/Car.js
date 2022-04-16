import React from 'react';

import { Context } from "../../components/base/Context";
import { Root, Header, Footer } from "../../components/ui";
import { CarItem } from "../../components/App";
import { ParkingProvider } from "../../components/base/Context/Parking";

export class Car extends React.Component {

	static contextType = Context;

    render() {

        return (
            <Root viewId={"CAR"}>
                <Header>
                    <div className="d-flex">
	                    <i className="icon icon-chevron_left d-inline-block" onClick={() => this.props.history.push(`/`)} />
                        <h1 className="d-inline-block">Карточка автомобиля</h1>
                    </div>
                </Header>

	            <ParkingProvider>
	                <main>
                        <CarItem id={this.props.match.params.id} />
	                </main>
	            </ParkingProvider>

                <Footer history={this.props.history} />
            </Root>
        );
    }
}
