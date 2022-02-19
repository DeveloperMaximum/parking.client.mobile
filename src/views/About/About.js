import React from 'react';

import { View } from "../../components/base/View";
import { Header } from "../../components/base/Header";
import { Footer } from "../../components/base/Footer";


export class About extends React.Component {

    render(){

        return (
            <View
                viewId={"ABOUT"}
            >
                <Header>
                    <div className="d-flex" onClick={() => this.props.history.push(`/`)}>
                        <i className="icon icon-chevron_left d-inline-block" />
                        <h1 className="d-inline-block d-inline-block">О приложении</h1>
                    </div>
                </Header>

                <main>
                    <div className="about-wrapper">
                        <div className="logo w-100 text-center">
                            <img src={"img/carmart-logo-content.png"} />
                        </div>
                        <div className="slogan w-100 text-center">
                            <div>Проверека и подготовка</div>
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

                <Footer history={this.props.history} />
            </View>
        );
    }
}
