import React from 'react';
import ReactDOM from "react-dom";
import {mount, shallow} from 'enzyme';

import * as requests from '../../config/requestsUtility';
import mockedUsers from '../../__mocks__/usersMock.json';

import About from './About';
import UserInfo from "./UserInfo";
import InfoMessage from "../InfoMessage/InfoMessage";


describe('About', () => {
    const MockAdapter = require('axios-mock-adapter');
    const axios = require('axios');

    const getRequestURLForUsers = requests.makeRequestURL(requests.makeAboutURL());
    let wrapper;
    let mock;

    beforeEach(() => {
        mock = new MockAdapter(axios);
        wrapper = mount(<About />);
    });


    test('Renders without crashing.', () => {
        mock.onGet(getRequestURLForUsers).reply(200, mockedUsers);

        const div = document.createElement('div');
        ReactDOM.render(wrapper, div);
    });

    test('Loads all authors and displays them properly.', async (done) => {
        mock.onGet(getRequestURLForUsers).reply(200, mockedUsers);

        await wrapper.instance().componentDidMount().then(response => {
            // The users returned by the server are properly represented in the state.
            expect(wrapper.state('users')).toEqual(mockedUsers);
            expect(wrapper.state('hasError')).toEqual(false);
            wrapper.update();
            // Each user in the state is represented with a UserInfo component.
            expect(wrapper.find(UserInfo).length).toEqual(mockedUsers.length);

            done();
        });
    });

    test('UserInfo component renders without crashing.', () => {
        const div = document.createElement('div');
        const props = {
            user: mockedUsers[0]
        };
        const wrappedUserInfo = shallow(<UserInfo {...props} />);

        ReactDOM.render(wrappedUserInfo, div);
    });

    test('UserInfo components display correct data.', async (done) => {
        mock.onGet(getRequestURLForUsers).reply(200, mockedUsers);

        /**
         * Helper method to determine the full name of a given user.
         *
         * @param user The given user.
         * @returns {string} The full name of the user.
         */
        function getFullName(user) {
            return user.firstName + ' ' + user.lastName;
        }

        /**
         * Helper method that tests if a user is properly displayed in the UI.
         *
         * @param user The user to test.
         * @param userIndex The index of the user in the list.
         */
        function testIfUserIsProperlyDisplayedInTheUI(user, userIndex) {
            const wrappedUser = wrapper.find('.about__usersList').childAt(userIndex);
            const wrappedImage = wrappedUser.find('.about__userPicture');

            const {description, profilePicture} = user;
            const fullName = getFullName(user);

            // The correct image is displayed for the user.
            expect(wrappedImage.props().src).toEqual(requests.makeImageSourceURL(profilePicture));
            expect(wrappedImage.props().title).toEqual(fullName);
            expect(wrappedImage.props().alt).toEqual(fullName);
            // The correct textual data is displayed for the user.
            expect(wrappedUser.find('.about__userName').text()).toEqual(fullName);
            expect(wrappedUser.find('.about__userDescription').text()).toEqual(description);
        }

        const user1 = mockedUsers[0],
              user2 = mockedUsers[1];

        await wrapper.instance().componentDidMount().then(response => {
            // The data should have been fetched properly.
            wrapper.update();
            expect(wrapper.find(UserInfo).length).toEqual(mockedUsers.length);
            expect(wrapper.find('li').length).toEqual(mockedUsers.length);

            testIfUserIsProperlyDisplayedInTheUI(user1, 0);
            testIfUserIsProperlyDisplayedInTheUI(user2, 1);

            done();
        });
    });

    test('Empty response from the server and rendering appropriate InfoMessage', async (done) => {
        mock.onGet(getRequestURLForUsers).reply(200, []);

        await wrapper.instance().componentDidMount().then(response => {
            // There should be no users in the state but also no error.
            expect(wrapper.state('users')).toEqual([]);
            expect(wrapper.state('hasError')).toEqual(false);

            wrapper.update();

            // Only a info message about missing authors should have gotten displayed.
            expect(wrapper.find(UserInfo).length).toEqual(0);
            expect(wrapper.find(InfoMessage).length).toEqual(1);
            expect(wrapper.find('.infoMessage__text').text()).toMatch('No authors seem to exist...');

            done();
        });
    });

    test('Error response from the server and rendering appropriate InfoMessage', async (done) => {
        mock.onGet(getRequestURLForUsers).reply(400, []);

        await wrapper.instance().componentDidMount().then(response => {
            // There should be no users in the state but the error should have been saved in the state.
            expect(wrapper.state('users')).toEqual([]);
            expect(wrapper.state('hasError')).toEqual(true);

            wrapper.update();

            // A proper info message for the error should have been displayed.
            expect(wrapper.find(UserInfo).length).toEqual(0);
            expect(wrapper.find(InfoMessage).length).toEqual(1);
            expect(wrapper.find('.infoMessage__text').text()).toMatch('Could not get proper response from server');

            done();
        });
    });
});