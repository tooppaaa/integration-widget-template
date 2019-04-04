import *  as React from "react";
import './ListTemplate.less';
import Truncate from 'react-truncate';

export interface Line {
    id: number;
    urlPicture: string;
    title: string;
    subtitle: string;
    description: string;
    detail: boolean;
}

export interface ListTemplateProps {
    showPicture: boolean;
    showDetail: boolean;
    values: Line[];
}

export class ListTemplate extends React.Component<ListTemplateProps> {
    constructor(props: ListTemplateProps) {
        super(props);
    }

    displayAvatar() {
        if (this.props.showPicture) {
            return (
                <div className="line-avatar">
                    <div className="Hylia-a-avatar Hylia-a-avatar--default Hylia-a-avatar--medium Hylia-a-avatar--initial">
                        <div className="Hylia-a-avatar__wrapper">
                            <div className="Hylia-a-avatar__picture"><span className="Hylia-a-avatar__initial"></span><i className="icon-profil"></i></div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    displayDetail(value: boolean) {
        if (this.props.showDetail) {
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
    }

    displayLine(value: Line) {
        return (
            <li className="list-template-line" key={value.id}>
                {this.displayAvatar()}
                <div className="line-title">
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
                        <Truncate lines={2} ellipsis={<span>{("...")}</span>}>
                            {value.description}
                        </Truncate>
                    </div>
                </div>
                {this.displayDetail(value.detail)}
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