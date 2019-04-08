import * as React from "react";
import { WidgetProps } from "@talentsoft-opensource/integration-widget-contract";
import '../asset/widget-enlarged.less';
import Scrollbars from 'react-custom-scrollbars';

interface EnlargedWidgetProps {
    widgetProps: WidgetProps;
    cities: Weather[];
}

interface EnlargedWidgetState {
    cities: Weather[];
    searchResult: Weather[];
    displayAdd: boolean;
    selectedCity: string;
    searchtextvalue: string;
}

export class EnlargedWidget extends React.Component<EnlargedWidgetProps, EnlargedWidgetState> {
    constructor(props: EnlargedWidgetProps) {
        super(props);
        this.state = {
            cities: props.cities,
            searchResult:[],
            displayAdd: false,
            selectedCity: "",
            searchtextvalue: ""
        };
    }

    handleChangeSearch(textToSearch: string) {
        let cities = this.state.cities;
        if (textToSearch !== "") {
            cities = cities.filter(function(item) {
                if (item.name.toLocaleUpperCase().search(textToSearch.toLocaleUpperCase()) === -1) {
                    return false;
                }
                return true;
            });
            this.setState({ searchResult: cities, searchtextvalue: textToSearch });
        }
        else {
            this.setState({ cities: cities, searchtextvalue: textToSearch });
        }
    }

    componentDidMount() {
        const {widgetProps} = this.props;

        widgetProps.myTSHostService.setDataIsLoaded();
        widgetProps.myTSHostService.setHeaderActionConfiguration({enlargeable: true, 
            customActions: {
                addAction: (() => undefined),
                searchAction: () => (() => undefined)
            } });
        this.setState({selectedCity: this.state.cities[0].name});
    }

    remove(idx: number) {  
        // Concatening original items array returns new array - this is important!
        const items : Weather[] = this.state.cities;
        items.splice(idx, 1);
        this.setState({cities: items});
    }

    handleSelectCity(nameTab: string) {
        this.setState({selectedCity: nameTab});
    }

    render(){
        const data = this.state.searchtextvalue !== "" ? this.state.searchResult : this.state.cities;
        return(
        <div className="content-enlarged">
            <div className="cities">
                <Scrollbars autoHeight={true} autoHeightMin={450}>
                {data.map((item) => {
                    return (
                        <a onClick={() => this.handleSelectCity(item.name)} key={item.name}>
                            <div className={"city" + (this.state.selectedCity === item.name ? " selected" : "")}>
                                {item.name + ", " + item.country}
                            </div>
                        </a>
                    )
                })}
                </Scrollbars>
            </div>
            {data.map((item) => {
                    return (
                        <div className={"selected-city" + (this.state.selectedCity === item.name ? " active" : "")} key={item.name}>
                            <div className="city-title">
                                <div>{item.name + ", " + item.country}</div>
                                <div className="city-image"><img src={'http://openweathermap.org/img/w/' + item.sky + '.png'} id='CityWeather'/></div>
                            </div>
                            <div className="city-details">
                                <div className="city-detail-info">Temperature Min: {item.temp_min + "°C"}</div>
                                <div className="city-detail-info">Temperature: {item.temp + "°C"}</div>
                                <div className="city-detail-info">Temperature Max: {item.temp_max + "°C"}</div>
                                <div className="city-detail-info">Wind: {item.wind.speed + " m/s"}</div>
                                <div className="city-detail-info">Humidity: {item.humidity + "%"}</div>
                                <div className="city-detail-info">Pressure: {item.pressure + " hpa"}</div>
                            </div>
                        </div>
                    )
                })}
        </div>
        );
    }
}