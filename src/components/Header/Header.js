import React from 'react';


function Header(props) {


    return(
        <h1 className={"h1 text-center"}>{props.text}</h1>
    );
}

export default Header;