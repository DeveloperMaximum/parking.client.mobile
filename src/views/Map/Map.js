import React, { useState, useRef, useEffect} from "react";
import { INITIAL_VALUE, TOOL_AUTO, ReactSVGPanZoom } from 'react-svg-pan-zoom';
import { ReactSvgPanZoomLoader, SvgLoaderSelectElement } from 'react-svg-pan-zoom-loader'


import {Tapbar} from "../../components/App/Tapbar";


export const Map = (props) => {

    const Viewer = useRef(null);
    const [tool, setTool] = useState(TOOL_AUTO);
    const [value, setValue] = useState(INITIAL_VALUE);

    const [map, setMap] = useState('https://parking.mxmit.ru/demo/maps/map.svg');
    const maps = [
        'https://parking.mxmit.ru/demo/maps/map.svg'
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
        <>
            <div id="MAP" className="root-component">
                <header>
                    <div className="d-flex">
                        <h1 className="d-inline-block">Карта локации</h1>
                    </div>
                </header>

                <main>
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
                </main>
            </div>
            <Tapbar history={props.history} />
        </>
    );
}
