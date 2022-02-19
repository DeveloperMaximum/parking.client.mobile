import React from 'react';

import { View } from "../../components/base/View";
import {Header} from "../../components/base/Header";
import {Footer} from "../../components/base/Footer";

export class Forbidden extends React.Component {

    render() {
        return (
            <View
                viewId={"FORBIDDEN"}
            >
                <Header>
                    <div className="d-flex" onClick={() => this.props.history.push(`/`)}>
                        <i className="icon icon-chevron_left d-inline-block" />
                        <h1 className="d-inline-block d-inline-block">Нет доступа</h1>
                    </div>
                </Header>

                <main>
                    <div className="content-wrapper">
                        Вам не доступен ресурс <b>{window.location.hash}</b>
                    </div>
                </main>

                <Footer history={this.props.history} />
            </View>
        );
    }
}
