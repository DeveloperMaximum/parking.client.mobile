import React, { Component } from 'react';

import Header from "../../components/Header/Header";

class Home extends Component {

    render (){
        return (
            <div id={"HOME"} className="root-component">

                <header>
                    <Header text={`Главная страница`}/>
                </header>

                <main/>

            </div>
        );
    }
}

export default Home;
