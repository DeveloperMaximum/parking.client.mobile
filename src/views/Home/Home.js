import React from 'react';

import {SectorList, CarList, Search, Tapbar} from "../../components/App";
import {Request} from "../../components/utils/Request";


export class Home extends React.Component {

    APP;

    constructor(props){
        super(props);
        this.state = {
            cars: [],
            sectors: [],
            found: null,
            searching: false
        };
        this.onSetCars = this.onSetCars.bind(this);
        this.onSetSectors = this.onSetSectors.bind(this);
    }

    componentDidMount() {
        this.loadSectors();
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return false;
        }
    }

    onSetCars(cars) {
        let found = true;
        if(cars === null){
            cars = [];
            found = null;
        }
        this.setState((prevState) => ({
            ...prevState,
            cars: cars,
            found: found
        }));
    }

    loadSectors() {
        return Request({
            URL: 'sector',
            METHOD: 'GET',
            USER: this.props.APP.storage.get('USER'),
        }).then(result => {
            if(result.success === true){
                this.onSetSectors(result.data);
            }
        });
    }

    onSetSectors(sectors) {
        this.setState((prevState) => ({
            ...prevState,
            sectors: sectors
        }));
    }

    render(){

        return (
            <>
                <div id={"HOME"} className="root-component">
                    <header>
                        <div className="d-flex pb-2" onClick={() => this.props.history.push(`/profile`)}>
                            <h1 className="d-inline-block">{this.props.APP.storage.get('USER').NAME}</h1>
                            <i className="icon-chevron_right d-inline-block" />
                        </div>

                        <Search onChange={this.onSetCars} APP={this.props.APP}/>
                    </header>

                    <main>

                        <div className="content-wrapper">
                            {this.state.found !== null ? (
                                <div className="filter">
                                    <span className="filter-btn" onClick={this.handleFilter}>Все</span>
                                    <span className="filter-btn danger" onClick={this.handleFilter}>Срочно обслужить</span>
                                    <span className="filter-btn warning" onClick={this.handleFilter}>Обратить внимание</span>
                                    <span className="filter-btn success" onClick={this.handleFilter}>Действия не требуются</span>
                                </div>,
                                <CarList items={this.state.cars} />
                            ) : (
                                <SectorList items={this.state.sectors} />
                            )}
                        </div>

                    </main>
                </div>
                <Tapbar history={this.props.history} APP={this.props.APP}/>
            </>
        );
    }
}
