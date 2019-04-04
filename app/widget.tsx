import *  as React from "react";
import { WidgetProps } from "@talentsoft-opensource/integration-widget-contract"
import '../asset/widget.less'; 
import '../asset/image/logo-soleil.png';
import { EnlargedWidget } from "./widget-enlarged";
import AnimateHeight from 'react-animate-height';
import { throttle } from 'throttle-debounce';
import Scrollbars from 'react-custom-scrollbars';
import { ListTemplate, Line } from "./templates/ListTemplate/ListTemplate";

interface WidgetState {
    data: Weather[];
    searchResult: Weather[];
    addtextvalue: string;
    searchtextvalue: string;
    displayAddCity: boolean;
}

export class Widget extends React.Component<WidgetProps, WidgetState> {
    handleAddChangeThrottled: throttle<(e: any) => void>;
    constructor(props: WidgetProps) {
        super(props);
        this.state = { 
            data:[],
            searchResult:[],
            addtextvalue : "",
            searchtextvalue: "",
            displayAddCity: false
        };
        this.handleAddChangeThrottled = throttle(200, (e) => { this.handleAddChange(e) });
        this.defineActionHeaders();
    }
    
    componentDidMount(){
        this.loadCities();
    }

    loadCities() {
        this.getweather('Paris');
        this.getweather('London');
        this.getweather('Turin');
        this.getweather('Tunis');
        this.getweather('Tuni');
        this.getweather('Turi');
        this.getweather('Par');
        this.getweather('Rio');
        this.getweather('Lisbon');


        const {myTSHostService } = this.props;
        myTSHostService.setDataIsLoaded();
    }

    public async getweather(city:string) {
        const {myTSHostService} = this.props;
        const url = 'https://api.openweathermap.org/data/2.5/weather';
        let queryString = `?q=${city}&units=metric&appid=7848d30cce738e7887f77f176bb76f2c`;
       
        const response = await myTSHostService.requestExternalResource({verb: 'GET', url: url + queryString });

        if (response !== null){
            let data = [];
            try {
                data = JSON.parse(response.body);
            } 
            catch (e) {
                console.log(e);
            }  
            if (data.cod === 200){
                let weather:Weather= {
                    name:data.name,
                    temp:data.main.temp,
                    temp_min: data.main.temp_min,
                    temp_max: data.main.temp_max,
                    sky:data.weather[0].icon,
                    desc:data.weather[0].main,
                    country:data.sys.country,
                    humidity: data.main.humidity,
                    pressure: data.main.pressure,
                    wind: {
                        speed: data.wind.speed,
                        deg: data.wind.deg,
                        gust: data.wind.gust
                    }
                };
                    
                this.setState(prevState => ({
                    data: [...prevState.data, weather]
                }));
            }
            else {
                console.warn(city + ": " + data.message);
            }
        }
        else {
            alert("this city may not exist try again...")
        }
    }

    displayAddButton() {
        this.setState({ displayAddCity: !this.state.displayAddCity});
    }

    displayAddCity() {
        return(
            <AnimateHeight height={this.state.displayAddCity ? 'auto' : 0} className="AnimateHeight">
                <div className={'input-add'}>
                    <input type="text" placeholder="Add you city" onChange={(e) => { e.persist(); this.handleAddChangeThrottled(e); } } onKeyPress={(target) => (target.key === 'Enter' ? this.handleAddTodoItem() : undefined )} />
                        <button className="addButton" onClick={this.handleAddTodoItem}> 
                            <i className="icon-add"/>
                        </button>
                </div>
            </AnimateHeight>
        );
    }

    handleChangeSearch(textToSearch: string) {
        let cities = this.state.data;
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
            this.setState({ data: cities, searchtextvalue: textToSearch });
        }
    }

    defineActionHeaders() {
        const {myTSHostService} = this.props;
        // Set to true to define your widget Logo as enlargeable
        myTSHostService.setHeaderActionConfiguration({enlargeable: true, 
            customActions: {
                addAction: () => this.displayAddButton(),
                searchAction: (textToSearch: string) => this.handleChangeSearch(textToSearch)
            } });
    }

    handleAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ addtextvalue: e.target.value });
    }

    upperCaseF = (a:string) => {
        return a.charAt(0).toUpperCase() +a.slice(1);
    }

    remove(idx: number) {  
        const items : Weather[] = this.state.data;

        if (this.state.searchtextvalue !== "") {
            const itemToRemove: Weather = this.state.searchResult[idx];
            const indexInData = this.state.data.indexOf(itemToRemove);
            items.splice(indexInData, 1);
            this.setState({data: items}, () => {this.handleChangeSearch(this.state.searchtextvalue)});
        }
        else {
            items.splice(idx, 1);
            this.setState({data: items});
        }
    }

    //récupère la donnée entrée dans le textvalue et la push dans le array 
    handleAddTodoItem = () => {
        let city = this.upperCaseF(this.state.addtextvalue);
        if (city !== "" && !this.state.data.find(c => c.name === city)) {
            this.getweather(city);
        }
    }

    displayItems() {
        const data = this.state.searchtextvalue !== "" ? this.state.searchResult : this.state.data;
        
        return data.map((item:Weather, i:number) => {
            let urlImage = 'http://openweathermap.org/img/w/' + item.sky + '.png';

            return (
                <tr key={i}>
                    <td title={item.country}>{item.name}</td> 
                    <td>{Math.round(item.temp)+'°C'}</td>
                    <td title={item.desc}> 
                        <img src={urlImage} id='myimage'/>
                    </td>
                    <td>
                        <button onClick={() => this.remove(i) }>
                            <i className="icon-trash" />
                        </button>
                    </td>    
                </tr>
            );
        }); 
    }

    public render() {
        if (this.props.myTSHostService.widgetIsEnlarged()) {
            return (
                <EnlargedWidget widgetProps={this.props} cities={this.state.data} />
            );
        }
             
        let item: Line[] = [{id: 1, urlPicture: 'tres', title:'title', subtitle:'subtitle', description:'description', detail:false}];
        item.push({id: 2, urlPicture: 'tres', title:'title2', subtitle:'subtitle2', description:'description2', detail:false});
        item.push({id: 3, urlPicture: 'tres', title:'title3', subtitle:'subtitle3', description:'description3', detail:false});
        item.push({id: 4, urlPicture: 'tres', title:'title4', subtitle:'subtitle4', description:'description4', detail:false});

        return (
            <div className="content">
                {this.displayAddCity()}
                <div className="weather-cities">
                <Scrollbars autoHeight={true} autoHeightMin={450}>
                    {/* <table className="weather-table">
                        <thead>
                            <tr>
                                <th>City</th>
                                <th>Temperature</th>
                                <th>Weather</th>
                                <th>Cancel</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.displayItems()}
                        </tbody>
                    </table> */}
                        <ListTemplate showPicture={true} showDetail={true} values={item}/>
                    </Scrollbars>
                </div>
            </div>
        );      
    }
}
