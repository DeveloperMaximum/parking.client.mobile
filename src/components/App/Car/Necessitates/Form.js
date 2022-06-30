import React from 'react';

import { Context } from "../../Context";
import { Car as Api } from "../../Api";


export class Form extends React.Component {

	static contextType = Context;


	constructor(props){
		super(props);
		this.state = {
			author_id: props.author_id,
			author: props.author,
			description: (props.description === '' && props.author_id !== false) ? 'Описание отсутствует' : props.description,
			comment: '',
			loading: false,
			message: false,
		};

		if(this.state.author_id === false) this.state.description = '';

		this.handleAdd = this.handleAdd.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleAuthor = this.handleAuthor.bind(this);
		this.handleDescription = this.handleDescription.bind(this);
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

	handleAuthor = async (e) => {
		e.persist();
		if(this.props.author_id !== false){
			return false;
		}
		this.setState((prevState) => ({
			...prevState,
			author: e.target.value
		}));
	};

	handleDescription = async (e) => {
		e.persist();
		if(this.props.author_id !== false){
			return false;
		}
		this.setState((prevState) => ({
			...prevState,
			description: e.target.value
		}));
	};

	handleComment = async (e) => {
		e.persist();
		this.setState((prevState) => ({
			...prevState,
			comment: e.target.value
		}));
	};

	handleAdd = async (e) => {
		this.setState((prevState) => ({
			...prevState,
			loading: true
		}));

		Api.Necessitate.Add(this.props.car_id, { NECESSITATE_ID: this.props.necessitate_id, DESCRIPTION: this.state.description }).then(result => {
			let message = '';
			if(result.success === false) {
				message = result.message !== false ? result.message : 'Потребность закрыть не удалось';
			}else{
				message = result.message !== false ? result.message : 'Потребность успешно добавлена';
			}

			if(this.props?.parentDidMount){
				this.props.parentDidMount({tabId: 'add'});
			}

			window.dispatchEvent(new CustomEvent(`app.dialog`, { detail: {
				header: "Потребность",
				content: message,
			}}));
		});
	};

	handleClose = async () => {
		this.setState((prevState) => ({
			...prevState,
			loading: true
		}));

		Api.Necessitate.Close(this.props.car_id, { NECESSITATE_ID: this.props.necessitate_id, COMMENT: this.state.comment }).then(result => {
			let message = '';
			if(result.success === false) {
				message = result.message !== false ? result.message : 'Потребность закрыть не удалось';
			}else{
				message = result.message !== false ? result.message : 'Потребность успешно добавлена';
			}

			if(this.props?.parentDidMount){
				this.props.parentDidMount({tabId: 'list'});
			}

			window.dispatchEvent(new CustomEvent(`app.dialog`, { detail: {
				header: "Потребность",
				content: message
			}}));
		});
	};

	render() {
		return (
			<>
				{this.state.loading === true ? (
					<div className={"spinner"} />
				) : (
					<>
						{this.state.message !== false ? ( <>{this.state.message}</> ) : (null)}

						{this.state.author_id !== false ? (
							<>
								<div className={'input-group'}>
									<input onChange={this.handleAuthor} className={"form-control mb-3 border-secondary"} autoComplete={`off`} value={this.state.author} placeholder={"Постановщик"} />
								</div>
								<div className={'input-group'}>
									<textarea onChange={this.handleDescription} className={"form-control border-secondary"} autoComplete={`off`} value={this.state.description} placeholder={"Описание"} />
								</div>
								<div className={'input-group'}>
									<textarea onChange={this.handleComment} className={"form-control border-secondary mt-3"} autoComplete={`off`} value={this.state.comment} placeholder={"Комментарий"} />
								</div>
							</>
						) : (
							<>
								<div className={'input-group'}>
									<textarea onChange={this.handleDescription} className={"form-control border-secondary"} autoComplete={`off`} value={this.state.description} placeholder={"Описание"} />
								</div>
							</>
						)}
						<div className={"mt-2 d-flex justify-content-around"}>
							{this.state.author_id !== false ? (
								<div className={`d-block w-100 btn btn-primary ml-0 mr-2 mb-0`} onClick={async () => await this.handleClose()}>Завершить</div>
							) : (
								<div className={`d-block w-100 btn btn-primary ml-0 mr-2 mb-0`} onClick={async () => await this.handleAdd()}>Назначить</div>
							)}
							<div className={`d-block w-100 btn btn-secondary ml-2 mr-0 mb-0`} onClick={() => window.dispatchEvent(new CustomEvent(`app.dialog.close`))}>Отмена</div>
						</div>
					</>
				)}
			</>
		);
	}
}
