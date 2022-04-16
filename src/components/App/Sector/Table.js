import React from 'react';

import { Table as BaseTable } from "../../base/Sector";
import { Place as CellPlace } from './Place';


export class Table extends BaseTable {

	statuses;

	constructor(props){
		super(props);
	}

    render() {

        return (
            <>
                {this.state.render === null ? (
                    <div className="spinner" />
                ) : (
	                <>
	                    <div className="tabs">
	                        <div className="tab-content">
	                            <div className="sector-table">
	                                {this.state.render.map((row, ri) => (
	                                    <div className="sector-row" key={ri}>
	                                        {row.map((cell, ci) => (
	                                            <CellPlace tableDidMount={this.componentDidMount} data={cell} key={ci} history={this.props.history} />
	                                        ))}
	                                    </div>
	                                ))}
	                            </div>
	                        </div>
	                    </div>
                    </>
                )}
            </>
        );
    }
}
