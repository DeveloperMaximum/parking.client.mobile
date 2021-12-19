import React, { Component } from 'react';
import Header from "../../components/Header/Header";

class Forbidden extends Component {

    render (){
        return (
            <div id={"FORBIDDEN"}>

                <header>
                    <Header text={"403. Нет доступа"}/>
                </header>

                <main>

                </main>

            </div>
        );
    }
}

export default Forbidden;
