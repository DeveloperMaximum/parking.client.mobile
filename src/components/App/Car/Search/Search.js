import React from 'react';

import { Context } from "../../../App/Context";
import { Header } from "../../../ui";
import { Form } from "./Form";
import { Car } from "../../../App";


export class Search extends React.Component {

	static contextType = Context;


	constructor(props) {
		super(props);

		this.state = {
			query: ''
		};
	}

	componentDidMount = () => {
		this.setState((prevState) => ({
			...prevState,
		}));
	};

	handleChange = async (e) => {
		e.persist();
		this.setState({
			query: e.target.value,
		});
	};

    render() {

	    return (
		    <>
			    <Header {...{...this.props.header}} className={'with-search'}>
				    <Form value={this.state.query} onChange={this.handleChange} />
			    </Header>

			    <main className={this.state.query === '' ? '' : 'd-none'}>
				    {this.props.children}
			    </main>

			    <main className={this.state.query !== '' ? '' : 'd-none'}>
				    {this.state.query === '' ? (null) : (
					    <Car.List
						    onClick={this.props.onClick}
						    filter={{
							    REF_KEY: this.state.query,
							    VIN: this.state.query,
							    VIN2: this.state.query,
							    G_NUMBER: this.state.query
						    }}
					    />
				    )}
			    </main>
		    </>
	    );
    }
}
