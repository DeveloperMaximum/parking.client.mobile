import React from 'react';
import { Link } from "react-router-dom";

import { Car as Api } from "../../Api";
import { Item } from "./Item";
import { Scroller } from "../../../ui/Scroller";


export class List extends React.Component {


	constructor(props){
		super(props);
		this.state = {
			controller: null,
			loading: true,
			nav: false,
			items: null
		};
		this.handleLoadItems = this.handleLoadItems.bind(this);
	}

	componentDidMount = async () => {
		this.setState((prevState) => ({
			...prevState,
		}));
		await this.handleLoadItems();
	};

	componentWillUnmount(){
		if(this.state.controller?.abort){
			this.state.controller.abort();
		}

		this.setState = (state, callback) => {
			return false;
		};
	}

	componentDidUpdate = async (nextProps, nextState, nextContext) => {
		if(this.props?.filter && nextProps?.filter){
			for(let key in nextProps.filter){

				// todo: странная херня
				if(this.props.filter[key] && this.props.filter[key] !== nextProps.filter[key]){
					await this.handleLoadItems();
					break;
				}
			}
		}
		return null;
	};

	onScroll = async (e) => {
		if(this.state.controller?.abort){
			return false;
		}

		e.persist()
		const page = this.state.nav['PAGE'] + 1;
		const controller = new AbortController();
		this.setState((prevState) => ({
			...prevState,
			controller: controller
		}), () => Api.Filter(this.props.filter, page, controller).then(result => {
			this.setState((prevState) => ({
				...prevState,
				controller: null,
				nav: result['NAV'],
				items: this.state.items.concat(result['ITEMS'])
			}));
		}));
	};

	handleLoadItems = async (e) => {
		if(this.state.controller?.abort){
			this.state.controller.abort();
		}

		let filter = this.props.filter;
		for(let key in filter){
			if(filter[key] === '' || filter[key] === null){
				delete filter[key];
			}
		}

		const controller = new AbortController();
		this.setState((prevState) => ({
			...prevState,
			items: [],
			loading: true,
			controller: controller
		}), () => Api.Filter(this.props.filter, this.state.nav['PAGE'], controller).then(result => {
			this.setState((prevState) => ({
				...prevState,
				loading: false,
				controller: null,
				nav: result['NAV'],
				items: this.state.items.concat(result['ITEMS'])
			}));
		}));
	};

    render() {
	    return (
		    this.state.loading === true ? ( <div className="spinner mt-5" /> ) : (
			    this.state.items?.length && this.state.items.length > 0 ? (
				    <Scroller
					    onSwipe={this.handleLoadItems}
					    onNext={this.onScroll}
					    nav={ Number(this.state.nav['PAGE']) < Number(this.state.nav['PAGE_COUNT']) }
				    >
					    <div className="container-fluid pt-3 items">
					        {this.state.items.map((item, index) => (
							    this.props?.onClick ? (
								    <div key={index} onClick={() => this.props.onClick(item)}>
									    <Item {...item} />
								    </div>
							    ) : (
								    <Link key={index} to={`/home/car/${item.ID}`}>
									    <Item {...item} />
								    </Link>
							    )
						    ))}

						    {!this.state?.nav ? (null) : (
							    Number(this.state.nav['PAGE']) < Number(this.state.nav['PAGE_COUNT']) ? (
								    <div className="spinner" />
							    ) : ( <div /> )
						    )}
					    </div>
				    </Scroller>
			    ) : (
				    <div className={"alert alert-info alert alert-info"}>Ничего не найдено</div>
			    )
		    )
	    );
    }
}
