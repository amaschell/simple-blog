import React from 'react';
import ReactDOM from "react-dom";
import {mount} from 'enzyme';

import * as requests from '../../config/requestsAndURLs';
import mockedUsers from '../../__mocks__/usersMock.json';

import About from './About';
import UserInfo from "./UserInfo";
import {makeAboutURL} from "../../config/requestsAndURLs";
import InfoMessage from "../InfoMessage/InfoMessage";


describe('About', () => {
    const MockAdapter = require('axios-mock-adapter');
    const axios = require('axios');

    // Utility methods
    function getFullName(user) {
        return user.firstName + ' ' + user.lastName;
    }

    function getWrappedUser(wrapper, index) {
        return wrapper.find('.about__usersList').childAt(index);
    }

    function getWrappedImage(wrappedUser) {
        return wrappedUser.find('.about__userPicture');
    }

    function getUserName(wrappedUser) {
        return wrappedUser.find('.about__userName');
    }

    function getUserDescription(wrappedUser) {
        return wrappedUser.find('.about__userDescription');
    }

    let wrapper;
    let mock;

    beforeEach(() => {
        mock = new MockAdapter(axios);
        wrapper = mount(<About />);
    });


    test('Renders without crashing.', () => {
        mock.onGet(requests.makeRequestURL(makeAboutURL())).reply(200, mockedUsers);

        const div = document.createElement('div');
        ReactDOM.render(wrapper, div);
    });

    test('Loads all authors and displays them properly.', async (done) => {
        mock.onGet(requests.makeRequestURL(makeAboutURL())).reply(200, mockedUsers);

        await wrapper.instance().componentDidMount().then(response => {
            expect(wrapper.state('users')).toEqual(mockedUsers);
            expect(wrapper.state('hasError')).toEqual(false);
            wrapper.update();
            expect(wrapper.find(UserInfo).length).toEqual(mockedUsers.length);

            done();
        });
    });

    test('UserInfo component renders without crashing.', () => {
        const div = document.createElement('div');
        const props = {
            user: mockedUsers[0]
        };
        const wrappedUserInfo = mount(<UserInfo {...props} />);

        ReactDOM.render(wrappedUserInfo, div);
    });

    test('UserInfo components display correct data.', async (done) => {

        mock.onGet(requests.makeRequestURL(makeAboutURL())).reply(200, mockedUsers);

        const user1 = mockedUsers[0],
              user2 = mockedUsers[1];

        await wrapper.instance().componentDidMount().then(response => {
            // The data should have been fetched properly.
            wrapper.update();
            expect(wrapper.find(UserInfo).length).toEqual(mockedUsers.length);
            expect(wrapper.find('li').length).toEqual(mockedUsers.length);


            // User 1
            const wrappedUser1 = getWrappedUser(wrapper, 0);
            const wrappedImage1 = getWrappedImage(wrappedUser1);

            expect(wrappedImage1.props().src).toEqual(requests.makeImageSourceURL(user1.profilePicture));
            expect(wrappedImage1.props().title).toEqual(getFullName(user1));
            expect(wrappedImage1.props().alt).toEqual(getFullName(user1));
            expect(getUserName(wrappedUser1).text()).toEqual(getFullName(user1));
            expect(getUserDescription(wrappedUser1).text()).toEqual(user1.description);

            // User 2
            const wrappedUser2 = getWrappedUser(wrapper, 1);
            const wrappedImage2 = getWrappedImage(wrappedUser2);

            expect(wrappedImage2.props().src).toEqual(requests.makeImageSourceURL(user2.profilePicture));
            expect(wrappedImage2.props().title).toEqual(getFullName(user2));
            expect(wrappedImage2.props().alt).toEqual(getFullName(user2));
            expect(getUserName(wrappedUser2).text()).toEqual(getFullName(user2));
            expect(getUserDescription(wrappedUser2).text()).toEqual(user2.description);


            done();
        });
    });

    test('Empty response from the server and rendering appropriate InfoMessage', async (done) => {
        mock.onGet(requests.makeRequestURL(makeAboutURL())).reply(200, []);

        await wrapper.instance().componentDidMount().then(response => {
            expect(wrapper.state('users')).toEqual([]);
            expect(wrapper.state('hasError')).toEqual(false);

            wrapper.update();

            expect(wrapper.find(UserInfo).length).toEqual(0);
            expect(wrapper.find(InfoMessage).length).toEqual(1);
            expect(wrapper.find('.infoMessage__text').text()).toMatch('No authors seem to exist...');

            done();
        });
    });

    test('Error response from the server and rendering appropriate InfoMessage', async (done) => {
        mock.onGet(requests.makeRequestURL(makeAboutURL())).reply(400, []);

        await wrapper.instance().componentDidMount().then(response => {
            expect(wrapper.state('users')).toEqual([]);
            expect(wrapper.state('hasError')).toEqual(true);

            wrapper.update();

            expect(wrapper.find(UserInfo).length).toEqual(0);
            expect(wrapper.find(InfoMessage).length).toEqual(1);
            expect(wrapper.find('.infoMessage__text').text()).toMatch('Could not get proper response from server');

            done();
        });
    });
});