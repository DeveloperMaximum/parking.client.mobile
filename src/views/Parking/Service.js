import React from 'react';

import * as Storage from "../../components/utils/Storage";
import { Context } from "../../components/App/Context";
import { Root, Header } from "../../components/ui";
import { Car } from "../../components/App";


export class Service extends React.Component {

    static contextType = Context;

	title = `Сервис`;


	constructor(props){
		super(props);
		this.state = {

		};

		this.title = Storage.get('SERVICE_MAP')[this.props.match.params.id].NAME;
	}

	componentDidMount() {
		this.setState((prevState) => ({
			...prevState,
		}));
	}

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return false;
		}
	}

    render() {

        return (
            <Root viewId={"SERVICE"} active={true}>
	            <Header
		            history={this.props.history}
		            title={this.title}
		            right={null}
	            />

                <main>
	                <Car.List
		                filter={{
			                STATUS_ID: 5,
			                SERVICE_ID: this.props.match.params.id
		                }}
	                />
                </main>
            </Root>
        );
    }
}
