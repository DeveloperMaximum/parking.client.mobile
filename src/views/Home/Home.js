import React from 'react';

import { Root } from "../../components/ui/Root/Root";
import { Context } from "../../components/App/Context";
import { Storage, Sector, Car, Map} from "../../components/App";
import { Sector as ApiSector } from "../../components/App/Api";


export class Home extends React.Component {

	static contextType = Context;


    constructor(props){
        super(props);
        this.state = {
            sectors: null
        };
    }

    componentDidMount() {
        this.loadSectors().then(r => r);
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return false;
        }
    }

    loadSectors() {
        return ApiSector.get({DETAILED: 'Y'}).then(result => {
            this.setState((prevState) => ({
                ...prevState,
                sectors: result
            }));
        });
    }

    render(){
        return (
            <Root viewId={"HOME"}>
	            <Car.Search
		            beforeForm={(
			            <div className="d-flex justify-content-between pb-2">
				            <div className="d-flex" onClick={() => this.props.history.push(`/profile`)}>
					            <h1 className="d-inline-block">{Storage.get('USER').NAME}</h1>
					            <i className="icon-chevron_right d-inline-block" />
				            </div>
				            <div className="d-flex search-inner" onClick={ async () => {
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
				            }}>
					            <i className="icon icon-map d-inline-block" />
				            </div>
			            </div>
		            )}
	            >

		            <Sector.List
			            items={this.state.sectors}
		            />

	            </Car.Search>
            </Root>
        );
    }
}
