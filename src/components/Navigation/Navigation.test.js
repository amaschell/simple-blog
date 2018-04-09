import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import Navigation from './Navigation';
import * as requestsAndURLs from '../../config/requestsUtility';

describe('Navigation', () => {
    let wrapper;

    beforeEach(() => {
        // We need to wrap the component inside a router here because
        // Navigations's sub components use react router's Link component
        // and it needs therefore a proper routing context.
        wrapper = mount(<MemoryRouter>
                            <Navigation />
                        </MemoryRouter>
        );
    });

    /**
     * Helper method to test if a navigation item is well-defined.
     *
     * @param list The list that contains the navigation item.
     * @param itemIndex The item's index in the list.
     * @param itemText The text the item displays.
     * @param itemURL The URL the item navigates to.
     */
    function testIfIsProperNavigationItem(list, itemIndex, itemText, itemURL) {
        // Is a li HTML element.
        const navigationItem = list.childAt(itemIndex);
        expect(navigationItem.is('li')).toEqual(true);

        // Should have exactly one anchor HTML element.
        const anchor = navigationItem.find('a');
        expect(anchor.length).toEqual(1);
        // Should have the correct CSS class.
        expect(anchor.hasClass('navigation__link')).toEqual(true);
        // Should display the item text inside the anchor.
        expect(anchor.text()).toEqual(itemText);
        // Should link to the correct URL.
        expect(anchor.prop('href')).toEqual(itemURL);
    }

    test('Renders without crashing.', () => {
        const div = document.createElement('div');
        ReactDOM.render(wrapper, div);
    });

    test('Renders 4 NavigationItem\'s in correct order with correct names and URLs.', () => {
        const listElement = wrapper.find('.navigation__list');

        expect(wrapper.find('.navigation__item')).toHaveLength(4);

        testIfIsProperNavigationItem(listElement, 0, 'Home', requestsAndURLs.makeIndexURL());
        testIfIsProperNavigationItem(listElement, 1, 'About', requestsAndURLs.makeAboutURL());
        testIfIsProperNavigationItem(listElement, 2, 'Posts', requestsAndURLs.makePostsURL());
        testIfIsProperNavigationItem(listElement, 3, 'Contact', requestsAndURLs.makeContactUrl());
    });
});
