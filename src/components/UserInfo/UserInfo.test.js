import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import * as requests from '../../config/requestsUtility';
import mockedUsers from '../../__mocks__/usersMock.json';

import UserInfo from './UserInfo';

describe('UserInfo', () => {
    const mockedUser = mockedUsers[0];

    test('Renders without crashing.', () => {
        const div = document.createElement('div');
        const wrapper = shallow(
            <UserInfo user={mockedUser} />
        );

        ReactDOM.render(wrapper, div);
    });

    test('Displays data correctly', () => {
        const { description, firstName, lastName, profilePicture } = mockedUser;
        const fullName = `${firstName} ${lastName}`;

        const wrapper = shallow(
            <UserInfo user={mockedUser} />
        );

        // The correct image is displayed for the user.
        const wrappedImage = wrapper.find('.userInfo__picture');
        expect(wrappedImage.props().src).toEqual(requests.makeImageSourceURL(profilePicture));
        expect(wrappedImage.props().title).toEqual(fullName);
        expect(wrappedImage.props().alt).toEqual(fullName);

        // The correct textual data is displayed for the user.
        expect(wrapper.find('.userInfo__name').text()).toEqual(fullName);
        expect(wrapper.find('.userInfo__description').text()).toEqual(description);
    });
});