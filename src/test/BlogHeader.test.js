import React from 'react';
import ReactDOM from 'react-dom';
import BlogHeader from '../components/BlogHeader';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BlogHeader />, div);
});
