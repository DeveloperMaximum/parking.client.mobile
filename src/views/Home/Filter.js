import React from 'react';

import { Root, Header } from "../../components/ui";
import { Car, Storage } from "../../components/App";
import { Context } from "../../components/App/Context";
import { LifeSearch } from "../../components/ui/";

import { Car as ApiCar, Brand, Model, Body, Transmission } from "../../components/App/Api";


export class Filter extends React.Component {

	static contextType = Context;

	default = {
		filter: {
			MIN_PRICE: null,
			MAX_PRICE: null,
			MIN_YEAR: null,
			MAX_YEAR: null,
			brand: {
				text: '',
				data: []
			},
			model: {
				text: '',
				data: []
			},
			body: {
				text: '',
				data: []
			},
			transmission: {
				text: '',
				data: []
			},
		},
		items: false
	};

	constructor(props){
		super(props);
		this.state = this.default;
	}

	componentDidMount() {
		this.setState((prevState) => ({
			...prevState,
			items: Storage.get('FILTER_ITEMS', this.default.items),
			filter: Storage.get('FILTER_PARAM', this.default.filter)
		}));
	}

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return false;
		}
	}

	onClickHandle = async () => {
		let filter = {};
		await this.setState((prevState) => ({...prevState, items: null }));
		filter.BRAND_ID = this.state.filter.brand.data;
		filter.MODEL_ID = this.state.filter.model.data.join(',');
		filter.BODY_ID = this.state.filter.body.data.join(',');
		filter.TRANSMISSION_ID = this.state.filter.transmission.data.join(',');
		filter.MIN_PRICE = this.state.filter.MIN_PRICE;
		filter.MAX_PRICE = this.state.filter.MAX_PRICE;
		filter.MIN_YEAR = this.state.filter.MIN_YEAR;
		filter.MAX_YEAR = this.state.filter.MAX_YEAR;
		ApiCar.Filter(filter).then((result) => {
			Storage.save('FILTER_ITEMS', result);
			Storage.save('FILTER_PARAM', this.state.filter);
			this.setState((prevState) => ({...prevState, items: result }));
		})
	};

	render(){
		return (
			<Root viewId={"FILTER"}>
				<Header
					history={this.props.history}
					profile={true}
				/>

				<main>
					<div className="search-filter">
						<h1>Найти автомобиль</h1>

						<div className="filter-wrapper">

							<div className="item">
								<input
									readOnly={true}
									value={this.state.filter.brand.text || ''}
									onClick={() => this.context.widget({
										child: () => (
											<LifeSearch
												onSearch={Brand.Search}
												searchParams={{
													BODY_ID: this.state.filter.body.data,
													TRANSMISSION_ID: this.state.filter.transmission.data,
												}}
												onlyOne={true}
												picked={this.state.filter.brand}
												onPick={async (picked) => {
													if((this.state.filter.brand.data.length > 0 && picked.data.length > 0) && this.state.filter.brand.data[0] !== picked.data[0]){
														await this.setState((prevState) => ({
															...prevState,
															filter: {
																...prevState.filter,
																model: {
																	data: [],
																	text: ''
																}
															}
														}))
													}
													await this.setState((prevState) => ({
														...prevState,
														filter: {
															...prevState.filter,
															brand: picked
														}
													}))}
												}
											/>
										),
										header: 'Марка',
										right: {
											text: 'Очистить',
											callback: () => console.log(123)
										}
									})}
									type="text"
									autoComplete="off"
									placeholder="Марка"
								/>
								<i className="icon icon-chevron_right" />
							</div>

							<div className="item">
								<input
									disabled={(this.state.filter.brand.data.length > 0) ? 0 : 1}
									readOnly={true}
									value={this.state.filter.model.text || ''}
									onClick={() => this.context.widget({
										child: () => (
											<LifeSearch
												onSearch={Model.Search}
												searchParams={{
													BRAND_ID: this.state.filter.brand.data[0],
													TRANSMISSION_ID: this.state.filter.transmission.data,
													BODY_ID: this.state.filter.body.data
												}}
												picked={this.state.filter.model}
												onPick={async (picked) => {
													await this.setState((prevState) => ({
														...prevState,
														filter: {
															...prevState.filter,
															model: picked
														}
													}))
												}}
											/>
										),
										header: 'Модель',
										right: {
											text: 'Очистить',
											callback: () => console.log('right callback')
										}
									})}
									type="text"
									autoComplete="off"
									placeholder={(this.state.filter.brand.data.length <= 0) ? 'Выберите марку' : 'Модель'}
								/>
								<i className="icon icon-chevron_right" />
							</div>

							<div className="item">
								<input
							       type="number"
							       name="MIN_YEAR"
							       value={this.state.filter.MIN_YEAR || ''}
							       placeholder="Год выпуска, от"
							       onChange={(e) => {
								       e.persist();
								       this.setState((prevState) => ({
									       ...prevState,
									       filter: {
										       ...prevState.filter,
										       MIN_YEAR: e.target.value
									       }
								       }))
							       }}
								 />
							</div>
							<div className="item">
								<input
									value={this.state.filter.MAX_YEAR || ''}
									type="number"
									name="MAX_YEAR"
									placeholder="Год выпуска, до"
									onChange={(e) => {
										e.persist();
										this.setState((prevState) => ({
											...prevState,
											filter: {
												...prevState.filter,
												MAX_YEAR: e.target.value
											}
										}))
									}}
								/>
							</div>

							<div className="item">
								<input
									value={this.state.filter.MIN_PRICE || ''}
									type="number"
									name="MIN_PRICE"
									placeholder="Цена, от"
							        onChange={(e) => {
								        e.persist();
							        	this.setState((prevState) => ({
									        ...prevState,
									        filter: {
										        ...prevState.filter,
										        MIN_PRICE: e.target.value
									        }
								        }))
							        }}
								/>
							</div>
							<div className="item">
								<input
									value={this.state.filter.MAX_PRICE || ''}
									type="number"
									name="MAX_PRICE"
									placeholder="Цена, до"
									onChange={(e) => {
										e.persist();
										this.setState((prevState) => ({
											...prevState,
											filter: {
												...prevState.filter,
												MAX_PRICE: e.target.value
											}
										}))
									}}
								/>
							</div>

							<div className="item">
								<input
									readOnly={true}
									value={this.state.filter.body.text || ''}
									onClick={() => this.context.widget({
										child: () => (
											<LifeSearch
												picked={this.state.filter.body}
												onSearch={Body.Search}
												searchParams={{
													BRAND_ID: this.state.filter.brand.data,
													MODEL_ID: this.state.filter.model.data,
													TRANSMISSION_ID: this.state.filter.transmission.data,
												}}
												onPick={async (picked) => await this.setState((prevState) => ({
													...prevState,
													filter: {
														...prevState.filter,
														body: picked
													}
												}))}
											/>
										),
										header: 'Тип кузова',
										right: {
											text: 'Очистить',
											callback: () => console.log('right callback')
										}
									})}
									type="text"
									autoComplete="off"
									placeholder="Тип кузова"
								/>
								<i className="icon icon-chevron_right" />
							</div>

							<div className="item">
								<input
									readOnly={true}
									value={this.state.filter.transmission.text || ''}
									onClick={() => this.context.widget({
										child: () => (
											<LifeSearch
												picked={this.state.filter.transmission}
												onSearch={Transmission.Search}
												searchParams={{
													BRAND_ID: this.state.filter.brand.data,
													MODEL_ID: this.state.filter.model.data,
													BODY_ID: this.state.filter.body.data,
												}}
												onPick={async (picked) => await this.setState((prevState) => ({
													...prevState,
													filter: {
														...prevState.filter,
														transmission: picked
													}
												}))}
											/>
										),
										header: 'Коробка передач',
										right: {
											text: 'Очистить',
											callback: () => console.log('right callback')
										}
									})}
									type="text"
									autoComplete="off"
									placeholder="Коробка передач"
								/>
								<i className="icon icon-chevron_right" />
							</div>

						</div>

						<div className="content-wrapper">
							<button className={(this.state.items === null) ? 'btn btn-primary d-none w-100' : 'btn btn-primary w-100'} onClick={this.onClickHandle}>Искать</button>
						</div>


						<>
							{this.state.items === false ? (
								<></>
							) : (
								this.state.items === null ? (
									<div className="spinner" />
								) : (
									this.state.items.length <= 0 ? (
										<div className={"alert alert-info bg-info"}>Ничего не найдено</div>
									) : (
										<div className={"content-wrapper"}>
											<Car.List
												history={this.props.history}
												items={this.state.items}
												onClick={(e, car_id) => this.context.widget({
													child: () => (
														<>
															<Car.Item
																history={this.props.history}
																id={car_id}
															/>
														</>
													)
												})}
											/>
										</div>
									)
								)
							)}
						</>
					</div>
				</main>
			</Root>
		);
	}
}
