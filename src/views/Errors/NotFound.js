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
	            <Header
		            history={this.props.history}
		            title={`Ресурс не найден`}
	            />

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
