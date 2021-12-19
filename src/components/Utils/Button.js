import React, { useState } from 'react';


function Button (props) {

    return (
        <div className="input-group">
            <button type="button" {...props} className={props.variant ? 'btn btn-primary btn-' + props.variant : 'btn btn-primary'} disabled={props.disabled}>
                {props.text}
            </button>
        </div>
    );
}

export default Button;
