import React from 'react';


export const Item = (props) => {

    return (
        <>
            <div className="car-info danger">
                <div className="status-wrapper bg-info">
                    <i className="icon icon-build"></i>
                    <span>Статус</span>
                    <div className="status-text">
                        Демонстрация 1 час 30 мин
                    </div>
                </div>

                <h2 className="d-inline-block">{props.item.BRAND} {props.item.MODEL}</h2>

                <div className="prop">
                    <span>VIN</span>
                    <div>{props.item.VIN}{props.item.VIN2}</div>
                </div>

                <div className="prop">
                    <span>Парковочное место</span>
                    <div>Сектор В , подсектор 2</div>
                </div>

                <div className="d-flex justify-content-between">
                    <div className="prop">
                        <span>Пробег</span>
                        <div>180 000 км</div>
                    </div>

                    <div className="prop">
                        <span>Гос. номер</span>
                        <div>{props.item.G_NUMBER}</div>
                    </div>
                </div>
            </div>

            <div className="content-wrapper">
                <div className="car-status-info bg-info">
                    Продолжительность демонстрации
                    <div>1 час 30 мин</div>
                </div>
            </div>

            <div className="content-wrapper">
                <div className="car-info-btn-wrapper d-flex flex-wrap justify-content-between">
                    <div className="btn btn-primary">
                        <i className="icon icon-sync_alt"></i>
                        Перемещение
                    </div>
                    <div className="btn btn-primary">
                        <i className="icon icon-build"></i>
                        Потребности
                    </div>
                    <div className="btn btn-primary">Тест-драйв</div>
                    <div className="btn btn-primary">Демонстрация</div>
                    <div className="btn btn-secondary">Выдача</div>
                    <div className="btn btn-secondary">История</div>
                </div>
            </div>
        </>
    );
};
