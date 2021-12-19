import React from 'react';


function AppPreloader (props) {

    return(
        <div className={"preloader"}>
            <div className={props.status}/>
        </div>
    );
}

export default AppPreloader;
