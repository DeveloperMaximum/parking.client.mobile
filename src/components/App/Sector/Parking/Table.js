import React from 'react';

import { Sector, Place } from "../../Api";
import { Place as CellPlace } from './../Parking/Place';


export class Table extends React.Component {

    constructor(props){
        super(props);
        this.state = {
	        temp: null,
            id: props.id,
            sector: null,
            places: null,
            car_id: null,
        };
    }

    componentDidMount = async () => {
    	// todo: надо выпилить запрос к серверу о секторе
        await Sector.get({'ID': this.props.id, "DETAILED": "Y"}).then((result) => {
            let sector = result[0];
            this.setState((prevState) => ({
                ...prevState,
                sector: sector
            }));
            return Place.get({
                ALL: 'Y',
                DETAILED: 'Y',
                SECTOR_ID: this.props.id,
            }).then((result) => {
                this.setState((prevState) => ({
                    ...prevState,
                    places: result
                }));
            });
        });
        this.renderSchema();
    };

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return false;
		}
	}

    renderSchema = () => {
        this.schema = [];

        let i = 0;
        let row = [];
        let data = this.state.places;
	    data.forEach(obj => {
		    if(i === 50){
			    this.schema.push(row);
			    row = [];
			    i = 0;
		    }
		    row.push(obj);
		    i = i + 1;
	    });
	    this.schema.push(row);

        this.setState((prevState) => ({
            ...prevState,
            temp: this.schema
        }));
    };

    render() {

        return (

            <>
                {this.state.temp === null ? (
                    <div className="spinner" />
                ) : (
                    <div className="tabs">
                        <div className="tab-content">
                            <div className="sector-table m-3">
                                {this.state.temp.map((row, ri) => {
                                    return (
                                        <div className="sector-row" key={ri}>
                                            {row.map((cell, ci) => {
                                                return (
                                                    <CellPlace data={cell} key={ci} />
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }
}
