import React from 'react';

import { Context } from "../../base/Context";
import { SellerConsumer } from "../../base/Context/Necessitate";
import * as Storage from "../../base/Storage";
import { Car } from "../../App/Api";

import { Header } from "../../ui/Header";
import { Root } from "../../ui/Root";

export class NecessitateSeller extends React.Component {

	static contextType = Context;

	constructor(props) {
		super(props);
		this.state = {
			necessitates: {},
		};
	}

	handleAddNecessitate = async (e) => {
		e.persist();
		e.target.classList.add('changed');
		e.target.nextElementSibling.classList.remove('active');
		e.target.parentElement.parentElement.nextElementSibling.classList.remove('d-none');
		let necessitates = this.state.necessitates;
		let necessitate_id = e.target.getAttribute('data-id');
		necessitates[e.target.getAttribute('data-id')] = {
			NECESSITATE_ID: necessitate_id,
			DESCRIPTION: null
		};
		await this.setState((prevState) => ({
			...prevState,
			necessitates: necessitates
		}));
	};

	handleChangeDescription = async (e) => {
		e.persist();
		let necessitates = this.state.necessitates;
		let necessitate_id = e.target.getAttribute('data-id');
		necessitates[necessitate_id] = {
			NECESSITATE_ID: necessitate_id,
			DESCRIPTION: e.target.value
		};
		await this.setState((prevState) => ({
			...prevState,
			necessitates: necessitates
		}));
	};

	renderNecessitates(necessitates){
		// обрабатываем библиотеку потребностей
		let arr_necessitates = [];
		let all_necessitates = Storage.get('NECESSITATE');
		Object.keys(all_necessitates).forEach(function(key) {
			arr_necessitates.push(all_necessitates[key]);
		});

		// обрабатываем полученные с сервера потребности
		let active_necessitates = {};
		Object.keys(necessitates).forEach(function(key) {
			active_necessitates[necessitates[key].NECESSITATE_ID] = necessitates[key];
		});

		return (
			<>
				{arr_necessitates.map((row, index) => {
					return (
						<div className="btn-checkbox" key={index}>
							<div>
								<div>{row.NAME}</div>
								<div className="btn-group">
									{active_necessitates[row.ID] ? (
										<>
											<button type="button" className="btn active">Да</button>
											<button type="button" className="btn">Нет</button>
										</>
									) : (
										<>
											<button data-id={row.ID} type="button" className="btn" onClick={this.handleAddNecessitate}>Да</button>
											<button type="button" className="btn active">Нет</button>
										</>
									)}
								</div>
							</div>
							{active_necessitates[row.ID] ? (
								active_necessitates[row.ID].DESCRIPTION !== null ? (
									<div className="added">
										<textarea readOnly={true} placeholder="Оставьте комментарий" className="w-100 mt-3 mb-3 p-3" rows="3" value={active_necessitates[Number(row.ID)].DESCRIPTION}>
											{active_necessitates[Number(row.ID)].DESCRIPTION}
										</textarea>
									</div>
								) : (
									<></>
								)
							) : (
								<div className="added d-none">
									<textarea
										placeholder="Оставьте комментарий"
										className="w-100 mt-3 mb-3 p-3"
										rows="3"
										data-id={row.ID}
										onChange={this.handleChangeDescription}
									/>
								</div>
							)}
						</div>
					);
				})}

				<div className="sticker">
					<SellerConsumer>
						{({ data, stop }) => (
							<div className="btn btn-primary d-block w-100" onClick={() => {
								Car.addNecessitates({
									CAR_ID: data.car.ID,
									NECESSITATES: this.state.necessitates
								}).then(result => {
									this.context.alert({
										header: 'Успешно',
										content: 'Выбранные потребности были успешно добавлены',
										callback: stop,
									});
								});
							}}>Сформировать</div>
						)}
					</SellerConsumer>
				</div>
			</>
		)
	}

	render() {

		return (
			<SellerConsumer>
				{({ data, stop }) => (
					<Root viewId={"NECESSITATES"} active={data.process} className={"inner-root-component"}>
						<Header onClick={async (e) => stop()}>
							<div className="d-flex" onClick={async (e) => stop()}>
								<i className="icon icon-chevron_left d-inline-block" />
								<h1 className="d-inline-block d-inline-block">Потребности</h1>
							</div>
						</Header>

						<header className="d-flex align-items-center" onClick={async (e) => stop()}>
							<div className="thumb">
								<img src="tiles/car.png"/>
							</div>
							<div>
								<>
									<div>
										<b>{data.car?.BRAND_NAME} {data.car?.MODEL_NAME}</b>
									</div>
									<div>{(data.car?.INNER_ID) ? `${data.car.SECTOR_NAME}, место ${data.car.INNER_ID}` : '-'}</div>
								</>
							</div>
						</header>

						{data.necessitates !== null ? (
							<main>
								<div className={"content-wrapper"}>
									{this.renderNecessitates(data.necessitates)}
								</div>
							</main>
						) : (
							<main className="vh-100">
								<div className={"spinner"} />
							</main>
						)}
					</Root>
				)}
			</SellerConsumer>
		);
	}
}
