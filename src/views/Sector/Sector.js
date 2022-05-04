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
	            <Header
		            history={this.props.history}
		            title={`${Storage.get('SECTOR')[this.props.match.params.id].NAME}`}
		            back={true}
		            right={
			            <div className="d-flex search-inner" onClick={ async () => {
				            await this.context.dialog({
					            buttons: false,
					            header: "Поиск",
					            child: () => <Item.Search />
				            });
			            }}>
				            <i className="icon icon-search d-inline-block" />
			            </div>
		            }
	            />

                <main>
                    <Item.Table id={this.props.match.params.id} history={this.props.history} />
                </main>
            </Root>
        );
    }
}
