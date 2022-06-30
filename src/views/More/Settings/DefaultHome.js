import React from 'react';

import { Root, Header, Checkbox } from "../../../components/ui";
import * as Storage from "../../../components/utils/Storage";
import { Context } from "../../../components/App/Context";


export class DefaultHome extends React.Component {

	static contextType = Context;

	home = '';


	constructor(props) {
		super(props);
		this.state = {
			active: 'SECTORS'
		};

		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		this.setState((prevState) => ({
			...prevState,
			active: Storage.get('DEFAULT_HOME')
		}));
	}

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return false;
		}
	}

	handleClick = async (home, e) => {
		window.dispatchEvent(new CustomEvent(`app.dialog`, { detail: {
			header: "Смена главного экрана",
			content: `Вы действительно хотите изменить главный экран?`,
			buttons: [{
				text: 'Да',
				onClick: async () => {
					await this.setState((prevState) => ({
						...prevState,
						active: home
					}), () => {
						window.dispatchEvent(new CustomEvent(`app.home`, { detail: {
							home: home
						}}));
					});
					return true;
				}
			}]
		}}));
	};

	render() {

		return (
			<Root active={true}>
				<Header title={`Выберите главный экран`} back={() => this.props.history.push(`/`)} />

				<main>
					<div className="overflow-y-scroll h-100 p-3">
						<Checkbox
							id={'SECTORS'}
							onClick={this.handleClick}
							active={(this.state.active === 'SECTORS')}
							header={'Список секторов'}
							description={'Список секторов с информацией о потрбностях'}
						/>

						<Checkbox
							id={'FILTER'}
							onClick={this.handleClick}
							active={(this.state.active === 'FILTER')}
							header={'Поиск автомобилей'}
							description={'Фильтр автомобилей по заданным параметрам'}
						/>
					</div>
				</main>

			</Root>
		);
	}
}
