import *  as React from "react";
import './Table.less';
import { ValueType } from "./ValueType";

export interface Value {
    type: ValueType;
    value: (string | number | boolean);
}

export interface Column {
    name: string;
    width: string;
}

export interface TableProps {
    columns: Column[];
    values: Value[][];
}

export class Table extends React.Component<TableProps> {
    constructor(props: TableProps) {
        super(props);
    }

    displayStatus(value: (string | number | boolean)) {
        if (value.toString() === "true") {
            return (
                <div className="status active"><i className="icon-check"/></div>
            );
        }
        else if (value.toString() === "false") {
            return (
                <div className="status inactive"><i className="icon-delete"/></div>
            );
        }
        else if (value.toString() === "pending") {
            return (
                <div className="status pending"><i className="icon-waiting"/></div>
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
                            case ValueType.Date: { 
                                return (<td className="dates" key={item.value.toString() + index}>{item.value}</td>); 
                            }
                            case ValueType.Text: { 
                                return (<td className="text" key={item.value.toString() + index}>{item.value}</td>); 
                            }
                            case ValueType.Tag: { 
                                return (<td key={item.value.toString() + index}><span className="Hylia-a-tag Hylia-a-tag--apprentice">{item.value}</span></td>); 
                            }
                            case ValueType.Status: { 
                                return (<td key={item.value.toString() + index}>{this.displayStatus(item.value)}</td>); 
                            }
                            default: { 
                                return (<td className="text" key={item.value.toString() + index}>{item.value}</td>); 
                            }
                        }})
                    }
                </tr>
                )
        );
    }

    render() {
        return (
            <div>
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