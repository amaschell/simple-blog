import React from 'react';
import ReactDOM from 'react-dom';

import Feedback from './Feedback';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Feedback />, div);
});
