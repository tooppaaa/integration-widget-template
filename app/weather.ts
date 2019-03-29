interface Weather {
    name: string;
    temp: number;
    temp_min: number;
    temp_max: number;
    sky: string;
    desc:string;
    country:string;
    wind: Wind;
    humidity: number;
    pressure: number;
}

interface Wind {
    speed: number;
    deg: number;
    gust: number;
}