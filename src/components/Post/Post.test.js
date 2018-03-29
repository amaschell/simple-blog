import React from 'react';
import ReactDOM from "react-dom";
import {Link, MemoryRouter} from 'react-router-dom';
import {mount} from 'enzyme';

import * as requests from '../../config/requestsUtility';
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
    const getRequestURLForDefaultPost = requests.makeRequestURL(requests.makePostURL(defaultPost.url));

    beforeEach(() => {
        mock = new MockAdapter(axios);

        // We have to wrap the component inside a MemoryRouter as the Link component of react-router-dom gets
        // used and therefore we always need a router context.
        wrapperWithRouter = mount(
            <MemoryRouter initialEntries={[ requests.makePostURL(defaultPost.url) ]}>
                <Post match={{params: {slug: defaultPost.url}}}/>
            </MemoryRouter>
        );
    });

    test('Renders without crashing.', () => {
        mock.onGet(getRequestURLForDefaultPost).reply(200, defaultPost);

        const div = document.createElement('div');
        ReactDOM.render(wrapperWithRouter, div);
    });

    test('Does always display a back-to-posts navigation link.', () => {
        mock.onGet(getRequestURLForDefaultPost).reply(200, defaultPost);

        const navElement = wrapperWithRouter.find('.post__backNavigation');
        const backLink = navElement.childAt(0);

        expect(navElement.type()).toEqual('nav');
        expect(backLink.type()).toEqual(Link);
        expect(backLink.prop('to')).toEqual(requests.makePostsURL());
        expect(backLink.text()).toMatch('Back to posts');
    });

    test('Loads the post and displays it properly.', async (done) => {
        mock.onGet(getRequestURLForDefaultPost).reply(200, defaultPost);

        await wrapperWithRouter.find(Post).instance().componentDidMount().then(response => {
            const postComp = wrapperWithRouter.find(Post);

            expect(postComp.instance().state).toEqual({
                  post: defaultPost,
                  hasGeneralServerError: false
            });

            // Trigger re-rendering.
            wrapperWithRouter.update();
            // There should now be one entry for the post in the UI.
            expect(wrapperWithRouter.find(Entry).length).toEqual(1);

            done();
        });
    });

    test('Entry component renders without crashing.', () => {
        const div = document.createElement('div');
        const props = {
            post: defaultPost
        };

        // We have to wrap the component inside a MemoryRouter as the Link component of react-router-dom gets
        // used and therefore we always need a router context.
        const wrappedAbstractEntryWithRouter = mount(
                 <MemoryRouter>
                     <Entry {...props} />
                 </MemoryRouter>
        );

        ReactDOM.render(wrappedAbstractEntryWithRouter, div);
    });

    test('Entry component displays correct data.', async (done) => {
        mock.onGet(getRequestURLForDefaultPost).reply(200, defaultPost);

        await wrapperWithRouter.find(Post).instance().componentDidMount().then(response => {
            // The data should have been fetched properly, trigger re-rendering.
            wrapperWithRouter.update();

            const {author, content, date, title} = defaultPost;

            const wrappedEntry = wrapperWithRouter.find(Entry);
            expect(wrappedEntry.length).toEqual(1);

            expect(wrappedEntry.find('.post__date').text()).toEqual(date);
            expect(wrappedEntry.find('.post__title').text()).toEqual(title);
            expect(wrappedEntry.find('.post__content').text()).toEqual(content);

            const wrappedLink = wrappedEntry.find(Link);
            expect(wrappedLink.length).toEqual(1);
            expect(wrappedLink.text()).toEqual(author);
            expect(wrappedLink.prop('to')).toEqual(requests.makeAboutURL());

            done();
        })
    });

    test('Unknown post renders appropriate 404 InfoMessage', async (done) => {
        mock.onGet(getRequestURLForDefaultPost).reply(404, null);

        await wrapperWithRouter.find(Post).instance().componentDidMount().then(response => {
            const postComp = wrapperWithRouter.find(Post);

            expect(postComp.instance().state).toEqual({
                post: null,
                hasGeneralServerError: false
            });

            // Trigger re-rendering.
            wrapperWithRouter.update();

            // No post should be in the UI now, only a proper info message should be displayed!
            expect(wrapperWithRouter.find(Entry).length).toEqual(0);
            expect(wrapperWithRouter.find(InfoMessage).length).toEqual(1);
            expect(wrapperWithRouter.find('.infoMessage__text').text()).toMatch('This post does not seem to exist...');

            done();
        });
    });

    test('Error response from the server and rendering appropriate InfoMessage', async (done) => {
        mock.onGet(getRequestURLForDefaultPost).reply(500, {
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

            // Trigger re-rendering.
            wrapperWithRouter.update();

            // No post should be in the UI now, only a proper info message should be displayed!
            expect(wrapperWithRouter.find(Entry).length).toEqual(0);
            expect(wrapperWithRouter.find(InfoMessage).length).toEqual(1);
            expect(wrapperWithRouter.find('.infoMessage__text').text()).toMatch('Could not get proper response from server');

            done();
        });
    });
});