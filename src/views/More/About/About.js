import React from 'react';

import { Root, Header } from "../../../components/ui";


export class About extends React.Component {


    render(){

        return (
            <Root
                viewId={"ABOUT"}
            >
                <Header
	                history={this.props.history}
	                title={`О приложении`}
	                back={true}
                />

                <main>
                    <div className="about-wrapper">
                        <div className="logo w-100 text-center">
                            <img src={"img/carmart-logo-content.png"} />
                        </div>
                        <div className="slogan w-100 text-center">
                            <div>Проверка и подготовка</div>
                            <div>с гарантией!</div>
                        </div>
                        <div className="version w-100 text-center">
                            Версия 0.0.1 (alfa)
                        </div>
                        <a href="tel:88009009898" className="w-100 text-center bg-info feedback">
                            <div>Связаться с техподдержкой</div>
                            <span>
                                <i className="icon-settings_phone" />
                                <span>8 800 900 98 98</span>
                            </span>
                        </a>
                    </div>
                </main>
            </Root>
        );
    }
}
