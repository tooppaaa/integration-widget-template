import * as React from "react";
import { WidgetProps } from "@talentsoft-opensource/integration-widget-contract";
import { EnlargedWidget } from "./widget-enlarged";
import { NormalWidget } from "./widget-normal";
import { languagePacks, getLanguage, recordIsEmpty } from "./Resources";
import Provider from "./Provider";

interface WidgetState {
  isSearchVisible: boolean;
}

export class Widget extends React.Component<WidgetProps, WidgetState> {
  constructor(props: WidgetProps) {
    super(props);
    this.state = {
      isSearchVisible: false,
    };
    this.defineActionHeaders();
  }

  componentDidMount() {
    this.props.myTSHostService.setDataIsLoaded();
  }

  defineActionHeaders() {
    const { myTSHostService } = this.props;
    // Set to true to define your widget Logo as enlargeable
    myTSHostService.setHeaderActionConfiguration({
      enlargeable: true,
      customActions: {
        addAction: () => () => undefined,
        searchAction: () => {
          this.setState({ isSearchVisible: !this.state.isSearchVisible });
        },
      },
    });
  }

  public render() {
    let widget;

    if (this.props.myTSHostService.widgetIsEnlarged()) {
      widget = <EnlargedWidget />;
    } else {
      widget = <NormalWidget />;
    }

    return (
      <Provider {...this.props}>
        <div style={{ width: "100%" }}>{widget}</div>
      </Provider>
    );
  }
}
