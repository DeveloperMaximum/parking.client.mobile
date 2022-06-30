import React from 'react';

import * as Storage from "../../components/utils/Storage";
import { Context } from "../../components/App/Context";
import { Root, Tabs } from "../../components/ui/";
import { Map, Sector, Service, Car } from "../../components/App";


export class Parking extends React.Component {

	static contextType = Context;


    constructor(props){
        super(props);
        this.state = {

        };

	    this.handleRightHeader = this.handleRightHeader.bind(this);
    }

    componentWillUnmount() {
	    this.setState = (state, callback) => {
		    return false;
	    };
    }

    handleRightHeader(e) {
	    this.context.sider({
		    child: () => <Map />,
		    title: Storage.get('MAP')[Storage.get('UF_LOCATION')].NAME
	    })
    }

    render(){

        return (
            <Root viewId={"HOME"} active={true}>
	            <Car.Search
		            header={{
			            profile: true,
			            history: this.props.history,
		            	right: (
				            <i className="icon icon-map d-inline-block" onClick={this.handleRightHeader} />
			            )
		            }}
	            >
	                    <Tabs
		                    tabs={[
			                    {
			                    	name: 'Сектора',
				                    children: (
					                    <Sector.List />
				                    )
			                    },
			                    {
			                    	name: 'Сервисы',
				                    children: (
					                    <Service.List />
				                    )
			                    },
			                    {
			                    	name: 'Зоны',
				                    dataId: 'zones',
				                    children: (
					                    <div className="container-fluid mt-3">
						                    <div className={"alert alert-info"}>В разработке</div>
					                    </div>
				                    )
			                    }
		                    ]}
	                    />
	            </Car.Search>
            </Root>
        );
    }
}
