import React from 'react';

import { App } from "../../components/App/Context";
import { Root, Header, Footer } from "../../components/ui";
import { Car as ComponentCar } from "../../components/App";

export class Car extends React.Component {

	static contextType = App;

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

                <Footer history={this.props.history} />
            </Root>
        );
    }
}
