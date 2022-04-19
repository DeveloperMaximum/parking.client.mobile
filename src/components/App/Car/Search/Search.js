import React from 'react';

import { Header } from "../../../ui/Header";
import { Search as BaseSearch, Form as BaseForm } from "../../../base/Car/Search";
import { Car } from "../../../App";


export class Search extends BaseSearch {


    render() {

	    return (
		    <>
			    <Header>
				    {this.props.beforeForm}
				    <BaseForm onChange={this.handleSearch} />
			    </Header>
			    <main>
				    <div className={"content-wrapper"}>
					    <>
						    {this.state.cars !== false ? (
							    <Car.List
								    onHandleMore={this.handleMore}
								    items={this.state.cars}
							    />
						    ) : (
							    <>
								    {this.props.children}
							    </>
						    )}
					    </>
				    </div>
			    </main>
		    </>
	    );
    }
}
