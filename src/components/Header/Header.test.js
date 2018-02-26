import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';

import Header from './Header';

describe('Header', () => {
    test('Header component renders without crashing.', () => {
        const div = document.createElement('div');

        // We need to wrap the component inside a router here because
        // the Header component uses react router's Link component
        // and needs therefore a router context.
        const wrapper = <MemoryRouter>
            <Header />
        </MemoryRouter>;

        ReactDOM.render(wrapper, div);
    });
});
