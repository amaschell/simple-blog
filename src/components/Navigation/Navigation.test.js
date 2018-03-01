import React from 'react';
import ReactDOM from 'react-dom';
import {Link, MemoryRouter} from 'react-router-dom';
import {mount} from 'enzyme';

import Navigation from './Navigation';
import NavigationItem from './NavigationItem';
import * as requestsAndURLs from "../../config/requestsAndURLs";

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

        expect(listElement.childAt(0).is(NavigationItem)).toEqual(true);
        expect(listElement.childAt(0).prop('name')).toEqual('Home');
        expect(listElement.childAt(0).prop('url')).toEqual(requestsAndURLs.makeIndexURL());

        expect(listElement.childAt(1).is(NavigationItem)).toEqual(true);
        expect(listElement.childAt(1).prop('name')).toEqual('About');
        expect(listElement.childAt(1).prop('url')).toEqual(requestsAndURLs.makeAboutURL());

        expect(listElement.childAt(2).is(NavigationItem)).toEqual(true);
        expect(listElement.childAt(2).prop('name')).toEqual('Posts');
        expect(listElement.childAt(2).prop('url')).toEqual(requestsAndURLs.makePostsURL());

        expect(listElement.childAt(3).is(NavigationItem)).toEqual(true);
        expect(listElement.childAt(3).prop('name')).toEqual('Contact');
        expect(listElement.childAt(3).prop('url')).toEqual(requestsAndURLs.makeContactUrl());
    });
});
