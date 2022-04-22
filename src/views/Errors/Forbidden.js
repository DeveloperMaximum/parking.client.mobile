import React from 'react';

import { Root, Header } from "../../components/ui";


export class Forbidden extends React.Component {


    render() {
        return (
            <Root
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
            </Root>
        );
    }
}
