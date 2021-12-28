import React from 'react';


export const Input = (props) => {

    return (
        <div className={'input-group mb-3'}>
            <input {...props} className={"form-control"}/>
        </div>
    );
};

