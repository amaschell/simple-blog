import React from 'react';
import ReactDOM from 'react-dom';
import {Link, MemoryRouter} from 'react-router-dom';
import {mount} from 'enzyme';

import Navigation from './Navigation';
import NavigationItem from './NavigationItem';
import * as requestsAndURLs from "../../config/requestsUtility";

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
        expect(list.childAt(itemIndex).is(NavigationItem)).toEqual(true);
        expect(list.childAt(itemIndex).prop('name')).toEqual(itemText);
        expect(list.childAt(itemIndex).prop('url')).toEqual(itemURL);
    }

    test('Renders without crashing.', () => {
        const div = document.createElement('div');
        ReactDOM.render(wrapper, div);
    });

    test('NavigationItem component renders without crashing.', () => {
        // We need to wrap the component inside a router here because
        // it uses react router's Link component and needs therefore a proper routing context.
        const wrappedItem = mount(<MemoryRouter>
                                    <NavigationItem url="url" name="name" />
                                  </MemoryRouter>
        );

        const div = document.createElement('div');
        ReactDOM.render(wrappedItem, div);
    });

    test('NavigationItem component displays a Link component and displays its passed down props correctly.', () => {
        const testURL = "/test-url";
        const testName = "testName";


        // We need to wrap the component inside a router here because
        // it uses react router's Link component and needs therefore a proper routing context.
        const wrappedItem = mount(<MemoryRouter>
                                    <NavigationItem url={testURL} name={testName} />
                                  </MemoryRouter>
        );

        const link = wrappedItem.find(Link);

        expect(link).toHaveLength(1);
        expect(link.prop('to')).toEqual(testURL);
        expect(link.text()).toEqual(testName);
    });

    test('Renders 4 NavigationItem\'s in correct order with correct names and URLs.', () => {
        const listElement =  wrapper.find('.navbar__list');

        expect(wrapper.find(NavigationItem)).toHaveLength(4);

        testIfIsProperNavigationItem(listElement, 0, 'Home', requestsAndURLs.makeIndexURL());
        testIfIsProperNavigationItem(listElement, 1, 'About', requestsAndURLs.makeAboutURL());
        testIfIsProperNavigationItem(listElement, 2, 'Posts', requestsAndURLs.makePostsURL());
        testIfIsProperNavigationItem(listElement, 3, 'Contact', requestsAndURLs.makeContactUrl());
    });
});
