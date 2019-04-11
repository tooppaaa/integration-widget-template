import { shallow } from 'enzyme';
import * as React from 'react';
import { PieCharts } from './PieCharts';
import { O_TRUNC } from 'constants';

describe('Widget PieCharts', () => {
    let mockedProps: (number | [number, number] | [string, number] | [string, number, number] | [number, number, number] | Highcharts.DataPoint)[];

    beforeAll(() => {
        mockedProps= [
            ['test1', 10],
            ['test2', 20],
            ['test3', 30],
            ['test4', 40]
        ]
    });

    it('Check if PieCharts has the good title displayed', () => {
        const wrapper = shallow(<PieCharts 
            data={mockedProps} 
            title="Pie Charts expenses" 
            period="24/03/2019 - 20/02/2020" 
            tooltip="My expenses"    
        />);
        
        expect(wrapper.exists('.pie-charts-template')).toBe(true);
        expect(wrapper.exists('.title')).toBe(true);
        expect(wrapper.find('.title').text()).toBe('Pie Charts expenses');
    });

    it('Check if PieCharts has the good period displayed', () => {
        const wrapper = shallow(<PieCharts 
            data={mockedProps} 
            title="Pie Charts expenses" 
            period="24/03/2019 - 20/02/2020" 
            tooltip="My expenses"    
        />);
        
        expect(wrapper.exists('.pie-charts-template')).toBe(true);
        expect(wrapper.exists('.period')).toBe(true);
        expect(wrapper.find('.period').text()).toBe('24/03/2019 - 20/02/2020');
    });
});