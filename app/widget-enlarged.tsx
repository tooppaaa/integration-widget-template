import * as React from "react";
import { WidgetProps } from "@talentsoft-opensource/integration-widget-contract";
import '../asset/widget-enlarged.less';
import Scrollbars from 'react-custom-scrollbars';

interface EnlargedWidgetProps {
    widgetProps: WidgetProps;
    data: [];
}

interface EnlargedWidgetState {
    data: [];
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

    componentDidMount() {
        const {widgetProps} = this.props;

        widgetProps.myTSHostService.setDataIsLoaded();
    }


    render(){
        const data = this.state.searchtextvalue !== "" ? this.state.searchResult : this.state.data;
        return(
        <div className="content-enlarged">
            
        </div>
        );
    }
}