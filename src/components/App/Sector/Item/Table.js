import React from 'react';

import { App } from "../../../App/Context";
import * as Storage from "../../../App/Storage";
import { Place } from "../../../App/Api";
import { Cell } from "./Cell";


export class Table extends React.Component {

	static contextType = App;

	places = null;
	sector = null;
	search = null;


	constructor(props){
		super(props);
		this.state = {
			render: null,
			search: null,
		};
		this.sector = Storage.get('SECTOR')[this.props.id];
		this.search = (new URLSearchParams(this.props.history?.location.search))?.get('car_id');
	}

	componentDidMount = async () => {
		this.sector = Storage.get('SECTOR')[this.props.id];
		await Place.get({
			ALL: 'Y',
			DETAILED: 'Y',
			SECTOR_ID: this.props.id,
		}).then((result) => {
			this.places = result;
			this.renderSchema();

			this.setState((prevState) => ({
				...prevState,
				search: (new URLSearchParams(this.props.history?.location.search))?.get('car_id')
			}));
		});
	};

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return false;
		}
	}

	renderSchema = async () => {
		let cells = {};
		let schema = this.sector.SCHEMA;
		let data_tiles = schema.layers[0].data;
		let data_places = schema.layers[1].objects;

		data_places.forEach(obj => {
			let x = (obj.x === 0) ? 0 : (obj.x / obj.width);
			let y = (obj.y === 0) ? 0 : (obj.y / obj.height) - 1;
			if(!cells[x]) cells[x] = [];

			obj.x = x; obj.y = y;

			// todo: нет внутреннего id
			obj.inner_id = (obj?.inner_id) ? obj.inner_id : obj.id;

			// todo: парковочные места в массиве. отсчет с 0
			obj.place = (this.places[obj.inner_id - 1]) ? this.places[obj.inner_id - 1] : false;

			cells[x][y] = obj;
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
				let cell = false;
				if(cells[x] && cells[x][y]){
					cell = cells[x][y];
				}

				let className = `sector-cell x_${x} y_${y} tile tile-${schema.tilesets[0].tiles[tileId].properties[0].value}`;
				if(cell?.place?.ID) className += ` place_id-${cell.place.ID}`;
				if(cell?.place?.INNER_ID) className += ` inner_id-${cell.place.INNER_ID}`;
				if(cell?.place?.CAR_ID) className += ` busy car_id-${cell.place.CAR_ID}`;

				let icon = false;
				if(cell?.place?.NECESSITATE_TOTAL > 0) icon = `icon-build`;

				row.push({
					...cell,
					icon,
					className,
				});
			}

			x = x + 1;
		}

		this.setState((prevState) => ({
			...prevState,
			render: render
		}));
	};

	render() {

		return (
			<>
				{this.state.render === null ? (
					<div className="spinner" />
				) : (
					<>
						<div className="tabs">
							<div className="tab-content">
								<div className="sector-table">
									{this.state.render.map((row, ri) => (
										<div className="sector-row" key={ri}>
											{row.map((cell, ci) => (
												<div key={ci}>
													{this.props?.onClick ? (
														<Cell
															onClick={this.props.onClick}
															tableDidMount={this.componentDidMount}
															{...cell}
														/>
													) : (
														<Cell
															tableDidMount={this.componentDidMount}
															{...cell}
														/>
													)}
												</div>
											))}
										</div>
									))}
								</div>
							</div>
						</div>
					</>
				)}
			</>
		);
	}
}
