import React, { Component } from 'react';

import Header from "../../components/Header/Header";

class NotFound extends Component {

    render (){
        return (
            <div id={"NOT-FOUND"}>

                <header>
                    <Header text={`404. Не найдено ${window.location.href}`}/>
                </header>

                <main>
                    {window.location.href}
                </main>

            </div>
        );
    }
}

export default NotFound;
