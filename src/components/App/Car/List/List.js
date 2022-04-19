import React from 'react';
import { Link } from "react-router-dom";

import { Item } from "./Item";


export class List extends React.Component {


    render() {
		if(this.props.items === null){
			return (
				<div className="spinner" />
			);
		}

	    return (
	    	<div className="cars">
			    {this.props.items?.length && this.props.items.length > 0 ? (
			    	<>
					    {this.props.items.map((item, index) => (
						    <div key={index}>
							    {this.props?.onClick ? (
								    <div onClick={() => this.props.onClick(item)}>
									    <Item {...item} />
								    </div>
							    ) : (
								    <Link to={`/home/car/${item.ID}`} key={index}>
									    <Item {...item} />
								    </Link>
							    )}
						    </div>
					    ))}
					    <button className={"btn btn-primary w-100"} onClick={this.props.handleMore}>Еще</button>
				    </>
			    ) : (
				    <div className={"alert alert-info bg-info"}>Ничего не найдено</div>
			    )}
		    </div>
	    );
    }
}