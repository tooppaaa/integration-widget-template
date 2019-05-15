import * as React from "react";
import { WidgetProps } from "@talentsoft-opensource/integration-widget-contract";
import '../asset/widget-enlarged.less';
import { Expense } from "./widget";
import { Table, Value, Column } from "./templates/Table/Table";
import { ValueType } from "./templates/Table/ValueType";
import Scrollbars from "react-custom-scrollbars";
import { ListEnlarged } from "./templates/List-Enlarged/List-Enlarged";
import { Line } from "./templates/List-Enlarged/Line";
import './templates/Table/Table-Enlarged.less';

interface EnlargedWidgetProps {
    widgetProps: WidgetProps;
    data: [];
}

interface EnlargedWidgetState {
    data: Expense[];
    searchResult: [];
    displayAdd: boolean;
    selectedCity: string;
    searchtextvalue: string;
}

export class EnlargedWidget extends React.Component<EnlargedWidgetProps, EnlargedWidgetState> {
    constructor(props: EnlargedWidgetProps) {
        super(props);
        this.state = {
            data: props.data,
            searchResult:[],
            displayAdd: false,
            selectedCity: "",
            searchtextvalue: ""
        };
    }

    componentDidMount(){
        this.getData();
        console.log("gros enlarged");
    }

    public async getData() {
        const { myTSHostService } = this.props.widgetProps;

        myTSHostService.setDataIsLoading();

        const response = await myTSHostService.requestExternalResource({verb: 'GET', url: this.props.widgetProps.params["domain"] });

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

    formattedDataForTable() {
        let items: Array<Value[]> = new Array<Value[]>();
        const dataToUse = this.state.searchtextvalue != "" || this.state.searchResult.length != 0 ? this.state.searchResult : this.state.data;

        if (this.state.data !== undefined && this.state.data.length !== 0) {
            dataToUse.map(item => {
                items.push(
                    [{type:ValueType.Text, value: item.amount + "€"}, 
                    {type: ValueType.Text, value: item.name}, 
                    {type: ValueType.Text, value: item.description},
                    {type:ValueType.Tag, value: item.date}, 
                    {type:ValueType.Status, value: item.status}]
                );
            });
        }
        return items;
    }

    formattedColumnsForTable() {
        let columns: Column[] = [];
        columns.push({name: 'Amount', width: '10%'});
        columns.push({name: 'Expense', width: '20%'});
        columns.push({name: 'Description', width: '50%'});
        columns.push({name: 'Date', width: '10%'});
        columns.push({name: 'Status', width: '10%'});
        
        return columns;
    }

    formattedDataForList() {
        let items: Line[] = [];
        const dataToUse = this.state.searchtextvalue != "" || this.state.searchResult.length != 0 ? this.state.searchResult : this.state.data;

        if (dataToUse !== undefined && dataToUse.length !== 0) {
            dataToUse.map((line, index) => items.push({
                id: index, 
                urlPicture: '', 
                date: line.date,
                title: line.name, 
                subtitle: 'amount of expense ' + line.amount + " €", 
                description: line.description, 
                detail: line.status
            }));
        }
        return items;
    }
    
    render(){
        return(
            <div className="content-enlarged">
                <Scrollbars autoHeight autoHeightMin={685}>
                    {/* <ListEnlarged showPicture={true} showStatus={true} values={this.formattedDataForList()}/> */}
                    <Table columns={this.formattedColumnsForTable()} values={this.formattedDataForTable()} />
                </Scrollbars>
            </div>
        );
    }
}