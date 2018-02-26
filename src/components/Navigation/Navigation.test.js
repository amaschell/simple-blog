import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';

import Navigation from './Navigation';

describe('Navigation', () => {
    test('Navigation component renders without crashing.', () => {
        const div = document.createElement('div');

        // We need to wrap the component inside a router here because
        // the Navigation component uses react router's Link component
        // and needs therefore a router context even for testing.
        const wrapper = <MemoryRouter>
            <Navigation />
        </MemoryRouter>;

        ReactDOM.render(wrapper, div);
    });
});
