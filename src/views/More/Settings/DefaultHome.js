import React from 'react';

import { Root, Header } from "../../../components/ui";
import { Storage } from "../../../components/App";
import { Context } from "../../../components/App/Context";


export class DefaultHome extends React.Component {

	static contextType = Context;


	handleClick = async (e, screenName = false) => {
		e.persist();
		await this.context.dialog({
			header: "Смена локации",
			content: `Вы действительно хотите изменить главный экран?`,
			success: "Да",
			cancel: "Нет",
			buttons: {
				y: {
					text: 'Да',
					callback: async () => {
						return await this.context.home(screenName);
					}
				},
			}
		});
	};

	render() {

		let activeScreen = Storage.get('DEFAULT_HOME');
		if(activeScreen === false){
			activeScreen = 'SECTORS';
			this.context.home(activeScreen).then(r => r);
		}

		return (
			<Root viewId={"HOME"}>
				<Header
					history={this.props.history}
					title={`Выберите главный экран`}
					back={() => this.props.history.push(`/more/settings`)}
				/>

				<main>
					<div className="content-wrapper">
						<div className={`card-checkbox`} onClick={(e) => this.handleClick(e, 'SECTORS')}>
							<div className="name">
								Список секторов
								<div className="description text-muted">
									Список секторов с информацией о потрбностях
								</div>
							</div>
							<div className={activeScreen === 'SECTORS' ? `checkbox active` : `checkbox`} />
						</div>
						<div className={`card-checkbox`} onClick={(e) => this.handleClick(e, 'FILTER')}>
							<div className="name">
								Поиск автомобилей
								<div className="description text-muted">
									Фильтр автомобилей по заданным параметрам
								</div>
							</div>
							<div className={activeScreen === 'FILTER' ? `checkbox active` : `checkbox`} />
						</div>
					</div>
				</main>
			</Root>
		);
	}
}
