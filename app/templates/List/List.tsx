import *  as React from "react";
import './List.less';
import './Avatar.less';
import Truncate from 'react-truncate';

export interface Line {
    id: number;
    urlPicture: string;
    title: string;
    subtitle: string;
    description: string;
    detail: boolean;
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

    displayDetail(value: boolean) {
        if (value) {
            return (
                <div className="line-detail">
                    <div className="detail green">
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="line-detail">
                    <div className="detail red">
                    </div>
                </div>
            );
        }
    }

    displayLine(value: Line) {
        const detail = this.props.showDetail ? this.displayDetail(value.detail) : undefined;
        const avatar = this.props.showPicture ? this.displayAvatar(value.urlPicture) : undefined;

        return (
            <li className="list-line" key={value.id}>
                {avatar}
                <div className="line">
                    <div className="title">
                        <Truncate lines={1} ellipsis={<span>{("...")}</span>}>
                            {value.title}
                        </Truncate>
                    </div>
                    <div className="subtitle">
                        <Truncate lines={1} ellipsis={<span>{("...")}</span>}>
                            {value.subtitle}
                        </Truncate>
                    </div>
                    <div className="description">
                        <Truncate lines={1} width="360">
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