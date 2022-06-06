import React from 'react';

import { Context } from "../../App/Context";


export class Life extends React.Component {

	static contextType = Context;

	onPick;
	onSearch;
	onlyOne = false;

	constructor(props) {
		super(props);
		this.state = {
			controller: false,
			items: false,
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
			items: null
		}));

		let params = this.state.searchParams;
		this.props.onSearch(params).then(result => {
			this.setState((prevState) => ({
				...prevState,
				items: result
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
			items: null,
			search: e.target.value,
			controller: controller,
		}));

		let params = this.state.searchParams;
		params.NAME = e.target.value;
		await this.props.onSearch(params).then(result => {
			this.setState((prevState) => ({
				...prevState,
				items: result
			}));
		});
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
				<div className="content-wrapper">

					<form method={"GET"} className="search-form d-block d-flex">
						<div className="input-group">
							<div className="group-inner-left-icon">
								<i className="icon icon-search" />
							</div>
							<div className={'input-group'}>
								<input
									name="search"
									onChange={this.handleChange}
									value={this.state.search || ''}
									min={1}
									type="text"
									autoComplete="off"
									placeholder="Поиск"
									className="form-control"
								/>
							</div>
						</div>
					</form>

					<div className="life-search">
						{this.state.items !== null ? (
							this.state.items?.length && this.state.items.length > 0 ? (
								this.state.items.map((item, index) => (
									<div
										key={index}
										data-id={item.ID}
										onClick={this.handlePick}
										className={this.state.picked.data.includes(item.ID) ? `item d-flex justify-content-between active` : `item d-flex justify-content-between`}>
										<span>{item.NAME}</span>
										<i className="icon icon-done" />
									</div>
								))
							) : (
								<div className={"alert alert-info bg-info"}>Ничего не найдено</div>
							)
						) : (
							<div className="spinner" />
						)}
					</div>

				</div>
			</>
		);
	}
}
