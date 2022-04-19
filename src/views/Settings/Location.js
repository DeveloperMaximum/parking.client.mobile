import React from 'react';

import { Root, Header, Footer } from "../../components/ui";
import * as Storage from "../../components/App/Storage";
import { App } from "../../components/App/Context";


export class Location extends React.Component {

    static contextType = App;


    handleClick = async (e, id = false) => {
        e.persist();
        await this.context.confirm({
            header: "Смена локации",
            content: `Вы хотите изменить выбранную локацию на ${e.target.innerText} ?`,
            success: "Да",
            cancel: "Нет",
            callback: async () => {
                await this.context.location(id);
                return "Локация сменена";
            }
        });
    };

    render() {

        const locations = Storage.get('MAP');

        return (
            <Root viewId={"LOCATION"}>
                <Header>
                    <div className="d-flex" onClick={() => this.props.history.push(`/settings`)}>
                        <i className="icon icon-chevron_left d-inline-block" />
                        <h1 className="d-inline-block d-inline-block">Выберите локацию</h1>
                    </div>
                </Header>

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

                <Footer history={this.props.history} />
            </Root>
        );
    }
}
