import React from 'react';


export class Storage extends React.Component {

    constructor(props) {
        super(props);
    }

    get = (key) => {
        return JSON.parse(localStorage.getItem(key) || '{}');
    };

    set = (key, value) => {
        localStorage.setItem('USER', JSON.stringify(value));
    };
}
