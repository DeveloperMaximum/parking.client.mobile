import React from 'react';
import { Consumer } from "../../base/Context/Context";

export class Camera extends React.Component {


    render() {

        return (
            <>
                <Consumer>
                    {({ camera }) => (
                        <div className={ camera._data.scanned === true ? "camera active scanned" : "camera"}>
                            <div className="opacity" />
                            { camera._data.loading === true ? (
                                <>
                                    <div className="spinner" />
                                </>
                            ) : (
                                <>
                                    <div className="tools" />
                                </>
                            )}
                        </div>
                    )}
                </Consumer>
            </>
        );
    }
}
