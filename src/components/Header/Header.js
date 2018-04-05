import React from 'react';

import Navigation from '../Navigation/Navigation';
import './header.css';

const Header = () => (
    <header className='header'>
        <h1 className='header__title'>A Rather Simplistic Blog</h1>
        <Navigation />
    </header>
);

export default Header;