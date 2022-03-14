import React from 'react';

import { Context } from "../../components/base/Context";
import { Root } from "../../components/ui/Root/Root";
import { Header } from "../../components/ui/Header/Header";
import { Footer } from "../../components/ui/Footer/Footer";

import { SectorItem } from "../../components/App";

export class Sector extends React.Component {

    static contextType = Context;

    render() {

        return (
            <Root viewId={"SECTOR"}>
                <Header>
                    <div className="d-flex" onClick={() => this.props.history.push(`/`)}>
                        <i className="icon icon-chevron_left d-inline-block" />
                        <h1 className="d-inline-block d-inline-block">Карта сектора</h1>
                    </div>
                </Header>

                <main>
                    <SectorItem id={this.props.match.params.id} history={this.props.history} />
                </main>

                <Footer history={this.props.history} />
            </Root>
        );
    }
}
