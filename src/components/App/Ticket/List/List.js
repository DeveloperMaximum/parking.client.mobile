import React from 'react';

import { Context } from "../../Context";
import { User} from "../../Api";
import { Item } from "./Item";
import { Spinner } from "../../../ui";
import { Scroller } from "../../../ui/Scroller";


export class List extends React.Component {

	static contextType = Context;


	constructor(props){
		super(props);
		this.state = {
			controller: null,
			loading: true,
			nav: false,
			items: null
		};
	}

	componentDidMount = (props = {}) => {
		this.setState((prevState) => ({
			...prevState,
		}), () => this.handleLoadItems());
	};

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return false;
		};
	}

	handleLoadItems = async () => {
		if(this.state.controller?.abort){
			this.state.controller.abort();
		}

		const controller = new AbortController();
		await this.setState((prevState) => ({
			...prevState,
			items: [],
			loading: true,
			controller: controller
		}), () => User.Tickets({ RESPONSIBLE_ID: this.props.filter }, this.state.nav['PAGE'], controller).then(result => {
			return this.setState((prevState) => ({
				...prevState,
				loading: false,
				controller: null,
				items: this.state.items.concat(result)
			}));
		}));
	};

    render() {
        return (
            <>
	            {this.state.loading === true ? ( <Spinner /> ) : (
		            <Scroller
			            onSwipe={this.handleLoadItems}
		            >
			            {this.state.items?.length && this.state.items.length > 0 ? (
				            <div className="container-fluid vw-100 items pt-3">
					            {this.state.items.map((item, index) => (
					                <Item
						                key={index}
							            history={this.props.history}
							            type={this.props.filter}
							            {...item}
							            parentDidMount={this.componentDidMount}
						            />
				                ))}
				            </div>
			            ) : (
				            <div className={"container-fluid pt-3"}>
					            <div className={"alert alert-info"}>Ничего не найдено</div>
				            </div>
			            )}
		            </Scroller>
	            )}
            </>
        );
    }
}
