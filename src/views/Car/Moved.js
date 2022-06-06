import React from 'react';

import { Root, Header } from "../../components/ui";
import { Car } from "../../components/App";
import {Car as ApiCar, User} from "../../components/App/Api";


export class Moved extends React.Component {


	constructor(props){
		super(props);
		this.state = {
			loading: true,
			cars: null,
			page: 1
		};
	}

	componentDidMount() {
		return ApiCar.Filter({STATUS_ID: 3}).then((result) => {
			this.setState((prevState) => ({
				...prevState,
				loading: false,
				cars: result['ITEMS'],
				page: (this.state.page + 1)
			}));
		})
	}

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return false;
		}
	}

	handleMore = async () => {
		this.setState((prevState) => ({ ...prevState, loading: true }));
		ApiCar.Filter({STATUS_ID: 3}, this.state.page).then((result) => {
			this.setState((prevState) => ({
				...prevState,
				loading: false,
				cars: this.state.cars.concat(result),
				page: (result.length > 0) ? (this.state.page + 1) : false,
			}));
		});
	};

	onScroll = async (e) => {
		if(this.state.page !== false && this.state.loading === false){
			if(e.target.scrollTop > (e.target.scrollHeight / 1.75)){
				return await this.handleMore();
			}
		}
	};

    render() {
        return (
            <Root viewId={"CAR"}>
	            <Header
		            history={this.props.history}
		            title={`Авто в движении`}
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
