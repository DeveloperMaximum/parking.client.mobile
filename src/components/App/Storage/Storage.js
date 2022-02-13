import React from 'react';


export class Storage extends React.Component {

    constructor(props) {
        super(props);
    }

    get = (key) => {
        return JSON.parse(localStorage.getItem(key) || '{}');
    };

    save = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    remove = (key) => {
        localStorage.removeItem(key);
    };

    clear = () => {
        localStorage.clear();
    };
}
