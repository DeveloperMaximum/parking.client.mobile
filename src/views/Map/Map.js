import React from "react";

import { Root, Header } from "../../components/ui";
import {  Map as Svg } from "../../components/App";


export class Map extends React.Component {


    render() {
	    return (
	        <Root
	            h1={"Карта локации"}
	            viewId={"MAP"}
	        >
	            <Header>
	                <div className="d-flex">
	                    <h1 className="d-inline-block">Карта локации</h1>
	                </div>
	            </Header>

	            <main>
	                <Svg />
	            </main>
	        </Root>
	    );
    }
};
