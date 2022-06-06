import React from 'react';

import { BlockCheckbox } from "../../../../ui";
import { Storage } from "./../../../../App";
import { Context } from "./../../../../App/Context";
import { Car } from "../../../../App/Api";


export class Tech extends React.Component {

	enabled = [];
	disabled = [];
	necessitates = [];
	static contextType = Context;


	constructor(props) {
		super(props);
		this.state = {
			car: this.props.car,
			count: 0,
			added: [],
			enabled: [],
			disabled: [],
			necessitates: null
		};
	}

	componentDidMount = async () => {
		Car.Necessitate.List({ CAR_ID: this.props.car.ID }).then(result => {
			let enabled = [];
			let disabled = [];
			let necessitates = [];
			const storage = Storage.get('NECESSITATE');

			Object.keys(storage).forEach((key) => {
				necessitates[storage[key].ID] = storage[key];
				disabled[storage[key].ID] = storage[key];
				disabled[storage[key].ID].NECESSITATE_ID = storage[key].ID;
			});

			Object.keys(result).forEach((key) => {
				enabled[result[key].NECESSITATE_ID] = result[key];
				enabled[result[key].NECESSITATE_ID].NAME = storage[result[key].NECESSITATE_ID].NAME;

				if(disabled[result[key].NECESSITATE_ID]){
					delete disabled[result[key].NECESSITATE_ID];
				}
			});

			this.setState((prevState) => ({
				...prevState,
				necessitates,
				enabled,
				disabled
			}));
		});
	};

	back = async (e) => {
		e.persist();
		this.props.back();
	};

	render() {

		return (
			<>
				<div className="tech-necessitates-wrapper">
					<div className="tech-necessitates">
						{this.state.disabled !== null ? (
							this.state.disabled.length > 0 ? (
								<>
									<div className="h3">Добавить потребность</div>
									{this.state.disabled.map((necessitate, index) => {
										return (
											<BlockCheckbox
												key={index}
												id={necessitate.NECESSITATE_ID}
												car_id={this.props.car.ID}
												name={necessitate.NAME}
												author_id={false}
												author={""}
												description={""}
												handleDidMount={this.componentDidMount}
												tableDidMount={this.props.tableDidMount}
											/>
										);
									})}
								</>
							) : ( <div /> )
						) : (
							<div className={"spinner"} />
						)}
					</div>
					<div className="tech-necessitates necessitates-danger">
						{this.state.enabled !== null ? (
							this.state.enabled.length > 0 ? (
								<>
									<div className="h3">Что нужно сделать</div>
									{this.state.enabled.map((necessitate, index) => {
										return (
											<BlockCheckbox
												key={index}
												id={necessitate.NECESSITATE_ID}
												car_id={this.props.car.ID}
												name={necessitate.NAME}
												muted={necessitate.DATE_CREATE}
												author_id={necessitate.AUTHOR_ID}
												author={`${necessitate.AUTHOR_LAST_NAME} ${necessitate.AUTHOR_NAME}`}
												description={necessitate?.DESCRIPTION ? necessitate.DESCRIPTION : ""}
												handleDidMount={this.componentDidMount}
												tableDidMount={this.props.tableDidMount}
											/>
										);
									})}
								</>
							) : ( <div  /> )
						) : (
							<div className={"spinner"} />
						)}
					</div>
				</div>
			</>
		);
	}
}
