import React from 'react';

import { Table as BaseTable } from "../../../base/Sector";
import { Place as CellPlace } from './Place';


export class Table extends BaseTable {

    render() {
        return (
            <>
                {this.state.render === null ? (
                    <div className="spinner" />
                ) : (
                    <div className="tabs">
                        <div className="tab-content">
                            <div className="sector-table m-3">
                                {this.state.render.map((row, ri) => {
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
