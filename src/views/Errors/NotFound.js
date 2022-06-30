import React from 'react';

import { Root, Header } from "../../components/ui";


export class NotFound extends React.Component {


    render() {

        return (
            <Root viewId={"NOT-FOUND"} active={true}>
	            <Header title={`Ресурс не найден`} />

                <main>
                    <div className="content-wrapper">
                        Ресурс <b>{window.location.hash}</b> не найден в системе
                    </div>
                </main>

            </Root>
        );
    }
}
