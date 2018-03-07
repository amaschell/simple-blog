import React from 'react';
import ReactDOM from "react-dom";
import {Link, MemoryRouter} from 'react-router-dom';
import {mount} from 'enzyme';

import * as requests from '../../config/requestsAndURLs';
import mockedPosts from '../../__mocks__/postsMock.json';

import Post from "./Post";
import Entry from "./Entry";
import InfoMessage from '../InfoMessage/InfoMessage';


describe('Post', () => {
    const MockAdapter = require('axios-mock-adapter');
    const axios = require('axios');

    let wrapperWithRouter;
    let mock;
    const defaultPost = mockedPosts[0];

    beforeEach(() => {
        mock = new MockAdapter(axios);

        wrapperWithRouter = mount(
            <MemoryRouter initialEntries={[ requests.makePostURL(defaultPost.url) ]}>
                <Post match={{params: {slug: defaultPost.url}}}/>
            </MemoryRouter>
        );
    });

    test('Renders without crashing.', () => {
        mock.onGet(requests.makeRequestURL(requests.makePostURL(defaultPost.url))).reply(200, defaultPost);

        const div = document.createElement('div');
        ReactDOM.render(wrapperWithRouter, div);
    });

    test('Does always display a back-to-posts navigation link.', () => {
        mock.onGet(requests.makeRequestURL(requests.makePostURL(defaultPost.url))).reply(200, defaultPost);

        const navElement = wrapperWithRouter.find('.post__backNavigation');
        const backLink = navElement.childAt(0);

        expect(navElement.type()).toEqual('nav');
        expect(backLink.type()).toEqual(Link);
        expect(backLink.prop('to')).toEqual(requests.makePostsURL());
        expect(backLink.text()).toMatch('Back to posts');
    });

    test('Loads the post and displays it properly.', async (done) => {
        mock.onGet(requests.makeRequestURL(requests.makePostURL(defaultPost.url))).reply(200, defaultPost);

        await wrapperWithRouter.find(Post).instance().componentDidMount().then(response => {
            const postComp = wrapperWithRouter.find(Post);

            expect(postComp.instance().state).toEqual({
                  post: defaultPost,
                  hasGeneralServerError: false
            });

            wrapperWithRouter.update();
            expect(wrapperWithRouter.find(Entry).length).toEqual(1);

            done();
        });
    });

    test('Entry component renders without crashing.', () => {
        const div = document.createElement('div');
        const props = {
            post: defaultPost
        };

        const wrappedAbstractEntryWithRouter = mount(
                 <MemoryRouter>
                     <Entry {...props} />
                 </MemoryRouter>
        );

        ReactDOM.render(wrappedAbstractEntryWithRouter, div);
    });

    test('Entry component displays correct data.', async (done) => {
        mock.onGet(requests.makeRequestURL(requests.makePostURL(defaultPost.url))).reply(200, defaultPost);

        await wrapperWithRouter.find(Post).instance().componentDidMount().then(response => {
            // The data should have been fetched properly.
            wrapperWithRouter.update();

            const wrappedEntry = wrapperWithRouter.find(Entry);
            expect(wrappedEntry.length).toEqual(1);

            expect(wrappedEntry.find('.post__date').text()).toEqual(defaultPost.date);
            expect(wrappedEntry.find('.post__title').text()).toEqual(defaultPost.title);
            expect(wrappedEntry.find('.post__content').text()).toEqual(defaultPost.content);

            const wrappedLink = wrappedEntry.find(Link);
            expect(wrappedLink.length).toEqual(1);
            expect(wrappedLink.text()).toEqual(defaultPost.author);
            expect(wrappedLink.prop('to')).toEqual(requests.makeAboutURL());

            done();
        })
    });

    test('Unknown post renders appropriate 404 InfoMessage', async (done) => {
        mock.onGet(requests.makeRequestURL(requests.makePostURL(defaultPost.uri))).reply(404, null);

        await wrapperWithRouter.find(Post).instance().componentDidMount().then(response => {
            const postComp = wrapperWithRouter.find(Post);

            expect(postComp.instance().state).toEqual({
                post: null,
                hasGeneralServerError: false
            });

            wrapperWithRouter.update();

            expect(wrapperWithRouter.find(Entry).length).toEqual(0);
            expect(wrapperWithRouter.find(InfoMessage).length).toEqual(1);
            expect(wrapperWithRouter.find('.infoMessage__text').text()).toMatch('This post does not seem to exist...');

            done();
        });
    });

    test('Error response from the server and rendering appropriate InfoMessage', async (done) => {
        mock.onGet(requests.makeRequestURL(requests.makePostURL(defaultPost.url))).reply(500, {
            errors: [
                { message: 'Internal server failure.' }
            ],
        });

        await wrapperWithRouter.find(Post).instance().componentDidMount().then(response => {
            const postComp = wrapperWithRouter.find(Post);

            expect(postComp.instance().state).toEqual({
                post: null,
                hasGeneralServerError: true
            });

            wrapperWithRouter.update();

            expect(wrapperWithRouter.find(Entry).length).toEqual(0);
            expect(wrapperWithRouter.find(InfoMessage).length).toEqual(1);
            expect(wrapperWithRouter.find('.infoMessage__text').text()).toMatch('Could not get proper response from server');

            done();
        });
    });
});