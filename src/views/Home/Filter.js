import React from 'react';

import * as Storage from "../../components/utils/Storage";
import { Context } from "../../components/App/Context";
import { Root } from "../../components/ui";
import { Car, Map } from "../../components/App";


export class Filter extends React.Component {

	static contextType = Context;


	constructor(props){
		super(props);

		this.handleRightHeader = this.handleRightHeader.bind(this);
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

	handleRightHeader(e) {
		console.log(this?.context?.data);
		this.context.sider({
			child: () => <Map />,
			title: Storage.get('MAP')[this?.context?.data.user.UF_LOCATION].NAME
		})
	}

	render(){
		return (
			<Root viewId={"FILTER"} active={true}>
				<Car.Search
					header={{
						profile: true,
						history: this.props.history,
						right: (
							<div onClick={this.handleRightHeader}>
								<i className="icon icon-map d-inline-block" />
							</div>
						)
					}}
				>
						<Car.Filter />
				</Car.Search>
			</Root>
		);
	}
}
