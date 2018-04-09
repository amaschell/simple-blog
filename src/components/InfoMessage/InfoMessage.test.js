import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import InfoMessage from './InfoMessage';

describe('InfoMessage', () => {
    test('Renders without crashing.', () => {
        const wrapper = shallow(
            <InfoMessage />
        );
        const div = document.createElement('div');
        ReactDOM.render(wrapper, div);
    });

    test('Renders the passed down icon and text correctly.', () => {
        const testClassName = "iconClassTest";
        const testText = "Test Text 123";
        const wrapper = shallow(
            <InfoMessage iconClass={testClassName} text={testText}/>
        );

        expect(wrapper.find('.' + testClassName)).toHaveLength(1);
        expect(wrapper.find('.infoMessage__text').text()).toEqual(testText);
    });
});
