import { shallow } from 'enzyme';
import * as React from 'react';
import { Status } from '../../components/Search/Status';
import { Line } from './Line';
import { ListEnlarged } from './List-Enlarged';

describe('Widget ListEnlarged', () => {
    let mockedProps: Line[];

    beforeAll(() => {
        mockedProps = [];
        mockedProps.push({id: 1, 
            urlPicture: '', 
            date: "12/12/2016",
            title: 'title', 
            subtitle: 'subtitle', 
            description: 'description',
            detail: Status.Validated});
    });

    afterEach(() => {
        const wrapper = shallow(<ListEnlarged showPicture={false} showStatus={false} values={mockedProps} />);

        expect(wrapper.exists('.line')).toBe(true);
        expect(wrapper.exists('.title')).toBe(true);
        expect(wrapper.exists('.subtitle')).toBe(true);
        expect(wrapper.exists('.description')).toBe(true);
    });

    it('With showPicture = true, Check if urlPicture is null/empty, show default icon', () => {
        const wrapper = shallow(<ListEnlarged showPicture={true} showStatus={false} values={mockedProps} />);
        
        expect(wrapper.exists('.icon-profil')).toBe(true);
        expect(wrapper.exists('.avatar-picture')).toBe(false);
    });

    it('With showPicture = true, Check if urlPicture is not null/empty, show image', () => {
        mockedProps[0].urlPicture = 'UrlForImage';
        const wrapper = shallow(<ListEnlarged showPicture={true} showStatus={false} values={mockedProps} />);
        
        expect(wrapper.exists('.icon-profil')).toBe(false);
        expect(wrapper.exists('.avatar-picture')).toBe(true);
    });

    it('With showPicture = false, Check if urlPicture or icon is not display', () => {
        mockedProps[0].urlPicture = 'UrlForImage';
        const wrapper = shallow(<ListEnlarged showPicture={false} showStatus={false} values={mockedProps} />);
        
        expect(wrapper.exists('.icon-profil')).toBe(false);
        expect(wrapper.exists('.avatar-picture')).toBe(false);
    });

    it('With showStatus = true, Check if detail validated is displayed with the right color', () => {
        mockedProps[0].detail = Status.Validated;
        const wrapper = shallow(<ListEnlarged showPicture={true} showStatus={true} values={mockedProps} />);
        
        expect(wrapper.find('.status').length).toBe(1);
        expect(wrapper.find('.status').hasClass('Validated')).toBe(true);
        expect(wrapper.find('.status').hasClass('Canceled')).toBe(false);
    });

    it('With showStatus = true, Check if detail canceled is displayed with the right color', () => {
        mockedProps[0].detail = Status.Canceled;
        const wrapper = shallow(<ListEnlarged showPicture={true} showStatus={true} values={mockedProps} />);
        
        expect(wrapper.find('.status').length).toBe(1);
        expect(wrapper.find('.status').hasClass('Validated')).toBe(false);
        expect(wrapper.find('.status').hasClass('Canceled')).toBe(true);
    });

    it('Check if the right detail selected is displayed from the selection in the left list', () => {
        mockedProps.push({id: 2, 
            urlPicture: '', 
            date: "10/10/2019",
            title: 'title2', 
            subtitle: 'subtitle2', 
            description: 'description2',
            detail: Status.InProgress});
        const wrapper = shallow(<ListEnlarged showPicture={true} showStatus={true} values={mockedProps} />);

        wrapper.setState({selectedItem: 2});

        expect(wrapper.find('.detail').findWhere(x => x.hasClass('active')).length).toBe(1);
        expect(wrapper.find('.detail').findWhere(x => x.hasClass('active')).key()).toBe('2');
    });

    it('Check if element in left list is selected when resize widget', () => {
        mockedProps.push({id: 2, 
            urlPicture: '', 
            date: "10/10/2019",
            title: 'title2', 
            subtitle: 'subtitle2', 
            description: 'description2',
            detail: Status.InProgress});
        const wrapper = shallow(<ListEnlarged showPicture={true} showStatus={true} values={mockedProps} />);

        expect(wrapper.find('.detail').findWhere(x => x.hasClass('active')).length).toBe(1);
        expect(wrapper.find('.detail').findWhere(x => x.hasClass('active')).key()).toBe('1');
    });
});