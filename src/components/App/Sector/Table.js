import React from 'react';

import { Table as BaseTable } from "../../base/Sector";
import { Place as CellPlace } from './Place';


export class Table extends BaseTable {

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
                                                    <CellPlace data={cell} onClick={this.handleCell} key={ci} history={this.props.history} />
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
