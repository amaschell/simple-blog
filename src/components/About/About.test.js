import React from 'react';
import ReactDOM from "react-dom";
import {mount, shallow} from 'enzyme';

import * as requests from '../../config/requestsAndURLs';
import mockedUsers from '../../__mocks__/usersMock.json';

import About from './About';
import UserInfo from "./UserInfo";
import InfoMessage from "../InfoMessage/InfoMessage";


describe('About', () => {
    const MockAdapter = require('axios-mock-adapter');
    const axios = require('axios');

    let wrapper;
    let mock;

    beforeEach(() => {
        mock = new MockAdapter(axios);
        wrapper = mount(<About />);
    });


    test('Renders without crashing.', () => {
        mock.onGet(requests.makeRequestURL(requests.makeAboutURL())).reply(200, mockedUsers);

        const div = document.createElement('div');
        ReactDOM.render(wrapper, div);
    });

    test('Loads all authors and displays them properly.', async (done) => {
        mock.onGet(requests.makeRequestURL(requests.makeAboutURL())).reply(200, mockedUsers);

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
        const wrappedUserInfo = shallow(<UserInfo {...props} />);

        ReactDOM.render(wrappedUserInfo, div);
    });

    test('UserInfo components display correct data.', async (done) => {

        mock.onGet(requests.makeRequestURL(requests.makeAboutURL())).reply(200, mockedUsers);

        function getFullName(user) {
            return user.firstName + ' ' + user.lastName;
        }

        function testUser(user, userIndex) {
            const wrappedUser = wrapper.find('.about__usersList').childAt(userIndex);
            const wrappedImage = wrappedUser.find('.about__userPicture');

            expect(wrappedImage.props().src).toEqual(requests.makeImageSourceURL(user.profilePicture));
            expect(wrappedImage.props().title).toEqual(getFullName(user));
            expect(wrappedImage.props().alt).toEqual(getFullName(user));
            expect(wrappedUser.find('.about__userName').text()).toEqual(getFullName(user));
            expect(wrappedUser.find('.about__userDescription').text()).toEqual(user.description);
        }

        const user1 = mockedUsers[0],
              user2 = mockedUsers[1];

        await wrapper.instance().componentDidMount().then(response => {
            // The data should have been fetched properly.
            wrapper.update();
            expect(wrapper.find(UserInfo).length).toEqual(mockedUsers.length);
            expect(wrapper.find('li').length).toEqual(mockedUsers.length);

            testUser(user1, 0);
            testUser(user2, 1);

            done();
        });
    });

    test('Empty response from the server and rendering appropriate InfoMessage', async (done) => {
        mock.onGet(requests.makeRequestURL(requests.makeAboutURL())).reply(200, []);

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
        mock.onGet(requests.makeRequestURL(requests.makeAboutURL())).reply(400, []);

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