import React, {useState} from 'react';



function Input (props) {

    return (
        <div className={'input-group mb-3'}>
            <input {...props} className={"form-control"}/>
        </div>
    );
}

export default Input;

