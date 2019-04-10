import *  as React from "react";
import './TableTemplate.less';
import { ValueType } from "./ValueType";

export interface Value {
    type: ValueType;
    value: (string | number | boolean);
}

export interface Column {
    name: string;
    width: string;
}

export interface TableTemplateProps {
    title: string;
    columns: Column[];
    values: Value[][];
}

export class TableTemplate extends React.Component<TableTemplateProps> {
    constructor(props: TableTemplateProps) {
        super(props);
    }

    displayStatus(value: (string | number | boolean)) {
        if (value.toString() === "true") {
            return (
                <td><div className="status active"><i className="icon-check"/></div></td>
            );
        }
        else if (value.toString() === "false") {
            return (
                <td><div className="status inactive"><i className="icon-delete"/></div></td>
            );
        }
        else if (value.toString() === "pending") {
            return (
                <td><div className="status pending"><i className="icon-waiting"/></div></td>
            );
        }
    }

    displayColumns() {
        return (
            <tr className="table-template-columns" key="colums-key">
                {this.props.columns.map((column, index) => <th key={index} style={{width: column.width}}>{column.name}</th>)}
            </tr>
        );
    }

    displayValues() {
        return (
            this.props.values.map((value, index) => 
                <tr className="table-line" key={index}>
                    {value.map(item => {
                        switch(item.type) {
                            case ValueType.Date: { return (<td className="dates">{item.value}</td>); }
                            case ValueType.Text: { return (<td className="text">{item.value}</td>); }
                            case ValueType.Tag: { return (<td><span className="Hylia-a-tag Hylia-a-tag--apprentice">{item.value}</span></td>); }
                            case ValueType.Status: { return (this.displayStatus(item.value)); }
                            default: { return (<td className="text">{item.value}</td>); }
                        }})
                    }
                </tr>
                )
        );
    }

    render() {
        return (
            <div>
                <div className="partner-title">{this.props.title}</div>
                <table className="table-template">
                    <tbody>
                        {this.displayColumns()}
                        {this.displayValues()}
                    </tbody>
                </table>
            </div>
        );
    }
}