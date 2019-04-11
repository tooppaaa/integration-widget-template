import *  as React from "react";
import { WidgetProps } from "@talentsoft-opensource/integration-widget-contract"
import '../asset/widget.less';
import { EnlargedWidget } from "./widget-enlarged";
import Scrollbars from 'react-custom-scrollbars';
import { List, Line } from "./templates/List/List";
import { PieCharts } from "./templates/PieCharts/PieCharts";
import { Table, Value, Column } from "./templates/Table/Table";
import { ValueType } from "./templates/Table/ValueType";
import { hostmock } from "../mock/host-mock";

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

        if (hostmock.requestExternalResource !== undefined) {
            const response = await hostmock.requestExternalResource({verb: 'GET', url: "url api" });

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
                alert("couldn't retrieve data...")
            }
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
        if (this.state.data !== undefined && this.state.data.length !== 0) {
            const dataToFormat = this.state.data;
            let item: Line[] = [];
            item.push({id: 1, 
                urlPicture: '', 
                title: dataToFormat[0].name, 
                subtitle: 'amount of expense ' + dataToFormat[0].amount + " €", 
                description: dataToFormat[0].description, 
                detail:dataToFormat[0].status === "true" ? true : false });
            item.push({id: 2, 
                urlPicture: '', 
                title: dataToFormat[1].name, 
                subtitle: 'amount of expense ' + dataToFormat[1].amount + " €",
                description: dataToFormat[1].description, 
                detail:dataToFormat[1].status === "true" ? true : false });
            item.push({id: 3, 
                urlPicture: '', 
                title: dataToFormat[2].name, 
                subtitle: 'amount of expense ' + dataToFormat[2].amount + " €",
                description: dataToFormat[2].description, 
                detail:dataToFormat[2].status === "true" ? true : false });
            item.push({id: 4, 
                urlPicture: '', 
                title: dataToFormat[3].name, 
                subtitle: 'amount of expense ' + dataToFormat[3].amount + " €",
                description: dataToFormat[3].description, 
                detail:dataToFormat[3].status === "true" ? true : false });

            return item;
        }
        return [];
    }
    
    formattedDataForPieChart() {
        if (this.state.data !== undefined && this.state.data.length !== 0) {
            const dataToFormat = this.state.data;
            return ([
                [dataToFormat[0].name, dataToFormat[0].amount],
                [dataToFormat[1].name, dataToFormat[1].amount],
                [dataToFormat[2].name, dataToFormat[2].amount],
                [dataToFormat[3].name, dataToFormat[3].amount]
            ]);
        }
        return [['tes', 1]];
    }

    formattedDataForTable() {
        let val: Array<Value[]> = new Array<Value[]>();
        if (this.state.data !== undefined && this.state.data.length !== 0) {
            const dataToFormat = this.state.data;
        
            val.push([{type:ValueType.Tag, value: dataToFormat[0].amount}, 
                    {type: ValueType.Text, value: dataToFormat[0].name}, 
                    {type:ValueType.Date, value: dataToFormat[0].date}, 
                    {type:ValueType.Status, value: dataToFormat[0].status}]);
            val.push([{type:ValueType.Tag, value: dataToFormat[1].amount}, 
                    {type: ValueType.Text, value: dataToFormat[1].name}, 
                    {type:ValueType.Date, value: dataToFormat[1].date}, 
                    {type:ValueType.Status, value: dataToFormat[1].status}]);
            val.push([{type:ValueType.Tag, value: dataToFormat[2].amount}, 
                    {type: ValueType.Text, value: dataToFormat[2].name}, 
                    {type:ValueType.Date, value: dataToFormat[2].date}, 
                    {type:ValueType.Status, value: dataToFormat[2].status}]);
            val.push([{type:ValueType.Tag, value: dataToFormat[3].amount}, 
                    {type: ValueType.Text, value: dataToFormat[3].name}, 
                    {type:ValueType.Date, value: dataToFormat[3].date}, 
                    {type:ValueType.Status, value: dataToFormat[3].status}]);
        }
        return val;
    }

    formattedColumnsForTable() {
        let columns: Column[] = [];
        columns.push({name: 'Count', width: '20%'});
        columns.push({name: 'Expense', width: '50%'});
        columns.push({name: 'Date', width: '20%'});
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
                        {/* <List showPicture={true} showDetail={true} values={this.formattedDataForList()}/> */}
                        {/* <PieCharts 
                            data={this.formattedDataForPieChart()} 
                            title="Pie Charts expenses" 
                            period="24/03/2019 - 20/02/2020" 
                            tooltip="My expense"    
                        /> */}
                        <div className="partner-title">{"Partner Title"}</div>
                        <Table columns={this.formattedColumnsForTable()} values={this.formattedDataForTable()} />
                    </Scrollbars>
                </div>
            </div>
        );      
    }
}
