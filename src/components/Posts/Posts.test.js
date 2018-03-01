import React from 'react';
import ReactDOM from "react-dom";
import {Link, MemoryRouter} from 'react-router-dom';
import {mount} from 'enzyme';

import * as requests from '../../config/requestsAndURLs';
import mockedPosts from '../../__mocks__/postsMock.json';

import Posts from "./Posts";
import AbstractEntry from "./AbstractEntry";
import InfoMessage from '../InfoMessage/InfoMessage';

describe('Posts', () => {
    const MockAdapter = require('axios-mock-adapter');
    const axios = require('axios');


    let wrapperWithRouter;
    let mock;

    beforeEach(() => {
        mock = new MockAdapter(axios);
        wrapperWithRouter = mount(
            <MemoryRouter>
                <Posts />
            </MemoryRouter>
        );
    });


    test('Renders without crashing.', () => {
        mock.onGet(requests.makeRequestURL(requests.makePostsURL())).reply(200, mockedPosts);

        const div = document.createElement('div');
        ReactDOM.render(wrapperWithRouter, div);
    });

    test('Loads all posts and displays them properly.', async (done) => {
        mock.onGet(requests.makeRequestURL(requests.makePostsURL())).reply(200, mockedPosts);

        await wrapperWithRouter.find(Posts).instance().componentDidMount().then(response => {
            const postsComp = wrapperWithRouter.find(Posts);

            expect(postsComp.instance().state).toEqual({
                posts: mockedPosts,
                hasError: false
            });

            wrapperWithRouter.update();
            expect(wrapperWithRouter.find(AbstractEntry).length).toEqual(mockedPosts.length);

            done();
        });
    });

    test('AbstractEntry component renders without crashing.', () => {
        const div = document.createElement('div');
        const props = {
            post: mockedPosts[0]
        };
        const wrappedAbstractEntryWithRouter = mount(
            <MemoryRouter>
                <AbstractEntry {...props} />
            </MemoryRouter>
        );

        ReactDOM.render(wrappedAbstractEntryWithRouter, div);
    });

    test('AbstractEntry components display correct data.', async (done) => {

        mock.onGet(requests.makeRequestURL(requests.makePostsURL())).reply(200, mockedPosts);

        const post1 = mockedPosts[0],
              post2 = mockedPosts[1],
              post3 = mockedPosts[2];

        function testAbstractEntry(post, entryIndex) {
            const wrappedPost = wrapperWithRouter.find('.posts__list').childAt(entryIndex);
            const wrappedLink = wrappedPost.find(Link);

            expect(wrappedLink.length).toEqual(1);
            expect(wrappedLink.text()).toEqual(post.title);
            expect(wrappedLink.prop('to')).toEqual(requests.makePostURL(post.url));

            expect(wrappedPost.find('.abstractEntry__date').text()).toEqual(post.date);
            expect(wrappedPost.find('.abstractEntry__author').text()).toMatch(post.author);
            expect(wrappedPost.find('.abstractEntry__abstract').text()).toEqual(post.abstract);
        }

        await wrapperWithRouter.find(Posts).instance().componentDidMount().then(response => {
            // The data should have been fetched properly.
            wrapperWithRouter.update();
            expect(wrapperWithRouter.find(AbstractEntry).length).toEqual(mockedPosts.length);
            expect(wrapperWithRouter.find('li').length).toEqual(mockedPosts.length);

            testAbstractEntry(post1, 0);
            testAbstractEntry(post2, 1);
            testAbstractEntry(post3, 2);

            done();
        })
    });

    test('Empty response from the server and rendering appropriate InfoMessage', async (done) => {
        mock.onGet(requests.makeRequestURL(requests.makePostsURL())).reply(200, []);

        await wrapperWithRouter.find(Posts).instance().componentDidMount().then(response => {
            const postsComp = wrapperWithRouter.find(Posts);

            expect(postsComp.instance().state).toEqual({
                posts: [],
                hasError: false
            });

            wrapperWithRouter.update();

            expect(wrapperWithRouter.find(AbstractEntry).length).toEqual(0);
            expect(wrapperWithRouter.find(InfoMessage).length).toEqual(1);
            expect(wrapperWithRouter.find('.infoMessage__text').text()).toMatch('No posts seem to exist...');

            done();
        });
    });

    test('Error response from the server and rendering appropriate InfoMessage', async (done) => {
        mock.onGet(requests.makeRequestURL(requests.makePostsURL())).reply(400, []);

        await wrapperWithRouter.find(Posts).instance().componentDidMount().then(response => {
            const postsComp = wrapperWithRouter.find(Posts);

            expect(postsComp.instance().state).toEqual({
                posts: [],
                hasError: true
            });

            wrapperWithRouter.update();

            expect(wrapperWithRouter.find(AbstractEntry).length).toEqual(0);
            expect(wrapperWithRouter.find(InfoMessage).length).toEqual(1);
            expect(wrapperWithRouter.find('.infoMessage__text').text()).toMatch('Could not get proper response from server');

            done();
        });
    });
});