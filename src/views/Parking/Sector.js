import React from 'react';

import * as Storage from "../../components/utils/Storage";
import { Context } from "../../components/App/Context";
import { Root, Header } from "../../components/ui";
import { Item } from "../../components/App/Sector";
import {Car} from "../../components/App/Api";


export class Sector extends React.Component {

    static contextType = Context;

	title = `Сектор`;


	constructor(props){
		super(props);
		this.state = {

		};

		this.handleRightHeader = this.handleRightHeader.bind(this);
		this.title = Storage.get('SECTOR')[this.props.match.params.id].NAME;
	}

	handleRightHeader(e) {
		window.dispatchEvent(new CustomEvent(`app.dialog`, { detail: {
			header: "Поиск",
			buttons: null,
			children: <Item.Search />
		}}));
	}

    render() {

        return (
            <Root viewId={"SECTOR"} active={true}>
	            <Header
		            history={this.props.history}
		            title={this.title}
		            back={true}
		            right={
			            <div onClick={this.handleRightHeader}>
				            <i className="icon icon-search d-inline-block" />
			            </div>
		            }
	            />

                <main>
                    <Item.Table
	                    id={this.props.match.params.id}
	                    history={this.props.history}
	                    tableDidMount={this.componentDidMount}
                    />
                </main>
            </Root>
        );
    }
}
