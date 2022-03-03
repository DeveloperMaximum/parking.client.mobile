import React from 'react';

import { Context } from "../../components/base/Context";
import { Root } from "../../components/ui/Root/Root";
import { Header } from "../../components/ui/Header/Header";
import { Footer } from "../../components/ui/Footer/Footer";

export class Tech extends React.Component {

    static contextType = Context;

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

                <Footer history={this.props.history} />
            </Root>
        );
    }
}
