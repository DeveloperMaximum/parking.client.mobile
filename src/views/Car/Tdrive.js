import React from 'react';

import { App } from "../../components/App/Context";
import { Root, Header, Footer } from "../../components/ui";
import { Car } from "../../components/App";
import { Car as ApiCar } from "../../components/App/Api";

export class Tdrive extends React.Component {

	static contextType = App;

	constructor(props){
		super(props);
		this.state = {
			cars: null,
		};
	}

	componentDidMount() {
		this.loadCars().then(r => r);
	}

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return false;
		}
	}

	loadCars() {
		return ApiCar.get({
			STATUS_ID: 6,
			NECESSITATE_TOTAL: 'Y',
			LAST_EVENT_HISTORY: 'Y'
		}).then(result => {
			this.setState((prevState) => ({
				...prevState,
				cars: result
			}));
		});
	}

    render() {
        return (
            <Root viewId={"CAR"}>
                <Header>
                    <div className="d-flex">
	                    <i className="icon icon-chevron_left d-inline-block" onClick={() => this.props.history.push(`/`)} />
                        <h1 className="d-inline-block">Авто в тест-драйве</h1>
                    </div>
                </Header>

                <main>
	                <div className={"content-wrapper"}>
		                {this.state.cars !== null ? (
			                <Car.List
				                history={this.props.history}
				                items={this.state.cars}
			                />
		                ) : (
			                <div className="spinner" />
		                )}
	                </div>
                </main>

                <Footer history={this.props.history} />
            </Root>
        );
    }
}
