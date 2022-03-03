import React from 'react';

import { Context } from "../../components/base/Context";
import * as Storage from "../../components/base/Storage";
import { Sector } from "../../components/App/Api";

import { Root } from "../../components/ui/Root/Root";
import { Header } from "../../components/ui/Header/Header";
import { Footer } from "../../components/ui/Footer/Footer";

import { SectorList, CarList, CarSearch } from "../../components/App";


export class Home extends React.Component {

    static contextType = Context;

    constructor(props){
        super(props);
        this.state = {
            cars: null,
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
                <Header>
                    <div className="d-flex pb-2" onClick={() => this.props.history.push(`/profile`)}>
                        <h1 className="d-inline-block">{Storage.get('USER').NAME}</h1>
                        <i className="icon-chevron_right d-inline-block" />
                    </div>

                    <CarSearch onResult={(cars) => this.setState((prevState) => ({
                        ...prevState,
                        cars: cars
                    }))} />
                </Header>

                <main>
                    <div className="content-wrapper">
                        {this.state.cars !== null ? (
                            this.state.cars === true ? (
                                <div className="spinner" />
                            ) : (
                                this.state.cars.length === 0 ? (
                                    <div className={"alert alert-info bg-info"}>
                                        Ничего не найдено
                                    </div>
                                ) : (
                                    <CarList items={this.state.cars} />
                                )
                            )
                        ) : (
                            this.state.sectors !== null ? (
                                <SectorList items={this.state.sectors} />
                            ) : (
                                <div className="spinner" />
                            )
                        )}
                    </div>
                </main>

                <Footer history={this.props.history} />
            </Root>
        );
    }
}
