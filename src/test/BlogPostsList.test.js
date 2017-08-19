import React from 'react';
import ReactDOM from 'react-dom';
import BlogPostsList from '../components/BlogPostsList';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BlogPostsList />, div);
});
