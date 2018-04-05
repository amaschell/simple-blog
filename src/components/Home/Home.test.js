import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import {mount} from 'enzyme';

import Home from './Home';
import LatestPostPreview from './LatestPostPreview';
import InfoMessage from '../InfoMessage/InfoMessage';
import * as requests from '../../config/requestsUtility';
import mockedPosts from '../../__mocks__/postsMock.json';

describe('Home', () => {
    const MockAdapter = require('axios-mock-adapter');
    const axios = require('axios');

    const mockedPost = mockedPosts[0];
    const getLatestPostRequestUrl = requests.makeRequestURL(requests.makeIndexURL());

    let wrapper;
    let mock;

    /**
     * Helper function to test for the presence of all introduction texts.
     */
    function testIfAllIntroductionAndPresentationTextsArePresent() {
        expect(wrapper.find('.home__introduction').length).toEqual(1);
        expect(wrapper.find('.home__title').length).toEqual(1);
        expect(wrapper.find('.home__presentationText').length).toEqual(1);
        expect(wrapper.find('.home__finalPresentationPhrase').length).toEqual(1);
    }

    /**
     * Helper function for testing if the latest post section is not present.
     */
    function testIfTheLatestPostSectionIsNotGettingDisplayed() {
        expect(wrapper.find('.home__latestPost').length).toEqual(0);
        expect(wrapper.find('.home__latestPostMainTitle').length).toEqual(0);
        expect(wrapper.find('.home__latestPostEntryTitle').length).toEqual(0);
        expect(wrapper.find('.home__latestPostAbstract').length).toEqual(0);
        expect(wrapper.find('.home__latestPostShowMore').length).toEqual(0);
    }

    /**
     * Helper function to test if a given post is displayed correctly inside a given component as latest post.
     *
     * @param wrappedComponent The given component.
     * @param latestPost The given latest post.
     */
    function testIfPostGetsDisplayedCorrectlyAsLatestPostForComponent(wrappedComponent, latestPost) {
        // The post should be displayed with an article HTML element.
        expect(wrappedComponent.find('article').length).toEqual(1);

        // The heading should be visible and include the correct date for the latest post.
        const mainHeadingText = `Check out the latest post from the ${latestPost.date}!`;
        expect(wrappedComponent.find('.home__latestPostMainTitle').text()).toEqual(mainHeadingText);

        // Should display the post's abstract and title.
        expect(wrappedComponent.find('.home__latestPostEntryTitle').text()).toEqual(latestPost.title);
        expect(wrappedComponent.find('.home__latestPostAbstract').text()).toEqual(latestPost.abstract);

        // There should be exactly one "Show more" anchor element that is linking to the latest post.
        const relativePostUrl = requests.makePostURL(latestPost.url);
        expect(wrappedComponent.find('a').length).toEqual(1);
        expect(wrappedComponent.find('a').text()).toEqual('Read more...');
        expect(wrappedComponent.find('a').props().href).toEqual(relativePostUrl);
    }

    beforeEach(() => {
        mock = new MockAdapter(axios);
        // We have to wrap the component inside a MemoryRouter as the Link component of react-router-dom gets
        // used and therefore we always need a router context.
        wrapper = mount(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );
    });


    test('Renders without crashing.', () => {
        mock.onGet(getLatestPostRequestUrl).reply(200, mockedPost);

        const div = document.createElement('div');
        ReactDOM.render(wrapper, div);
    });

    test('LatestPostPreview component renders without crashing.', () => {
        const div = document.createElement('div');
        const props = {
            latestPost: mockedPost
        };

        // We have to wrap the LatestPostPreview component inside a MemoryRouter as the Link component of react-router-dom
        // gets used and therefore we always need a router context.
        const wrappedPreview = mount(
            <MemoryRouter>
                <LatestPostPreview {...props} />
            </MemoryRouter>
        );

        ReactDOM.render(wrappedPreview, div);
    });

    test('LatestPostPreview component displays all data correctly.', () => {
        const props = {
            latestPost: mockedPost
        };

        // We have to wrap the LatestPostPreview component inside a MemoryRouter as the Link component of react-router-dom
        // gets used and therefore we always need a router context.
        const wrappedPreview = mount(
            <MemoryRouter>
                <LatestPostPreview {...props} />
            </MemoryRouter>
        );

        testIfPostGetsDisplayedCorrectlyAsLatestPostForComponent(wrappedPreview, mockedPost);
    });

    test('Displays all introduction and presentation texts.', async (done) => {
        mock.onGet(getLatestPostRequestUrl).reply(200, mockedPost);

        // The texts should already be present before the server has returned the result for the request.
        testIfAllIntroductionAndPresentationTextsArePresent();

        await wrapper.find(Home).instance().componentDidMount().then(response => {
            // Trigger a re-rendering.
            wrapper.update();

            // All the texts should still be present after the state has been fetched from the server and after
            // the component has been re-rendered.
            testIfAllIntroductionAndPresentationTextsArePresent();

            done();
        });
    });

    test('The latest post has been fetched from the server and is displayed correctly.', async (done) => {
        mock.onGet(getLatestPostRequestUrl).reply(200, mockedPost);

        await wrapper.find(Home).instance().componentDidMount().then(response => {
            // Trigger a re-rendering.
            wrapper.update();

            // All the texts should still be present after the state has been fetched from the server and after
            // the component has been re-rendered.
            testIfAllIntroductionAndPresentationTextsArePresent();

            // There should also no error message getting displayed as there was no error on the server side.
            expect(wrapper.find(InfoMessage).length).toEqual(0);

            // The latest post should get displayed with the correct data!
            testIfPostGetsDisplayedCorrectlyAsLatestPostForComponent(wrapper, mockedPost);

            done();
        });
    });

    test('Error while fetching the latest post from the server is handled correctly.', async (done) => {
        mock.onGet(getLatestPostRequestUrl).reply(500);

        await wrapper.find(Home).instance().componentDidMount().then(response => {
            // Trigger a re-rendering.
            wrapper.update();

            // All the texts should still be present after the state has been fetched from the server and after
            // the component has been re-rendered.
            testIfAllIntroductionAndPresentationTextsArePresent();

            // There should be no latest post section getting displayed! And especially no link to the latest post!
            testIfTheLatestPostSectionIsNotGettingDisplayed();

            // There should be an error message getting displayed as there was a 500 error on the server side.
            expect(wrapper.find(InfoMessage).length).toEqual(1);
            expect(wrapper.find('.infoMessage__text').text()).toMatch(
                'An error occurred on the server while fetching the latest post...'
            );

            done();
        });
    });

    test('The request to the server was successful but there is no latest post is handled correctly.', async (done) => {
        mock.onGet(getLatestPostRequestUrl).reply(200, {});

        await wrapper.find(Home).instance().componentDidMount().then(response => {
            // Trigger a re-rendering.
            wrapper.update();

            // All the texts should still be present after the state has been fetched from the server and after
            // the component has been re-rendered.
            testIfAllIntroductionAndPresentationTextsArePresent();

            // There should be no latest post section getting displayed! And especially no link to the latest post!
            testIfTheLatestPostSectionIsNotGettingDisplayed();

            // There should also no error message getting displayed as there was no error on the server side.
            expect(wrapper.find(InfoMessage).length).toEqual(0);

            done();
        });
    });
});
