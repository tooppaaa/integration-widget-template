import *  as React from "react";
import './List.less';
import './Avatar.less';
import Truncate from 'react-truncate';
import { Status } from "../../components/Search/Status";

export interface Line {
    id: number;
    urlPicture: string;
    title: string;
    subtitle: string;
    description: string;
    detail: Status;
}

export interface ListProps {
    showPicture: boolean;
    showDetail: boolean;
    values: Line[];
}

export class List extends React.Component<ListProps> {
    constructor(props: ListProps) {
        super(props);
    }

    componentWillReceiveProps(nextProps: ListProps) {
        this.setState({ values: nextProps!.values });
    }

    displayAvatar(urlPicture: string) {
        const imageLink = (urlPicture !== undefined && urlPicture !== "") ? <img className="avatar-picture" src={urlPicture}></img> : <i className="icon-profil"></i>
        return (
            <div className="line-avatar">
                <div className="Hylia-a-avatar Hylia-a-avatar--default Hylia-a-avatar--medium Hylia-a-avatar--initial">
                    <div className="Hylia-a-avatar__wrapper">
                        <div className="Hylia-a-avatar__picture"><span className="Hylia-a-avatar__initial"></span>{imageLink}</div>
                    </div>
                </div>
            </div>
        );
    }

    displayDetail(value: Status) {
        let status: string = " " + value.toString();
        
        return (
            <div className="line-detail">
                <div
                    title={status.trim().charAt(0).toUpperCase() + status.trim().slice(1)} 
                    className={"detail" + status}>
                </div>
            </div>
        );
    }

    displayLine(value: Line) {
        const detail = this.props.showDetail ? this.displayDetail(value.detail) : undefined;
        const avatar = this.props.showPicture ? this.displayAvatar(value.urlPicture) : undefined;
        
        return (
            <li className="list-line" key={value.id}>
                {avatar}
                <div className="line">
                    <div className="title" title={value.title}>
                        <Truncate lines={1} ellipsis={<span>{("...")}</span>}>
                            {value.title}
                        </Truncate>
                    </div>
                    <div className="subtitle" title={value.subtitle}>
                        <Truncate lines={1} ellipsis={<span>{("...")}</span>}>
                            {value.subtitle}
                        </Truncate>
                    </div>
                    <div className="description" title={value.description}>
                        <Truncate lines={1} width={360}>
                            {value.description}
                        </Truncate>
                    </div>
                </div>
                {detail}
            </li>
        );
    }

    public render() {
        return (
            <div className="list-template">
                <ul>
                    {this.props.values.map(value => this.displayLine(value))}
                </ul>
            </div>
        );
    }
}