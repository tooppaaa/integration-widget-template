import * as React from 'react';
import AnimateHeight from 'react-animate-height';
import { throttle } from 'throttle-debounce';
import { Status } from './Status';
import './Search.less';

export interface StatusAvailable {
    value: Status;
    show: boolean;
}

export interface SearchProps {
    isVisible: boolean;
    handleChangeSearch: (textToSearch: string, statusToShow: StatusAvailable[]) => void;
    status?: StatusAvailable[];
}

interface SearchState {
    searchText: string;
    statusAvaible: StatusAvailable[];
}

export class Search extends React.Component<SearchProps, SearchState> {
    handleSearchChangeThrottled: throttle<(e: any) => void>;

    constructor(props: SearchProps) {
        super(props);
        this.state = {
            searchText: "",
            statusAvaible: this.props.status!.map(item => item)
        }
        this.handleSearchChangeThrottled = throttle(300, (e) => { this.handleSearchChange(e) });
    }
    
    componentWillReceiveProps(nextProps: SearchProps) {
        if (nextProps.status !== this.state.statusAvaible && nextProps.status !== undefined) {
            const statusToShow = nextProps.status.map((item, index) => ({value: item.value, show: this.state.statusAvaible[index] != undefined ? this.state.statusAvaible[index].show : true}));
            this.setState({ statusAvaible: statusToShow });
        }
      }

    handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchText: e.target.value }, () => (this.props.handleChangeSearch !== undefined ? this.props.handleChangeSearch(this.state.searchText, this.state.statusAvaible) : null));
    }

    handleClickStatus(status: StatusAvailable) {
        let allStatus = this.state.statusAvaible;
        let statusToChange = allStatus.find(stat => status.value === stat.value);
        if (statusToChange !== undefined) {
            statusToChange.show = !statusToChange.show;
        }
        this.setState({statusAvaible: allStatus}, () => this.props.handleChangeSearch(this.state.searchText, this.state.statusAvaible));
    }

    displayStatus(status: StatusAvailable[]) {
        return status.map((item, index) => {
            const statusValue: string = " " + item.value.toString();
            let statusShow: string = "";
            if (!item.show) { statusShow = " disable"}

            return (<div title={item.value.toString()} 
                         className={"status" + statusShow + statusValue} 
                         key={index}
                         onClick={() => this.handleClickStatus(item)}>
                    </div>);
            }
        );
    }

    render() {
        let statusAvailable;
        if (this.state.statusAvaible !== undefined) {
            statusAvailable = <div className="status-available">{this.displayStatus(this.state.statusAvaible)}</div>
        }

        return(
            <AnimateHeight height={this.props.isVisible ? 'auto' : 0} className="AnimateHeight">
                <div className="input-search">
                    <input type="text" placeholder="Type your search" onChange={(e) => {e.persist(); this.handleSearchChangeThrottled(e);} }  />
                    {statusAvailable}
                </div>
            </AnimateHeight>
        );
    }
}