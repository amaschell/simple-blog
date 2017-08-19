import React from 'react';
import ReactDOM from 'react-dom';
import BlogPostArea from '../components/BlogPostArea';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BlogPostArea />, div);
});
