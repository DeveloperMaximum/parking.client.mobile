import React from 'react';

import { AppContext } from "../../components/App/AppContext";
import { Request } from "../../components/utils/Request";
import { View } from "../../components/base/View";
import { Header } from "../../components/base/Header";
import { Footer } from "../../components/base/Footer";

import { Search, SectorList, CarList } from "../../components/App";


export class Home extends React.Component {

    static contextType = AppContext;

    constructor(props){
        super(props);
        this.state = {
            cars: null,
            sectors: [],
        };
    }

    componentDidMount() {
        this.loadSectors();
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return false;
        }
    }

    loadSectors() {
        return Request({
            URL: 'sector',
            USER: this.context.user.profile(),
        }).then(result => {
            if(result.success === true){
                this.setState((prevState) => ({
                    ...prevState,
                    sectors: result.data
                }));
            }
        });
    }

    render(){

        return (
            <View
                viewId={"HOME"}
            >
                <Header>
                    <div className="d-flex pb-2" onClick={() => this.props.history.push(`/profile`)}>
                        <h1 className="d-inline-block">{this.context.user.profile().NAME}</h1>
                        <i className="icon-chevron_right d-inline-block" />
                    </div>

                    <Search onResult={(cars) => this.setState((prevState) => ({
                        ...prevState,
                        cars: cars
                    }))} />
                </Header>

                <main>
                    <div className="content-wrapper">
                        {this.state.cars !== null ? (
                            <CarList items={this.state.cars} />
                        ) : (
                            <SectorList items={this.state.sectors} />
                        )}
                    </div>
                </main>

                <Footer history={this.props.history} />
            </View>
        );
    }
}
