import React from 'react';

import { View } from "../../components/base/View";
import { Header } from "../../components/base/Header";
import { Footer } from "../../components/base/Footer";

export class NotFound extends React.Component {

    render() {
        return (
            <View
                viewId={"NOT-FOUND"}
            >
                <Header>
                    <div className="d-flex" onClick={() => this.props.history.push(`/`)}>
                        <i className="icon icon-chevron_left d-inline-block" />
                        <h1 className="d-inline-block d-inline-block">Ресурс не найден</h1>
                    </div>
                </Header>

                <main>
                    <div className="content-wrapper">
                        Ресурс <b>{window.location.hash}</b> не найден в системе
                    </div>
                </main>

                <Footer history={this.props.history} />
            </View>
        );
    }
}
