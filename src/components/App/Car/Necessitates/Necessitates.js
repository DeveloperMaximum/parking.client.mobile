import React from 'react';

import * as Storage from "./../../../utils/Storage";
import { Context } from "./../../../App/Context";
import { Car as Api } from "../../../App/Api";
import { Tabs } from "../../../ui";
import { Form } from "./Form";
import { Group } from "./Group";
import { Scroller } from "../../../ui/Scroller";


export class Necessitates extends React.Component {

	static contextType = Context;

	user = Object;
	necessitates = [];
	services_necessitates = [];


	constructor(props) {
		super(props);
		this.state = {
			car: this.props.car,
			enabled: null,
			disabled: null,
			categories: null,
			tabId: this.props?.tabId ? this.props.tabId : 'list'
		};

		this.user = Storage.get('USER');
		this.services_necessitates = Storage.get('SERVICES_NECESSITATES')[this.user.UF_LOCATION];

		this.tabs = [
			{ name: 'Текущие', dataId: 'list', onClick: this.handleTab},
			{ name: 'Добавить', dataId: 'add', onClick: this.handleTab}
		];

		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount = (props = {}) => {
		this.setState((prevState) => ({
			...prevState,
			enabled: null,
			disabled: null,
			categories: null,
			tabId: props?.tabId ? props.tabId : 'list'
		}), () => this.handleLoadItems());
	};

	componentWillUnmount() {
		if(this.props?.parentDidMount){
			//this.props.parentDidMount({tabId: this.state.tabId});
		}
		this.setState = (state, callback) => {
			return false;
		};
	}

	handleTab = (tab) => {
		this.setState((prevState) => ({
			...prevState,
			enabled: null,
			disabled: null,
			categories: null,
			tabId: tab.dataId,
		}), () => this.handleLoadItems());
	};

	handleLoadItems = async () => {
		return await Api.Necessitate.List({ CAR_ID: this.props.car.ID }).then(result => {
			let enabled = [];
			let disabled = [];
			let enable_temp = [];
			let disable_temp = [];
			let car_necessitates = [];

			Object.keys(result).forEach((key) => {
				let car_necessitate = result[key];
				car_necessitates[String(car_necessitate.NECESSITATE_ID)] = result[key];
			});

			Object.keys(this.services_necessitates).forEach((key) => {

				disable_temp = {
					necessitates: [],
					title: this.services_necessitates[key].SERVICE.NAME,
					description: this.services_necessitates[key].SERVICE.DESCRIPTION
				};
				enable_temp = {
					necessitates: [],
					title: this.services_necessitates[key].SERVICE.NAME,
					description: this.services_necessitates[key].SERVICE.DESCRIPTION
				};

				Object.keys(this.services_necessitates[key].NECESSITATES).forEach(index => {
					let necessitate = this.services_necessitates[key].NECESSITATES[index];
					necessitate.NECESSITATE_ID = necessitate.ID;

					if(car_necessitates[necessitate.ID]){
						enable_temp.necessitates.push({
							...necessitate,
							...car_necessitates[necessitate.ID],
							car_id: this.props.car.ID,
							type: 'danger',

							onClick: this.handleClick,
							title: necessitate.NAME,
							description: car_necessitates[necessitate.ID].DESCRIPTION ? car_necessitates[necessitate.ID].DESCRIPTION : necessitate.DESCRIPTION
						});
					}else{
						disable_temp.necessitates.push({
							...necessitate,
							onClick: this.handleClick,
							title: necessitate.NAME,
							description: necessitate.DESCRIPTION
						});
					}
				});

				if(disable_temp.necessitates.length > 0){
					disabled.push(disable_temp);
				}

				if(enable_temp.necessitates.length > 0){
					enabled.push(enable_temp);
				}

			});

			this.setState((prevState) => ({ ...prevState, enabled, disabled }));
		});
	};

	handleClick(necessitate){
		if((!this.user.ROLES?.TECH && !this.user.ROLES?.MASTER_SMC && !this.user.ROLES?.MASTER_MKC && !this.user.ROLES?.MASTER_PREPARE && !this.user.ROLES?.MANAGER) && necessitate?.AUTHOR_ID) return null;

		window.dispatchEvent(new CustomEvent(`app.dialog`, { detail: {
			header: `${necessitate.NAME}`,
			buttons: null,
			children: <Form
					car_id={this.props.car.ID}
					necessitate_id={necessitate.NECESSITATE_ID}
					author_id={necessitate?.AUTHOR_ID ? necessitate?.AUTHOR_ID : false}
					author={necessitate?.AUTHOR_ID ? `${necessitate.AUTHOR_LAST_NAME} ${necessitate.AUTHOR_NAME}` : false}
					description={necessitate?.DESCRIPTION ? necessitate.DESCRIPTION : ""}
					parentDidMount={this.componentDidMount}
				/>
		}}));
	}

	dateFormat(string = '', type = false) {
		if(string === '') return '';
		const array = string.split(' ');

		const date = array[0];
		const dateArray = date.split('-');

		const year = dateArray[0];
		const month = dateArray[1];
		const day = dateArray[1];

		const time = array[1];
		const timeArray = time.split(':');

		const hours = timeArray[0];
		const minutes = timeArray[1];
		const seconds = timeArray[2];

		if(type !== false){
			if(type === 'DATE'){
				return `${day}.${month}.${year.slice(-2)}`;
			}
		}

		return `${hours}:${minutes}`;
	}

	render() {

		return (
			<Tabs
				tabs={[
					{ name: 'Текущие', children: (
						<Scroller
							onSwipe={this.componentDidMount}
						>
							{this.state.enabled === null ? ( <div className={"spinner"} /> ) : (
								<div className={"container-fluid vw-100 pt-3 tech-necessitates necessitates-danger"}>
									{this.state.enabled !== null && this.state.enabled.length > 0 ? (
										this.state.enabled.map((category, i) =>
											<Group
												key={i}
												title={category.title}
												descripiton={category.descripiton}
												necessitates={category.necessitates}
											/>
										)
									) : ( <div className={"alert alert-info alert alert-info"}>Ничего не найдено</div> )}
								</div>
							)}
						</Scroller>
					)},
					{ name: 'Добавить', children: (
						<Scroller

						>
							{this.state.disabled === null ? ( <div className={"spinner"} /> ) : (
								<div className={"container-fluid pt-3 tech-necessitates necessitates-danger"}>
									{this.state.disabled !== null && this.state.disabled.length > 0 ? (
										this.state.disabled.map((category, i) =>
											<Group
												key={i}
												title={category.title}
												descripiton={category.descripiton}
												necessitates={category.necessitates}
											/>
										)
									) : ( <div className={"alert alert-info alert alert-info"}>Ничего не найдено</div> )}
								</div>
							)}
						</Scroller>
					)}
				]}
				default={'list'}
			>
			</Tabs>
		)
	}
}
