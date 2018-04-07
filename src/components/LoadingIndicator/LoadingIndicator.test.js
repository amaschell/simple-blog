import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';

import LoadingIndicator from './LoadingIndicator';

describe('LoadingIndicator', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<LoadingIndicator />);
    });

    test('Renders without crashing.', () => {
        const div = document.createElement('div');
        ReactDOM.render(wrapper, div);
    });

    test('Displays spinner and text correctly.', () => {
        const indicator = wrapper.find('.loadingIndicator');

        expect(indicator.length).toEqual(1);
        // Indicator has exactly two child elements in the following order: the spinner, the loading text.
        expect(indicator.children().length).toEqual(2);
        expect(indicator.childAt(0).hasClass('loadingIndicator__spinner')).toEqual(true);
        expect(indicator.childAt(1).hasClass('loadingIndicator__text')).toEqual(true);
        expect(indicator.childAt(1).text()).toEqual('Loading...');
    });
});
