import React, { Component } from 'react';

import {Tapbar} from "../../components/App/Tapbar";


export class Map extends Component {

    constructor(props){
        super(props);
    }

    render(){

        return (
            <>
                <div id="MAP" className="root-component">
                    <header>
                        <div className="d-flex">
                            <h1 className="d-inline-block">Карта локации</h1>
                        </div>
                    </header>

                    <main>
                        контент
                    </main>
                </div>
                <Tapbar history={this.props.history} APP={this.props.APP}/>
            </>
        );
    }
}
