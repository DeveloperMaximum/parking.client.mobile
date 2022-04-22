import React, { useState, useRef, useEffect} from "react";

import { ReactSvgPanZoomLoader } from 'react-svg-pan-zoom-loader'
import { INITIAL_VALUE, TOOL_AUTO, ReactSVGPanZoom } from 'react-svg-pan-zoom';


export const Map = (props) => {

	const Viewer = useRef(null);
	const [tool, setTool] = useState(TOOL_AUTO);
	const [value, setValue] = useState(INITIAL_VALUE);

	const [tile, setTile] = useState(null);

	const map = 'https://parking.mxmit.ru/demo/maps/map.svg';


	const handleTouchEnd = (e) => {
		if(typeof e.value !== 'undefined' && (e.value.startX === e.value.endX && e.value.startY === e.value.endY)){
			if(tile !== null){
				tile.classList.remove('active');
			}
			e.originalEvent.target.classList.add('active');
			setTile(e.originalEvent.target);
		}
	};

	useEffect(() => {
		Viewer.current.fitToViewer();
	}, []);

	return (
		<ReactSvgPanZoomLoader
			src={map}
			render={(content) => (
				<ReactSVGPanZoom
					ref={Viewer}
					tool={tool} onChangeTool={setTool}
					value={value} onChangeValue={setValue}
					onTouchEnd={event => handleTouchEnd(event)}
					width={window.innerWidth} height={window.innerHeight - 54}>
					<svg width={1292} height={806} >
						{content}
					</svg>
				</ReactSVGPanZoom>
			)}/>
	);
};
