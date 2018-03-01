import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import {mount} from 'enzyme';

import Header from './Header';
import Navigation from "../Navigation/Navigation";

describe('Header', () => {
    let wrapper;

    beforeEach(() => {
        // We need to wrap the component inside a router here because
        // one of the Header's sub components uses react router's Link component
        // and needs therefore a router context.
        wrapper = mount(<MemoryRouter>
                            <Header />
                          </MemoryRouter>
        );
    });

    test('Renders without crashing.', () => {
        const div = document.createElement('div');
        ReactDOM.render(wrapper, div);
    });

    test('Display the proper title.', () => {
        expect(wrapper.find('.header__title').text()).toEqual('A Rather Simplistic Blog');
    });

    test('Renders the Navigation component as its subordinate component.', () => {
        expect(wrapper.find(Navigation)).toHaveLength(1);
    });
});
