import React from 'react';

import { Root, Header } from "../../components/ui";
import { Car } from "../../components/App";
import { Car as ApiCar } from "../../components/App/Api";


export class Demo extends React.Component {


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
		return ApiCar.Get({
			STATUS_ID: 8,
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
                <Header
	                history={this.props.history}
	                title={`Авто на демонстарции`}
	                back={() => this.props.history.push(`/more/settings`)}
                 />

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
            </Root>
        );
    }
}
