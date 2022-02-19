import React from 'react';
import {Cell, Row} from './';


export class Table extends React.Component {


    constructor(props){
        super(props);
    }

    render() {

        return (
            <>
                <div className="sector-table m-3">
                    {this.props.data.map((row, ri) => {
                        return (
                            <div className="sector-row" key={ri}>
                                {row.map((cell, ci) => {
                                    return (
                                        <div className={(cell.gid > 1) ? "sector-cell bg-dark" : "sector-cell"} key={ci}>

                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </>
        );
    }
}
