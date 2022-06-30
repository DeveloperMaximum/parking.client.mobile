import React from 'react';
import { Link } from "react-router-dom";

import { Scroller } from "../../../ui/Scroller";
import { Service as Api } from "../../Api";
import { Item } from "./Item";


export class List extends React.Component {


	constructor(props){
		super(props);
		this.state = {
			controller: null,
			loading: true,
			nav: false,
			items: null
		};
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
				if(!this.props.filter[key] || this.props.filter[key] !== nextProps.filter[key]){
					return await this.handleLoadItems();
				}
			}
		}
	};

	onScroll = async (e) => {
		if(this.state.controller?.abort){
			return false;
		}

		const page = this.state.nav['PAGE'] + 1;
		const controller = new AbortController();
		this.setState((prevState) => ({
			...prevState,
			controller: controller
		}), () => Api.List(this.props.filter, page, controller).then(result => {
			this.setState((prevState) => ({
				...prevState,
				controller: null,
				nav: result['NAV'],
				items: this.state.items.concat(result['ITEMS'])
			}));
		}));
	};

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
		}), () => Api.List(this.props.filter, this.state.nav['PAGE'], controller).then(result => {
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
				<Scroller onSwipe={this.handleLoadItems} onScroll={this.onScroll}>
					{this.state.items?.length && this.state.items.length > 0 ? (
						<div className="container-fluid pt-3 items">
							{this.state.items.map((item, index) => (
								this.props?.onClick ? (
									<div key={index} onClick={() => this.props.onClick(item)}>
										<Item {...item} />
									</div>
								) : (
									<Link key={index} to={`/home/service/${item.ID}`}>
										<Item {...item} />
									</Link>
								)
							))}

							{this.state?.nav ? (
								Number(this.state.nav['PAGE']) < Number(this.state.nav['PAGE_COUNT']) ? (
									<div className="spinner" />
								) : ( <div /> )
							) : ( null )}
						</div>
					) : (
						<div className="container-fluid pt-3">
							<div className={"alert alert-info"}>Ничего не найдено</div>
						</div>
					)}
				</Scroller>
			)
		);
	}
}
