import React from 'react';

import { Context } from "../../App/Context";
import {Scroller} from "../Scroller";
import {Car as Api} from "../../App/Api";


export class Life extends React.Component {

	static contextType = Context;

	onPick;
	onSearch;
	onlyOne = false;

	constructor(props) {
		super(props);
		this.state = {
			controller: null,
			loading: true,
			nav: false,
			items: [],
			picked: {
				text: null,
				data: []
			},
			search: '',
			searchParams: null
		};

		if(props?.searchParams){
			this.state.searchParams = props.searchParams;
		}

		if(props.picked){
			this.state.picked = {
				text: props.picked.text,
				data: props.picked.data
			};
		}
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		this.setState((prevState) => ({
			...prevState,
			loading: true,
			items: []
		}));

		let params = this.state.searchParams;
		this.props.onSearch(params).then(result => {
			this.setState((prevState) => ({
				...prevState,
				loading: false,
				controller: null,
				nav: result['NAV'],
				items: this.state.items.concat(result['ITEMS'])
			}));
		});
	}

	componentWillUnmount() {
		if(this.state.controller?.abort){
			this.state.controller.abort();
		}
		this.setState = (state, callback) => {
			return false;
		}
	}

	handleChange = async (e) => {
		e.persist();
		if(this.state.controller?.abort){
			this.state.controller.abort();
		}

		const controller = new AbortController();
		await this.setState((prevState) => ({
			...prevState,
			items: [],
			loading: true,
			search: e.target.value,
			controller: controller,
		}));

		let params = this.state.searchParams;
		params.NAME = e.target.value;
		await this.props.onSearch(params).then(result => {
			this.setState((prevState) => ({
				...prevState,
				loading: false,
				controller: null,
				nav: result['NAV'],
				items: this.state.items.concat(result['ITEMS'])
			}));
		});
	};

	handleLoadItems = async () => {
		if(this.state.controller?.abort){
			this.state.controller.abort();
		}

		this.setState((prevState) => ({
			...prevState,
			nav: false,
		}));

		const controller = new AbortController();
		await this.setState((prevState) => ({
			...prevState,
			items: [],
			loading: true,
			controller: controller
		}), () => this.props.onSearch(this.state.searchParams, 1, controller).then(result => {
			this.setState((prevState) => ({
				...prevState,
				loading: false,
				controller: null,
				nav: result['NAV'],
				items: this.state.items.concat(result['ITEMS'])
			}));
		}));
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
		}), () => this.props.onSearch(this.props.filter, page, controller).then(result => {
			this.setState((prevState) => ({
				...prevState,
				controller: null,
				nav: result['NAV'],
				items: this.state.items.concat(result['ITEMS'])
			}));
		}));
	};

	handlePick = async (e = false) => {
		let el = e.target;
		let picked = this.state.picked.data;
		let text = (this.state.picked.text?.length) ? this.state.picked.text.split(', ') : [];

		if(this.props.onlyOne === true){
			text = [];
			picked = [];
		}

		if(el.classList.contains('active')){
			el.classList.remove('active');
		}else{
			// если допускается только один активный элемент, то сначала снимаем со всех активность
			if(this.props.onlyOne === true){
				let elements = document.querySelectorAll(".life-search .item.active");
				[].forEach.call(elements, function(el) {
					el.classList.remove("active");
				});
			}
			el.classList.add('active');
		}

		let id = el.getAttribute('data-id');
		if(this.state.picked.data.includes(id)){
			this.state.picked.data.splice(this.state.picked.data.indexOf(id), 1);

			// заполняем заново массив с текстовым видом выбранных элементов
			text = [];
			let elements = document.querySelectorAll(".life-search .item.active");
			[].forEach.call(elements, function(q) {
				text.push(q.innerText);
			});
		}else{
			picked.push(id);
			text.push(el.innerText);
		}

		await this.setState((prevState) => ({
			...prevState,
			picked: {
				text: text.join(', '),
				data: picked
			}
		}), async () => {
			await this.props.onPick(this.state.picked);
			if(this.props.onlyOne === true){
				this.context.widget(false);
			}
		});
	};

	render() {
		return (
			<>
				<div className="pr-3 pl-3 mt-3 position-fixed w-100">
					<form method={"GET"} className="search-form d-block d-flex w-100">
						<div className="form-group w-100 mb-0">
							<div className="group-inner-left-icon">
								<i className="icon icon-search" />
							</div>
							<input
								name="search"
								onChange={this.handleChange}
								value={this.state.search || ''}
								min={1}
								type="text"
								autoComplete="off"
								placeholder="Поиск"
								className="form-control shadow"
							/>
						</div>
					</form>
				</div>

				<div className="life-search w-100 h-100 pr-3 pl-3 pt-5 pb-4">
					{this.state.loading === true ? ( <div className="spinner mt-10" /> ) : (
						this.state.items?.length && this.state.items.length > 0 ? (
								<Scroller
									onSwipe={this.handleLoadItems}
									onNext={this.onScroll}
									nav={ Number(this.state.nav['PAGE']) < Number(this.state.nav['PAGE_COUNT']) }
								>
										{this.state.items.map((item, index) => (
											<div
												key={index}
												data-id={item.ID}
												onClick={this.handlePick}
												className={this.state.picked.data.includes(item.ID) ? `item d-flex justify-content-between active` : `item d-flex justify-content-between`}>
												<span>{item.NAME}</span>
												<i className="icon icon-done" />
											</div>
										))}
								</Scroller>
						) : (
							<div className={"alert alert-info alert alert-info"}>Ничего не найдено</div>
						)
					)}
				</div>
			</>
		);
	}
}
