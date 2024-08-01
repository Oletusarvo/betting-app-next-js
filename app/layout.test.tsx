import {screen, render} from '@testing-library/react';
import AppLayout from './layout';

describe('Testing the app layout', () => {
    const layout = render(<AppLayout/>);
    const APPNAME = process.env.APP_NAME;
    if(!APPNAME) throw new Error('.env does not define an APP_NAME!');

    it('It defines the correct title', () => {
        expect(layout.getByTestId('app-title')).toHaveTextContent(APPNAME);
    });
})