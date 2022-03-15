import React from 'react';

import { Context } from "../../components/base/Context";
import * as Storage from "../../components/base/Storage";

import { Root } from "../../components/ui/Root/Root";
import { Header } from "../../components/ui/Header/Header";
import { Footer } from "../../components/ui/Footer/Footer";
import { LifeSearch } from "../../components/ui/";

import { Car, Brand, Model, Body, Transmission } from "../../components/App/Api";
import {Place as CellPlace} from "../../components/App/Sector";
import {CarList} from "../../components/App";


export class Filter extends React.Component {

	static contextType = Context;

	constructor(props){
		super(props);
		this.state = {
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
	}

	componentDidMount() {
		this.setState((prevState) => ({
			...prevState
		}));
	}

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return false;
		}
	}

	render(){
		return (
			<Root viewId={"FILTER"}>
				<Header>
					<div className="d-flex" onClick={() => this.props.history.push(`/profile`)}>
						<h1 className="d-inline-block">{Storage.get('USER').NAME}</h1>
						<i className="icon-chevron_right d-inline-block" />
					</div>
				</Header>

				<main>
					<div className="search-filter">
						<h1>Найти автомрбиль</h1>

						<div className="filter-wrapper">

							<div className="item">
								<input
									readOnly={true}
									value={this.state.filter.brand.text || ''}
									onClick={() => this.context.widget({
										child: () => (
											<LifeSearch
												onSearch={Brand.search}
												onlyOne={true}
												picked={this.state.filter.brand}
												onPick={async (picked) => {
													if((this.state.filter.brand.data.length > 0 && picked.data.length > 0) && this.state.filter.brand.data[0] !== picked.data[0]){
														await this.setState((prevState) => ({
															...prevState,
															filter: {
																...prevState.filter,
																model: {
																	text: '',
																	data: []
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
											callback: () => console.log('right callback')
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
												onSearch={Model.searchWithBrandId}
												searchParams={{
													BRAND_ID: this.state.filter.brand.data[0]
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
												onSearch={Body.search}
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
												onSearch={Transmission.search}
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
							<button className={(this.state.items === null) ? 'btn btn-primary d-none w-100' : 'btn btn-primary w-100'}
								onClick={async () => {
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
									Car.filter(filter).then((r) => {
										this.setState((prevState) => ({...prevState, items: r }));
									})
								}}
							>Искать</button>
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
											<CarList items={this.state.items} />
										</div>
									)
								)
							)}
						</>
					</div>
				</main>

				<Footer history={this.props.history} />
			</Root>
		);
	}
}
