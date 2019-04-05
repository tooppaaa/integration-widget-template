import *  as React from "react";
import * as highcharts from 'highcharts'
import HighchartsReact from "highcharts-react-official";
import './PieCharts.less';

export interface PieChartsProps {
    title: string;
    period: string;
    tooltip: string;
    data: (number | [number, number] | [string, number] | [string, number, number] | [number, number, number] | highcharts.DataPoint)[];
}

export class PieCharts extends React.Component<PieChartsProps> {
    constructor(props: PieChartsProps) {
        super(props);
    }

    private getDefaultOptions(): highcharts.Options {
        return {
            series: [
                {
                    type: "pie",
                    name: this.props.tooltip,
                    innerSize: '30%',
                    cursor: 'default'
                }
            ],
            title: {
                text: ''
            },
            tooltip: {
                outside: true
            },
            chart: {
                width: 370,
                height: 340
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            credits: {
                enabled: false
            },
            legend: {
                useHTML: true,
                itemMarginTop: 40,
                symbolHeight: 20,
                symbolWidth: 20,
                verticalAlign: 'bottom',
                align: 'center'
            }
        };
    }

    public render() {
        const options: highcharts.Options = this.getDefaultOptions();
        options.series![0].data = this.props.data;
        return (
            <div className="pie-charts-template">
                <div className="title">
                    {this.props.title}
                </div>
                <div className="period">
                    {this.props.period}
                </div>
            <HighchartsReact
                highcharts={highcharts}
                options={options}
            />
            </div>
        );
    }
}