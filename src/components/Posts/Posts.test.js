import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import * as requests from '../../config/requestsUtility';
import mockedPosts from '../../__mocks__/postsMock.json';

import Posts from './Posts';
import PostAbstract from '../PostAbstract/PostAbstract';
import InfoMessage from '../InfoMessage/InfoMessage';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

describe('Posts', () => {
    const MockAdapter = require('axios-mock-adapter');
    const axios = require('axios');

    const getRequestURLForPosts = requests.makeRequestURL(requests.makePostsURL());
    let wrapperWithRouter;
    let mock;

    /**
     * Helper function to determine if a loading indicator is currently present in the wrapped component or not.
     *
     * @param wrapper The wrapped component to test.
     * @param shouldBePresent True if the loading indicator should be present. False otherwise.
     */
    function testThePresenceOfALoadingIndicator(wrapper, shouldBePresent = true) {
        expect(wrapper.find(LoadingIndicator).length).toEqual(shouldBePresent ? 1 : 0);
    }

    beforeEach(() => {
        mock = new MockAdapter(axios);
        // We have to wrap the component inside a MemoryRouter as the Link component of react-router-dom gets
        // used and therefore we always need a router context.
        wrapperWithRouter = mount(
            <MemoryRouter>
                <Posts />
            </MemoryRouter>
        );
    });


    test('Renders without crashing.', () => {
        mock.onGet(getRequestURLForPosts).reply(200, mockedPosts);

        const div = document.createElement('div');
        ReactDOM.render(wrapperWithRouter, div);
    });

    test('Loads all posts and displays them properly.', async (done) => {
        mock.onGet(getRequestURLForPosts).reply(200, mockedPosts);

        // There should be a loading indicator so that the user knows that something is going on.
        testThePresenceOfALoadingIndicator(wrapperWithRouter);

        await wrapperWithRouter.find(Posts).instance().componentDidMount().then(response => {
            const postsComp = wrapperWithRouter.find(Posts);

            expect(postsComp.instance().state).toEqual({
                hasNotLoadedPostsYet: false,
                posts: mockedPosts,
                hasError: false
            });

            // Trigger re-render.
            wrapperWithRouter.update();

            // The request came back, so the indicator should no longer be visible.
            testThePresenceOfALoadingIndicator(wrapperWithRouter, false);
            // For each post, there should now be an entry in the UI.
            expect(wrapperWithRouter.find(PostAbstract).length).toEqual(mockedPosts.length);

            done();
        });
    });

    test('Empty response from the server and rendering appropriate InfoMessage', async (done) => {
        mock.onGet(getRequestURLForPosts).reply(200, []);

        // There should be a loading indicator so that the user knows that something is going on.
        testThePresenceOfALoadingIndicator(wrapperWithRouter);

        await wrapperWithRouter.find(Posts).instance().componentDidMount().then(response => {
            const postsComp = wrapperWithRouter.find(Posts);

            expect(postsComp.instance().state).toEqual({
                hasNotLoadedPostsYet: false,
                posts: [],
                hasError: false
            });

            // Trigger re-rendering.
            wrapperWithRouter.update();

            // The request came back, so the indicator should no longer be visible.
            testThePresenceOfALoadingIndicator(wrapperWithRouter, false);

            // No post entries should now has been rendered but a proper info message should be displayed!
            expect(wrapperWithRouter.find(PostAbstract).length).toEqual(0);
            expect(wrapperWithRouter.find(InfoMessage).length).toEqual(1);
            expect(wrapperWithRouter.find('.infoMessage__text').text()).toMatch('No posts seem to exist...');

            done();
        });
    });

    test('Error response from the server and rendering appropriate InfoMessage', async (done) => {
        mock.onGet(getRequestURLForPosts).reply(400, []);

        // There should be a loading indicator so that the user knows that something is going on.
        testThePresenceOfALoadingIndicator(wrapperWithRouter);

        await wrapperWithRouter.find(Posts).instance().componentDidMount().then(response => {
            const postsComp = wrapperWithRouter.find(Posts);

            expect(postsComp.instance().state).toEqual({
                hasNotLoadedPostsYet: false,
                posts: [],
                hasError: true
            });

            // Trigger re-rendering.
            wrapperWithRouter.update();

            // The request came back, so the indicator should no longer be visible.
            testThePresenceOfALoadingIndicator(wrapperWithRouter, false);

            // No post entries should now has been rendered but a proper info message should be displayed!
            expect(wrapperWithRouter.find(PostAbstract).length).toEqual(0);
            expect(wrapperWithRouter.find(InfoMessage).length).toEqual(1);
            expect(wrapperWithRouter.find('.infoMessage__text').text()).toMatch('Could not get proper response from server');

            done();
        });
    });
});