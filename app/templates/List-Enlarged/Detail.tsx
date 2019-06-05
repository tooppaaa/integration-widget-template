import *  as React from "react";
import { Line } from "./Line";

export class Detail extends React.Component<Line> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="title">{this.props.title}</div>
                <div className="subtitle">{this.props.subtitle}</div>
                <div className="date">{this.props.date}</div>
                <div className="description">{this.props.description}</div>
            </div>
        );
    }
}