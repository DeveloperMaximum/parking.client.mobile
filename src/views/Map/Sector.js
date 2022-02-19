import React from 'react';

import { AppContext } from "../../components/App/AppContext";
import { Request } from "../../components/utils/Request";
import { View } from "../../components/base/View";
import { Header } from "../../components/base/Header";
import { Footer } from "../../components/base/Footer";

import { SectorItem } from "../../components/App";

export class Sector extends React.Component {

    static contextType = AppContext;

    constructor(props){
        super(props);
        this.state = {
            sector: null,
        };
        //this.onSetSector = this.onSetSector.bind(this);
    }

    componentDidMount() {
        /*return Request({
            METHOD: 'GET',
            URL: 'sector/' + this.props.match.params.id,
            USER: this.context.user.profile(),
        }).then((result) => {
            if(result.success === true){
                this.onSetSector(result.data)
            }
        })*/
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return false;
        }
    }

    load = () => {
        return Request({
            METHOD: 'GET',
            URL: 'sector/' + this.props.match.params.id,
            USER: this.context.user.profile(),
        }).then((result) => {
            if(result.success === true){
                this.onSetSector(result.data)
            }
        })
    };

    onSetSector(sector) {
        this.setState((prevState) => ({
            ...prevState,
            sector: sector
        }));
    }

    render() {

        return (
            <View
                viewId={"SECTOR"}
            >
                <Header>
                    <div className="d-flex" onClick={() => this.props.history.push(`/map`)}>
                        <i className="icon icon-chevron_left d-inline-block" />
                        <h1 className="d-inline-block d-inline-block">Карта сектора</h1>
                    </div>
                </Header>

                <main>
                    <SectorItem />
                </main>

                <Footer history={this.props.history} />
            </View>
        );
    }
}
