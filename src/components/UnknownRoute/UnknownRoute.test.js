import React from 'react';
import ReactDOM from 'react-dom';

import UnknownRoute from './UnknownRoute';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<UnknownRoute />, div);
});
