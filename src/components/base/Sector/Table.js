import React from 'react';

import { Context } from "../../base/Context";
import * as Storage from "../../base/Storage";
import { Place } from "../../App/Api";


export class Table extends React.Component {

    static contextType = Context;

    constructor(props){
        super(props);
        this.state = {
	        temp: null,
            id: props.id,
            sector: null,
            places: null,
            car_id: null,
        };
    }

    componentDidMount = async () => {
        await Place.get({
	        ALL: 'Y',
	        GROUP: 'INNER_ID',
	        DETAILED: 'Y',
	        SECTOR_ID: this.props.id,
        }).then((result) => {
	        this.setState((prevState) => ({
		        ...prevState,
		        places: result
	        }));
        });
        this.renderSchema();
    };

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return false;
		}
	}

    renderSchema = () => {
	    let places = {};
	    let schema = {};
	    let data_tiles = [];
	    let data_places = {};

	    let sectors = Storage.get('SECTOR');
	    sectors.forEach(sector => {
		    schema = sector.SCHEMA;
		    if(sector.ID === this.props.id){
			    data_tiles = schema.layers[0].data;
			    data_places = schema.layers[1].objects;
		    }
	    });

	    data_places.forEach(obj => {
	    	let x = (obj.x === 0) ? 0 : (obj.x / obj.width);
	    	let y = (obj.y === 0) ? 0 : (obj.y / obj.height) - 1;
	    	if(!places[x]) places[x] = [];

	    	// todo
		    obj.x = x;
		    obj.y = y;
		    obj.inner_id = (obj?.inner_id) ? obj.inner_id : obj.id;
		    obj.info = (this.state.places[obj.inner_id]) ? this.state.places[obj.inner_id] : false;
		    obj.icon = (obj.info?.NECESSITATE_TOTAL > 0) ? 'icon-build' : false;

		    places[x][y] = obj;
	    });

	    let x = 0;
	    let y = 0;
	    let row = [];
	    let render = [];
	    for (let i = 0; i <= data_tiles.length; i++) {
			let tileId = Number(schema.layers[0].data[i] - 1);

		    if(x === Number(schema.layers[0].width)){
			    render.push(row);
			    row = [];
			    x = 0;
			    y = y + 1;
		    }

		    if(schema.tilesets[0].tiles[tileId]){
			    let place = false;
		    	if(places[x] && places[x][y]){
				    place = places[x][y];
			    }

		    	let className = `sector-cell tile x_${x} y_${y} tile-${schema.tilesets[0].tiles[tileId].properties[0].value}`;
		    	className += ` tile-${schema.tilesets[0].tiles[tileId].properties[0].value} x_${x} y_${y}`;
		    	if(place?.info?.CAR_ID) className += ` busy`;

			    row.push({
				    place, className,
			    });
		    }

		    x = x + 1;
	    }

        this.setState((prevState) => ({
            ...prevState,
            temp: render
        }));
    };
}
