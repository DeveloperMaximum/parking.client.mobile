import React from 'react';

import { Context } from "../../App/Context";
import { Car } from "../../App/Api";


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
		if(this.props.author_id !== false) return false;
		e.persist();
		this.setState((prevState) => ({
			...prevState,
			author: e.target.value
		}));
	};

	handleDescription = async (e) => {
		if(this.props.author_id !== false) return false;
		e.persist();
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

	handleClose = async () => {
		let params = [];

		this.setState((prevState) => ({
			...prevState,
			loading: true
		}));

		Car.Necessitate.Close({
			CAR_ID: this.props.car_id,
			NECESSITATE_ID: this.props.necessitate_id,
			COMMENT: this.state.comment
		}).then(result => {
			this.props.handleDidMount();
			if(this.props?.tableDidMount){
				this.props.tableDidMount();
			}
			this.context.dialog();
		});
	};

	handleAdd = async (e) => {
		let params = [];

		this.setState((prevState) => ({
			...prevState,
			loading: true
		}));

		params.push({
			NECESSITATE_ID: this.props.necessitate_id,
			DESCRIPTION: this.state.description
		});

		Car.Necessitate.Add({
			CAR_ID: this.props.car_id,
			NECESSITATES: params
		}).then(result => {
			this.props.handleDidMount();
			if(this.props?.tableDidMount){
				this.props.tableDidMount();
			}
			this.context.dialog();
		});
	};

	render() {
		return (
			<>
				{this.state.loading === true ? (
					<div className={"spinner"} />
				) : (
					<>
						{this.state.message !== false ? ( <>{this.state.message}</> ) : (<div />)}

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
						<div className={"mt-3 d-flex justify-content-around"}>
							{this.state.author_id !== false ? (
								<div className={`d-block w-100 btn btn-primary mr-2`} onClick={async () => await this.handleClose()}>Завершить</div>
							) : (
								<div className={`d-block w-100 btn btn-primary mr-2`} onClick={async () => await this.handleAdd()}>Назначить</div>
							)}
							<div className={`d-block w-100 btn btn-secondary ml-2`} onClick={() => this.context.dialog(false)}>Отмена</div>
						</div>
					</>
				)}
			</>
		);
	}
}
