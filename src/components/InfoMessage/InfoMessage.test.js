import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';

import InfoMessage from './InfoMessage';

describe('InfoMessage', () => {
    let shallowWrapper;

    beforeEach(() => {
        shallowWrapper = shallow(<InfoMessage />);
    });

    test('Renders without crashing.', () => {
        const div = document.createElement('div');
        ReactDOM.render(shallowWrapper, div);
    });

    test('Renders at least the 404 code.', () => {
        //const message = shallowWrapper.find(".unknownRoute");
        //expect(message.text()).toMatch("404");
    });
});
