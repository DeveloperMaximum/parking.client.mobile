import React from 'react';

import { Root, Header } from "../../components/ui";


export class Tech extends React.Component {


    constructor(props){
        super(props);
    }

    localStorageInfo(){
        let info = {
            rows: [],
            total: 0
        };
        let size, key;
        for (key in localStorage) {
            if (!localStorage.hasOwnProperty(key)) {
                continue;
            }
            size = ((localStorage[key].length + key.length) * 2);
            info.total += size;
            info.rows.push({
                key: key,
                size: (size / 1024).toFixed(2)
            });
        }
        info.total = (info.total / 1024).toFixed(2);
        return info;
    }

    render() {

	    const device = window.device;
        const info = this.localStorageInfo();

        return (
            <Root
                viewId={"TECH"}
            >
                <Header>
                    <div className="d-flex" onClick={() => this.props.history.push(`/settings`)}>
                        <i className="icon icon-chevron_left d-inline-block" />
                        <h1 className="d-inline-block d-inline-block">DEBUG</h1>
                    </div>
                </Header>

                <main>
                    <div className="content-wrapper">
                        <table className="table table-bordered w-100">
                            <thead>
                                <tr>
                                    <th colSpan={"2"}>Device info</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <td className={"text-right"}>{`${device.model}`}</td>
                                </tr>
                                <tr>
                                    <th>Platform</th>
                                    <td className={"text-right"}>{`${device.platform}`}</td>
                                </tr>
                                <tr>
                                    <th>UUID</th>
                                    <td className={"text-right"}>{`${device.uuid}`}</td>
                                </tr>
                                <tr>
                                    <th>Version</th>
                                    <td className={"text-right"}>{`${device.version}`}</td>
                                </tr>
                                <tr>
                                    <th>Manufacturer</th>
                                    <td className={"text-right"}>{`${device.manufacturer}`}</td>
                                </tr>
                                <tr>
                                    <th>Serial</th>
                                    <td className={"text-right"}>{`${device.serial}`}</td>
                                </tr>
                                <tr>
	                                <th>Cordova</th>
	                                <td className={"text-right"}>{`${device.cordova}`}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="table table-bordered w-100">
                            <thead>
                                <tr>
                                    <th colSpan={"2"}>Local Storage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {info.rows.map((item, index) => (
                                    <tr key={index}>
                                        <th>{item.key}</th>
                                        <td className={"text-right"}>{`${item.size} KB`}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th className={"text-right"} colSpan={"2"}>{`${info.total} KB`}</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </main>
            </Root>
        );
    }
}
