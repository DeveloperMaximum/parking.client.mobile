import React from 'react';

import { Context } from "../../Context";
import { User } from "../../Api";
import { Scroller } from "../../../ui/Scroller";
import { Item } from "./Item";
import {Car} from "../../index";


export class List extends React.Component {

	static contextType = Context;


	constructor(props){
		super(props);
		this.state = {
			controller: null,
			loading: true,
			nav: {
				PAGE: 1
			},
			items: null
		};

		this.handleExit = this.handleExit.bind(this);
	}

	componentDidMount = () => {
		this.setState((prevState) => ({
			...prevState,
		}));
		this.handleLoadItems().then(r => r);
	};

	componentWillUnmount(){
		if(this.state.controller?.abort){
			this.state.controller.abort();
		}

		this.setState = (state, callback) => {
			return false;
		};
	}

	onScroll = async (e) => {
		if(this.state.controller?.abort){
			return false;
		}

		const controller = new AbortController();
		this.setState((prevState) => ({
			...prevState,
			controller: controller
		}), () => User.History({}, this.state.nav['PAGE'] + 1, controller).then(result => {
			this.setState((prevState) => ({
				...prevState,
				loading: false,
				controller: null,
				nav: result.data['NAV'],
				items: this.state.items.concat(result.data['ITEMS'])
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
		}), () => User.History({}, this.state.nav['PAGE'], controller).then(result => {
			if(result.success === true){
				return this.setState((prevState) => ({
					...prevState,
					loading: false,
					controller: null,
					nav: result.data['NAV'],
					items: this.state.items.concat(result.data['ITEMS'])
				}));
			}
		}));
	};

	handleExit = async (e) => {
		window.dispatchEvent(new CustomEvent(`app.dialog`, { detail: {
			header: "Выйти из приложения",
			content: "Вы действительно хотите покинуть приложение?",
			buttons: [{
				text: 'Да',
				onClick: async () => {
					return this.context.logout();
				}
			}]
		}}));
	};

    render() {

        return (this.state.loading === true ? ( <div className="spinner mt-5" /> ) : (
            <Scroller
	            onSwipe={this.handleLoadItems}
	            onNext={this.onScroll}
	            nav={ Number(this.state.nav['PAGE']) < Number(this.state.nav['PAGE_COUNT']) }
            >
	            {this.state.items?.length && this.state.items.length > 0 ? (
		            <div className="container-fluid items pt-3 pb-3 h-100">
		                {this.state.items.map((item, index) => (
			                <Item key={index} {...item} />
			            ))}
		            </div>
	            ) : (
		            <div className={"alert alert-info alert alert-info"}>Ничего не найдено</div>
	            )}
            </Scroller>
        ));
    }
}
