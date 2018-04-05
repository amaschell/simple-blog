import React from 'react';
import ReactDOM from 'react-dom';
import {Link, MemoryRouter} from 'react-router-dom';
import {mount} from 'enzyme';

import * as requests from '../../config/requestsUtility';
import mockedPosts from '../../__mocks__/postsMock.json';

import Posts from './Posts';
import AbstractEntry from './AbstractEntry';
import InfoMessage from '../InfoMessage/InfoMessage';

describe('Posts', () => {
    const MockAdapter = require('axios-mock-adapter');
    const axios = require('axios');

    const getRequestURLForPosts = requests.makeRequestURL(requests.makePostsURL());
    let wrapperWithRouter;
    let mock;

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

        await wrapperWithRouter.find(Posts).instance().componentDidMount().then(response => {
            const postsComp = wrapperWithRouter.find(Posts);

            expect(postsComp.instance().state).toEqual({
                posts: mockedPosts,
                hasError: false
            });

            // Trigger re-render.
            wrapperWithRouter.update();
            // For each post, there should now be an entry in the UI.
            expect(wrapperWithRouter.find(AbstractEntry).length).toEqual(mockedPosts.length);

            done();
        });
    });

    test('AbstractEntry component renders without crashing.', () => {
        const div = document.createElement('div');
        const props = {
            post: mockedPosts[0]
        };
        // We have to wrap the AbstractEntry component inside a MemoryRouter as the Link component of react-router-dom
        // gets used and therefore we always need a router context.
        const wrappedAbstractEntryWithRouter = mount(
            <MemoryRouter>
                <AbstractEntry {...props} />
            </MemoryRouter>
        );

        ReactDOM.render(wrappedAbstractEntryWithRouter, div);
    });

    test('AbstractEntry components display correct data.', async (done) => {
        mock.onGet(getRequestURLForPosts).reply(200, mockedPosts);

        const post1 = mockedPosts[0],
              post2 = mockedPosts[1],
              post3 = mockedPosts[2];

        /**
         * A helper function that tests if an AbstractEntry component is properly displaying its content.
         * @param post The post content.
         * @param entryIndex The index of the entry in the UI list.
         */
        function testIfAbstractEntryIsCorrectlyDisplayingItsContent(post, entryIndex) {
            const {abstract, author, date, title, url} = post;

            const wrappedPost = wrapperWithRouter.find('.posts__list').childAt(entryIndex);
            const wrappedLink = wrappedPost.find(Link);

            expect(wrappedLink.length).toEqual(1);
            expect(wrappedLink.text()).toEqual(title);
            expect(wrappedLink.prop('to')).toEqual(requests.makePostURL(url));

            expect(wrappedPost.find('.abstractEntry__date').text()).toEqual(date);
            expect(wrappedPost.find('.abstractEntry__author').text()).toMatch(author);
            expect(wrappedPost.find('.abstractEntry__abstract').text()).toEqual(abstract);
        }

        await wrapperWithRouter.find(Posts).instance().componentDidMount().then(response => {
            // Trigger a re-rendering.
            wrapperWithRouter.update();
            // For each post, there should not be an entry in the UI.
            expect(wrapperWithRouter.find(AbstractEntry).length).toEqual(mockedPosts.length);
            expect(wrapperWithRouter.find('li').length).toEqual(mockedPosts.length);

            testIfAbstractEntryIsCorrectlyDisplayingItsContent(post1, 0);
            testIfAbstractEntryIsCorrectlyDisplayingItsContent(post2, 1);
            testIfAbstractEntryIsCorrectlyDisplayingItsContent(post3, 2);

            done();
        });
    });

    test('Empty response from the server and rendering appropriate InfoMessage', async (done) => {
        mock.onGet(getRequestURLForPosts).reply(200, []);

        await wrapperWithRouter.find(Posts).instance().componentDidMount().then(response => {
            const postsComp = wrapperWithRouter.find(Posts);

            expect(postsComp.instance().state).toEqual({
                posts: [],
                hasError: false
            });

            // Trigger re-rendering.
            wrapperWithRouter.update();

            // No post entries should now has been rendered but a proper info message should be displayed!
            expect(wrapperWithRouter.find(AbstractEntry).length).toEqual(0);
            expect(wrapperWithRouter.find(InfoMessage).length).toEqual(1);
            expect(wrapperWithRouter.find('.infoMessage__text').text()).toMatch('No posts seem to exist...');

            done();
        });
    });

    test('Error response from the server and rendering appropriate InfoMessage', async (done) => {
        mock.onGet(getRequestURLForPosts).reply(400, []);

        await wrapperWithRouter.find(Posts).instance().componentDidMount().then(response => {
            const postsComp = wrapperWithRouter.find(Posts);

            expect(postsComp.instance().state).toEqual({
                posts: [],
                hasError: true
            });

            // Trigger re-rendering.
            wrapperWithRouter.update();

            // No post entries should now has been rendered but a proper info message should be displayed!
            expect(wrapperWithRouter.find(AbstractEntry).length).toEqual(0);
            expect(wrapperWithRouter.find(InfoMessage).length).toEqual(1);
            expect(wrapperWithRouter.find('.infoMessage__text').text()).toMatch('Could not get proper response from server');

            done();
        });
    });
});