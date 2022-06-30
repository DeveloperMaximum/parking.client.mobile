import React from 'react';

import { Root, Header, Footer } from "../../components/ui";


export class Forbidden extends React.Component {


    render() {
        return (
            <Root viewId={"FORBIDDEN"} active={true}>
	            <Header title={`Нет доступа`} />

                <main>
                    <div className="content-wrapper">
                        Вам не доступен ресурс <b>{window.location.hash}</b>
                    </div>
                </main>

            </Root>
        );
    }
}
