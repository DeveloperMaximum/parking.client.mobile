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

	onScroll = async (e) => {
		if(this.state.nav['PAGE'] < this.state.nav['PAGE_COUNT'] && this.state.load === false){
			if(e.target.scrollTop > (e.target.scrollHeight / 1.75)){
				return await this.handleMore();
			}
		}
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
			    <>
				    {this.state.cars !== false ? (
					    <main onScroll={this.onScroll}>
						    <div className={"content-wrapper"}>
							    <>
								    <Car.List
									    handleMore={this.handleMore}
									    items={this.state.cars}
									    nav={this.state.nav}
								    />
							    </>
						    </div>
					    </main>
				    ) : (
					    <main>
						    <div className={"content-wrapper"}>
							    <>
								    {this.props.children}
							    </>
						    </div>
					    </main>
				    )}
			    </>
		    </>
	    );
    }
}
