import React from 'react';

import { AppContext } from "../../components/App/AppContext";
import { View } from "../../components/base/View";
import { Header } from "../../components/base/Header";
import { Footer } from "../../components/base/Footer";

export class Manager extends React.Component {

    static contextType = AppContext;

    constructor(props){
        super(props);
    }

    render() {

        return (
            <View
                viewId={"MANAGER"}
            >
                <Header>
                    <div className="d-flex" onClick={() => this.props.history.push(`/settings`)}>
                        <i className="icon icon-chevron_left d-inline-block" />
                        <h1 className="d-inline-block d-inline-block">Смена локации</h1>
                    </div>
                </Header>

                <main>
                    <div className="content-wrapper">
                        <div className="settings-wrapper">

                            <div className="item" onClick={() => this.props.history.push(`/location`)}>
                                <div className="name">Управление локациями</div>
                                <div className="description">

                                </div>
                                <div className="link">Перейти</div>

                            </div>

                            <div className="item" onClick={() => this.props.history.push(`/location`)}>
                                <div className="name">Управление секторами</div>
                                <div className="description">

                                </div>
                                <div className="link">Перейти</div>

                            </div>
                        </div>
                    </div>
                </main>

                <Footer history={this.props.history} />
            </View>
        );
    }
}
