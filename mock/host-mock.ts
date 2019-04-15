/**
 * This file contains the callbacks that you can modify to test the display of your widget
 */
import { HostMock } from '@talentsoft-opensource/widget-display-tool/src/mock-definitions'
import { HttpResponse, RequestOptions, HeaderActionConfiguration } from '@talentsoft-opensource/integration-widget-contract'
import { AppHeaderActionConfiguration } from '@talentsoft-opensource/integration-widget-component';

export const hostmock: HostMock = {
    /**
     * This flag controls the requestExternalResource behavior:
     * - proxyMode: true => makes a real http request
     * - proxyMode: false => calls the mocked version defined in this file
     */
    proxyMode: false,

    /**
     * If proxyMode == true, when a direct connect request is made this secretkey will be used.
     * It should be identical to the one configured in the remote service that will be accessed.
     */
    secretKey: "5ysec",

    /**
     * If proxyMode == true, when a direct connect request is made this login will be used
     */
    login: "mylogin",

    /**
     * If proxyMode == false, this method is called instead of sending a request
     */
    requestExternalResource: (options: RequestOptions) => {
        const data = [
            {
                name: "My expense report",
                amount: 100,
                date: "12/12/2018",
                description: "my expense for food",
                status: "true"
            },
            {
                name: "My expense report 2",
                amount: 20,
                date: "02/02/2018",
                description: "my expense for food 2 zeoeijfozi fiozjf iozejfi de zejfio jzeiofjzeo ifjzeoi ziojfo zjiofeiofjzeiof oizjfioze jofiz oifzejiof",
                status: "true"
            },
            {
                name: "My expense report 3",
                amount: 30,
                date: "03/03/2018",
                description: "my expense for food during event",
                status: "false"
            },
            {
                name: "My expense report 4",
                amount: 444,
                date: "04/04/2019",
                description: "my expense for driver in Paris",
                status: "pending"
            },
            {
                name: "My expense report 4",
                amount: 444,
                date: "04/04/2019",
                description: "my expense for driver in Paris",
                status: "pending"
            },
            {
                name: "My expense report 4",
                amount: 444,
                date: "04/04/2019",
                description: "my expense for driver in Paris",
                status: "pending"
            },
            {
                name: "My expense report 4",
                amount: 444,
                date: "04/04/2019",
                description: "my expense for driver in Paris",
                status: "pending"
            },
            {
                name: "My expense report 4",
                amount: 444,
                date: "04/04/2019",
                description: "my expense for driver in Paris",
                status: "pending"
            },
        ];
    
        return new Promise<HttpResponse>((resolve, reject) => {
            const response: HttpResponse = {
                body: JSON.stringify(data),
                status: 200,
                headers: {}
            };
            resolve(response);
        });
    },

    /**
     * This object is passed to the *params* prop in the widget.
     * It may contain any property you need for the widget.
     * In production, those properties are defined for each 
     * client but you may provide default values.
     */
    configuration: {
        domain:"https://www.exemple.com",
    },

    /**
     * This function is called to generate the autoconnect url when using
     * openUrlinNewTab or openUrlinCurrentTab
     */
    getAutoConnectUrl(url: string): string {
        return url;
    }
}
