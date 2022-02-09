import React from 'react';


export const NotFound = (props) => {

    return (
        <div id={"NOT-FOUND"}>
            <header>
                <div className="d-flex">
                    <h1 className="d-inline-block">Ресурс не найден</h1>
                </div>
            </header>

            <main>
                Ресурс <b>{window.location.href}</b> не найден в системе
            </main>
        </div>
    );
};
