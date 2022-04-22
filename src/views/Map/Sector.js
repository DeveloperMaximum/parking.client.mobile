import React from 'react';

import { Root, Header } from "../../components/ui";
import { Storage } from "../../components/App";
import { Context } from "../../components/App/Context";
import { Item } from "../../components/App/Sector";


export class Sector extends React.Component {

    static contextType = Context;


    render() {

        return (
            <Root viewId={"SECTOR"}>
                <Header>
                    <div className="d-flex justify-content-between">
	                    <div className="d-flex" onClick={() => this.props.history.push(`/`)}>
	                        <i className="icon icon-chevron_left d-inline-block" />
	                        <h1 className="d-inline-block d-inline-block">{Storage.get('SECTOR')[this.props.match.params.id].NAME}</h1>
	                    </div>
	                    <div className="d-flex search-inner" onClick={ async () => {
		                    await this.context.dialog({
			                    buttons: false,
			                    header: "Поиск",
			                    child: () => <Item.Search />
		                    });
	                    }}>
	                        <i className="icon icon-search d-inline-block" />
	                    </div>
                    </div>
                </Header>

                <main>
                    <Item.Table id={this.props.match.params.id} history={this.props.history} />
                </main>
            </Root>
        );
    }
}
