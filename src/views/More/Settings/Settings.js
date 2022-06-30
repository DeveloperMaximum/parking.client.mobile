import React from 'react';

import * as Storage from "../../../components/utils/Storage";
import { Context } from "../../../components/App/Context";
import { User, DB } from "../../../components/App/Api";
import { Root, Header } from "../../../components/ui";
import { Scroller } from "../../../components/ui/Scroller";


export class Settings extends React.Component {

    static contextType = Context;


    constructor(props){
        super(props);
    }

	handleClearCache = () => {
		window.dispatchEvent(new CustomEvent(`app.dialog`, { detail: {
			header: "Очистка кеша",
			content: `Вы действительно хотите обновить кеш приложения ?`,
			buttons: [{
				text: 'Да',
				onClick: async () => {
					return DB.Get().then((result) => {
						if(result !== false){
							Object.keys(result).forEach((key) => {
								Storage.save(key, result[key]);
							});
						}
						return `Кеш приложения успешно обновлен`;
					});
				}
			}]
		}}));
    };

    handlePush = async (e) => {
	    await User.Push({
		    payload: `TEST`,
		    title: `Заголовок push-уведомления`,
		    body: 'Съешь еще этих мягких, французских булок, да выпей чаю',
	    }).then(navigator.app.exitApp);
    };

    render() {

        return (
            <Root active={true}>
	            <Header
		            history={this.props.history}
		            title={`Настройки`}
		            back={true}
	            />

                <main>
                    <Scroller>
	                    <div className={'p-3 h-100'}>

	                        <div className="card shadow rounded border-0 mb-3" onClick={this.handleClearCache}>
	                            <div className="card-body">
	                                <h4 className="card-title mb-2">Сбросить кеш</h4>
	                                <div className="card-text text-muted">Очистка приложения от кешируемых данных. После очистки необходимо заново пройти авторизацию</div>
	                                <div className="card-link mt-3">Очистить</div>
	                            </div>
	                        </div>

		                    {window.device.platform.toLowerCase() !== 'android' ? (null) : (
			                    <div className="card shadow rounded border-0 mb-3" onClick={this.handlePush}>
				                    <div className="card-body">
					                    <h4 className="card-title mb-2">Тест push-уведомления</h4>
					                    <div className="card-text text-muted">Работает только при свернутом приложении, по этой причине приложение будет незамедлительно закрыто</div>
					                    <div className="card-link mt-3">Запустить</div>
				                    </div>
			                    </div>
		                    )}

		                    <div className="card shadow rounded border-0 mb-3" onClick={() => this.props.history.push(`/more/settings/tech`)}>
			                    <div className="card-body">
				                    <h4 className="card-title mb-2">Об устройстве</h4>
				                    <div className="card-text text-muted">Подробная информация об устройстве</div>
				                    <div className="card-link mt-3">Запустить</div>
			                    </div>
		                    </div>

	                    </div>
                    </Scroller>
                </main>
            </Root>
        );
    }
}
