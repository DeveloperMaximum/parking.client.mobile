import React from 'react';

import { Root, Header } from "../../components/ui";


export class Forbidden extends React.Component {


    render() {
        return (
            <Root
                viewId={"FORBIDDEN"}
            >
	            <Header
		            history={this.props.history}
		            title={`Нет доступа`}
	            />

                <main>
                    <div className="content-wrapper">
                        Вам не доступен ресурс <b>{window.location.hash}</b>
                    </div>
                </main>
            </Root>
        );
    }
}
