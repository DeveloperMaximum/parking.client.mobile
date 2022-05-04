import React from 'react';

import { Root, Header } from "../../../components/ui";
import { Storage } from "../../../components/App";
import { Context } from "../../../components/App/Context";


export class Location extends React.Component {

    static contextType = Context;


    handleClick = async (e, id = false) => {
        e.persist();
        await this.context.dialog({
            header: "Смена локации",
            content: `Вы действительно хотите изменить выбранную локацию на ${e.target.innerText} ?`,
            success: "Да",
            cancel: "Нет",
	        buttons: {
		        y: {
			        text: 'Да',
			        callback: async () => {
				        return await this.context.location(id);
			        }
		        },
	        }
        });
    };

    render() {

        const locations = Storage.get('MAP');

        return (
            <Root viewId={"LOCATION"}>
	            <Header
		            history={this.props.history}
		            title={`Выберите локацию`}
		            back={() => this.props.history.push(`/more/settings`)}
	            />

                <main>
                    <div className="content-wrapper">
                        {locations === false ? (
                            <div className={"alert alert-warning"}>
                                Локации не найдены
                            </div>
                        ) : (
                            locations.map((item, index) => (
                                <div className="card-checkbox" key={index} onClick={(e) => this.handleClick(e, item.ID)}>
                                    <div className="name">
                                        {item.NAME}
                                    </div>
                                    <div className={(this.context.data.user.UF_LOCATION === item.ID) ? 'checkbox active' : 'checkbox'}>

                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </main>
            </Root>
        );
    }
}
