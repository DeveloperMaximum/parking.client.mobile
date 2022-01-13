import React from 'react';


export const Input = (props) => {

    return (
        <div className={'input-group'}>
            <input {...props} className={"form-control"}/>
        </div>
    );
};

