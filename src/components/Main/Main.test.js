import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter, Switch} from 'react-router-dom';
import {mount} from 'enzyme';

import About from '../About/About';
import Contact from "../Contact/Contact";
import Home from "../Home/Home";
import Main from './Main';
import Post from '../Post/Post';
import Posts from '../Posts/Posts';
import UnknownRoute from "../InfoMessage/InfoMessage";
import * as requests from "../../config/requestsUtility";

// We need to wrap the component inside a router several times here because the Main component uses react-router-dom's
// Switch and Route component and needs therefore a router context.
describe('Main', () => {
    const MockAdapter = require('axios-mock-adapter');
    const axios = require('axios');

    let wrapper;
    let mock;

    beforeEach(() => {
        mock = new MockAdapter(axios);
        wrapper = mount(
            <MemoryRouter>
                <Main />
            </MemoryRouter>
        );
    });

    test('Main component renders without crashing.', () => {
        const div = document.createElement('div');
        ReactDOM.render(wrapper, div);
    });

    test('Should be rendered with as <main> element.', () => {
        expect(wrapper.find(Main).childAt(0).type()).toEqual('main');
    });

    test('Should have a Switch.', () => {
       expect(wrapper.find(Switch)).toHaveLength(1);
    });

    test('Unknown page should redirect to 404.', () => {
        wrapper = mount(
            <MemoryRouter initialEntries={[ '/random' ]}>
                <Main />
            </MemoryRouter>
        );

        expect(wrapper.find(Home)).toHaveLength(0);
        expect(wrapper.find(UnknownRoute)).toHaveLength(1);
    });

    test('Should render the home page for /.', () => {
        wrapper = mount(
            <MemoryRouter initialEntries={[ '/' ]}>
                <Main />
            </MemoryRouter>
        );

        expect(wrapper.find(Home)).toHaveLength(1);
    });

    test('Should render the about page for /about.', () => {
        // Mock the request happening inside the About component.
        mock.onGet(requests.makeRequestURL(requests.makeAboutURL())).reply(200, []);

        wrapper = mount(
            <MemoryRouter initialEntries={[ '/about' ]}>
                <Main />
            </MemoryRouter>
        );

        expect(wrapper.find(About)).toHaveLength(1);
    });

    test('Should render the posts page for /posts.', () => {
        // Mock the request happening inside the Posts component.
        mock.onGet(requests.makeRequestURL(requests.makePostsURL())).reply(200, []);
        wrapper = mount(
            <MemoryRouter initialEntries={[ '/posts' ]}>
                <Main />
            </MemoryRouter>
        );

        expect(wrapper.find(Posts)).toHaveLength(1);
    });

    test('Should render the post page for /posts/test.', () => {
        // Mock the request happening inside the Post component.
        mock.onGet(requests.makeRequestURL(requests.makePostURL('test'))).reply(200, {});

        wrapper = mount(
            <MemoryRouter initialEntries={[ '/posts/test' ]}>
                <Main />
            </MemoryRouter>
        );

        expect(wrapper.find(Post)).toHaveLength(1);
    });

    test('Should render the contact page for /contact.', () => {
        wrapper = mount(
            <MemoryRouter initialEntries={[ '/contact' ]}>
                <Main />
            </MemoryRouter>
        );

        expect(wrapper.find(Contact)).toHaveLength(1);
    });
});


