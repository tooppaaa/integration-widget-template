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
        let status: string = " " + value.toString();

        return (
            <div title={status.trim().charAt(0).toUpperCase() + status.trim().slice(1)} className={"status" + status}></div>
        );
    }

    displayColumns() {
        return (
            <ul className="table-columns" key="colums-key">
                {this.props.columns.map((column, index) => <li key={index} style={{width: column.width}}>{column.name}</li>)}
            </ul>
        );
    }

    displayValues() {
        return (
            this.props.values.map((value, index) => 
                <ul className="table-line" key={index}>
                    {value.map((item, ind) => {
                        switch(item.type) {
                            case ValueType.Date: { 
                                return (<li className="dates" style={{width: this.props.columns[ind].width}} key={item.value.toString() + index}>{item.value}</li>); 
                            }
                            case ValueType.Text: { 
                                return (<li className="text" style={{width: this.props.columns[ind].width}} key={item.value.toString() + index}>{item.value}</li>); 
                            }
                            case ValueType.Tag: { 
                                return (<li style={{width: this.props.columns[ind].width}} key={item.value.toString() + index}><span className="Hylia-a-tag Hylia-a-tag--apprentice">{item.value}</span></li>); 
                            }
                            case ValueType.Status: { 
                                return (<li style={{width: this.props.columns[ind].width}} key={item.value.toString() + index}>{this.displayStatus(item.value)}</li>); 
                            }
                            default: { 
                                return (<li className="text" style={{width: this.props.columns[ind].width}} key={item.value.toString() + index}>{item.value}</li>); 
                            }
                        }})
                    }
                    <div className="border-small-width" />
                </ul>
                )
        );
    }

    render() {
        return (
            <div className="table-template">
                {this.displayColumns()}
                {this.displayValues()}
            </div>
        );
    }
}