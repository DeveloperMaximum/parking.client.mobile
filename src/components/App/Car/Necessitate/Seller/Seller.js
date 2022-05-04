import React from 'react';

import { Header } from "../../../../ui/Header";
import { Root, StyledCheckbox } from "../../../../ui";
import { Storage } from "./../../../../App";
import { Context } from "./../../../../App";
import { Car } from "../../../../App/Api";


export class Seller extends React.Component {

	necessitates = [];
	static contextType = Context;

	constructor(props) {
		super(props);
		this.state = {
			count: 0,
			added: [],
			necessitates: null,
		};
	}

	componentDidMount(){
		Car.Necessitate.List({ CAR_ID: this.props.car.ID }).then(result => {
			const storage = Storage.get('NECESSITATE');
			Object.keys(storage).forEach((key) =>{
				this.necessitates[storage[key].ID] = storage[key];
			});

			let necessitates = [];
			Object.keys(result).forEach((key) =>{
				necessitates[result[key].ID] = result[key];
			});

			this.setState((prevState) => ({
				...prevState,
				necessitates
			}));
		});
	}

	changeNecessitate = async (checkbox) => {
		let count = this.state.count;
		let added = this.state.added;
		if(checkbox.active === false && added[checkbox.id] && !this.state.necessitates[checkbox.id]){
			count = count - 1;
			delete added[checkbox.id];
		}else if(checkbox.active === true && !this.state.necessitates[checkbox.id]){
			if(!added[checkbox.id]) count = count + 1;
			added[checkbox.id] = {
				NECESSITATE_ID: checkbox.id,
				DESCRIPTION: checkbox.description
			};
		}
		await this.setState((prevState) => ({ ...prevState, added, count }));
	};

	sendNecessitates = async (e) => {
		e.persist();
		let params = [];
		this.state.added.forEach(function(entry) {
			params.push(entry)
		});
		Car.Necessitate.Add({
			CAR_ID: this.props.car.ID,
			NECESSITATES: params
		}).then(result => {
			this.props.onSuccess();
			this.context.sider(false);
			this.context.dialog({
				header: 'Потребности',
				content: 'Выбранные потребности были успешно добавлены'
			});
		});
	};

	back = async (e) => {
		e.persist();
		this.props.back();
	};

	render() {

		return (
			<>
				{this.state.necessitates !== null ? (
					this.necessitates.map((necessitate, index) => {
						return (
							<StyledCheckbox
								key={index}
								id={necessitate.ID}
								name={necessitate.NAME}
								true={'Да'}
								false={'Нет'}
								placeholder={"Оставьте комментарий"}
								onHandle={this.changeNecessitate}
								changed={!!this.state.added[necessitate.ID]}
								active={!!this.state.necessitates[necessitate.ID]}
								disabled={!!this.state.necessitates[necessitate.ID]}
								description={this.state.necessitates[necessitate.ID] ? this.state.necessitates[necessitate.ID].DESCRIPTION : this.state.added[necessitate.ID]?.DESCRIPTION}
							/>
						);
					})
				) : (
					<div className={"spinner"} />
				)}

				<div className={this.state.count > 0 ? `sticker active` : `sticker`}>
					<div className={`btn btn-primary d-block w-100`} onClick={this.sendNecessitates}>Сформировать</div>
				</div>
			</>
		);
	}
}
