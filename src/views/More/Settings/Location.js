import React from 'react';

import * as Storage from "../../../components/utils/Storage";
import { Context } from "../../../components/App/Context";
import { Root, Header } from "../../../components/ui";
import {Car} from "../../../components/App/Api";


export class Location extends React.Component {

    static contextType = Context;

    locations = false;


    constructor(props){
	    super(props);
	    let locations = Storage.get('MAP');

	    this.locations = [];
	    Object.keys(locations).forEach((key) => {
		    this.locations.push(locations[key])
	    });
    };

    handleClick = async (e, id = false) => {
        e.persist();
	    window.dispatchEvent(new CustomEvent(`app.dialog`, { detail: {
		    header: "Смена локации",
		    content: `Вы действительно хотите изменить выбранную локацию на ${e.target.innerText} ?`,
		    buttons: [{
			    text: 'Да',
			    onClick: async () => {
				    return await this.context.location(id);
			    }
		    }]
	    }}));
    };

    render() {

        return (
            <Root active={true}>
	            <Header title={`Выберите локацию`} back={() => this.props.history.push(`/`)} />

                <main>
                    <div className="overflow-y-scroll h-100 p-3">
                        {this.locations === false ? (
                            <div className={"alert alert-warning"}>
                                Локации не найдены
                            </div>
                        ) : (
	                        this.locations.map((item, index) => (
                                <div className="card-checkbox rounded shadow mb-3" key={index} onClick={(e) => this.handleClick(e, item.ID)}>
                                    <div className="p-3 font-weight-bold">
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
