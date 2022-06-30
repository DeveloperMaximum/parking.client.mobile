import React from 'react';

import * as Storage from "../../../utils/Storage";
import { Place as Api } from "../../../App/Api";
import { Cell } from "./Cell";


export class Table extends React.Component {

	tabs = [];
	places = [];
	sector = null;


	constructor(props){
		super(props);
		this.state = {
			render: null,
			search: null,
			controller: null
		};

		this.sector = Storage.get('SECTOR')[this.props.id];

		for (let i = 0; i < Math.floor(this.sector.SCHEMA.width / 10); i++) {
			this.tabs.push({
				name: `${this.sector.NAME} - ${i + 1}`
			});
		}
	}

	componentDidMount = async () => {
		if(this.state.controller?.abort){
			this.state.controller.abort();
		}

		const controller = new AbortController();
		this.sector = Storage.get('SECTOR')[this.props.id];
		await Api.List({ SECTOR_ID: this.props.id }, 'all', controller).then((result) => {
			this.places = [];
			result['ITEMS'].forEach(obj => {
				this.places[obj.ID] = obj;
			});
			this.renderSchema();

			this.setState((prevState) => ({
				...prevState,
				search: (new URLSearchParams(this.props.history?.location.search))?.get('car_id')
			}));
		});
	};

	componentWillUnmount() {
		if(this.state.controller?.abort){
			this.state.controller.abort();
		}
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
			let y = (obj.y === 0) ? 0 : (obj.y / obj.height) -1;
			if(!cells[y]) cells[y] = [];

			obj.x = x; obj.y = y;

			// todo: нет внутреннего id
			obj.inner_id = obj.id;

			// todo: парковочные места в массиве. отсчет с 0
			obj.place = this.places[obj.properties[0].value];

			cells[y][x] = obj;
		});

		let x = 0;
		let y = 0;
		let row = [];
		let width = 0;
		let render = [];
		for (let i = 0; i <= data_tiles.length; i++) {
			let tileId = Number(schema.layers[0].data[i] - 1);

			if(x === Number(schema.layers[0].width)){
				render.push(row);
				row = [];
				x = 0;
				y = y + 1;
				width = 0;
			}

			if(schema.tilesets[0].tiles[tileId]){
				width = width + 1;

				let cell = false;
				if(cells[y] && cells[y][x]){
					cell = cells[y][x];
				}

				let type = false;
				let icon = false;
				let className = `sector-cell x_${x} y_${y} tile tile-${schema.tilesets[0].tiles[tileId].properties[0].value}`;

				if(cell?.place?.ID) className += ` place_id-${cell.place.ID}`;
				if(cell?.place?.INNER_ID) className += ` inner_id-${cell.place.INNER_ID}`;
				if(cell?.place?.CAR_ID) className += ` busy car_id-${cell.place.CAR_ID}`;
				if(cell?.place?.NECESSITATE_TOTAL > 0){
					icon = `icon-build bg-danger text-white`;
				}

				row.push({
					...cell,
					icon,
					type,
					className,
					width,
				});
			}

			x = x + 1;
		}

		this.setState((prevState) => ({
			...prevState,
			width: width,
			render: render
		}));
	};

	onScroll = (e) => {
		let cell = Math.floor(e.target.scrollLeft / 58);
		let tab = Math.floor(cell / 10) + 1;
		document.querySelector(`.nav.nav-tabs .nav-item.active`)?.classList.remove('active');
		document.querySelector(`.nav.nav-tabs .nav-item.tab-${tab}`).classList.add('active');
		document.querySelector(`.nav.nav-tabs .nav-item.active`).scrollIntoView();
	};

	handleTab = (e) => {
		let tab = e.target.getAttribute(`data-i`);
		let cell = (tab * 10) - 1;
		if(cell < 10) cell = 1;
		document.querySelector(`.sector-table .x_${cell}.y_0`)?.scrollIntoViewIfNeeded();
		document.querySelector(`.nav.nav-tabs .nav-item.active`)?.classList.remove('active');
		e.target.classList.add('active');
	};

	render() {

		let tabs = [];
		if(this.state.render && this.state.render.length){
			for (let i = 0; i < Math.floor(this.state.render[0].length / 10); i++) {
				tabs.push({
					name: `${this.sector.NAME} - ${i + 1}`
				});
			}
		}

		return (
			<>
				{this.state.render === null ? (
					<div className="spinner" />
				) : (
					<>
						<div className="nav nav-tabs flex-nowrap text-center shadow position-fixed w-100 pr-3 pl-3 overflow-x-auto flex-nowrap">
							{tabs.map((tab, ti) => (
								ti === 0 ?
								( <div className={`nav-item pr-4 pl-4 tab-${ti + 1} active`} data-i={ti + 1} key={ti} onClick={this.handleTab}>{tab.name}</div> ) :
								( <div className={`nav-item pr-4 pl-4 tab-${ti + 1}`} data-i={ti + 1} key={ti} onClick={this.handleTab}>{tab.name}</div> )
							))}
						</div>
						<div className="tab-content w-100 h-100">
							<div className="tab-pane w-100 h-100 fade show active">
								<div className="overflow-y-scroll h-100">
									<div className="sector-table" onScroll={this.onScroll}>
										{this.state.render.map((row, ri) => (
											<div className={`sector-row row-${ri + 1}`} data-row={ri + 1} key={ri}>
												{row.map((cell, ci) => (
													<div key={ci} data-cell={(ci % 10 === 0) ? (ci / 10) + 1 : false}>
														{this.props?.onClick ? (
															<Cell
																history={this.props.history}
																onClick={this.props.onClick}
																parentDidMount={this.componentDidMount}
																{...cell}
															/>
														) : (
															<Cell
																history={this.props.history}
																parentDidMount={this.componentDidMount}
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
						</div>
					</>
				)}
			</>
		);
	}
}
