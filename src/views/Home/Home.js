import React from 'react';

import { Context } from "../../components/base/Context";
import * as Storage from "../../components/base/Storage";
import { Sector } from "../../components/App/Api";

import { Root } from "../../components/ui/Root/Root";
import { Footer } from "../../components/ui/Footer/Footer";

import { SectorList, CarSearch } from "../../components/App";


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
        return Sector.get({DETAILED: 'Y'}).then(result => {
            this.setState((prevState) => ({
                ...prevState,
                sectors: result
            }));
        });
    }

    render(){
        return (
            <Root viewId={"HOME"}>
	            <CarSearch
		            template="page"
		            history={this.props.history}
		            beforeForm={(
			            <div className="d-flex pb-2" onClick={() => this.props.history.push(`/profile`)}>
				            <h1 className="d-inline-block">{Storage.get('USER').NAME}</h1>
				            <i className="icon-chevron_right d-inline-block" />
			            </div>
		            )}
	            >

		            <SectorList
			            items={this.state.sectors}
			            history={this.props.history}
		            />

	            </CarSearch>

                <Footer
	                history={this.props.history}
                />
            </Root>
        );
    }
}
