import React from 'react';

import { Car as ApiCar } from "../../../App/Api";
import { Car } from "../../../App";
import { Form } from "./Form";


export class Search extends React.Component {


    constructor(props) {
        super(props);

	    this.state = {
		    controller: false,
		    cars: false,
		    query: false,
		    page: 1
	    };

	    this.handleSearch = this.handleSearch.bind(this);
	    this.handleMore = this.handleMore.bind(this);
    }

	handleSearch = async (e) => {
    	e.persist();
		if(this.state.controller?.abort){
			this.state.controller.abort();
		}
		if(e.target.value === ''){
			this.setState((prevState) => ({
				...prevState,
				controller: false,
				cars: false,
				page: 1
			}));
		}else{
			const controller = new AbortController();
			this.setState((prevState) => ({
				...prevState,
				cars: null,
				query: e.target.value,
				controller: controller
			}), () => ApiCar.Search(e.target.value, controller).then(cars => {
				this.setState((prevState) => ({
					...prevState,
					cars: cars,
					page: 1
				}));
			}));
		}
	};

	handleMore = async () => {
		const page = this.state.page + 1;
		if(this.state.controller?.abort){
			this.state.controller.abort();
		}
		const controller = new AbortController();
		this.setState((prevState) => ({
			...prevState,
			controller: controller
		}), () => ApiCar.Search(this.state.query, controller, page).then(cars => {
			this.setState((prevState) => ({
				...prevState,
				page: page,
				cars: this.state.cars.concat(cars),
			}));
		}));
	};

    render() {

	    return (
		    <>
			    <Form onChange={this.handleSearch} />
			    <>
				    {this.state.cars !== false ? (
					    this.props?.onClick ? (
						    <Car.List
							    handleMore={this.handleMore}
							    onClick={this.props.onClick}
							    items={this.state.cars}
						    />
					    ) : (
						    <Car.List
							    handleMore={this.handleMore}
							    items={this.state.cars}
						    />
					    )
				    ) : (
					    <>
						    {this.props.children}
					    </>
				    )}
			    </>
		    </>
	    );
    }
}
