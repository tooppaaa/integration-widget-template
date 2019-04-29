import *  as React from "react";
import './List-Enlarged.less';
import '../List/Avatar.less';
import Truncate from 'react-truncate';
import { Status } from "../../components/Search/Status";
import Scrollbars from "react-custom-scrollbars";

export interface Line {
    id: number;
    urlPicture: string;
    title: string;
    date: string;
    subtitle: string;
    description: string;
    detail: Status;
}

export interface ListEnlargedProps {
    showPicture: boolean;
    showDetail: boolean;
    values: Line[];
}

export interface ListEnlargedState {
    selectedItem?: number;
}

export class ListEnlarged extends React.Component<ListEnlargedProps, ListEnlargedState> {
    constructor(props: ListEnlargedProps) {
        super(props);
        this.state = {
            selectedItem: undefined
        }
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

    displayStatus(value: Status) {
        let status: string = " " + value.toString();
        
        return (
            <div className="line-status">
                <div
                    title={status.trim().charAt(0).toUpperCase() + status.trim().slice(1)} 
                    className={"status" + status}>
                </div>
            </div>
        );
    }

    displayDetail(value: Line) {
        return (
            <div className={"detail" + (this.state.selectedItem === value.id ? " active" : "")}>
                <div className="title">{value.title}</div>
                <div className="subtitle">{value.subtitle}</div>
                <div className="date">{value.date}</div>
                <div className="description">{value.description}</div>
            </div>
        );
    }

    handleSelectItem(id: number) {
        this.setState({selectedItem: id});
    }

    displayLine(value: Line) {
        const detail = this.props.showDetail ? this.displayStatus(value.detail) : undefined;
        const avatar = this.props.showPicture ? this.displayAvatar(value.urlPicture) : undefined;
        
        return (
            <a onClick={() => this.handleSelectItem(value.id)} key={value.id}>
                <li className={"list-line" + (this.state.selectedItem === value.id ? " active" : "")} key={value.id}>
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
                            <Truncate lines={1} width={370}>
                                {value.description}
                            </Truncate>
                        </div>
                    </div>
                    {detail}
                </li>
            </a>
        );
    }

    public render() {
        return (
            <div className="list-enlarged-template">
                <ul className="list">
                    <Scrollbars autoHeight autoHeightMin={685}>
                        {this.props.values.map(value => this.displayLine(value))}
                    </Scrollbars>
                </ul>
                <Scrollbars autoHeight autoHeightMin={685}>
                    {this.props.values.map(value => this.displayDetail(value))}
                </Scrollbars>
            </div>
        );
    }
}