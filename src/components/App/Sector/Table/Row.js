import React from 'react';
import { Cell } from './';


export class Row extends React.Component {


    constructor(props){
        super(props);
    }

    render() {

        return (
            <>
                <div className="sector-row">
                    <Cell />
                </div>
            </>
        );
    }
}
