import { shallow } from 'enzyme';
import * as React from 'react';
import { List, Line } from './List';
import { Status } from '../../components/Search/Status';

describe('Widget List', () => {
    let mockedProps: Line[];

    beforeAll(() => {
        mockedProps = [];
        mockedProps.push({id: 1, 
            urlPicture: '', 
            title: 'title', 
            subtitle: 'subtitle', 
            description: 'description',
            detail: Status.Validated});
    });

    afterEach(() => {
        const wrapper = shallow(<List showPicture={false} showDetail={false} values={mockedProps} />);

        expect(wrapper.exists('.line')).toBe(true);
        expect(wrapper.exists('.subtitle')).toBe(true);
        expect(wrapper.exists('.description')).toBe(true);
    });

    it('With showPicture = true, Check if urlPicture is null/empty, show default icon', () => {
        const wrapper = shallow(<List showPicture={true} showDetail={false} values={mockedProps} />);
        
        expect(wrapper.exists('.icon-profil')).toBe(true);
        expect(wrapper.exists('.avatar-picture')).toBe(false);
    });

    it('With showPicture = true, Check if urlPicture is not null/empty, show image', () => {
        mockedProps[0].urlPicture = 'UrlForImage';
        const wrapper = shallow(<List showPicture={true} showDetail={false} values={mockedProps} />);
        
        expect(wrapper.exists('.icon-profil')).toBe(false);
        expect(wrapper.exists('.avatar-picture')).toBe(true);
    });

    it('With showPicture = false, Check if urlPicture or icon is not display', () => {
        mockedProps[0].urlPicture = 'UrlForImage';
        const wrapper = shallow(<List showPicture={false} showDetail={false} values={mockedProps} />);
        
        expect(wrapper.exists('.icon-profil')).toBe(false);
        expect(wrapper.exists('.avatar-picture')).toBe(false);
    });

    it('With showDetail = true, Check if detail validated is displayed with the right color', () => {
        mockedProps[0].detail = Status.Validated;
        const wrapper = shallow(<List showPicture={true} showDetail={true} values={mockedProps} />);
        
        expect(wrapper.find('.detail').length).toBe(1);
        expect(wrapper.find('.detail').hasClass('Validated')).toBe(true);
        expect(wrapper.find('.detail').hasClass('Canceled')).toBe(false);
    });

    it('With showDetail = true, Check if detail canceled is displayed with the right color', () => {
        mockedProps[0].detail = Status.Canceled;
        const wrapper = shallow(<List showPicture={true} showDetail={true} values={mockedProps} />);
        
        expect(wrapper.find('.detail').length).toBe(1);
        expect(wrapper.find('.detail').hasClass('Validated')).toBe(false);
        expect(wrapper.find('.detail').hasClass('Canceled')).toBe(true);
    });
});