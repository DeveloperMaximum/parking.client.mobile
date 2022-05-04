import React from 'react';

import { Header } from "../../../ui/Header";
import { Search as BaseSearch, Form as BaseForm } from "../../../base/Car/Search";
import {Car, Context, Map, Storage} from "../../../App";


export class Search extends BaseSearch {

	static contextType = Context;

	handleRight = async () => {
		let title = `Карта локации`;
		let maps = Storage.get('MAP');
		let map_id = Storage.get('UF_LOCATION');
		for (let map in maps){
			if(maps[map].ID === map_id){
				title = maps[map].NAME;
				break;
			}
		}
		await this.context.sider({
			title: title,
			child: () => <Map />
		});
	};


    render() {

	    return (
		    <>
			    <Header
				    history={this.props.history}
				    right={this.props?.header?.right}
				    profile={true}
			    >
				    <div className="pb-3" />
				    <BaseForm onChange={this.handleSearch} />
			    </Header>
			    <main>
				    <div className={"content-wrapper"}>
					    <>
						    {this.state.cars !== false ? (
							    <Car.List
								    onHandleMore={this.handleMore}
								    items={this.state.cars}
							    />
						    ) : (
							    <>
								    {this.props.children}
							    </>
						    )}
					    </>
				    </div>
			    </main>
		    </>
	    );
    }
}
