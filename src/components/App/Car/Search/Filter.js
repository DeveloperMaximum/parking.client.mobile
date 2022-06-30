import React from 'react';

import { Context } from "../../../App/Context";
import { Body, Brand, Model, Transmission} from "../../Api";
import { LifeSearch } from "../../../ui";
import { Car } from "../../../App";
import { Scroller } from "../../../ui/Scroller";


export class Filter extends React.Component {

	static contextType = Context;

	default = {
		_filter: false,
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
		nav: false,
		items: false,
		status: 'filter'
	};


	constructor(props) {
		super(props);

		this.state = this.default;
	}

	componentDidMount = async () => {
		await this.setState((prevState) => ({
			...prevState,
		}));
	};

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return false;
		}
	}

	params() {
		return {
			BRAND_ID: this.state.filter.brand.data,
			MODEL_ID: this.state.filter.model.data.join(','),
			BODY_ID: this.state.filter.body.data.join(','),
			TRANSMISSION_ID: this.state.filter.transmission.data.join(','),
			MIN_PRICE: this.state.filter.MIN_PRICE,
			MAX_PRICE: this.state.filter.MAX_PRICE,
			MIN_YEAR: this.state.filter.MIN_YEAR,
			MAX_YEAR: this.state.filter.MAX_YEAR
		};
	}

	handleChange = async (e) => {
		e.persist();
		this.setState({
			query: e.target.value,
		});
	};

	handleClick = async (e) => {
		await this.setState((prevState) => ({
			...prevState,
			status: 'result',
			_filter: this.params()
		}));
	};

	render() {

		return (
			<>
				{this.state.status === 'filter' ? (
					<Scroller>
						<div className="search-filter">
							<div className="filter-wrapper p-3">

								<div className="item">
									<input
										readOnly={true}
										value={this.state.filter.brand.text || ''}
										onClick={() => this.context.widget({
											child: () => (
												<LifeSearch
													onlyOne={true}
													picked={this.state.filter.brand}
													onSearch={Brand.List}
													searchParams={{
														BODY_ID: this.state.filter.body.data,
														TRANSMISSION_ID: this.state.filter.transmission.data,
													}}
													onPick={async (picked) => {
														await this.setState((prevState) => ({
															...prevState,
															filter: {
																...prevState.filter,
																brand: picked,
																model: { data: [], text: '' }
															}
														}));
													}}
												/>
											),
											header: 'Марка',
											right: {
												text: 'Очистить',
												callback: () => {
													this.setState((prevState) => ({
														...prevState,
														filter: {
															...prevState.filter,
															brand: { data: [], text: '' },
															model: { data: [], text: '' }
														}
													}));
													this.context.widget();
												}
											}
										})}
										type="text"
										autoComplete="off"
										placeholder="Марка"
										className={'form-control rounded-0'}
									/>
									<i className="icon icon-chevron_right" />
								</div>

								<div className="item">
									<input
										disabled={(this.state.filter.brand.data.length > 0) ? 0 : 1}
										readOnly={(this.state.filter.brand.data.length > 0) ? 0 : 1}
										value={this.state.filter.model.text || ''}
										onClick={() => this.context.widget({
											child: () => (
												<LifeSearch
													onSearch={Model.List}
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
												callback: () => {
													this.setState((prevState) => ({
														...prevState,
														filter: {
															...prevState.filter,
															model: { data: [], text: '' }
														}
													}));
													this.context.widget();
												}
											}
										})}
										type="text"
										autoComplete="off"
										placeholder={(this.state.filter.brand.data.length <= 0) ? 'Выберите марку' : 'Модель'}
										className={'form-control rounded-0'}
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
										className={'form-control rounded-0'}
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
										className={'form-control rounded-0'}
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
										className={'form-control rounded-0'}
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
										className={'form-control rounded-0'}
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
													onSearch={Body.List}
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
												callback: () => {
													this.setState((prevState) => ({
														...prevState,
														filter: {
															...prevState.filter,
															body: { data: [], text: '' }
														}
													}));
													this.context.widget();
												}
											}
										})}
										type="text"
										autoComplete="off"
										placeholder="Тип кузова"
										className={'form-control rounded-0'}
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
													onSearch={Transmission.List}
													searchParams={{
														ALL: 'Y',
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
												callback: () => {
													this.setState((prevState) => ({
														...prevState,
														filter: {
															...prevState.filter,
															transmission: { data: [], text: '' }
														}
													}));
													this.context.widget();
												}
											}
										})}
										type="text"
										autoComplete="off"
										placeholder="Коробка передач"
										className={'form-control rounded-0'}
									/>
									<i className="icon icon-chevron_right" />
								</div>

							</div>

							<div className={`btn-filter w-100`} onClick={this.handleClick}>
								<button className={'btn btn-primary w-100'}>Искать</button>
							</div>
						</div>
					</Scroller>
				) : (null)}

				{this.state.status !== 'result' ? (null) : (
					<>
						<Car.List
							filter={this.state._filter}
							onClick={ async (car) => {
								await this.context.widget({
									header: ``,
									child: () => (
										<>
											<Car.Item
												id={car.ID}
												history={this.props.history}
											/>
										</>
									)
								})
							}}

						/>

						<div className="search-filter">
							<div className={`btn-filter w-100`}>
								<button className={'btn btn-primary w-100'} onClick={() => this.setState((prevState) => ({ ...prevState, status: 'filter' }))}>Изменить параметры поиска</button>
							</div>
						</div>
					</>
				)}
			</>
		);
	}
}
