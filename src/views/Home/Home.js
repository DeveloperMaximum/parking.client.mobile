import React from 'react';

import * as Storage from "../../components/App/Storage";
import { Sector as ApiSector } from "../../components/App/Api";
import { Root } from "../../components/ui/Root/Root";
import { Footer } from "../../components/ui/Footer/Footer";
import { Sector, Car } from "../../components/App";


export class Home extends React.Component {


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
			            <div className="d-flex pb-2" onClick={() => this.props.history.push(`/profile`)}>
				            <h1 className="d-inline-block">{Storage.get('USER').NAME}</h1>
				            <i className="icon-chevron_right d-inline-block" />
			            </div>
		            )}
	            >

		            <Sector.List
			            items={this.state.sectors}
		            />

	            </Car.Search>

                <Footer
	                history={this.props.history}
                />
            </Root>
        );
    }
}
