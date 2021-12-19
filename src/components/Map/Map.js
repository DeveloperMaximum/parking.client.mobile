import React, { useState, useRef, useEffect} from "react";
import {INITIAL_VALUE, TOOL_AUTO, ReactSVGPanZoom } from 'react-svg-pan-zoom';
import { ReactSvgPanZoomLoader, SvgLoaderSelectElement } from 'react-svg-pan-zoom-loader'

import { SvgLoader, SvgProxy } from 'react-svgmt';

import AppRequest from "../../components/App/AppRequest";

import "./Map.css";

const Map = (props) => {

    const Viewer = useRef(null);
    const [tool, setTool] = useState(TOOL_AUTO);
    const [value, setValue] = useState(INITIAL_VALUE);

    const [map, setMap] = useState('https://parking.mxmit.ru/demo/maps/map.svg');
    const maps = [
        'https://parking.mxmit.ru/demo/maps/map.svg',
        'https://parking.mxmit.ru/demo/maps/sector-1.svg',
        'https://parking.mxmit.ru/demo/maps/sector-2.svg',
        'https://parking.mxmit.ru/demo/maps/sector-3.svg',
        'https://parking.mxmit.ru/demo/maps/sector-4.svg',
        'https://parking.mxmit.ru/demo/maps/sector-5.svg',
        'https://parking.mxmit.ru/demo/maps/sector-6.svg',
        'https://parking.mxmit.ru/demo/maps/sector-7.svg'
    ];

    const options = maps.map((text, index) => {
        return <option key={index}>{text}</option>;
    });

    const [tile, setTile] = useState(null);

    function handleChangeMap(event) {
        setMap(maps[event.target.value]);
    }

    function getSVG(url, fileName) {
        return ''
    }

    const handlePan = (e) => {
        console.log('handlePan');
    };

    const handleMouseDown = (e) => {
        console.log('handleMouseDown');
    };

    const handleTouchEnd = (e) => {
        if(typeof e.value !== 'undefined' && (e.value.startX === e.value.endX && e.value.startY === e.value.endY)){
            if(tile !== null){
                tile.classList.remove('active');
            }
            e.originalEvent.target.classList.add('active');
            setTile(e.originalEvent.target);
        }

    };

    const getPlaces = () => {
        return AppRequest({
            METHOD: 'GET',
            URL: 'map',
            USER: props.USER,
            callback: function(result){
                for(let place in result){
                    let svg_id = 'svg_' + place;
                    if(result[place].CAR.NEEDED === true){
                        let element = document.getElementById(svg_id);
                        if(element){
                            element.classList.add('active');
                        }
                    }
                }
            }
        });
    };

    const fetchSVG = () => {
        return fetch('https://parking.mxmit.ru/demo/maps/map.svg', {
            method: 'GET',
            mode: 'no-cors',
        }).then(function(result){
            console.log(result);
            return result.text();
        }).then(function(svg){
            console.log(svg);
        });
    };

    useEffect(() => {
        Viewer.current.fitToViewer();
        //return fetchSVG();
    }, []);

    return (
        <div id={"MAP"}>
            <button className="btn" onClick={() => Viewer.current.fitToViewer()}>Сбросить</button>

            <select value={value} onChange={event => setMap(event.target.value)}>
                {options}
            </select>

            <ReactSvgPanZoomLoader
                src={map}
                render={(content) => (
                <ReactSVGPanZoom
                    ref={Viewer}
                    tool={tool} onChangeTool={setTool}
                    value={value} onChangeValue={setValue}
                    onPan={event => handlePan(event)}
                    onTouchEnd={event => handleTouchEnd(event)}
                    onMouseDown={event => handleMouseDown(event)}
                    width={window.innerWidth} height={window.innerHeight}>
                    <svg width={500} height={500} >
                        {content}
                    </svg>
                </ReactSVGPanZoom>
            )}/>
        </div>
    );
};

export default Map;
