import React from 'react';

import { AppContext } from "../../components/App/AppContext";
import { Tapbar } from "../../components/App";

export class Location extends React.Component {

    static contextType = AppContext;

    constructor(props){
        super(props);
    }

    render() {

        return (
            <>
                <div id="LOCATION" className="root-component">
                    <header>
                        <div className="d-flex" onClick={() => this.props.history.push(`/settings`)}>
                            <i className="icon icon-chevron_left d-inline-block" />
                            <h1 className="d-inline-block d-inline-block">Сменить локацию</h1>
                        </div>
                    </header>

                    <main>

                        <div className="map-wrapper">

                        </div>

                        <div className="location-wrapper">
                            <div className="title">Выберите локацию</div>
                            <div className="items">
                                <div className="item">
                                    <div className="name">
                                        Транспортная территория, 6
                                    </div>
                                    <div className="checkbox active">

                                    </div>
                                </div>
                                <div className="item">
                                    <div className="name">
                                        Транспортная территория, 6
                                    </div>
                                    <div className="checkbox">

                                    </div>
                                </div>
                                <div className="item">
                                    <div className="name">
                                        Транспортная территория, 6
                                    </div>
                                    <div className="checkbox">

                                    </div>
                                </div>
                                <div className="item">
                                    <div className="name">
                                        Транспортная территория, 6
                                    </div>
                                    <div className="checkbox">

                                    </div>
                                </div>
                                <div className="item">
                                    <div className="name">
                                        Транспортная территория, 6
                                    </div>
                                    <div className="checkbox">

                                    </div>
                                </div>
                                <div className="item">
                                    <div className="name">
                                        Транспортная территория, 6
                                    </div>
                                    <div className="checkbox">

                                    </div>
                                </div>
                                <div className="item">
                                    <div className="name">
                                        Транспортная территория, 6
                                    </div>
                                    <div className="checkbox">

                                    </div>
                                </div>
                            </div>
                        </div>

                    </main>

                </div>
                <Tapbar history={this.props.history} />
            </>
        );
    }
}
