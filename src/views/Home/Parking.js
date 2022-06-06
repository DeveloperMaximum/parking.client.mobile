import React from 'react';

import { Root } from "../../components/ui/Root/Root";
import { Context } from "../../components/App/Context";
import { Storage, Sector, Car, Map} from "../../components/App";
import { Sector as ApiSector } from "../../components/App/Api";


export class Parking extends React.Component {

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
        return ApiSector.List({DETAILED: 'Y'}).then(result => {
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
		            history={this.props.history}
		            header={{
		            	right: (
				            <div className="d-flex search-inner" onClick={() => {
					            let title = `Карта локации`;
					            let maps = Storage.get('MAP');
					            let map_id = Storage.get('UF_LOCATION');
					            for (let map in maps){
						            if(maps[map].ID === map_id){
							            title = maps[map].NAME;
							            break;
						            }
					            }
					            this.context.sider({
						            title: title,
						            child: () => <Map />
					            });
				            }}>
					            <i className="icon icon-map d-inline-block" />
				            </div>
			            )
		            }}
	            >

		            <Sector.List
			            items={this.state.sectors}
		            />

	            </Car.Search>
            </Root>
        );
    }
}
