import *  as React from "react";
import { WidgetProps } from "@talentsoft-opensource/integration-widget-contract"
import '../asset/widget.less';
import { EnlargedWidget } from "./widget-enlarged";
import Scrollbars from 'react-custom-scrollbars';
import { List, Line } from "./templates/List/List";
import { PieCharts } from "./templates/PieCharts/PieCharts";
import { Table, Value, Column } from "./templates/Table/Table";
import { ValueType } from "./templates/Table/ValueType";

interface Expense {
    name: string,
    amount: number,
    date: string,
    description: string,
    status: string
}

interface WidgetState {
    data: Expense[];
    searchResult: Expense[];
    addtextvalue: string;
    searchtextvalue: string;
}

export class Widget extends React.Component<WidgetProps, WidgetState> {
    constructor(props: WidgetProps) {
        super(props);
        this.state = { 
            data:[],
            searchResult:[],
            addtextvalue : "",
            searchtextvalue: ""
        };
        this.defineActionHeaders();
    }
    
    componentWillMount(){
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

    handleChangeSearch(textToSearch: string) {
        let data = this.state.data;
        if (textToSearch !== "") {
            data = data.filter(function(item) {
                if (item.name.toLocaleUpperCase().search(textToSearch.toLocaleUpperCase()) === -1) {
                    return false;
                }
                return true;
            });
            this.setState({ searchResult: data, searchtextvalue: textToSearch });
        }
        else {
            this.setState({ data: data, searchtextvalue: textToSearch });
        }
    }

    defineActionHeaders() {
        const {myTSHostService} = this.props;
        // Set to true to define your widget Logo as enlargeable
        myTSHostService.setHeaderActionConfiguration({enlargeable: true, 
            customActions: {
                addAction: () => (() => undefined),
                searchAction: () => (() => undefined)
            } });
    }

    formattedDataForList() {
        let items: Line[] = [];
        if (this.state.data !== undefined && this.state.data.length !== 0) {
            
            this.state.data.map(line => items.push({
                id: 1, 
                urlPicture: '', 
                title: line.name, 
                subtitle: 'amount of expense ' + line.amount + " €", 
                description: line.description, 
                detail: line.status === "true" ? true : false 
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
        if (this.state.data !== undefined && this.state.data.length !== 0) {
            this.state.data.map(item => {
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
            <div className="content">
                <div className="widget-template">
                <Scrollbars autoHeight={true} autoHeightMin={450}>
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
