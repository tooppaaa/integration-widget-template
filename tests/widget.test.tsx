import { mount, shallow } from 'enzyme';
import * as React from 'react';
import { Widget } from '../app/widget';
import { WidgetProps, MyTSHostService, RequestOptions, HeaderActionConfiguration } from "@talentsoft-opensource/integration-widget-contract/dist/widget-contract-myts"

describe('Widget', () => {
    const myTSHostService: MyTSHostService = {
        loadData: () => Promise.resolve([]),
        setDataIsLoading: () => jest.fn(),
        setDataIsLoaded: () => jest.fn(),
        openUrlInNewTab: (url: string) => jest.fn(),
        openUrlInCurrentTab: (url: string) => jest.fn(),
        getUrlForCurrentContext: (url: string) => Promise.resolve(""),
        requestExternalResource: (options: RequestOptions) => Promise.resolve({headers: {"": undefined}, status: 200, body: ""}),
        raiseError: () => {}, 
        setHeaderActionConfiguration: (configuration: HeaderActionConfiguration) => jest.fn(),
        widgetIsEnlarged: () => false
    };

    var params: { [name: string]: string; } = {};
    params["url"] = "url";

    const props: WidgetProps = {
        myTSHostService: myTSHostService,
        language: 'fr-fr',
        params: params
    };

    const renderWidget = async () => {

        const mockWidget = await mount(<Widget {...props} />);

        mockWidget.update();

        return mockWidget;
    };

    it('Display table with good columns', async () => {
        const mockWidget = await renderWidget();

        const headerColumns = mockWidget.find('thead').find('tr').find('th');
        expect(headerColumns.at(0).text()).toBe('City');
        expect(headerColumns.at(1).text()).toBe('Temperature');
        expect(headerColumns.at(2).text()).toBe('Weather');
        expect(headerColumns.at(3).text()).toBe('Cancel');
    });
});