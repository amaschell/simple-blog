import React from 'react';
import ReactDOM from 'react-dom';
import { Link, MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import * as requests from '../../config/requestsUtility';
import mockedPosts from '../../__mocks__/postsMock.json';

import PostAbstract from './PostAbstract';

describe('PostAbstract', () => {
    const mockedPost = mockedPosts[0];
    let wrapper;

    beforeEach(() => {
        wrapper = mount(
            <MemoryRouter>
                <PostAbstract post={mockedPost}/>
            </MemoryRouter>
        );
    });

    test('Renders without crashing.', () => {
        const div = document.createElement('div');
        ReactDOM.render(wrapper, div);
    });

    test('It displays the data correclty.', () => {
        const { abstract, author, date, title, url } = mockedPost;

        const wrappedLink = wrapper.find(Link);

        expect(wrappedLink.length).toEqual(1);
        expect(wrappedLink.text()).toEqual(title);
        expect(wrappedLink.prop('to')).toEqual(requests.makePostURL(url));

        expect(wrapper.find('.postAbstract__date').text()).toEqual(date);
        expect(wrapper.find('.postAbstract__author').text()).toMatch(author);
        expect(wrapper.find('.postAbstract__abstract').text()).toEqual(abstract);
    });
});