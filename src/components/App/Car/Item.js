import React from 'react';


export const Item = (props) => {

    return (
        <>
            <div className="car-info danger">
                <div className="status-wrapper bg-info">
                    <i className="icon icon-build" />
                    <span>Статус</span>
                    <div className="status-text">
                        &mdash;
                    </div>
                </div>

                <h2 className="d-inline-block">{props.item.BRAND} {props.item.MODEL} {(props.item?.YEAR) ? '(' + props.item.YEAR + ')' : ''}</h2>

                <div className="prop">
                    <span>VIN</span>
                    <div>{props.item.VIN}{props.item.VIN2}</div>
                </div>

                <div className="prop">
                    <span>Парковочное место</span>
                    <div>{props.item.SECTOR_NAME} , место {props.item.PLACE_ID}</div>
                </div>

                <div className="d-flex justify-content-between">
                    <div className="prop">
                        <span>Пробег</span>
                        <div>{(props.item?.MILEAGE) ? props.item.MILEAGE : '-'}</div>
                    </div>

                    <div className="prop">
                        <span>Гос. номер</span>
                        <div>{(props.item?.G_NUMBER) ? props.item.G_NUMBER : '-'}</div>
                    </div>
                </div>

                <div className="d-flex justify-content-between">
                    <div className="prop">
                        <span>Тип кузова</span>
                        <div>{(props.item?.BODY) ? props.item.BODY : '-'}</div>
                    </div>

                    <div className="prop">
                        <span>Коробка передач</span>
                        <div>{(props.item?.TRANSMISSION) ? props.item.TRANSMISSION : '-'}</div>
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
                        <i className="icon icon-sync_alt"/>
                        Перемещение
                    </div>
                    <div className="btn btn-primary">
                        <i className="icon icon-build"/>
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
