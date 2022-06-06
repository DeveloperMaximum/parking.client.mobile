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
		    load: false,
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
			}), () => ApiCar.Search(e.target.value, controller).then(result => {
				this.setState((prevState) => ({
					...prevState,
					cars: result['ITEMS'],
					page: result['NAV']['PAGE'],
					nav: result['NAV']
				}));
			}));
		}
	};

	handleMore = async () => {
		this.setState((prevState) => ({ ...prevState, load: true }));

		const page = this.state.page + 1;
		if(this.state.controller?.abort){
			this.state.controller.abort();
		}
		const controller = new AbortController();
		this.setState((prevState) => ({
			...prevState,
			controller: controller
		}), () => ApiCar.Search(this.state.query, controller, page).then(result => {
			this.setState((prevState) => ({
				...prevState,
				load: false,
				page: result['NAV']['PAGE'],
				nav: result['NAV'],
				cars: this.state.cars.concat(result['ITEMS']),
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
