import *  as React from "react";
import { WidgetProps } from "@talentsoft-opensource/integration-widget-contract"
import { EnlargedWidget } from "./widget-enlarged";
import { NormalWidget } from "./widget-normal";
import { languagePacks, getLanguage, recordIsEmpty } from './Resources';


interface WidgetState {
    isSearchVisible: boolean;
    resources: Record<string, string>;
}

export class Widget extends React.Component<WidgetProps, WidgetState> {
    constructor(props: WidgetProps) {
        super(props);
        this.state = {
            isSearchVisible: false,
            resources: {}
        };
        this.defineActionHeaders();
    }

    componentDidMount() {
        this.props.myTSHostService.getPreloadedResources().then(lp =>
            {
                if (! recordIsEmpty(lp as Record<string, string>))
                {
                    this.setState({
                        resources: lp
                    });
                } else {
                    this.setState({
                        resources: languagePacks[getLanguage(this.props)].labels
                    });
                    console.log("Record is empty")
                }
            }
        )
    }

    componentDidUpdate(prevProps: WidgetProps) {
        if (this.props.language !== prevProps.language)
        {
            this.props.myTSHostService.getPreloadedResources().then(lp =>
                {
                    if (! recordIsEmpty(lp as Record<string, string>))
                    {
                        this.setState({
                            resources: lp
                        });
                    } else {
                        this.setState({
                            resources: languagePacks[getLanguage(this.props)].labels
                        });
                        console.log("Record is empty update")
                    }
                }
            )
        }
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

    public render() {
        let widget;

        if (this.props.myTSHostService.widgetIsEnlarged()) {
            widget = <EnlargedWidget widgetProps={this.props} resources={this.state.resources} />;
        }
        else {
            widget = <NormalWidget 
                        widgetProps={this.props}
                        isSearchVisible={this.state.isSearchVisible}
                        resources={this.state.resources}
                    />
        }

        return (
            <div style={{width: '100%' }}>
                {widget}
            </div>
        );      
    }
}
