import React from 'react';

import { Root } from "../../components/ui/Root/Root";
import { Header } from "../../components/ui/Header/Header";
import { Footer } from "../../components/ui/Footer/Footer";

export class NotFound extends React.Component {

    render() {
        return (
            <Root
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
            </Root>
        );
    }
}
