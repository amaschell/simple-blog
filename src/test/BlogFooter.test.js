import React from 'react';
import ReactDOM from 'react-dom';
import BlogFooter from '../components/BlogFooter';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BlogFooter />, div);
});
