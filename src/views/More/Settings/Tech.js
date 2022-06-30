import React from 'react';

import { Root, Header } from "../../../components/ui";
import { Scroller } from "../../../components/ui/Scroller";


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

	    const file = window.cordova.file;
	    const device = window.device;
        const info = this.localStorageInfo();

        return (
            <Root active={true}>
	            <Header title={`Техническая информация`} back={() => this.props.history.push(`/more/settings`)} />

                <main>
                    <Scroller>
	                    <div className="h-100 p-3">
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
		                    <table className="table table-bordered w-100">
			                    <thead>
			                    <tr>
				                    <th colSpan={"2"}>File system info</th>
			                    </tr>
			                    </thead>
			                    <tbody>
			                    <tr>
				                    <th>Application Directory</th>
				                    <td className={"text-right"}>{`${file.applicationDirectory}`}</td>
			                    </tr>
			                    <tr>
				                    <th>Application Storage Directory</th>
				                    <td className={"text-right"}>{`${file.applicationStorageDirectory}`}</td>
			                    </tr>
			                    <tr>
				                    <th>Cache Directory</th>
				                    <td className={"text-right"}>{`${file.cacheDirectory}`}</td>
			                    </tr>
			                    <tr>
				                    <th>Data Directory</th>
				                    <td className={"text-right"}>{`${file.dataDirectory}`}</td>
			                    </tr>
			                    <tr>
				                    <th>Documents Directory</th>
				                    <td className={"text-right"}>{`${file.documentsDirectory}`}</td>
			                    </tr>
			                    <tr>
				                    <th>External Application Storage Directory</th>
				                    <td className={"text-right"}>{`${file.externalApplicationStorageDirectory}`}</td>
			                    </tr>
			                    <tr>
				                    <th>External Cache Directory</th>
				                    <td className={"text-right"}>{`${file.externalCacheDirectory}`}</td>
			                    </tr>
			                    <tr>
				                    <th>External Data Directory</th>
				                    <td className={"text-right"}>{`${file.externalDataDirectory}`}</td>
			                    </tr>
			                    <tr>
				                    <th>External Root Directory</th>
				                    <td className={"text-right"}>{`${file.externalRootDirectory}`}</td>
			                    </tr>
			                    <tr>
				                    <th>Shared Directory</th>
				                    <td className={"text-right"}>{`${file.sharedDirectory}`}</td>
			                    </tr>
			                    <tr>
				                    <th>Synced Data Directory</th>
				                    <td className={"text-right"}>{`${file.syncedDataDirectory}`}</td>
			                    </tr>
			                    <tr>
				                    <th>Temp Directory</th>
				                    <td className={"text-right"}>{`${file.tempDirectory}`}</td>
			                    </tr>
			                    </tbody>
		                    </table>
	                    </div>
                    </Scroller>
                </main>
            </Root>
        );
    }
}
