import * as React from "react";
import { WidgetProps } from "@talentsoft-opensource/integration-widget-contract";
import '../asset/widget-enlarged.less';
import { ListEnlarged } from "./templates/List-Enlarged/List-Enlarged";
import { Expense } from "./widget";
import { Line } from "./templates/List-Enlarged/Line";

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

    formattedDataForList() {
        let items: Line[] = [];
        const dataToUse = this.state.searchtextvalue != "" || this.state.searchResult.length != 0 ? this.state.searchResult : this.state.data;

        if (dataToUse !== undefined && dataToUse.length !== 0) {
            dataToUse.map((line, index) => items.push({
                id: index, 
                urlPicture: '', 
                title: line.name, 
                date: line.date,
                subtitle: 'amount of expense ' + line.amount + " €", 
                description: line.description, 
                detail: line.status
            }));
        }
        return items;
    }
    
    render(){
        return(
            <div>
                <ListEnlarged showPicture={true} showStatus={true} values={this.formattedDataForList()} />
            </div>
        );
    }
}