import *  as React from "react";
import { WidgetProps } from "@talentsoft-opensource/integration-widget-contract"
import '../asset/widget.less';
import { EnlargedWidget } from "./widget-enlarged";
import Scrollbars from 'react-custom-scrollbars';
import { List, Line } from "./templates/List/List";
import { PieCharts } from "./templates/PieCharts/PieCharts";
import { Table, Value, Column } from "./templates/Table/Table";
import { ValueType } from "./templates/Table/ValueType";
import { Search, StatusAvailable } from './components/Search/Search';
import { Status } from "./components/Search/Status";

interface Expense {
    name: string,
    amount: number,
    date: string,
    description: string,
    status: Status
}

interface WidgetState {
    data: Expense[];
    searchResult: Expense[];
    searchtextvalue: string;
    isSearchVisible: boolean;
}

export class Widget extends React.Component<WidgetProps, WidgetState> {
    constructor(props: WidgetProps) {
        super(props);
        this.state = { 
            data:[],
            searchResult:[],
            searchtextvalue: "",
            isSearchVisible: false
        };
        this.defineActionHeaders();
    }
    
    componentDidMount(){
        this.getData();
    }

    public async getData() {
        const { myTSHostService } = this.props;

        myTSHostService.setDataIsLoading();

        const response = await myTSHostService.requestExternalResource({verb: 'GET', url: this.props.params["domain"] });

        if (response !== null){
            let data = [];
            try {
                data = JSON.parse(response.body);
            } 
            catch (e) {
                console.log(e);
            } 
            if (response.status === 200){
                const dataToSave = data as Expense[];
                this.setState({data: dataToSave});
                myTSHostService.setDataIsLoaded();
            }
        }
        else {
            myTSHostService.raiseError("couldn't retrieve data...", "ERR_SERVICE")
        }
    }

    handleChangeSearch(textToSearch: string, status: StatusAvailable[]) {
        let data = this.state.data;
        const availableStatus = status.map(stat => { if (stat.show) { return stat.value.toString(); } return ""; });

        if (textToSearch !== "" || availableStatus.indexOf("") > -1) {
            data = data.filter(function(item) {
                if (item.name.toLocaleUpperCase().search(textToSearch.toLocaleUpperCase()) === -1) {
                    return false;
                }
                if (availableStatus.indexOf(item.status.toString()) >= 0) {
                    return true;
                }
                return false;
            });
            this.setState({ searchResult: data, searchtextvalue: textToSearch });
        }
        else {
            this.setState({ data: data, searchtextvalue: textToSearch, searchResult: [] });
        }
    }

    getAllAvailableStatus() {
        let allStatus: StatusAvailable[] = this.state.data.map(item => {return ({value:item.status, show: true})});
        let allAvailableStatus: StatusAvailable[] = [];
        allStatus.filter(item => {
            if (allAvailableStatus.map(x => x.value.toString()).indexOf(item.value.toString()) <= -1) {
                allAvailableStatus.push(item);
            }
        });
        return allAvailableStatus;
    }

    defineActionHeaders() {
        const {myTSHostService} = this.props;
        // Set to true to define your widget Logo as enlargeable
        myTSHostService.setHeaderActionConfiguration({enlargeable: true, 
            customActions: {
                addAction: () => (() => undefined),
                searchAction: () => { this.setState({ isSearchVisible: !this.state.isSearchVisible })}
            } });
    }

    formattedDataForList() {
        let items: Line[] = [];
        const dataToUse = this.state.searchtextvalue != "" || this.state.searchResult.length != 0 ? this.state.searchResult : this.state.data;

        if (dataToUse !== undefined && dataToUse.length !== 0) {
            dataToUse.map((line, index) => items.push({
                id: index, 
                urlPicture: '', 
                title: line.name, 
                subtitle: 'amount of expense ' + line.amount + " €", 
                description: line.description, 
                detail: line.status
            }));
        }
        return items;
    }
    
    formattedDataForPieChart() : (number | [number, number] | [string, number] | [string, number, number] | [number, number, number])[] {
        let items: Array<[string, number]> = new Array<[string, number]>();
        if (this.state.data !== undefined && this.state.data.length !== 0) {
            this.state.data.map(item => {
                items.push([item.name, item.amount])
            });
        }
        return items;
    }

    formattedDataForTable() {
        let items: Array<Value[]> = new Array<Value[]>();
        const dataToUse = this.state.searchtextvalue != "" || this.state.searchResult.length != 0 ? this.state.searchResult : this.state.data;

        if (this.state.data !== undefined && this.state.data.length !== 0) {
            dataToUse.map(item => {
                items.push(
                    [{type:ValueType.Tag, value: item.amount}, 
                    {type: ValueType.Text, value: item.name}, 
                    {type:ValueType.Date, value: item.date}, 
                    {type:ValueType.Status, value: item.status}]
                );
            });
        }
        return items;
    }

    formattedColumnsForTable() {
        let columns: Column[] = [];
        columns.push({name: 'Count', width: '20%'});
        columns.push({name: 'Expense', width: '40%'});
        columns.push({name: 'Date', width: '30%'});
        columns.push({name: 'Status', width: '10%'});

        return columns;
    }

    public render() {
        if (this.props.myTSHostService.widgetIsEnlarged()) {
            return (
                <EnlargedWidget widgetProps={this.props} data={[]} />
            );
        }

        return (
            <div>
                <Search isVisible={this.state.isSearchVisible} handleChangeSearch={(textToSearch, status) => this.handleChangeSearch(textToSearch, status)} status={this.getAllAvailableStatus()} />
                <div className="widget-template">
                <Scrollbars autoHeight autoHeightMin={this.state.isSearchVisible ? 445 : 495}>
                        <List showPicture={true} showDetail={true} values={this.formattedDataForList()}/>
                        {/* <PieCharts 
                            data={this.formattedDataForPieChart()} 
                            title="Pie Charts expenses" 
                            period="24/03/2019 - 20/02/2020" 
                            tooltip="My expenses"    
                        /> */}
                        {/* <div className="partner-title">{"Partner Title"}</div>
                        <Table columns={this.formattedColumnsForTable()} values={this.formattedDataForTable()} /> */}
                    </Scrollbars>
                </div>
            </div>
        );      
    }
}
