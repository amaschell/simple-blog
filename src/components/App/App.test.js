import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, MemoryRouter} from 'react-router-dom';
import {mount} from 'enzyme';

import App from './App';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import * as requests from '../../config/requestsUtility';

describe('App', () => {
    let mountedWrapper, mock;

    const MockAdapter = require('axios-mock-adapter');
    const axios = require('axios');

    beforeEach(() => {
        // As we mount the App component and as the Home component (The index) makes a GET request to
        // fetch the latest post when itself mounts, we need to mock this particular request each time.
        mock = new MockAdapter(axios);
        mock.onGet(requests.makeRequestURL(requests.makeIndexURL())).reply(200, {});

        // We need to wrap the component inside a router here because the App component uses react-router-dom's
        // BrowserRouter component and needs therefore a router context.
        mountedWrapper = mount(
            <MemoryRouter>
                <App/>
            </MemoryRouter>
        );
    });

    test('Renders without crashing.', () => {
        const div = document.createElement('div');
        ReactDOM.render(mountedWrapper, div);
    });

    test('Should have a Router.', () => {
        expect(mountedWrapper.find(BrowserRouter)).toHaveLength(1);
    });

    test('Should have a Header.', () => {
        expect(mountedWrapper.find(Header)).toHaveLength(1);
    });

    test('Should have a Main section.', () => {
        expect(mountedWrapper.find(Main)).toHaveLength(1);
    });

    test('Should have a Footer.', () => {
        expect(mountedWrapper.find(Footer)).toHaveLength(1);
    });

    test('Descendants should have the following order: Header, Main, Footer.', () => {
        const wrapperDiv = mountedWrapper.find('.app');

        expect(wrapperDiv.children().length).toEqual(3);
        expect(wrapperDiv.childAt(0).is(Header)).toEqual(true);
        expect(wrapperDiv.childAt(1).is(Main)).toEqual(true);
        expect(wrapperDiv.childAt(2).is(Footer)).toEqual(true);
    });
});
