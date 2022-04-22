import React from 'react';

import { Context } from "../../../App/Context";


export class Search extends React.Component {

	static contextType = Context;


	constructor(props){
		super(props);
		this.state = {
			loading: false,
			message: false,
		};

		this.handleSearch = this.handleSearch.bind(this);
	}

	componentDidMount() {
		this.setState((prevState) => ({
			...prevState,
		}));
	}

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return false;
		}
	}

	handleSearch = async () => {
		this.setState((prevState) => ({
			...prevState,
			loading: true
		}));

		const search = document.querySelector(`#SEARCH_INNER_ID`).value;
		if(search === ''){
			await this.setState((prevState) => ({
				...prevState,
				message: 'Необходимо указать номер парковочного места',
				loading: false
			}));
		}

		let all = document.querySelectorAll(`#SECTOR .inner_id-${search}`);
		if(all.length === 0){
			await this.setState((prevState) => ({
				...prevState,
				message: 'Указанное парковочное место не найдено',
				loading: false
			}));
			return true;
		}
		return new Promise((resolve, reject) => {
			document.querySelector(`#APP`).classList.add('scrolling');
			document.querySelector(`#SECTOR .inner_id-${search}`).classList.add('active');

			setTimeout(() => {
				document.querySelector(`#SECTOR main .inner_id-${search}`).scrollIntoView({block: "center", behavior: "smooth"});
				document.querySelector(`#APP`).classList.remove('scrolling');

				setTimeout(() => {
					document.querySelector(`#SECTOR .inner_id-${search}`).classList.remove('active');
					resolve(true);

					setTimeout(() => {
						document.querySelector(`#SECTOR .inner_id-${search}`).click();
						resolve(true);
					}, 500)

					this.setState((prevState) => ({
						...prevState,
						message: false,
						loading: false
					}), () => this.context.dialog(false));

				}, 1500);
			}, 500);
		});
	};

	render() {
		return (
			<>
				{this.state.loading === true ? (
					<div className={"spinner"} />
				) : (
					<>
						{this.state.message !== false ? (
							<>{this.state.message}</>
						) : (
							<>Укажите номер парковочного места</>
						)}
						<div className={'input-group'}>
							<input className={"form-control mt-3 border-primary"} id={"SEARCH_INNER_ID"} autoComplete={`off`} type={`number`}/>
						</div>
						<div className={"mt-3 d-flex justify-content-around"}>
							<div className={`d-block w-100 btn btn-primary mr-2`} onClick={async () => await this.handleSearch()}>Искать</div>
							<div className={`d-block w-100 btn btn-secondary ml-2`} onClick={() => this.context.dialog(false)}>Отмена</div>
						</div>
					</>
				)}
			</>
		);
	}
}
